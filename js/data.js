/* Portfolio Markdown Database */
const VIRTUAL_FILES = [
    {
        id: 'home.md',
        title: 'home.md',
        icon: '󰈙',
        modified: true,
        content: [
            { type: 'h1', text: '# home.md' },
            { type: 'paragraph', text: 'Sreesanth S Warrier' },
            { type: 'paragraph', text: 'Third-year CSE student at Vidya Academy of Science and Technology, Thrissur. I build things to learn — mostly in C, mostly close to the hardware.' },
            { type: 'paragraph', text: 'Check out what I am up to <a class="md-link" onclick="switchTab(\'now.md\')">now</a>, read my <a class="md-link" onclick="switchTab(\'about.md\')">about me</a>, browse my <a class="md-link" onclick="switchTab(\'projects.md\')">projects</a>, or <a class="md-link" onclick="switchTab(\'contact.md\')">say hi</a>.' },
            { type: 'h2', text: '## Highlights' },
            { type: 'list', items: [
                'Technical Team Member at MuLearn VAST — front-end &amp; web development',
                'Wrote a stack-based RPN calculator in RISC-V assembly, validated against a C reference',
                'Building Verdict — a CLI where AI agents debate a topic and I track how their stance shifts',
                'Deep in embedded systems, algorithms, and low-level programming right now'
            ]},
            { type: 'h2', text: '## Quick Navigation' },
            { type: 'paragraph', text: 'Click any tab at the top or follow these links:' },
            { type: 'list', items: [
                '<code class="md-code">[about.md]</code> — <a class="md-link" onclick="switchTab(\'about.md\')">Background &amp; Philosophy</a>',
                '<code class="md-code">[projects.md]</code> — <a class="md-link" onclick="switchTab(\'projects.md\')">Featured Work</a>',
                '<code class="md-code">[now.md]</code> — <a class="md-link" onclick="switchTab(\'now.md\')">What I am doing right now</a>',
                '<code class="md-code">[stack.md]</code> — <a class="md-link" onclick="switchTab(\'stack.md\')">My Tech &amp; Neovim Setup</a>',
                '<code class="md-code">[contact.md]</code> — <a class="md-link" onclick="switchTab(\'contact.md\')">Email &amp; Social Links</a>',
                '<code class="md-code">[ama.md]</code> — <a class="md-link" onclick="switchTab(\'ama.md\')">Ask Me Anything</a>'
            ]}
        ]
    },
    {
        id: 'about.md',
        title: 'about.md',
        icon: '󰈙',
        modified: true,
        content: [
            { type: 'h1', text: '# about.md' },
            { type: 'paragraph', text: 'Hello! I am Sreesanth, a CSE undergrad at Vidya Academy of Science and Technology, Thrissur, affiliated with KTU — batch of 2028.' },
            { type: 'paragraph', text: 'I like poking at things outside my usual stack too — pixel art, chiptune and live-coding music with Strudel, retro game dev, film, and Malayalam literature (Basheer, MT Vasudevan Nair are favourites). I follow Argentine football closely, building toward the 2026 World Cup.' },
            { type: 'h2', text: '## Engineering Principles' },
            { type: 'list', items: [
                '<strong>Learn by building:</strong> every topic becomes a GitHub-worthy artifact, not just notes.',
                '<strong>Close to the hardware:</strong> bare-metal C, embedded systems, and binary exploitation over frameworks.',
                '<strong>Terminal-native:</strong> Neovim, tmux, and the keyboard over anything that gets in the way.',
                '<strong>Discipline in the small things:</strong> conventional commits, semantic versioning, proper READMEs — every time.'
            ]},
            { type: 'h2', text: '## Life outside code' },
            { type: 'paragraph', text: 'When I am not in Neovim, I am usually deep in a Malayalam novel, messing with pixel art and chiptune, or watching Argentine football.' }
        ]
    },
    {
        id: 'projects.md',
        title: 'projects.md',
        icon: '󰈙',
        modified: true,
        content: [
            { type: 'h1', text: '# projects.md' },
            { type: 'paragraph', text: 'A few things I have built recently:' },

            { type: 'h2', text: '## 1. rpn-calculator-riscv-using-ripes (RISC-V Assembly, C, Ripes)' },
            { type: 'paragraph', text: 'A stack-based RPN calculator in RISC-V assembly, built as a Computer Organization course project.' },
            { type: 'list', items: [
                'Push/pop stack operations implemented manually with RISC-V registers and memory; handles +, -, *, /',
                'Parallel C implementation written for logic validation and cross-verification of assembly output',
                'Simulated and debugged the full program in the Ripes RISC-V visual pipeline simulator',
                'GitHub: <a class="md-link" href="https://github.com/notstr0y" target="_blank">github.com/notstr0y</a>'
            ]},

            { type: 'h2', text: '## 2. suko (C, Make)' },
            { type: 'paragraph', text: 'A command-line Sudoku puzzle solver in C using recursive backtracking.' },
            { type: 'list', items: [
                'Constraint checking across rows, columns, and 3x3 boxes with clean modular separation across board.c and solver.c',
                'Conventional commits, semantic versioning, and GitHub Releases via the gh CLI',
                'GitHub: <a class="md-link" href="https://github.com/notstr0y" target="_blank">github.com/notstr0y</a>'
            ]},

            { type: 'h2', text: '## 3. verdict (Python, CLI, LLM Orchestration) — In Progress' },
            { type: 'paragraph', text: 'A Python CLI where two AI teams debate a topic under host-configurable rules.' },
            { type: 'list', items: [
                'Tracks each side\'s stance after every round — surfacing not just who argued better, but whether a position changed and why',
                'Runs entirely on free and local models',
                'Exports the full debate as a structured research report on completion',
                'GitHub: <a class="md-link" href="https://github.com/notstr0y" target="_blank">github.com/notstr0y</a>'
            ]}
        ]
    },
    {
        id: 'now.md',
        title: 'now.md',
        icon: '󰈙',
        modified: true,
        content: [
            { type: 'h1', text: '# now.md' },
            { type: 'paragraph', text: '<em>Updated mid-2026 from Thrissur, Kerala.</em>' },
            { type: 'h2', text: '## What I am currently working on' },
            { type: 'list', items: [
                'Cathy — a pixel-art desk companion on an Arduino UNO R3 (OLED, RTC, PIR, Pomodoro logic), Stage 1 milestone done',
                'A 9-stage embedded systems curriculum: AVR bare-metal &#8594; STM32/ARM Cortex-M &#8594; FreeRTOS &#8594; CAN bus',
                'A digital logic/FPGA roadmap building toward a digital music synthesizer capstone in VHDL',
                'Technical Team Member work at MuLearn VAST'
            ]},
            { type: 'h2', text: '## What I am reading' },
            { type: 'list', items: [
                'Malayalam fiction — Basheer, MT Vasudevan Nair',
                'Make: AVR Programming and Malvino\'s Electronic Principles'
            ]},
            { type: 'h2', text: '## What I am learning' },
            { type: 'list', items: [
                'Binary exploitation, working through pwn.college',
                'RTOS concepts and CAN bus for automotive/embedded work'
            ]}
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
            { type: 'h2', text: '## Get in touch' },
            { type: 'list', items: [
                '<strong>Email:</strong> <a class="md-link" href="mailto:sreesanthswarrier@gmail.com">sreesanthswarrier@gmail.com</a>',
                '<strong>GitHub:</strong> <a class="md-link" href="https://github.com/notstr0y" target="_blank">github.com/notstr0y</a>',
                '<strong>LinkedIn:</strong> <a class="md-link" href="https://linkedin.com/in/sreesanth-s-w" target="_blank">linkedin.com/in/sreesanth-s-w</a>'
            ]},
            { type: 'h2', text: '## Say hi' },
            { type: 'paragraph', text: 'Email is the most reliable way to reach me — LinkedIn works too.' }
        ]
    },
    {
        id: 'ama.md',
        title: 'ama.md',
        icon: '󰈙',
        modified: true,
        content: [
            { type: 'h1', text: '# ama.md' },
            { type: 'paragraph', text: 'Frequently Asked Questions & Answers (AMA):' },

            { type: 'h2', text: '## Q: Why Neovim?' },
            { type: 'paragraph', text: 'A: Speed, modal editing, and Lua scriptability. Once the keybindings become muscle memory, editing feels effortless.' },

            { type: 'h2', text: '## Q: Why so much low-level stuff?' },
            { type: 'paragraph', text: 'A: I learn best by building close to the metal — assembly, embedded C, binary exploitation. Abstractions make more sense once you\'ve seen what they\'re hiding.' },

            { type: 'h2', text: '## Q: What are you looking for?' },
            { type: 'paragraph', text: 'A: Open to opportunities in embedded systems and low-level software — automotive embedded, defence R&amp;D, or anything hands-on with hardware. Reach out via <a class="md-link" onclick="switchTab(\'contact.md\')">contact.md</a>.' }
        ]
    }
];
