document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------------------------------
    // 1. PAGE LOADER (Progress Bar)
    // -------------------------------------------------------------------------
    const loaderWrapper = document.getElementById('loader-wrapper');
    const loaderBar = document.getElementById('loader-bar');
    let loadProgress = 0;

    const interval = setInterval(() => {
        loadProgress += 5;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loaderWrapper.classList.add('hidden');
            }, 300); // 300ms per la transizione di opacity
        }
        loaderBar.style.setProperty('--width', `${loadProgress}%`);
    }, 50);

    // Iniettare la variabile CSS per l'animazione della barra
    const style = document.createElement('style');
    style.innerHTML = '#loader-bar:after { width: var(--width, 0%); }';
    document.head.appendChild(style);


    // -------------------------------------------------------------------------
    // 2. NAVBAR DINAMICA (Nascondi/Mostra su Scroll)
    // -------------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // Scrolling Down (Nascondi)
            navbar.classList.add('hidden');
        } else {
            // Scrolling Up (Mostra)
            navbar.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });


    // -------------------------------------------------------------------------
    // 3. TEMA CHIARO/SCURO (Light/Dark Mode)
    // -------------------------------------------------------------------------
    const modeToggle = document.getElementById('mode-toggle');
    
    // Funzione per impostare la modalità
    const setMode = (mode) => {
        document.body.classList.toggle('dark-mode', mode === 'dark');
        modeToggle.innerHTML = mode === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', mode);
    };

    // Inizializza la modalità basata sulla preferenza salvata o di sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setMode(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setMode('dark');
    } else {
        setMode('light');
    }

    // Toggle al click
    modeToggle.addEventListener('click', () => {
        const newMode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        setMode(newMode);
    });


    // -------------------------------------------------------------------------
    // 4. TRADUZIONE MULTILINGUE
    // -------------------------------------------------------------------------
    const langSelector = document.getElementById('language-selector');
    
    // Funzione di traduzione
    const translatePage = (lang) => {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[key] && translations[key][lang]) {
                element.textContent = translations[key][lang];
            }
        });
        document.documentElement.lang = lang; // Aggiorna l'attributo lang dell'HTML
        localStorage.setItem('language', lang); // Salva la preferenza
    };

    // Seleziona la lingua e traduce
    langSelector.addEventListener('change', (event) => {
        translatePage(event.target.value);
    });

    // Inizializza la lingua (se salvata)
    const savedLang = localStorage.getItem('language') || 'it';
    langSelector.value = savedLang;
    translatePage(savedLang);


    // -------------------------------------------------------------------------
    // 5. TRANSIZIONI PAGINA (3D) E ANIMAZIONI BUTTON/SOUND
    // -------------------------------------------------------------------------
    
    // Funzione per la transizione 3D
    const transitionPage = (url) => {
        document.body.style.transform = 'rotateY(90deg)';
        document.body.style.opacity = '0';
        document.body.style.transition = 'transform 0.5s ease-in, opacity 0.5s ease-in';
        
        setTimeout(() => {
            window.location.href = url;
        }, 500); // 500ms per far completare la transizione prima del cambio pagina
    };

    // Aggiungi un'animazione di entrata per la pagina corrente (al caricamento)
    document.body.style.transform = 'rotateY(0deg)';
    document.body.style.opacity = '1';
    document.body.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';


    // Gestore per tutti i pulsanti che aprono nuove pagine
    document.querySelectorAll('.modern-button[data-next-page], .nav-links a').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const url = button.getAttribute('data-next-page') || button.href;
            
            // Animazione Visiva (Aggiungi classe CSS per l'effetto)
            button.classList.add('start-animation');

            // Effetto Sonoro (Se disponibile)
            // const clickSound = new Audio('path/to/click-sound.mp3'); 
            // clickSound.play().catch(e => console.log("Sound error:", e));

            // Esegui la transizione dopo una breve pausa per l'animazione del click
            setTimeout(() => {
                transitionPage(url);
            }, 100); 
        });
    });

    // Gestione pulsante "Inizia" e overlay (solo su index.html)
    const startButton = document.getElementById('start-button');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const closeOverlayButton = document.querySelector('.close-overlay-button');
    
    if(startButton && welcomeOverlay) {
        startButton.addEventListener('click', () => {
             // Invece di navigare a welcome.html (che non è stato richiesto), mostriamo l'overlay
             // Se si volesse la pagina separata, si userebbe `transitionPage('welcome.html')`
             welcomeOverlay.style.display = 'flex';
        });

        closeOverlayButton.addEventListener('click', () => {
            welcomeOverlay.style.display = 'none';
        });
    }

});
