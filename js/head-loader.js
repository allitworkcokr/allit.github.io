// Head 컴포넌트 로더
document.addEventListener('DOMContentLoaded', function() {
    loadHead();
});

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

function loadHead() {
    const basePath = getBasePath();
    fetch(`${basePath}components/head.html`)
        .then(response => response.text())
        .then(data => {
            // head 태그에 내용 삽입
            const head = document.head;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            // 각 요소를 head에 추가
            while (tempDiv.firstChild) {
                head.appendChild(tempDiv.firstChild);
            }

            if (basePath) {
                const links = head.querySelectorAll('link[href]');
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    if (isRelativeLink(href)) {
                        link.setAttribute('href', `${basePath}${href}`);
                    }
                });
            }
        })
        .catch(error => {
            console.error('Head 컴포넌트 로드 실패:', error);
        });
}