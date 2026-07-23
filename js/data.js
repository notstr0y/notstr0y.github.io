/* Portfolio Markdown Database */
const VIRTUAL_FILES = [
    {
        id: 'home.md',
        title: 'home.md',
        icon: '󰈙',
        modified: true,
        content: [
            { type: 'h1', text: '# home.md' },
            { type: 'paragraph', text: 'notstr0y' },
            { type: 'paragraph', text: 'Third-year CSE student. I build things to learn — mostly in C, mostly close to the hardware.' },
            { type: 'paragraph', text: 'Read my <a class="md-link" onclick="switchTab(\'about.md\')">about me</a>, or <a class="md-link" onclick="switchTab(\'contact.md\')">say hi</a>.' }
        ]
    },
    {
        id: 'about.md',
        title: 'about.md',
        icon: '󰈙',
        modified: true,
        content: [
            { type: 'h1', text: '# about.md' },
            { type: 'paragraph', text: 'Hello! I am notstr0y, a third-year CSE student.' },
            { type: 'h2', text: '## Engineering Principles' },
            { type: 'list', items: [
                '<strong>Learn by building:</strong> every topic becomes a GitHub-worthy artifact, not just notes.',
                '<strong>Close to the hardware:</strong> bare-metal C, embedded systems, and binary exploitation over frameworks.',
                '<strong>Terminal-native:</strong> Neovim, tmux, and the keyboard over anything that gets in the way.',
                '<strong>Discipline in the small things:</strong> conventional commits, semantic versioning, proper READMEs — every time.'
            ]},
            { type: 'h2', text: '## Life outside code' },
            { type: 'paragraph', text: 'Outside of coding, I enjoy reading.' }
        ]
    },
    {
        id: 'stack.md',
        title: 'stack.md',
        icon: '󰈙',
        modified: true,
        content: [
            { type: 'h1', text: '# stack.md' },
            { type: 'paragraph', text: 'Tools and environment I rely on every day:' },

            { type: 'h2', text: '## Editor &amp; Terminal' },
            { type: 'list', items: [
                '<strong>OS:</strong> Arch Linux with Hyprland',
                '<strong>Editor:</strong> Neovim (NvChad) with clangd + LSP',
                '<strong>Colorscheme:</strong> Catppuccin Mocha',
                '<strong>Multiplexer:</strong> tmux with a Catppuccin Mocha theme',
                '<strong>File manager:</strong> yazi',
                '<strong>Embedded workflow:</strong> PlatformIO, GDB'
            ]},

            { type: 'h2', text: '## Languages &amp; Frameworks' },
            { type: 'list', items: [
                'C, Python, JavaScript, Java, RISC-V Assembly, Lua',
                'React, FastAPI, Streamlit, scikit-learn, python-can',
                'SQLite',
                'Git + conventional commits + semantic versioning on every project'
            ]}
        ]
    },
    {
        id: 'contact.md',
        title: 'contact.md',
        icon: '󰈙',
        modified: true,
        content: [
            { type: 'h1', text: '# contact.md' },
            { type: 'paragraph', text: 'Always happy to connect with anyone working on embedded systems, low-level programming, or just talking through a weird idea.' },
            { type: 'paragraph', text: '<em>notstr0y is Sreesanth S Warrier, in case a form somewhere asks for a real name.</em>' },
            { type: 'h2', text: '## Get in touch' },
            { type: 'list', items: [
                '<strong>Email:</strong> <a class="md-link" href="mailto:sreesanthswarrier@gmail.com">sreesanthswarrier@gmail.com</a>',
                '<strong>GitHub:</strong> <a class="md-link" href="https://github.com/notstr0y" target="_blank">github.com/notstr0y</a>',
                '<strong>LinkedIn:</strong> <a class="md-link" href="https://linkedin.com/in/sreesanth-s-w" target="_blank">linkedin.com/in/sreesanth-s-w</a>'
            ]},
            { type: 'h2', text: '## Say hi' },
            { type: 'paragraph', text: 'Email is the most reliable way to reach me — LinkedIn works too.' }
        ]
    }
];
