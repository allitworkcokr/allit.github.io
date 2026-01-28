// 네비게이션 로더
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

class NavLoader {
    constructor() {
        this.navContainer = null;
        this.currentPage = '';
    }

    // 네비게이션 로드
    async loadNavigation() {
        this.navContainer = document.querySelector('.navbar');
        if (this.navContainer) {
            this.navContainer.classList.add('is-loading');
        }
        try {
            const basePath = getBasePath();
            const response = await fetch(`${basePath}components/nav.html`);
            const navHtml = await response.text();
            
            // 네비게이션 요소 찾기
            if (this.navContainer) {
                this.navContainer.innerHTML = navHtml;
                this.rewriteLinks(basePath);
                this.setCurrentPage();
                this.initializeNavigation();
                requestAnimationFrame(() => {
                    this.navContainer.classList.add('is-loaded');
                    this.navContainer.classList.remove('is-loading');
                });
            }
        } catch (error) {
            console.error('네비게이션 로드 실패:', error);
            if (this.navContainer) {
                this.navContainer.classList.remove('is-loading');
            }
        }
    }

    // 현재 페이지 설정
    setCurrentPage() {
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // 현재 페이지 메뉴 활성화
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            const hrefTarget = href.split('#')[0];
            const hrefPage = hrefTarget.split('/').pop();
            if (hrefPage === this.currentPage || (this.currentPage === '' && hrefPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    rewriteLinks(basePath) {
        if (!this.navContainer || !basePath) {
            return;
        }

        const links = this.navContainer.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (isRelativeLink(href)) {
                link.setAttribute('href', `${basePath}${href}`);
            }
        });
    }

    // 네비게이션 기능 초기화
    initializeNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const hasSubmenuItems = document.querySelectorAll('.has-submenu');

        // 햄버거 메뉴 토글
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // 모바일에서 서브메뉴 토글
        hasSubmenuItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', function(e) {
                    // 모바일에서만 서브메뉴 토글
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        item.classList.toggle('active');
                    }
                });
            }
        });

        // 메뉴 링크 클릭 시 모바일 메뉴 닫기 (서브메뉴가 아닌 경우)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // 서브메뉴 링크가 아닌 경우에만 메뉴 닫기
                if (!link.closest('.submenu')) {
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                    if (navMenu) {
                        navMenu.classList.remove('active');
                    }
                }
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
    }
}

// 페이지 로드 시 네비게이션 로드
document.addEventListener('DOMContentLoaded', function() {
    const navLoader = new NavLoader();
    navLoader.loadNavigation();
}); 