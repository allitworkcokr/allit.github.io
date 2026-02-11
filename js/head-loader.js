// Head 컴포넌트 로더
const HEAD_LOADING_CLASS = 'head-loading';
const HEAD_READY_CLASS = 'head-ready';
const LOADING_STYLE_ID = 'head-loader-guard-style';
const MANAGED_NODE_ATTR = 'data-head-loader-managed';
const REVEAL_TIMEOUT_MS = 3000;

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

function ensureLoadingGuard() {
    const html = document.documentElement;
    html.classList.add(HEAD_LOADING_CLASS);
    html.classList.remove(HEAD_READY_CLASS);

    if (document.getElementById(LOADING_STYLE_ID)) {
        return;
    }

    const style = document.createElement('style');
    style.id = LOADING_STYLE_ID;
    style.textContent = `
        html.${HEAD_LOADING_CLASS} body { visibility: hidden; }
        html.${HEAD_READY_CLASS} body { visibility: visible; }
    `;
    document.head.appendChild(style);
}

function revealDocument() {
    const html = document.documentElement;
    html.classList.remove(HEAD_LOADING_CLASS);
    html.classList.add(HEAD_READY_CLASS);
}

function clearManagedNodes() {
    document.head.querySelectorAll(`[${MANAGED_NODE_ATTR}]`).forEach(node => node.remove());
}

function appendManagedNode(node) {
    node.setAttribute(MANAGED_NODE_ATTR, 'true');
    document.head.appendChild(node);
}

function awaitStylesheetLoad(link) {
    return new Promise(resolve => {
        if (link.sheet) {
            resolve();
            return;
        }

        const done = () => resolve();
        link.addEventListener('load', done, { once: true });
        link.addEventListener('error', done, { once: true });
    });
}

async function loadHead() {
    ensureLoadingGuard();

    const revealFallbackTimer = window.setTimeout(() => {
        revealDocument();
    }, REVEAL_TIMEOUT_MS);

    const basePath = getBasePath();
    const baseUrl = new URL(basePath || './', window.location.href);
    try {
        const response = await fetch(`${basePath}components/head.html`);
        if (!response.ok) {
            throw new Error(`head.html 응답 오류: ${response.status}`);
        }

        const data = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;

        tempDiv.querySelectorAll('link[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (isRelativeLink(href)) {
                link.setAttribute('href', new URL(href, baseUrl).href);
            }
        });

        clearManagedNodes();

        const stylesheetPromises = [];
        Array.from(tempDiv.childNodes).forEach(node => {
            if (!(node instanceof HTMLElement)) {
                return;
            }

            appendManagedNode(node);

            if (node.tagName === 'LINK' && node.getAttribute('rel') === 'stylesheet') {
                stylesheetPromises.push(awaitStylesheetLoad(node));
            }
        });

        await Promise.allSettled(stylesheetPromises);
    } catch (error) {
        console.error('Head 컴포넌트 로드 실패:', error);
    } finally {
        window.clearTimeout(revealFallbackTimer);
        revealDocument();
    }
}

loadHead();