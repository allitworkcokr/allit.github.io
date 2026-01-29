function getBasePath() {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart && lastPart.includes('.')) {
        pathParts.pop();
    }
    if (pathParts.length === 0) {
        return '';
    }
    const baseDepth = pathParts[0].includes('.github.io') ? pathParts.length - 1 : pathParts.length;
    if (baseDepth <= 0) {
        return '';
    }
    return '../'.repeat(baseDepth);
}

function isRelativeLink(href) {
    return (
        href &&
        !href.startsWith('http://') &&
        !href.startsWith('https://') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:') &&
        !href.startsWith('#') &&
        !href.startsWith('/')
    );
}

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('[data-quick-links]');
    if (!container) {
        return;
    }

    try {
        const basePath = getBasePath();
        const response = await fetch(`${basePath}gravure-pages/gravure-quick-links.html`);
        const html = await response.text();
        container.innerHTML = html;

        if (basePath) {
            container.querySelectorAll('a[href]').forEach(link => {
                const href = link.getAttribute('href');
                if (isRelativeLink(href)) {
                    link.setAttribute('href', `${basePath}${href}`);
                }
            });
        }
    } catch (error) {
        console.error('바로가기 로드 실패:', error);
    }
});
