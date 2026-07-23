let activeTabId = 'home.md';

function renderTabs() {
    const container = document.getElementById('tab-container');
    container.innerHTML = '';

    VIRTUAL_FILES.forEach(file => {
        const isActive = file.id === activeTabId;

        // Tab element
        const tab = document.createElement('button');
        tab.className = `px-3.5 py-2 font-mono flex items-center space-x-2 border-r border-ctp-surface0/60 transition-colors shrink-0 ${isActive ? 'tab-active' : 'tab-inactive'}`;
        tab.onclick = () => switchTab(file.id);

        tab.innerHTML = `
            <i class="fa-regular fa-file-code ${isActive ? 'text-ctp-mauve' : 'text-ctp-overlay0'} text-xs"></i>
            <span>${file.id}</span>
        `;
        container.appendChild(tab);
    });
}

// Keep the visual "line height" in sync with the CSS rule applied to
// #rendered-content and #line-numbers so the gutter numbers match the
// actual rendered content height instead of a rough guess.
const LINE_HEIGHT_PX = 30.4; // 1.9rem @ 16px root font-size

function renderFileContent(fileId) {
    const file = VIRTUAL_FILES.find(f => f.id === fileId);
    if (!file) return;

    const viewport = document.getElementById('rendered-content');
    const statusFilename = document.getElementById('status-filename');
    const lineNumbers = document.getElementById('line-numbers');

    statusFilename.textContent = file.id;
    viewport.innerHTML = '';

    file.content.forEach(item => {
        let el;
        if (item.type === 'h1') {
            el = document.createElement('h1');
            el.className = 'md-h1';
            el.innerHTML = item.text;
        } else if (item.type === 'h2') {
            el = document.createElement('h2');
            el.className = 'md-h2';
            el.innerHTML = item.text;
        } else if (item.type === 'paragraph') {
            el = document.createElement('p');
            el.className = 'text-ctp-text leading-relaxed';
            el.innerHTML = item.text;
        } else if (item.type === 'list') {
            el = document.createElement('ul');
            el.className = 'space-y-1.5 my-2 pl-2';
            item.items.forEach(liText => {
                const li = document.createElement('li');
                li.className = 'md-list-item text-ctp-subtext1';
                li.innerHTML = liText;
                el.appendChild(li);
            });
        }

        if (el) viewport.appendChild(el);
    });

    // Scroll to top on switch
    document.getElementById('editor-viewport').scrollTop = 0;

    // Wait for layout so we can measure the real rendered height of the
    // content column, then size the gutter to match it exactly instead of
    // relying on a hard-coded line estimate.
    requestAnimationFrame(() => {
        const contentHeight = viewport.scrollHeight;
        const lineCount = Math.max(18, Math.ceil(contentHeight / LINE_HEIGHT_PX) + 2);

        let numHtml = '';
        for (let i = 1; i <= lineCount; i++) {
            numHtml += `<div style="height:${LINE_HEIGHT_PX}px; line-height:${LINE_HEIGHT_PX}px;">${i}</div>`;
        }
        lineNumbers.innerHTML = numHtml;
    });
}

function switchTab(fileId) {
    activeTabId = fileId;
    renderTabs();
    renderFileContent(fileId);
}

// Initialize view on page load
window.onload = function () {
    renderTabs();
    renderFileContent(activeTabId);
};
