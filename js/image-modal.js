(() => {
    const dialog = document.getElementById('imageModal');
    if (!dialog) return;

    const previews = Array.from(document.querySelectorAll('[data-modal-image]'));
    const image = dialog.querySelector('#imageModalContent');
    let current = 0;

    function show(index) {
        current = (index + previews.length) % previews.length;
        const preview = previews[current];
        image.alt = preview.querySelector('img').alt;
        image.src = preview.href;
    }

    previews.forEach((preview, index) => {
        preview.addEventListener('click', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            show(index);
            dialog.showModal();
        });
    });

    dialog.querySelector('.modal-prev').addEventListener('click', () => show(current - 1));
    dialog.querySelector('.modal-next').addEventListener('click', () => show(current + 1));
    dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            show(current + (event.key === 'ArrowRight' ? 1 : -1));
        }
    });
})();
