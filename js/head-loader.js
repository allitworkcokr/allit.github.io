// Head 컴포넌트 로더
document.addEventListener('DOMContentLoaded', function() {
    loadHead();
});

function getBasePath() {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length <= 1) {
        return '';
    }
    return '../'.repeat(pathParts.length - 1);
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