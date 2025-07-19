// 사이드바 스크롤 스파이 기능
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.content-section');
    
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset + 200; // 오프셋 조정
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            // 현재 스크롤 위치가 섹션 내부에 있는지 확인
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
            
            // 마지막 섹션인 경우 스크롤이 끝에 가까우면 활성화
            if (index === sections.length - 1 && scrollPosition >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        // 사이드바 링크 활성화 업데이트
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 사이드바 링크 클릭 이벤트
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // 부드러운 스크롤
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // URL 해시 업데이트 (선택사항)
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    // 페이지 로드 시 현재 섹션 활성화
    function setActiveOnLoad() {
        const hash = window.location.hash;
        if (hash) {
            const targetLink = document.querySelector(`.sidebar-link[href="${hash}"]`);
            if (targetLink) {
                sidebarLinks.forEach(link => link.classList.remove('active'));
                targetLink.classList.add('active');
            }
        } else {
            // 해시가 없으면 첫 번째 링크 활성화
            if (sidebarLinks.length > 0) {
                sidebarLinks[0].classList.add('active');
            }
        }
    }
    
    // 초기 활성화 설정
    setActiveOnLoad();
    
    // 사이드바 스크롤 위치 조정
    function adjustSidebarPosition() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            const navbarHeight = 80; // 네비게이션 높이
            const topOffset = navbarHeight + 20; // 여백 추가
            
            sidebar.style.top = `${topOffset}px`;
        }
    }
    
    // 윈도우 리사이즈 시 사이드바 위치 조정
    window.addEventListener('resize', adjustSidebarPosition);
    
    // 초기 사이드바 위치 설정
    adjustSidebarPosition();
    
    // 스크롤 진행률 표시 (선택사항)
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // 사이드바에 진행률 표시 (선택사항)
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.setProperty('--scroll-progress', `${scrollPercent}%`);
        }
    }
    
    // 스크롤 진행률 업데이트
    window.addEventListener('scroll', updateScrollProgress);
}); 