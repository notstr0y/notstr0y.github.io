const CONTENT = {
  meta: { title: "notstr0y — portfolio" },
  sections: [
    { latin: "n", katakana: "ノ", id: "whoami", title: "whoami", heading: "Hello, world.", type: "home", tagline: "I build simple, well-crafted systems — mostly in C, mostly close to the hardware.", content: "Welcome to my space. Click on the characters of my name above to navigate through different sections." },
    { latin: "o", katakana: "ッ", id: "more-about-me", title: "more-about-me", heading: "About Me", type: "about", content: "The real name behind notstr0y is Sreesanth.\n\nThird-year CSE undergrad, currently deep in embedded systems, algorithms, and low-level programming. I learn by building — mostly in C, mostly close to the hardware.\n\nOutside of code: pixel art, chiptune and live-coding music, retro games, film, and literature." },
    { latin: "t", katakana: "ト", id: "skills-and-stack", title: "skills-and-stack", heading: "Skills & Technical Stack", type: "skills", categories: [
        { name: "Languages", items: ["C", "Python", "JavaScript", "Java", "RISC-V Assembly", "Lua"] },
        { name: "Frameworks & Libraries", items: ["React", "FastAPI", "Streamlit", "scikit-learn", "python-can"] },
        { name: "Databases", items: ["SQLite"] },
        { name: "Tools", items: ["Git", "Neovim (NvChad)", "GDB", "Bash", "tmux", "PlatformIO", "Docker"] }
      ]
    },
    { latin: "s", katakana: "ス", id: "featured-work", title: "featured-work", heading: "Featured Projects", type: "projects", items: [
        { title: "rpn-calculator-riscv-using-ripes", description: "Stack-based RPN calculator in RISC-V assembly, cross-verified against a parallel C implementation and debugged in the Ripes simulator.", link: "https://github.com/notstr0y" },
        { title: "suko", description: "Command-line Sudoku solver in C using recursive backtracking, with constraint checking across rows, columns, and boxes.", link: "https://github.com/notstr0y" },
        { title: "verdict", description: "CLI tool (in progress) where AI agents debate a topic and track how their stance shifts across rounds, exporting a structured report.", link: "https://github.com/notstr0y" }
      ]
    },
    { latin: "t", katakana: "ト", id: "career-timeline", title: "career-timeline", heading: "Career & Experience", type: "experience", items: [
        { role: "Technical Team Member", company: "MuLearn VAST", period: "2025 — Present", description: "Contributing to front-end and web development for the club chapter." },
        { role: "UST SIGHT 2.0 Hackathon", company: "Shortlisted, First Stage", period: "2025", description: "" }
      ]
    },
    { latin: "r", katakana: "ロ", id: "get-in-touch", title: "get-in-touch", heading: "Get In Touch", type: "contact", email: "sreesanthswarrier@gmail.com", github: "https://github.com/notstr0y", linkedin: "https://linkedin.com/in/sreesanth-s-w", resume: "assets/resume.pdf" },
    { latin: "0", katakana: "イ", id: "notes-and-thoughts", title: "notes-and-thoughts", heading: "Notes & Thoughts", type: "about", content: "A collection of thoughts on building things to learn — mostly in C, mostly close to the hardware." },
    { latin: "y", katakana: "y", id: null, title: null, type: "none" } // 8th character 'y' has no action bound
  ]
};
