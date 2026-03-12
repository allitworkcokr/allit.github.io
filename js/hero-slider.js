class HeroSlider {
    constructor(root) {
        this.root = root;
        this.track = root.querySelector('.hero-slider-track');
        this.slides = Array.from(root.querySelectorAll('.hero-slide'));
        this.dotsContainer = root.querySelector('[data-hero-dots]');
        this.prevButton = root.querySelector('[data-hero-prev]');
        this.nextButton = root.querySelector('[data-hero-next]');
        this.currentIndex = 0;
        this.timer = null;
        this.intervalMs = 5000;
    }

    init() {
        if (!this.root || !this.track || this.slides.length <= 1 || !this.dotsContainer) {
            return;
        }

        this.createDots();
        this.bindEvents();
        this.goTo(0);
        this.startAutoPlay();
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        this.slides.forEach((_, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'hero-slider-dot';
            button.setAttribute('aria-label', `${index + 1}번 배너 보기`);
            button.addEventListener('click', () => {
                this.goTo(index);
                this.restartAutoPlay();
            });
            this.dotsContainer.appendChild(button);
        });
    }

    bindEvents() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.prev();
                this.restartAutoPlay();
            });
        }

        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.next();
                this.restartAutoPlay();
            });
        }

        this.root.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.root.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    goTo(index) {
        const nextIndex = (index + this.slides.length) % this.slides.length;
        this.currentIndex = nextIndex;
        this.track.style.transform = `translateX(-${nextIndex * 100}%)`;

        this.slides.forEach((slide, i) => {
            slide.classList.toggle('is-active', i === nextIndex);
            slide.setAttribute('aria-hidden', i === nextIndex ? 'false' : 'true');
        });

        const dots = Array.from(this.dotsContainer.querySelectorAll('.hero-slider-dot'));
        dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === nextIndex);
        });
    }

    prev() {
        this.goTo(this.currentIndex - 1);
    }

    next() {
        this.goTo(this.currentIndex + 1);
    }

    startAutoPlay() {
        if (this.timer) {
            return;
        }
        this.timer = window.setInterval(() => this.next(), this.intervalMs);
    }

    stopAutoPlay() {
        if (!this.timer) {
            return;
        }
        window.clearInterval(this.timer);
        this.timer = null;
    }

    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sliderRoot = document.querySelector('[data-hero-slider]');
    if (!sliderRoot) {
        return;
    }
    const heroSlider = new HeroSlider(sliderRoot);
    heroSlider.init();
});
