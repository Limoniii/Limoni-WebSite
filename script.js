document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------
    // 1. PAGE LOADER
    // ---------------------------------------------
    const progressBar = document.getElementById('progress-bar');
    const pageLoader = document.getElementById('page-loader');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                pageLoader.style.opacity = '0';
                setTimeout(() => pageLoader.style.display = 'none', 500);
            }, 300);
        } else {
            // Simula il caricamento
            width += Math.random() * 5 + 1; // Incremento casuale
            if (width > 100) width = 100;
            progressBar.style.width = width + '%';
        }
    }, 100);

    // ---------------------------------------------
    // 2. NAV BAR NASCONDI/MOSTRA (Scroll)
    // ---------------------------------------------
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY < lastScrollY) {
            // Scrolling Up
            navbar.classList.remove('hidden');
        } else if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // Scrolling Down (dopo aver superato 100px)
            navbar.classList.add('hidden');
        }
        lastScrollY = window.scrollY;
    });

    // ---------------------------------------------
    // 3. DARK MODE TOGGLE
    // ---------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        themeToggle.textContent = '☀️'; // Icona Sole
    } else {
        themeToggle.textContent = '🌙'; // Icona Luna
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    });

    // ---------------------------------------------
    // 4. TERMINALE HACKER (solo su hacker.html)
    // ---------------------------------------------
    const terminal = document.getElementById('terminal-output');
    const executeBtn = document.getElementById('execute-command');
    const commandInput = document.getElementById('command-input');

    if (terminal && executeBtn && commandInput) {
        
        const commands = [
            { cmd: 'squeeze --juice', output: 'Processing... Extraction complete. New citrus core generated.' },
            { cmd: 'limone.scan()', output: 'Scanning port 443... Found vulnerability: Too much zest! Initiating countermeasure.' },
            { cmd: 'injectVitaminC()', output: 'Injecting payload: [###################] 100% COMPLETE. Target saturated.' },
            { cmd: 'help', output: 'Available commands: squeeze --juice, limone.scan(), injectVitaminC(), exit.' },
            { cmd: 'exit', output: 'Session terminated. Grazie per l\'assaggio.' }
        ];

        function typeOutput(text) {
            const line = document.createElement('div');
            line.className = 'output-line';
            terminal.appendChild(line);

            let i = 0;
            const speed = 20; // Velocità di digitazione

            function typeWriter() {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                    terminal.scrollTop = terminal.scrollHeight; // Scrolla in fondo
                    commandInput.focus();
                }
            }
            typeWriter();
        }

        function executeCommand(command) {
            if (!command) return;

            // Mostra il comando digitato nel terminale
            const inputLine = document.createElement('div');
            inputLine.className = 'terminal-line';
            inputLine.innerHTML = `<span class="prompt">$ LIMONE_HACKER:</span> ${command}`;
            terminal.appendChild(inputLine);

            const found = commands.find(c => c.cmd === command.trim());

            if (found) {
                typeOutput(found.output);
            } else {
                typeOutput(`[ERROR] Command not found: ${command}. Try 'help'.`);
            }
        }

        executeBtn.addEventListener('click', () => {
            const command = commandInput.value.trim();
            executeCommand(command);
            commandInput.value = '';
        });

        commandInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                executeBtn.click();
            }
        });
        
        // Messaggio di benvenuto all'apertura
        typeOutput("LIMONE HACKER v3.0 // CYBERPUNK ACCESS GRANTED...");
        typeOutput("Type 'help' for available commands.");
    }
    
    // ---------------------------------------------
    // 5. TRANSIZIONI PAGINA (Placeholder per effetto sonoro)
    // ---------------------------------------------
    // Poiché non posso includere file audio, questa funzione è solo un placeholder
    // per dimostrare dove andrebbe il codice per l'audio.
    function playClickSound() {
        // const audio = new Audio('click.mp3'); // Sostituire con il tuo file audio
        // audio.play().catch(e => console.error("Audio playback failed:", e));
        console.log("SUONO DI CLICK (Placeholder)");
    }
    
    document.querySelectorAll('a, button').forEach(element => {
        if (!element.classList.contains('mode-toggle')) {
            element.addEventListener('click', playClickSound);
        }
    });

});
