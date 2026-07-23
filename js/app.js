let activeTabId = 'home.md';

function renderTabs() {
    const container = document.getElementById('tab-container');
    const treeContainer = document.getElementById('tree-list');

    container.innerHTML = '';
    treeContainer.innerHTML = '';

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

        // Explorer Tree element
        const treeItem = document.createElement('button');
        treeItem.className = `w-full text-left py-1 px-2 rounded flex items-center space-x-2 hover:bg-ctp-surface0/50 transition-colors ${isActive ? 'text-ctp-mauve font-semibold bg-ctp-surface0/40' : 'text-ctp-subtext0'}`;
        treeItem.onclick = () => switchTab(file.id);
        treeItem.innerHTML = `
            <i class="fa-regular fa-file-code text-xs text-ctp-teal"></i>
            <span class="truncate">${file.id}</span>
        `;
        treeContainer.appendChild(treeItem);
    });
}

function renderFileContent(fileId) {
    const file = VIRTUAL_FILES.find(f => f.id === fileId);
    if (!file) return;

    const viewport = document.getElementById('rendered-content');
    const statusFilename = document.getElementById('status-filename');
    const lineNumbers = document.getElementById('line-numbers');

    statusFilename.textContent = file.id;
    viewport.innerHTML = '';

    let totalLinesEstimate = 0;

    file.content.forEach(item => {
        let el;
        if (item.type === 'h1') {
            el = document.createElement('h1');
            el.className = 'md-h1';
            el.innerHTML = item.text;
            totalLinesEstimate += 2;
        } else if (item.type === 'h2') {
            el = document.createElement('h2');
            el.className = 'md-h2';
            el.innerHTML = item.text;
            totalLinesEstimate += 2;
        } else if (item.type === 'paragraph') {
            el = document.createElement('p');
            el.className = 'text-ctp-text leading-relaxed';
            el.innerHTML = item.text;
            totalLinesEstimate += 2;
        } else if (item.type === 'list') {
            el = document.createElement('ul');
            el.className = 'space-y-1.5 my-2 pl-2';
            item.items.forEach(liText => {
                const li = document.createElement('li');
                li.className = 'md-list-item text-ctp-subtext1';
                li.innerHTML = liText;
                el.appendChild(li);
                totalLinesEstimate += 1;
            });
        }

        if (el) viewport.appendChild(el);
    });

    // Render line numbers in gutter
    let numHtml = '';
    const lineCount = Math.max(18, totalLinesEstimate + 5);
    for (let i = 1; i <= lineCount; i++) {
        numHtml += `<div>${i}</div>`;
    }
    lineNumbers.innerHTML = numHtml;

    // Scroll to top on switch
    document.getElementById('editor-viewport').scrollTop = 0;
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
