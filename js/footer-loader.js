// 푸터 로더
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

class FooterLoader {
    constructor() {
        this.footerContainer = null;
    }

    // 푸터 로드
    async loadFooter() {
        this.footerContainer = document.querySelector('.footer');
        if (this.footerContainer) {
            this.footerContainer.classList.add('is-loading');
        }
        try {
            const basePath = getBasePath();
            const response = await fetch(`${basePath}components/footer.html`);
            const footerHtml = await response.text();
            
            // 푸터 요소 찾기
            if (this.footerContainer) {
                this.footerContainer.innerHTML = footerHtml;
                this.rewriteLinks(basePath);
                requestAnimationFrame(() => {
                    this.footerContainer.classList.add('is-loaded');
                    this.footerContainer.classList.remove('is-loading');
                });
            }
        } catch (error) {
            console.error('푸터 로드 실패:', error);
            if (this.footerContainer) {
                this.footerContainer.classList.remove('is-loading');
            }
        }
    }

    rewriteLinks(basePath) {
        if (!this.footerContainer || !basePath) {
            return;
        }

        const links = this.footerContainer.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (isRelativeLink(href)) {
                link.setAttribute('href', `${basePath}${href}`);
            }
        });
    }
}

// 페이지 로드 시 푸터 로드
document.addEventListener('DOMContentLoaded', function() {
    const footerLoader = new FooterLoader();
    footerLoader.loadFooter();
}); 