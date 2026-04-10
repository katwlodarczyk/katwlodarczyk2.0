#!/usr/bin/env python3
"""
Download all remote images from blog markdown files and update references to local paths.
"""

import re
import glob
import os
import hashlib
import subprocess
from urllib.parse import urlparse, urlunparse

BLOG_DIR = '/Users/katwlodarczyk/private-code/katwlodarczyk-static/src/content/blog/'
OUTPUT_DIR = '/Users/katwlodarczyk/private-code/katwlodarczyk-static/public/blog/images/'

os.makedirs(OUTPUT_DIR, exist_ok=True)


def strip_query(url):
    """Remove query params and fragment from URL."""
    parsed = urlparse(url)
    return urlunparse(parsed._replace(query='', fragment=''))


def get_download_url(url):
    """
    Resolve the actual download URL:
    - i0.wp.com/katcodes.blog/... -> https://katcodes.blog/...
    - i0.wp.com/<other-host>/... -> https://<other-host>/...
    - everything else: use as-is (strip query)
    """
    clean = strip_query(url)
    parsed = urlparse(clean)

    if parsed.netloc == 'i0.wp.com':
        # Path is like /real-host.com/path/...
        path_no_leading = parsed.path.lstrip('/')
        parts = path_no_leading.split('/', 1)
        real_host = parts[0]
        real_path = '/' + parts[1] if len(parts) > 1 else '/'
        return f'https://{real_host}{real_path}'

    return clean


def get_base_filename(url):
    """Derive filename from URL path, stripping query params."""
    clean = strip_query(url)
    parsed = urlparse(clean)
    filename = os.path.basename(parsed.path)
    if not filename or '.' not in filename:
        filename = hashlib.md5(clean.encode()).hexdigest()[:8] + '.bin'
    return filename


def build_url_map(all_raw_urls):
    """
    Build a map: clean_url -> (download_url, local_filename)
    Handles filename collisions with hash prefix.
    """
    # filename -> clean_url (for collision detection)
    filename_to_url = {}
    # clean_url -> (download_url, local_filename)
    url_map = {}

    for raw_url in sorted(all_raw_urls):
        clean_url = strip_query(raw_url)
        if clean_url in url_map:
            continue  # already processed

        download_url = get_download_url(raw_url)
        filename = get_base_filename(raw_url)

        if filename in filename_to_url:
            if filename_to_url[filename] == clean_url:
                # Same URL, already handled
                pass
            else:
                # Collision: different URL, same filename
                url_hash = hashlib.md5(clean_url.encode()).hexdigest()[:6]
                base, ext = os.path.splitext(filename)
                filename = f'{base}_{url_hash}{ext}'
                filename_to_url[filename] = clean_url
        else:
            filename_to_url[filename] = clean_url

        url_map[clean_url] = (download_url, filename)

    return url_map


def collect_all_urls(files):
    """Collect all image URLs from all markdown files."""
    all_raw_urls = set()
    for f in files:
        with open(f) as fh:
            content = fh.read()
        fm_matches = re.findall(r'^image:\s*["\']?(https?://[^"\'>\s\n]+)["\']?', content, re.MULTILINE)
        all_raw_urls.update(fm_matches)
        inline_matches = re.findall(r'!\[[^\]]*\]\((https?://[^)\s]+)\)', content)
        all_raw_urls.update(inline_matches)
    return all_raw_urls


def download_images(url_map):
    """Download all images to OUTPUT_DIR in parallel batches."""
    tasks = []
    skipped = 0

    for clean_url, (download_url, filename) in sorted(url_map.items()):
        dest = os.path.join(OUTPUT_DIR, filename)
        if os.path.exists(dest) and os.path.getsize(dest) > 0:
            skipped += 1
        else:
            tasks.append((download_url, dest, filename))

    print(f'  Skipping {skipped} already-downloaded files')
    print(f'  Downloading {len(tasks)} files...')

    errors = []
    batch_size = 10
    for i in range(0, len(tasks), batch_size):
        batch = tasks[i:i+batch_size]
        procs = []
        for download_url, dest, filename in batch:
            print(f'  -> {filename}  ({download_url})')
            proc = subprocess.Popen(
                ['curl', '-L', '--silent', '--show-error', '-o', dest, download_url],
                stderr=subprocess.PIPE
            )
            procs.append((proc, filename, dest, download_url))

        for proc, filename, dest, download_url in procs:
            _, stderr = proc.communicate()
            if proc.returncode != 0:
                errors.append(f'ERROR {filename}: {stderr.decode().strip()}')
            elif not os.path.exists(dest) or os.path.getsize(dest) == 0:
                errors.append(f'ERROR {filename}: empty/missing after download ({download_url})')

    if errors:
        print('\nDownload errors:')
        for e in errors:
            print(f'  {e}')

    return len(tasks), skipped


def update_markdown_files(files, url_map):
    """Update all markdown files replacing remote URLs with local paths."""
    total_fm_replacements = 0
    total_inline_replacements = 0
    files_modified = 0

    for f in files:
        with open(f) as fh:
            original_content = fh.read()

        content = original_content
        fm_count = 0
        inline_count = 0

        # Replace frontmatter image: "url" or image: url
        def replace_fm(match):
            nonlocal fm_count
            raw_url = match.group(2)
            clean_url = strip_query(raw_url)
            if clean_url in url_map:
                _, filename = url_map[clean_url]
                fm_count += 1
                return f'{match.group(1)}"/blog/images/{filename}"'
            return match.group(0)

        content = re.sub(
            r'^(image:\s*)["\']?(https?://[^"\'>\s\n]+)["\']?',
            replace_fm,
            content,
            flags=re.MULTILINE
        )

        # Replace inline images ![alt](url)
        def replace_inline(match):
            nonlocal inline_count
            alt = match.group(1)
            raw_url = match.group(2)
            clean_url = strip_query(raw_url)
            if clean_url in url_map:
                _, filename = url_map[clean_url]
                inline_count += 1
                return f'![{alt}](/blog/images/{filename})'
            return match.group(0)

        content = re.sub(
            r'!\[([^\]]*)\]\((https?://[^)\s]+)\)',
            replace_inline,
            content
        )

        if content != original_content:
            with open(f, 'w') as fh:
                fh.write(content)
            files_modified += 1
            print(f'  {os.path.basename(f)}: {fm_count} frontmatter + {inline_count} inline replacements')

        total_fm_replacements += fm_count
        total_inline_replacements += inline_count

    return files_modified, total_fm_replacements, total_inline_replacements


def main():
    files = sorted(glob.glob(BLOG_DIR + '*.md'))
    print(f'Found {len(files)} markdown files')

    # Step 1: Collect all URLs
    all_raw_urls = collect_all_urls(files)
    print(f'Found {len(all_raw_urls)} unique raw image URLs')

    url_map = build_url_map(all_raw_urls)
    print(f'Built URL map with {len(url_map)} unique images (after collision handling)')

    # Step 2: Download
    print(f'\nDownloading images to {OUTPUT_DIR}')
    downloaded, skipped = download_images(url_map)
    print(f'Download complete: {downloaded} downloaded, {skipped} skipped')

    # Step 3: Update markdown files
    print(f'\nUpdating markdown files...')
    files_modified, fm_count, inline_count = update_markdown_files(files, url_map)

    print(f'\n=== Summary ===')
    print(f'Files processed: {len(files)}')
    print(f'Files modified: {files_modified}')
    print(f'Frontmatter replacements: {fm_count}')
    print(f'Inline image replacements: {inline_count}')
    print(f'Total replacements: {fm_count + inline_count}')

    # Verification: count remaining remote image URLs
    remaining = 0
    for f in files:
        with open(f) as fh:
            content = fh.read()
        remaining += len(re.findall(r'^image:\s*["\']?https?://', content, re.MULTILINE))
        remaining += len(re.findall(r'!\[[^\]]*\]\(https?://', content))

    if remaining > 0:
        print(f'\nWARNING: {remaining} remote image references still remain (may be non-blog-host URLs)')
        for f in files:
            with open(f) as fh:
                content = fh.read()
            fm_rem = re.findall(r'^image:\s*["\']?https?://[^"\'>\s\n]+', content, re.MULTILINE)
            inline_rem = re.findall(r'!\[[^\]]*\]\(https?://[^)\s]+\)', content)
            if fm_rem or inline_rem:
                print(f'  {os.path.basename(f)}:')
                for u in fm_rem:
                    print(f'    [FM] {u}')
                for u in inline_rem:
                    print(f'    [INLINE] {u}')
    else:
        print(f'\nAll remote image references have been replaced.')

    total_imgs = len(os.listdir(OUTPUT_DIR))
    print(f'Total images in output dir: {total_imgs}')


if __name__ == '__main__':
    main()
