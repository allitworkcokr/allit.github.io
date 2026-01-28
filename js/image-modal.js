(() => {
    const modal = document.getElementById('imageModal');
    if (!modal) {
        return;
    }

    const modalImage = document.getElementById('imageModalContent');
    const closeButton = modal.querySelector('.modal-close');
    const prevButton = modal.querySelector('.modal-prev');
    const nextButton = modal.querySelector('.modal-next');
    const triggerImages = Array.from(document.querySelectorAll('[data-modal-image]'));
    let currentIndex = 0;

    const renderModalImage = (index) => {
        const image = triggerImages[index];
        if (!image || !modalImage) {
            return;
        }
        modalImage.src = image.src;
        modalImage.alt = image.alt || '';
    };

    const openModal = (index) => {
        if (!modalImage) {
            return;
        }
        currentIndex = index;
        renderModalImage(currentIndex);
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        if (modalImage) {
            modalImage.src = '';
            modalImage.alt = '';
        }
        document.body.style.overflow = '';
    };

    const showPrev = () => {
        if (triggerImages.length === 0) {
            return;
        }
        currentIndex = (currentIndex - 1 + triggerImages.length) % triggerImages.length;
        renderModalImage(currentIndex);
    };

    const showNext = () => {
        if (triggerImages.length === 0) {
            return;
        }
        currentIndex = (currentIndex + 1) % triggerImages.length;
        renderModalImage(currentIndex);
    };

    triggerImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            openModal(index);
        });
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    if (prevButton) {
        prevButton.addEventListener('click', showPrev);
    }
    if (nextButton) {
        nextButton.addEventListener('click', showNext);
    }

    document.addEventListener('keydown', (event) => {
        if (!modal.classList.contains('is-open')) {
            return;
        }

        if (event.key === 'Escape') {
            closeModal();
        }

        if (event.key === 'ArrowLeft') {
            showPrev();
        }

        if (event.key === 'ArrowRight') {
            showNext();
        }
    });
})();
