/* main.js - handles animations, navigation, particles, translations, navbar behavior, loader, theme */
(() => {
  // ---- Simple loader animation
  const loader = document.getElementById('page-loader');
  const progress = document.getElementById('progress-bar');
  function simulateLoading() {
    if (!progress) return;
    let val = 0;
    const t = setInterval(()=> {
      val += Math.random()*20;
      if (val >= 100) { val = 100; clearInterval(t); setTimeout(()=> loader.style.display='none', 220); }
      progress.style.width = Math.min(100,val) + '%';
    }, 180);
  }
  window.addEventListener('load', simulateLoading);
  // fallback hide after 3s
  setTimeout(()=> loader && (loader.style.display='none'), 3500);

  // ---- Logo animation: stroke path already animated by CSS
  // show small brand text after draw (handled by CSS)

  // ---- Particles when starting or on specific buttons
  const canvas = document.getElementById('particles-canvas');
  let ctx, W, H, particles = [];
  function setupCanvas(){
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    function resize(){
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
  }
  function emit(x,y, color='#FFD400', count=30){
    if (!ctx) return;
    for(let i=0;i<count;i++){
      particles.push({
        x, y,
        vx: (Math.random()-0.5)*6,
        vy: (Math.random()-0.5)*6 - 2,
        life: 60 + Math.random()*30,
        r: 2+Math.random()*5,
        color
      });
    }
  }
  function frameParticles(){
    if (!ctx) return;
    ctx.clearRect(0,0,W,H);
    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.08;
      p.life--;
      ctx.globalAlpha = Math.max(0, p.life/100);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
      if (p.life<=0) particles.splice(i,1);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frameParticles);
  }
  setupCanvas(); requestAnimationFrame(frameParticles);

  // ---- Button interactions: animate then navigate
  function bindStart() {
    const start = document.getElementById('start-btn');
    if (!start) return;
    start.addEventListener('click', (e) => {
      const rect = start.getBoundingClientRect();
      emit(rect.left + rect.width/2, rect.top + rect.height/2, '#FFD400', 40);
      clickBeep();
      setTimeout(()=> window.location.href = 'inizia.html', 450);
    });
  }

  // Soldier buttons with explosion
  function bindSoldiers(){
    document.querySelectorAll('.soldier').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        const rect = btn.getBoundingClientRect();
        emit(rect.left + rect.width/2, rect.top + rect.height/2, btn.classList.contains('btn-danger') ? '#ff6b6b' : '#6bb8ff', 60);
        explosionEffect(rect.left + rect.width/2, rect.top + rect.height/2);
        clickBeep();
        setTimeout(()=> { window.location.href = btn.dataset.target; }, 500);
      });
    });
  }

  // Subscribe button with glitter
  function bindSubscribe(){
    const sub = document.getElementById('subscribe-btn');
    if (!sub) return;
    sub.addEventListener('click', ()=>{
      const rect = sub.getBoundingClientRect();
      emit(rect.left + rect.width/2, rect.top + rect.height/2, '#9dff9d', 50);
      sparkle(rect.left + rect.width/2, rect.top + rect.height/2);
      clickBeep();
      setTimeout(()=> window.location.href = sub.dataset.target, 600);
    });
  }

  function explosionEffect(x,y){
    for(let i=0;i<80;i++){
      emit(x + (Math.random()-0.5)*40, y + (Math.random()-0.5)*40, ['#ff8a8a','#ffd400','#6bb8ff'][Math.floor(Math.random()*3)], 1);
    }
  }
  function sparkle(x,y){
    for(let i=0;i<120;i++){
      emit(x + (Math.random()-0.5)*10, y + (Math.random()-0.5)*10, '#fff7a8', 1);
    }
  }

  // small click beep using WebAudio
  function clickBeep(){
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 900;
      g.gain.value = 0.0001;
      o.connect(g); g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime+0.02);
      g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime+0.12);
      o.stop(ctx.currentTime+0.12);
    } catch(e){}
  }

  // bind goHome used in many pages
  window.goHome = function(){ window.location.href = 'index.html'; }

  // ---- Navbar hide on scroll up/down
  (function navScroll(){
    let lastScroll = 0;
    const header = document.getElementById('site-header');
    if (!header) return;
    window.addEventListener('scroll', ()=>{
      const current = window.scrollY;
      if (current > lastScroll && current > 80) {
        header.style.transform = 'translateY(-120%)';
      } else {
        header.style.transform = '';
      }
      lastScroll = current;
    });
  })();

  // ---- Terminal fake commands (limone-hacker)
  function setupTerminal(){
    const body = document.getElementById('terminal-body');
    if (!body) return;
    const input = document.getElementById('cmd-input');
    const run = document.getElementById('run-cmd');

    const commands = {
      'squeeze --juice': 'Extracting juice... 98%...\nVitamin C level: MAX\nsqueeze: DONE',
      'limone.scan()': 'Scanning networks: open ports [22,80,443]\nFound: limone.local\nstatus: ripe',
      'injectVitaminC()': 'Injecting Vitamin C... SUCCESS\nAll processes energized!'
    };

    function typeOut(text, el, speed=18){
      return new Promise(res => {
        let i=0;
        const t = setInterval(()=>{
          el.textContent += text[i++] || '';
          el.scrollTop = el.scrollHeight;
          if (i>text.length){ clearInterval(t); res(); }
        }, speed);
      });
    }

    async function runCmd(cmd){
      const line = document.createElement('div');
      line.textContent = '> ' + cmd + '\n';
      body.appendChild(line);
      const out = document.createElement('div');
      out.className = 'typed-output';
      body.appendChild(out);
      const response = commands[cmd] || 'Command not found: ' + cmd;
      await typeOut(response + '\n\n', out, 12);
    }

    run.addEventListener('click', async ()=>{
      const cmd = input.value.trim();
      if (!cmd) return;
      await runCmd(cmd);
      input.value = '';
    });

    input.addEventListener('keydown', async (e)=>{
      if (e.key === 'Enter'){ e.preventDefault(); await runCmd(input.value.trim()); input.value=''; }
    });

    // preload some fun
    (async ()=> {
      await new Promise(r=>setTimeout(r,600));
      await runCmd('limone.scan()');
    })();
  }

  // ---- language translations
  const translations = {
    it: {
      nav_home: 'Home', nav_about: 'About', nav_hacker: 'Limone Hacker',
      btn_start: 'Inizia', btn_back: 'Torna indietro',
      title: 'LIMONI WEB', brand: 'LIMONI WEB',
      about_text: 'Limoni Web è come Chow: imprevedibile, brillante e con un tocco di follia.\nFratello, questo sito è così veloce che neanche Jackie Chan riesce a starci dietro!',
      footer_created: "WEBSITE CREATED BY: I DON’T KNOW!!!",
      footer_reserved: "Tutti i diritti riservati a I DON’T KNOW"
    },
    en: {
      nav_home: 'Home', nav_about: 'About', nav_hacker: 'Lemon Hacker',
      btn_start: 'Start', btn_back: 'Go back',
      title: 'LIMONI WEB', brand: 'LIMONI WEB',
      about_text: 'Limoni Web is like Chow: unpredictable, brilliant and with a touch of madness.\nBrother, this site is so fast not even Jackie Chan can keep up!',
      footer_created: "WEBSITE CREATED BY: I DON’T KNOW!!!",
      footer_reserved: "All rights reserved to I DON’T KNOW"
    },
    fr: {
      nav_home: 'Accueil', nav_about: 'À propos', nav_hacker: 'Limone Hacker',
      btn_start: 'Commencer', btn_back: 'Retour',
      title: 'LIMONI WEB', brand: 'LIMONI WEB',
      about_text: 'Limoni Web est comme Chow : imprévisible, brillant et avec une touche de folie.\nFrère, ce site est si rapide que même Jackie Chan ne peut pas suivre !',
      footer_created: "WEBSITE CREATED BY: I DON’T KNOW!!!",
      footer_reserved: "Tous droits réservés à I DON’T KNOW"
    },
    es: {
      nav_home: 'Inicio', nav_about: 'Acerca', nav_hacker: 'Limón Hacker',
      btn_start: 'Iniciar', btn_back: 'Volver',
      title: 'LIMONI WEB', brand: 'LIMONI WEB',
      about_text: 'Limoni Web es como Chow: impredecible, brillante y con un toque de locura.\nHermano, ¡este sitio es tan rápido que ni Jackie Chan lo alcanza!',
      footer_created: "WEBSITE CREATED BY: I DON’T KNOW!!!",
      footer_reserved: "Todos los derechos reservados a I DON’T KNOW"
    },
    ru: {
      nav_home: 'Домой', nav_about: 'О нас', nav_hacker: 'Лимон Хакер',
      btn_start: 'Начать', btn_back: 'Назад',
      title: 'LIMONI WEB', brand: 'LIMONI WEB',
      about_text: 'Limoni Web как Чоу: непредсказуемый, блестящий и с налетом безумия.\nБрат, этот сайт настолько быстр, что даже Джеки Чан не успеет!',
      footer_created: "WEBSITE CREATED BY: I DON’T KNOW!!!",
      footer_reserved: "Все права защищены за I DON’T KNOW"
    },
    cn: {
      nav_home: '首页', nav_about: '关于', nav_hacker: '柠檬 黑客',
      btn_start: '开始', btn_back: '返回',
      title: 'LIMONI WEB', brand: 'LIMONI WEB',
      about_text: 'Limoni Web 就像 Chow：不可预测、闪亮且带有一丝疯狂。\n兄弟，这个网站快到连成龙都追不上！',
      footer_created: "WEBSITE CREATED BY: I DON’T KNOW!!!",
      footer_reserved: "版权所有 I DON’T KNOW"
    }
  };

  function applyTranslations(lang){
    const all = document.querySelectorAll('[data-i18n]');
    all.forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const text = translations[lang] && translations[lang][key];
      if (text) {
        // keep linebreaks
        el.innerText = text;
      }
    });
  }

  // init language selector(s)
  function initLang(){
    const defaultLang = localStorage.getItem('site_lang') || 'it';
    document.querySelectorAll('.lang-select').forEach(sel=>{
      sel.value = defaultLang;
      sel.addEventListener('change', (e)=>{
        localStorage.setItem('site_lang', e.target.value);
        applyTranslations(e.target.value);
      });
    });
    applyTranslations(defaultLang);
  }

  // theme toggle
  function initTheme(){
    const stored = localStorage.getItem('site_theme') || 'dark';
    setTheme(stored);
    document.querySelectorAll('#theme-toggle, #theme-toggle-page').forEach(btn=>{
      if (!btn) return;
      btn.addEventListener('click', ()=> {
        const cur = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
        setTheme(cur === 'dark' ? 'light' : 'dark');
      });
    });
  }
  function setTheme(mode){
    if (mode === 'light'){
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      localStorage.setItem('site_theme','light');
      document.documentElement.style.setProperty('--bg-dark','#f7f7f9');
      document.documentElement.style.setProperty('--white','#111');
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      localStorage.setItem('site_theme','dark');
      document.documentElement.style.setProperty('--bg-dark','#0b0b0f');
      document.documentElement.style.setProperty('--white','#ffffff');
    }
  }

  // copy lang selectors into pages where empty
  function copyLangsToPage(){
    const selects = document.querySelectorAll('.lang-select');
    selects.forEach(s => {
      if (s.options.length === 0) {
        ['it','en','fr','es','ru','cn'].forEach(v=>{
          const o = document.createElement('option'); o.value = v; o.textContent = (translations[v].nav_home || v).toUpperCase(); s.appendChild(o);
        });
      }
    });
  }

  // event binding at DOMContentLoaded
  document.addEventListener('DOMContentLoaded', ()=>{
    bindStart();
    bindSoldiers();
    bindSubscribe();
    setupTerminal();
    initLang();
    copyLangsToPage();
    initTheme();
    // small click handlers for all buttons to create sound
    document.querySelectorAll('button').forEach(b => b.addEventListener('click', ()=> clickBeep()));
  });

})();
