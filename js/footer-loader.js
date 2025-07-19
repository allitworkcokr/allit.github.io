// 푸터 로더
class FooterLoader {
    constructor() {
        this.footerContainer = null;
    }

    // 푸터 로드
    async loadFooter() {
        try {
            const response = await fetch('components/footer.html');
            const footerHtml = await response.text();
            
            // 푸터 요소 찾기
            this.footerContainer = document.querySelector('.footer');
            if (this.footerContainer) {
                this.footerContainer.innerHTML = footerHtml;
            }
        } catch (error) {
            console.error('푸터 로드 실패:', error);
        }
    }
}

// 페이지 로드 시 푸터 로드
document.addEventListener('DOMContentLoaded', function() {
    const footerLoader = new FooterLoader();
    footerLoader.loadFooter();
}); 