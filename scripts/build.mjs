import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFileSync(path.join(root, file), 'utf8');
const fragments = {
    head: read('components/head.html'),
    nav: read('components/nav.html'),
    footer: read('components/footer.html'),
    'quick-links': read('gravure-pages/gravure-quick-links.html')
};

function htmlPages(directory) {
    return readdirSync(path.join(root, directory), { withFileTypes: true })
        .filter(entry => entry.isFile() && entry.name.endsWith('.html'))
        .map(entry => path.posix.join(directory, entry.name));
}

const gravureOverview = 'gravure-pages/gravure-mes.html';

function renderBreadcrumb(page, heading) {
    const directory = path.posix.dirname(page);
    const home = directory === '.' ? './' : path.posix.relative(directory, '.') + '/';
    const trail = [{ name: '홈', href: home }];
    if (page !== gravureOverview && (page.startsWith('gravure-pages/') || page.startsWith('gravure-screen-'))) {
        trail.push({ name: '그라비아인쇄 프로그램', href: path.posix.relative(directory, gravureOverview) });
    }
    trail.push({ name: heading });
    const items = trail.map(({ name, href }, index) => {
        const label = '<span itemprop="name">' + name + '</span>';
        const item = href ? '<a itemprop="item" href="' + href + '">' + label + '</a>' : label;
        const current = href ? '' : ' aria-current="page"';
        return '        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"' + current + '>' +
            item + '<meta itemprop="position" content="' + (index + 1) + '"></li>';
    });
    return ['<nav class="page-breadcrumb" aria-label="현재 위치">',
        '    <ol itemscope itemtype="https://schema.org/BreadcrumbList">', ...items, '    </ol>', '</nav>'].join('\n');
}

function renderFragment(name, page) {
    const directory = path.posix.dirname(page);
    return fragments[name].trim().replace(/(href|src)="([^"]+)"/g, (attribute, key, target) => {
        if (/^(?:[\w+.-]+:|\/|#)/.test(target)) return attribute;
        const relative = path.posix.relative(directory, target);
        const current = (name === 'nav' || name === 'quick-links') && target === page ? ' aria-current="page"' : '';
        return key + '="' + relative + '"' + current;
    });
}

const urls = [];
for (const page of [...htmlPages('.'), ...htmlPages('gravure-pages')]) {
    const original = read(page);
    if (!/<html\s/i.test(original)) continue;
    const html = original.replace(/<!-- include:([\w-]+) -->[\s\S]*?<!-- endinclude -->/g, (block, name) => {
        let content;
        if (name === 'breadcrumb') {
            const heading = original.match(/<h1\b[^>]*>([^<]+)<\/h1>/i)?.[1];
            if (!heading) throw new Error('Missing breadcrumb heading: ' + page);
            content = renderBreadcrumb(page, heading);
        } else {
            if (!(name in fragments)) throw new Error('Unknown include: ' + name + ' in ' + page);
            content = renderFragment(name, page);
        }
        return '<!-- include:' + name + ' -->\n' + content + '\n<!-- endinclude -->';
    });
    if (html !== original) writeFileSync(path.join(root, page), html);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (!canonical) throw new Error('Missing canonical: ' + page);
    if (!/<meta name="robots" content="[^"]*noindex/i.test(html)) urls.push(canonical);
}

const locations = [...new Set(urls)].sort().map(url => '  <url><loc>' + url + '</loc></url>');
const sitemap = ['<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...locations, '</urlset>', ''].join('\n');
if (sitemap !== read('sitemap.xml')) writeFileSync(path.join(root, 'sitemap.xml'), sitemap);
console.log('Rendered shared HTML and wrote ' + locations.length + ' canonical URLs to sitemap.xml.');
