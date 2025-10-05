// 네비게이션 기능
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const submenuItems = document.querySelectorAll('.has-submenu');

    // 서브메뉴 hover 효과를 위한 타이머
    let hoverTimer = null;

    // 햄버거 메뉴 토글
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 메뉴 링크 클릭 시 모바일 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 서브메뉴 hover 효과 개선
    submenuItems.forEach(item => {
        const submenu = item.querySelector('.submenu');
        
        // 마우스 진입 시
        item.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                submenu.style.opacity = '1';
                submenu.style.visibility = 'visible';
                submenu.style.transform = 'translateY(0)';
                submenu.style.pointerEvents = 'auto';
            }, 50); // 짧은 지연으로 안정성 확보
        });

        // 마우스 벗어남 시
        item.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                submenu.style.opacity = '0';
                submenu.style.visibility = 'hidden';
                submenu.style.transform = 'translateY(-10px)';
                submenu.style.pointerEvents = 'none';
            }, 100); // 약간의 지연으로 깜빡임 방지
        });

        // 서브메뉴 자체에 마우스 진입 시
        submenu.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimer);
            submenu.style.opacity = '1';
            submenu.style.visibility = 'visible';
            submenu.style.transform = 'translateY(0)';
            submenu.style.pointerEvents = 'auto';
        });

        // 서브메뉴에서 마우스 벗어남 시
        submenu.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                submenu.style.opacity = '0';
                submenu.style.visibility = 'hidden';
                submenu.style.transform = 'translateY(-10px)';
                submenu.style.pointerEvents = 'none';
            }, 100);
        });
    });

    // 스크롤 시 네비게이션 스타일 변경
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 현재 페이지 메뉴 활성화
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // index.html과 빈 경로 모두 처리
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 부드러운 스크롤 (내부 링크용)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 