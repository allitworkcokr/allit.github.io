const header = document.querySelector('.site-header');
const menuSwitch = header.querySelector('.menu-switch');
const groups = Array.from(header.querySelectorAll('.nav-group'));

function closeMenu() {
    menuSwitch.setAttribute('aria-expanded', 'false');
    groups.forEach(group => { group.open = false; });
}

header.classList.add('is-interactive');
menuSwitch.addEventListener('click', () => {
    if (menuSwitch.getAttribute('aria-expanded') === 'true') {
        closeMenu();
    } else {
        menuSwitch.setAttribute('aria-expanded', 'true');
    }
});

groups.forEach(group => {
    group.addEventListener('toggle', () => {
        if (group.open) {
            groups.filter(other => other !== group).forEach(other => { other.open = false; });
        }
    });
});

document.addEventListener('click', event => {
    if (!header.contains(event.target)) closeMenu();
});
header.addEventListener('focusout', event => {
    if (event.relatedTarget && !header.contains(event.relatedTarget)) closeMenu();
});
document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const group = groups.find(item => item.open);
    if (group) {
        group.open = false;
        group.querySelector('summary').focus();
    } else if (menuSwitch.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuSwitch.focus();
    }
});
window.matchMedia('(max-width: 760px)').addEventListener('change', closeMenu);
