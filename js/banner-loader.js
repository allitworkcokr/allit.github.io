// 배너 로더
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

class BannerLoader {
    constructor() {
        this.bannerContainer = null;
    }

    // 배너 로드
    async loadBanner() {
        try {
            const basePath = getBasePath();
            const response = await fetch(`${basePath}components/banner.html`);
            const bannerHtml = await response.text();

            // 배너 요소 찾기
            this.bannerContainer = document.querySelector('.banner');
            if (this.bannerContainer) {
                this.bannerContainer.innerHTML = bannerHtml;
                this.initializeBanner();
            }
        } catch (error) {
            console.error('배너 로드 실패:', error);
        }
    }

    // 배너 기능 초기화
    initializeBanner() {
        // 배너 스크롤 효과
        const bannerItems = document.querySelectorAll('.banner-item');

        bannerItems.forEach(item => {
            item.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-2px) scale(1.01)';
            });

            item.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // 배너 버튼 클릭 효과
        const bannerBtns = document.querySelectorAll('.banner-btn');
        bannerBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                // 클릭 효과
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });


    }
}

// 페이지 로드 시 배너 로드
document.addEventListener('DOMContentLoaded', function () {
    const bannerLoader = new BannerLoader();
    //bannerLoader.loadBanner();
}); 