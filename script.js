/* Navbar, footer, loader, language, animations, sounds, theme */

(function() {
  const PAGES = {
    home: 'index.html',
    about: 'about.html',
    iscriviti: 'iscriviti.html',
    israel: 'israel.html',
    palestina: 'palestina.html',
    hacker: 'hacker.html',
    inizia: 'inizia.html'
  };

  // Translations
  const T = {
    it: {
      title: 'LIMONI WEB',
      nav_home: 'Home',
      nav_about: 'About',
      nav_hacker: 'Limone Hacker',
      btn_start: 'Inizia',
      btn_israel: 'Soldato Israeliano',
      btn_palestina: 'Soldato Palestinese',
      btn_subscribe: 'Iscriviti',
      btn_back: 'Torna indietro',
      about_line1: 'Limoni Web è come Chow: imprevedibile, brillante e con un tocco di follia.',
      about_line2: 'Fratello, questo sito è così veloce che neanche Jackie Chan riesce a starci dietro!',
      isr_line: 'Sei un Soldato Israeliano, Complimenti Kolione',
      pal_line: 'Sei un Soldato Palestinese, Complimenti Kolione',
      sub_line1: 'Fancolo Pannzone',
      sub_line2: 'Tu vuoi inculare me?',
      sub_line3: 'Congelati, o ti faccio saltare le chiappe!!!',
      start_line: 'Signora i Limoni, SIGNORAAA!!!',
      footer_title: "WEBSITE CREATED BY: I DON'T KNOW!!!",
      footer_left1: 'Tutti i diritti riservati a I DON’T KNOW',
      footer_left2: 'Telefono: +39 0123456789',
      footer_left3: 'Email: idontknow@blabla.hehe',
      hacker_title: 'LIMONE HACKER — TERMINALE',
      hacker_run: 'Esegui'
    },
    en: {
      title: 'LIMONI WEB',
      nav_home: 'Home',
      nav_about: 'About',
      nav_hacker: 'Lemon Hacker',
      btn_start: 'Start',
      btn_israel: 'Israeli Soldier',
      btn_palestina: 'Palestinian Soldier',
      btn_subscribe: 'Subscribe',
      btn_back: 'Go back',
      about_line1: 'Limoni Web is like Chow: unpredictable, brilliant, with a touch of madness.',
      about_line2: 'Brother, this site is so fast even Jackie Chan can’t keep up!',
      isr_line: 'You are an Israeli Soldier, Congrats Kolione',
      pal_line: 'You are a Palestinian Soldier, Congrats Kolione',
      sub_line1: 'F*** Pannzone',
      sub_line2: 'You want to mess with me?',
      sub_line3: 'Freeze, or I’ll blast your butt!!!',
      start_line: 'Lady of the Lemons, LAAAAADY!!!',
      footer_title: "WEBSITE CREATED BY: I DON'T KNOW!!!",
      footer_left1: 'All rights reserved to I DON’T KNOW',
      footer_left2: 'Phone: +39 0123456789',
      footer_left3: 'Email: idontknow@blabla.hehe',
      hacker_title: 'LEMON HACKER — TERMINAL',
      hacker_run: 'Run'
    },
    fr: {
      title: 'LIMONI WEB',
      nav_home: 'Accueil',
      nav_about: 'À propos',
      nav_hacker: 'Citron Hacker',
      btn_start: 'Commencer',
      btn_israel: 'Soldat Israélien',
      btn_palestina: 'Soldat Palestinien',
      btn_subscribe: "S'inscrire",
      btn_back: 'Retour',
      about_line1: 'Limoni Web, c’est comme Chow : imprévisible, brillant, avec une touche de folie.',
      about_line2: 'Frérot, ce site est si rapide que même Jackie Chan n’arrive pas à suivre !',
      isr_line: 'Tu es un soldat israélien, bravo Kolione',
      pal_line: 'Tu es un soldat palestinien, bravo Kolione',
      sub_line1: 'M***e Pannzone',
      sub_line2: 'Tu veux me provoquer ?',
      sub_line3: 'Gèle, ou je te fais exploser les fesses !!!',
      start_line: 'Madame des Citrons, MADAAAAME !!!',
      footer_title: "WEBSITE CREATED BY: I DON'T KNOW!!!",
      footer_left1: 'Tous droits réservés à I DON’T KNOW',
      footer_left2: 'Téléphone : +39 0123456789',
      footer_left3: 'Email : idontknow@blabla.hehe',
      hacker_title: 'CITRON HACKER — TERMINAL',
      hacker_run: 'Exécuter'
    },
    es: {
      title: 'LIMONI WEB',
      nav_home: 'Inicio',
      nav_about: 'Acerca de',
      nav_hacker: 'Limón Hacker',
      btn_start: 'Empezar',
      btn_israel: 'Soldado Israelí',
      btn_palestina: 'Soldado Palestino',
      btn_subscribe: 'Suscribirse',
      btn_back: 'Regresar',
      about_line1: 'Limoni Web es como Chow: impredecible, brillante y con un toque de locura.',
      about_line2: 'Hermano, este sitio es tan rápido que ni Jackie Chan puede alcanzarlo.',
      isr_line: 'Eres un soldado israelí, felicidades Kolione',
      pal_line: 'Eres un soldado palestino, felicidades Kolione',
      sub_line1: 'M***da Pannzone',
      sub_line2: '¿Quieres meterte conmigo?',
      sub_line3: '¡Congélate o te reviento el trasero!',
      start_line: 'Señora de los Limones, ¡SEÑOOORA!',
      footer_title: "WEBSITE CREATED BY: I DON'T KNOW!!!",
      footer_left1: 'Todos los derechos reservados a I DON’T KNOW',
      footer_left2: 'Teléfono: +39 0123456789',
      footer_left3: 'Email: idontknow@blabla.hehe',
      hacker_title: 'LIMÓN HACKER — TERMINAL',
      hacker_run: 'Ejecutar'
    },
    ru: {
      title: 'LIMONI WEB',
      nav_home: 'Главная',
      nav_about: 'О сайте',
      nav_hacker: 'Лимон Хакер',
      btn_start: 'Начать',
      btn_israel: 'Израильский солдат',
      btn_palestina: 'Палестинский солдат',
      btn_subscribe: 'Подписаться',
      btn_back: 'Назад',
      about_line1: 'Limoni Web — как Chow: непредсказуемый, блестящий и немного безумный.',
      about_line2: 'Брат, сайт такой быстрый, что даже Джеки Чан не успевает!',
      isr_line: 'Вы — израильский солдат, поздравляем, Kolione',
      pal_line: 'Вы — палестинский солдат, поздравляем, Kolione',
      sub_line1: 'Чёрт с ним, Pannzone',
      sub_line2: 'Ты хочешь меня достать?',
      sub_line3: 'Замри, или я взорву твою задницу!!!',
      start_line: 'Леди лимонов, ЛЕЕЕДИ!!!',
      footer_title: "WEBSITE CREATED BY: I DON'T KNOW!!!",
      footer_left1: 'Все права защищены I DON’T KNOW',
      footer_left2: 'Телефон: +39 0123456789',
      footer_left3: 'Email: idontknow@blabla.hehe',
      hacker_title: 'ЛИМОН ХАКЕР — ТЕРМИНАЛ',
      hacker_run: 'Запустить'
    },
    zh: {
      title: 'LIMONI WEB',
      nav_home: '主页',
      nav_about: '关于',
      nav_hacker: '柠檬黑客',
      btn_start: '开始',
      btn_israel: '以色列士兵',
      btn_palestina: '巴勒斯坦士兵',
      btn_subscribe: '订阅',
      btn_back: '返回',
      about_line1: 'Limoni Web 就像 Chow：不可预测、聪明又带点疯狂。',
      about_line2: '兄弟，这网站快到连成龙都追不上！',
      isr_line: '你是以色列士兵，恭喜 Kolione',
      pal_line: '你是巴勒斯坦士兵，恭喜 Kolione',
      sub_line1: '去它的 Pannzone',
      sub_line2: '你要惹我吗？',
      sub_line3: '冻结，否则我把你炸飞！！！',
      start_line: '柠檬女士，女——士！！！',
      footer_title: "WEBSITE CREATED BY: I DON'T KNOW!!!",
      footer_left1: '版权所有 I DON’T KNOW',
      footer_left2: '电话：+39 0123456789',
      footer_left3: '邮箱：idontknow@blabla.hehe',
      hacker_title: '柠檬黑客 — 终端',
      hacker_run: '执行'
    }
  };

  const getLang = () => {
    const urlLang = new URLSearchParams(location.search).get('lang');
    const saved = localStorage.getItem('lang');
    return (urlLang || saved || 'it');
  };
  const setLang = (lang) => {
    localStorage.setItem('lang', lang);
    const params = new URLSearchParams(location.search);
    params.set('lang', lang);
    history.replaceState(null, '', `${location.pathname}?${params.toString()}`);
    applyTranslations(lang);
    // update all links with ?lang
    document.querySelectorAll('a').forEach(a => {
      try {
        const u = new URL(a.href, location.origin);
        u.searchParams.set('lang', lang);
        a.href = u.toString();
      } catch(e){}
    });
  };

  function injectNavbar() {
    const lang = getLang();
    const nav = document.getElementById('navbar');
    if (!nav) return;
    nav.innerHTML = `
      <nav class="navbar">
        <div class="nav-left">
          <a class="nav-logo" href="index.html?lang=${lang}" aria-label="Home">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="18" fill="#FFD400" stroke="black" stroke-width="2"></circle>
              <path d="M44,22 C48,16 54,16 58,22 C54,24 48,24 44,22 Z" fill="#78C257" stroke="black" stroke-width="1.5"></path>
            </svg>
            <strong style="color:#FFD400;-webkit-text-stroke:0.8px #000">LIMONI WEB</strong>
          </a>
          <div class="nav-links">
            <a href="index.html?lang=${lang}" data-i18n="nav_home">Home</a>
            <a href="about.html?lang=${lang}" data-i18n="nav_about">About</a>
            <a href="hacker.html?lang=${lang}" data-i18n="nav_hacker">Limone Hacker</a>
          </div>
        </div>
        <div class="nav-right">
          <a class="social-icon" href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" stroke-width="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="#fff"></rect>
              <circle cx="12" cy="12" r="5" stroke="#fff"></circle>
              <circle cx="17.5" cy="6.5" r="1.5" fill="#fff"></circle>
            </svg>
          </a>
          <a class="social-icon" href="https://tiktok.com" target="_blank" rel="noopener" aria-label="TikTok">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" stroke-width="1.5">
              <path d="M14 3v8.5a4.5 4.5 0 1 1-3.9-4.46" stroke="#fff"></path>
              <path d="M14 6c1.2 1.7 3.2 3 5 3" stroke="#fff"></path>
            </svg>
          </a>
          <select class="lang-select" id="langSelect" aria-label="Language">
            <option value="it">Italiano</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="ru">Русский</option>
            <option value="zh">中文</option>
          </select>
          <button class="theme-toggle" title="Toggle theme" aria-label="Toggle theme"></button>
        </div>
      </nav>
    `;
    const sel = document.getElementById('langSelect');
    if (sel) sel.value = lang;

    let lastY = window.scrollY;
    const bar = nav.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > lastY + 5) bar.classList.add('hidden');
      else if (y < lastY - 5) bar.classList.remove('hidden');
      lastY = y;
    });

    sel && sel.addEventListener('change', (e) => setLang(e.target.value));
    nav.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
  }

  function injectFooter() {
    const f = document.getElementById('footer');
    if (!f) return;
    f.innerHTML = `
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-title" data-i18n="footer_title">WEBSITE CREATED BY: I DON’T KNOW!!!</div>
          <div class="footer-left" data-i18n="footer_left1">Tutti i diritti riservati a I DON’T KNOW</div>
          <div class="footer-left" data-i18n="footer_left2">Telefono: +39 0123456789</div>
          <div class="footer-left" data-i18n="footer_left3">Email: idontknow@blabla.hehe</div>
        </div>
      </footer>
    `;
  }

  function applyTranslations(lang) {
    const dict = T[lang] || T.it;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
  }

  const toggleTheme = () => {
    const current = localStorage.getItem('theme') || 'auto';
    const next = current === 'dark' ? 'light' : current === 'light' ? 'dark' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme();
  };
  const applyTheme = () => {
    const prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('theme') || 'auto';
    document.body.classList.remove('theme-dark','theme-light','theme-auto');
    if (saved === 'dark') document.body.classList.add('theme-dark');
    else if (saved === 'light') document.body.classList.add('theme-light');
    else document.body.classList.add(prefDark ? 'theme-dark' : 'theme-light');
  };

  function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) setTimeout(() => loader.classList.add('hidden'), 400);
  }

  window.playClickSound = function() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle'; o.frequency.value = 660;
      g.gain.setValueAtTime(0.05, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.09);
    } catch(e){}
  };

  function initButtons() {
    document.querySelectorAll('.btn-particles').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        for (let i=0;i<18;i++){
          const p = document.createElement('span');
          p.className = 'particle';
          const dx = (Math.random()*2-1) * 80 + 'px';
          const dy = (Math.random()*2-1) * 80 + 'px';
          p.style.left = (e.clientX - rect.left) + 'px';
          p.style.top = (e.clientY - rect.top) + 'px';
          p.style.setProperty('--dx', dx);
          p.style.setProperty('--dy', dy);
          btn.appendChild(p);
          setTimeout(()=>p.remove(),600);
        }
        navigate('inizia');
        window.playClickSound();
      });
    });

    document.querySelectorAll('.btn-explode').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.add('exploding');
        setTimeout(()=>btn.classList.remove('exploding'), 600);
        navigate(btn.dataset.link);
        window.playClickSound();
      });
    });

    document.querySelectorAll('.btn-sparkle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        for (let i=0;i<14;i++){
          const s = document.createElement('span');
          s.className = 'sparkle';
          s.style.left = (e.clientX - rect.left) + 'px';
          s.style.top = (e.clientY - rect.top) + 'px';
          s.style.setProperty('--sx', (Math.random()*2-1)*90 + 'px');
          s.style.setProperty('--sy', (Math.random()*2-1)*90 + 'px');
          btn.appendChild(s);
          setTimeout(()=>s.remove(),700);
        }
        navigate(btn.dataset.link);
        window.playClickSound();
      });
    });
  }

  function navigate(key) {
    const lang = getLang();
    let target = PAGES[key] || 'index.html';
    location.href = `${target}?lang=${lang}`;
  }

  function initBackLinksLang() {
    const lang = getLang();
    document.querySelectorAll('a[href*="index.html"]').forEach(a=>{
      try {
        const u = new URL(a.href, location.origin);
        u.searchParams.set('lang', lang);
        a.href = u.toString();
      } catch(e){}
    });
  }

  function initTitleClickSound() {
    const title = document.querySelector('.site-title');
    if (title) title.addEventListener('click', window.playClickSound);
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
    injectFooter();
    applyTheme();
    applyTranslations(getLang());
    initButtons();
    initBackLinksLang();
    initTitleClickSound();
    hideLoader();
  });

})();
