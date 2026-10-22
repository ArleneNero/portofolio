/* =========================================================
   Muhammad Ariefsyah - Portofolio "DATA LAB"
   Skrip bersama (index, todo, calculator).
   Setiap modul di-guard agar aman walau elemennya tak ada.
   ========================================================= */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  /* ---------- Tahun footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Tema (Dark / Light) ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ---------- Jam lokal (Asia/Jakarta) ---------- */
  var clockEl = document.getElementById('clock');
  if (clockEl) {
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    } catch (e) { fmt = null; }
    var tick = function () {
      clockEl.textContent = fmt ? fmt.format(new Date()) + ' WIB' : '';
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Preloader ---------- */
  var pre = document.getElementById('preloader');
  if (pre) {
    var numEl = document.getElementById('preloadNum');
    var barEl = document.getElementById('preloadBar');
    var p = 0;
    var finish = function () {
      pre.classList.add('is-done');
      setTimeout(function () { if (pre && pre.parentNode) pre.parentNode.removeChild(pre); }, 700);
    };
    if (reduceMotion) { if (numEl) numEl.innerHTML = '100<span>%</span>'; if (barEl) barEl.style.width = '100%'; setTimeout(finish, 300); }
    else {
      var run = setInterval(function () {
        p += Math.max(1, Math.round((100 - p) * 0.12));
        if (p >= 100) { p = 100; clearInterval(run); setTimeout(finish, 350); }
        if (numEl) numEl.innerHTML = p + '<span>%</span>';
        if (barEl) barEl.style.width = p + '%';
      }, 90);
    }
  }

  /* ---------- Navbar scroll + mobile menu ---------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('is-open');
        navLinks.classList.remove('is-open');
      });
    });
  }

  /* ---------- Typing effect ---------- */
  var typedEl = document.getElementById('typed');
  if (typedEl) {
    var phrases = ['Data Analyst', 'Machine Learning & Network Analyst', 'Informatics Student'];
    var pi = 0, ci = 0, deleting = false;
    (function type() {
      var word = phrases[pi];
      typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      if (!deleting && ci === word.length + 1) { deleting = true; setTimeout(type, 1500); }
      else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 300); }
      else setTimeout(type, deleting ? 45 : 95);
    })();
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, idx) {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = Math.min(idx * 60, 240) + 'ms';
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Counter animation ---------- */
  var counters = document.querySelectorAll('.stat__num');
  if (counters.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = +el.dataset.count, dur = 1500, start = performance.now();
        (function step(now) {
          var pr = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - pr, 3);
          el.textContent = Math.round(target * eased).toString();
          if (pr < 1) requestAnimationFrame(step);
        })(start);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---------- Cursor dot ---------- */
  var dot = document.getElementById('cursorDot');
  if (dot && isDesktop) {
    var mx = 0, my = 0, dx = 0, dy = 0;
    window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
    (function animateDot() {
      dx += (mx - dx) * 0.2; dy += (my - dy) * 0.2;
      dot.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      requestAnimationFrame(animateDot);
    })();
    document.querySelectorAll('a, button, .social, .key, .skill-card, .feature, .app-link, .stat').forEach(function (el) {
      el.addEventListener('mouseenter', function () { dot.classList.add('is-hover'); });
      el.addEventListener('mouseleave', function () { dot.classList.remove('is-hover'); });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (isDesktop && !reduceMotion) {
    document.querySelectorAll('.magnetic').forEach(function (el) {
      var strength = parseFloat(el.dataset.magnetic || '0.3');
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + x * strength + 'px,' + y * strength + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- Hero parallax pada elemen ---------- */
  var heroInner = document.querySelector('.hero__inner');
  if (heroInner && !reduceMotion) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < window.innerHeight) heroInner.style.transform = 'translateY(' + y * 0.12 + 'px)';
    }, { passive: true });
  }

  /* =========================================================
     TO-DO LIST APP
     ========================================================= */
  var todoForm = document.getElementById('todoForm');
  if (todoForm) {
    var todoInput = document.getElementById('todoInput');
    var todoList = document.getElementById('todoList');
    var todoEmpty = document.getElementById('todoEmpty');
    var todoCount = document.getElementById('todoCount');
    var todoFilters = document.getElementById('todoFilters');
    var todos = JSON.parse(localStorage.getItem('todos') || '[]');
    var filter = 'all';
    var saveTodos = function () { localStorage.setItem('todos', JSON.stringify(todos)); };
    var renderTodos = function () {
      var filtered = todos.filter(function (t) { return filter === 'all' ? true : filter === 'active' ? !t.done : t.done; });
      todoList.innerHTML = '';
      filtered.forEach(function (t) {
        var li = document.createElement('li');
        li.className = 'todo-item' + (t.done ? ' done' : '');
        li.dataset.id = t.id;
        li.innerHTML =
          '<span class="todo-check" role="checkbox" aria-checked="' + t.done + '">' +
          '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>' +
          '<span class="todo-text"></span>' +
          '<button class="todo-del" aria-label="Hapus">✕</button>';
        li.querySelector('.todo-text').textContent = t.text;
        todoList.appendChild(li);
      });
      var remaining = todos.filter(function (t) { return !t.done; }).length;
      todoCount.textContent = remaining + ' tugas';
      todoEmpty.style.display = filtered.length ? 'none' : 'block';
      if (filter === 'done' && !filtered.length) todoEmpty.textContent = 'Belum ada tugas selesai. 💪';
      else if (filter === 'active' && !filtered.length) todoEmpty.textContent = 'Semua tugas selesai! 🎉';
      else todoEmpty.textContent = 'Belum ada tugas. Mulai tambahkan! ✨';
    };
    todoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = todoInput.value.trim(); if (!text) return;
      todos.unshift({ id: Date.now().toString(), text: text, done: false });
      todoInput.value = ''; saveTodos(); renderTodos();
    });
    todoList.addEventListener('click', function (e) {
      var li = e.target.closest('.todo-item'); if (!li) return;
      var id = li.dataset.id;
      if (e.target.closest('.todo-del')) {
        li.classList.add('removing');
        setTimeout(function () { todos = todos.filter(function (t) { return t.id !== id; }); saveTodos(); renderTodos(); }, 280);
      } else if (e.target.closest('.todo-check')) {
        var t = todos.find(function (t) { return t.id === id; });
        if (t) { t.done = !t.done; saveTodos(); renderTodos(); }
      }
    });
    todoFilters.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter'); if (!btn) return;
      todoFilters.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active'); filter = btn.dataset.filter; renderTodos();
    });
    renderTodos();
  }

  /* =========================================================
     KALKULATOR MODERN
     ========================================================= */
  var calcKeys = document.getElementById('calcKeys');
  if (calcKeys) {
    var curEl = document.getElementById('calcCurrent');
    var histEl = document.getElementById('calcHistory');
    var current = '0', previous = null, operator = null, resetNext = false;
    var opSymbol = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    var format = function (n) {
      if (n === '' || n === '-') return n;
      var num = parseFloat(n); if (isNaN(num)) return n;
      if (n.indexOf('.') !== -1) { var parts = n.split('.'); return Number(parts[0]).toLocaleString('en-US') + '.' + (parts[1] || ''); }
      return num.toLocaleString('en-US');
    };
    var updateScreen = function () {
      curEl.textContent = format(current);
      histEl.textContent = (previous !== null && operator) ? format(previous) + ' ' + opSymbol[operator] : '';
    };
    var inputNumber = function (n) {
      if (resetNext) { current = '0'; resetNext = false; }
      if (n === '.') { if (current.indexOf('.') !== -1) return; current += '.'; }
      else current = current === '0' ? n : current + n;
      updateScreen();
    };
    var highlightOp = function (op) { calcKeys.querySelectorAll('.key--op').forEach(function (k) { k.classList.toggle('is-active', k.dataset.op === op); }); };
    var compute = function () {
      if (operator === null || previous === null) return;
      var a = parseFloat(previous), b = parseFloat(current), res = 0;
      switch (operator) { case '+': res = a + b; break; case '-': res = a - b; break; case '*': res = a * b; break; case '/': res = b === 0 ? NaN : a / b; break; }
      if (isNaN(res)) current = 'Error';
      else { res = Math.round((res + Number.EPSILON) * 1e10) / 1e10; current = res.toString(); }
      operator = null; previous = null; resetNext = true; highlightOp(null);
    };
    var chooseOperator = function (op) {
      if (current === 'Error') return;
      if (operator && !resetNext) compute();
      previous = current; operator = op; resetNext = true; highlightOp(op); updateScreen();
    };
    var handleAction = function (action) {
      switch (action) {
        case 'clear': current = '0'; previous = null; operator = null; resetNext = false; highlightOp(null); break;
        case 'delete': if (current === 'Error') { current = '0'; break; } current = current.length > 1 ? current.slice(0, -1) : '0'; break;
        case 'percent': if (current === 'Error') break; current = (parseFloat(current) / 100).toString(); break;
        case 'equals': compute(); break;
      }
      updateScreen();
    };
    calcKeys.addEventListener('click', function (e) {
      var key = e.target.closest('.key'); if (!key) return;
      if (current === 'Error' && !key.dataset.action) current = '0';
      if (key.dataset.num !== undefined) inputNumber(key.dataset.num);
      else if (key.dataset.op !== undefined) chooseOperator(key.dataset.op);
      else if (key.dataset.action) handleAction(key.dataset.action);
    });
    window.addEventListener('keydown', function (e) {
      if (/[0-9]/.test(e.key)) inputNumber(e.key);
      else if (e.key === '.') inputNumber('.');
      else if (['+', '-', '*', '/'].indexOf(e.key) !== -1) chooseOperator(e.key);
      else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); handleAction('equals'); }
      else if (e.key === 'Backspace') handleAction('delete');
      else if (e.key === 'Escape') handleAction('clear');
      else if (e.key === '%') handleAction('percent');
    });
    updateScreen();
  }
})();


/* =========================================================
   v2 - PROJECT GALLERY (horizontal scroll) + CASE-STUDY MODAL
   (terinspirasi motionfolio; berdiri sendiri, di-guard penuh)
   ========================================================= */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Data proyek (studi kasus) ---------- */
  var PROJECTS = {
    xiaomimi: {
      title: 'Xiaomimi Matcha — Hybrid RAG Chatbot',
      category: 'Generative AI · Full-stack Web',
      year: '2026', glyph: '🍵', accent: '#8cc77a', previewScreenshot: true,
      img: 'img/portfolio-updates/xiaomimi.webp',
      tagline: 'A matcha storefront with a Gemini-powered customer assistant grounded in a PDF knowledge base.',
      overview: 'A full-stack React/Vite and Express/TypeScript website with a knowledge-grounded chatbot for matcha products and store information. The repository describes a PDF ingestion pipeline that produces 22 knowledge chunks, 768-dimensional embeddings stored in memory, cosine similarity plus lexical keyword boosting, and retrieval of the five strongest passages for Gemini. This is an in-memory hybrid RAG prototype rather than a persistent Qdrant deployment.',
      features: [
        'Separated React/Vite frontend components from the Express chatbot API.',
        'Parsed a store-specific PDF knowledge base and generated embeddings for hybrid retrieval.',
        'Ranked relevant passages using semantic cosine similarity and keyword-based boosting.',
        'Designed grounded responses, out-of-scope handling and server-side API credentials.'
      ],
      metrics: [{ v: '22', l: 'Knowledge chunks' }, { v: '768D', l: 'Embeddings' }, { v: 'Top 5', l: 'Retrieved passages' }, { v: 'Hybrid', l: 'Retrieval method' }],
      facts: [{ k: 'Type', v: 'Full-stack RAG prototype' }, { k: 'Vector store', v: 'In-memory' }, { k: 'Year', v: '2026' }],
      stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Gemini API', 'Hybrid RAG', 'PDF Parsing'],
      links: { repo: 'https://github.com/ArleneNero/Website-Matcha-berbasis-Chatbot-RAG', live: 'https://website-matcha-berbasis-chatbot-rag.vercel.app/' }
    },
    mental: {
      title: 'Hybrid Evidence Engine & Cascade XGBoost',
      category: 'Machine Learning · NLP Research',
      year: '2026', glyph: '🧠', accent: '#82c4ad', previewScreenshot: true,
      img: 'img/portfolio-updates/mental-health.webp',
      tagline: 'Award-winning NLP research for interpreting mental-health risk signals in public X posts.',
      overview: 'Collaborative research applying multilingual Sentence-BERT, weighted evidence features and two-stage Cascade XGBoost to 1,899 cleaned public X posts. On a locked hold-out set of 100 annotated examples, the model achieved 85.0% accuracy and 0.852 weighted F1 versus a 58.0% rule baseline. SHAP explanations and a Streamlit dashboard support review. Results are research decision-support signals, not clinical diagnoses, and high-risk outputs require human judgement.',
      features: [
        'Applied Sentence-BERT embeddings, sentiment and evidence-weighted NLP features.',
        'Compared two-stage Cascade XGBoost with a rule-based baseline.',
        'Interpreted predictions using SHAP and created monitoring dashboards in Streamlit.',
        'Documented evaluation limitations and the requirement for human review.'
      ],
      metrics: [{ v: '1,899', l: 'Posts analysed' }, { v: '85.0%', l: 'Hold-out accuracy' }, { v: '0.852', l: 'Weighted F1' }, { v: '1st', l: 'Innovation Award' }],
      facts: [{ k: 'Evaluation', v: '100 hold-out samples' }, { k: 'Recognition', v: 'PalComTech 2026' }, { k: 'Limit', v: 'Not a diagnosis' }],
      stack: ['Python', 'Sentence-BERT', 'XGBoost', 'scikit-learn', 'SHAP', 'Streamlit'],
      links: { repo: 'https://github.com/ArleneNero/dashboard-sistem-deteksi-mental-health', live: 'https://dashboard-mental-health.streamlit.app/' }
    },
    foresight: {
      title: 'ForeSight — Predictive Crowd Management',
      category: 'Predictive Analytics · Transportation',
      year: '2026', glyph: '🚇', accent: '#74a9ef', previewScreenshot: true,
      img: 'img/portfolio-updates/foresight-mrt.webp',
      tagline: 'Predictive station crowd-risk dashboard built for the Smart Move Challenge MRT Jakarta 2026.',
      overview: 'ForeSight combines XGBoost passenger-demand forecasting, time-related and operational features, weather and event signals in a prototype dashboard for 13 MRT stations. Forecasting horizons span 15 to 60 minutes. Out-of-time simulated-data evaluation reported sMAPE 14.16%; this result does not represent performance on live MRT production data. Features include station risk maps, historical replay and what-if operational mitigation scenarios. The team was selected as a Top 15 finalist.',
      features: [
        'Developed demand forecasting across 13 MRT stations using XGBoost.',
        'Evaluated chronological forecasts at 15, 30, 45 and 60 minutes.',
        'Mapped predicted crowd risk, replayed historical periods and simulated mitigations.',
        'Designed dashboards for event, weather and station-level operational intelligence.'
      ],
      metrics: [{ v: '13', l: 'MRT stations' }, { v: '15–60m', l: 'Forecast horizon' }, { v: '14.16%', l: 'sMAPE (simulated)' }, { v: 'Top 15', l: 'SMC finalist' }],
      facts: [{ k: 'Event', v: 'Smart Move Challenge' }, { k: 'Data', v: 'BPS-calibrated simulated' }, { k: 'Year', v: '2026' }],
      stack: ['Python', 'XGBoost', 'Pandas', 'Time-Series Forecasting', 'React', 'Dashboard'],
      links: { repo: 'https://github.com/ArleneNero/prototype_dashboard_mrt' }
    },
    buzzer: {
      title: 'Coordinated Buzzer Detection (IGRS)',
      category: 'Research · Machine Learning and Network Analyst',
      year: '2026',
      glyph: '🕵️',
      accent: '#c6f24e',
      img: 'img/portfolio-updates/buzzer.webp',
      tagline: 'Investigating possible coordinated accounts in the IGRS discussion on X with machine learning, semantic features and network analysis.',
      overview: 'Research investigating 1,264 cleaned posts from approximately 932 X accounts in the IGRS discussion. An XGBoost classifier combines semantic, lexical, temporal and interaction-network signals to identify potentially coordinated behaviour. Hold-out evaluation reported an F1 score of about 0.90 and AUC near 0.98; results indicate patterns, not proof of an account holder\'s intent.',
      features: [
        'Engineered eight semantic, lexical, temporal and graph-based coordination features.',
        'Compared XGBoost against heuristic baselines and interpreted model behaviour with SHAP.',
        'Explored coordinated interaction patterns with DBSCAN, LDA and network analysis.',
        'Built a four-tab Streamlit dashboard for validation, investigation, narratives and network findings.'
      ],
      metrics: [{ v: '1,264', l: 'Posts analysed' }, { v: '~932', l: 'Unique accounts' }, { v: '~0.90', l: 'Hold-out F1' }, { v: '~0.98', l: 'Hold-out AUC' }],
      facts: [{ k: 'Role', v: 'ML Researcher' }, { k: 'Institution', v: 'Universitas Budi Luhur' }, { k: 'Case Study', v: 'IGRS Steam Controversy' }],
      stack: ['Python', 'XGBoost', 'SHAP', 'SBERT', 'Gephi', 'Network Analysis'],
      slides: [
        'img/portfolio-updates/buzzer.webp',
        'img/buzzer/slide-1.png',
        'img/buzzer/slide-2.png',
        'img/buzzer/slide-3.png',
        'img/buzzer/slide-4.png',
        'img/buzzer/slide-5.png',
        'img/buzzer/slide-6.png',
        'img/buzzer/slide-7.png',
        'img/buzzer/slide-8.png',
        'img/buzzer/slide-9.png',
        'img/buzzer/slide-10.png',
        'img/buzzer/slide-11.png',
        'img/buzzer/slide-12.png',
        'img/buzzer/slide-13.png',
        'img/buzzer/slide-14.png',
        'img/buzzer/slide-15.png',
        'img/buzzer/slide-16.png',
        'img/buzzer/slide-17.png',
        'img/buzzer/slide-18.png'
      ],
      links: { repo: 'https://github.com/ArleneNero/deteksi-buzzer-terkoordinasi', dashboard: 'https://github.com/ArleneNero/dashboard-sistem-deteksi-buzzer-igrs' }
    },
    museum: {
      title: 'Nusantara Museum 3D',
      category: 'Project · Web 3D + AI',
      year: '2026',
      glyph: '🏛️',
      accent: '#9b6bff',
      img: 'img/museum.jpg',
      video: 'https://drive.google.com/file/d/1Yz5195NhR6RrNzu5cxKh3KMTSQcq8OVW/view?usp=drive_link',
      tagline: 'An interactive 3D virtual museum for Indonesian cultural heritage with a Gemini-powered AI Historian Chatbot.',
      overview: 'A web-based 3D museum experience with character exploration and several cultural exhibition zones. It features a Gemini-powered AI Historian Chatbot with cross-model fallback and prompt-injection protection, backed by a Node/Express backend and Docker deployment via Cloud Build.',
      features: [
        'Interactive 3D world (Three.js / React Three Fiber) with multiple zones.',
        'AI Historian Chatbot (Gemini API) as a virtual curator.',
        'Cross-model fallback & prompt-injection protection.',
        'Node/Express backend and Docker deployment (Cloud Build).'
      ],
      metrics: [{ v: '3D', l: 'Interactive web' }, { v: 'AI', l: 'Curator chatbot' }, { v: 'Zones', l: 'Exhibitions' }, { v: 'Docker', l: 'Deployment' }],
      facts: [{ k: 'Role', v: 'Fullstack · AI Integrator' }, { k: 'Category', v: 'Cultural Education Game' }, { k: 'Year', v: '2026' }],
      stack: ['React', 'Three.js', 'R3F', 'Node.js', 'Gemini API', 'Docker'],
      links: { video: 'https://drive.google.com/file/d/1Yz5195NhR6RrNzu5cxKh3KMTSQcq8OVW/view?usp=drive_link' }
    },
    retail: {
      title: 'Retail Crisis & Recovery',
      category: 'Top 100 · Data Visualization',
      year: '2026',
      glyph: '📈',
      accent: '#ff9b4e',
      img: 'img/retail.jpg',
      tagline: 'Retail sales-recovery analysis for the DQLab × UjiKompetensi Hackathon, reaching Top 100 Finalist (Rank #89 of 464 participants).',
      overview: 'A post-crisis retail sales time-series analysis. I used Moving Averages to smooth trends, a growth index to measure recovery acceleration, identified rising-star products, and applied Market Basket Analysis to uncover bundling and cross-selling opportunities.',
      features: [
        'Sales-trend smoothing with Moving Averages.',
        'Growth index to measure recovery acceleration.',
        'Rising-star product identification (+712% growth).',
        'Market Basket Analysis for bundling & cross-sell recommendations.'
      ],
      metrics: [{ v: '#89', l: 'of 464 participants' }, { v: 'Top 100', l: 'Finalist' }, { v: '+712%', l: 'rising-star growth' }, { v: 'MBA', l: 'Association rules' }],
      facts: [{ k: 'Role', v: 'Data Analyst' }, { k: 'Event', v: 'DQLab × UjiKompetensi' }, { k: 'Month', v: 'May 2026' }],
      stack: ['Python', 'Pandas', 'Matplotlib', 'Market Basket Analysis'],
      slides: ['img/slides/slide-1.jpg', 'img/slides/slide-2.jpg', 'img/slides/slide-3.jpg', 'img/slides/slide-4.jpg', 'img/slides/slide-5.jpg', 'img/slides/slide-6.jpg', 'img/slides/slide-7.jpg', 'img/slides/slide-8.jpg', 'img/slides/slide-9.jpg'],
      links: { pdf: 'Data_Portofolio/PPT-Hackathon.pdf', pdf_label: 'View Retail Analysis (PDF)' }
    },
    banjir: {
      title: 'Flood Disaster Extraction in Sumatra',
      category: '2026 · Rule-Based NLP',
      year: '2026',
      glyph: '🌊',
      accent: '#4eb8ff',
      img: 'img/banjir.jpg',
      tagline: 'A rule-based NLP pipeline extracting location, time, cause, and casualties of Sumatra flood disasters from Twitter/X.',
      overview: 'A project for the NLP Course Final Exam (UAS) at Universitas Budi Luhur. The pipeline extracts flood disaster details from Indonesian-language tweets across Sumatra. It processes data through four distinct stages (Scanner, Parser, Translator, Evaluator) using BIO-tagging and a geographic region gazetteer, achieving high precision for disaster response mapping.',
      features: [
        'Four-stage pipeline architecture: Scanner, Parser, Translator, and Evaluator.',
        'Named Entity Recognition (NER) utilizing BIO-tagging & a custom region gazetteer.',
        'Extraction of flood details: time, location, cause, and casualty counts.',
        'High-precision rule design to prevent speculative database inference.'
      ],
      metrics: [{ v: 'UAS NLP', l: 'Project Category' }, { v: '100%', l: 'Time Coverage' }, { v: '97%', l: 'Disaster Coverage' }, { v: '600', l: 'Tweets Processed' }],
      facts: [{ k: 'Role', v: 'NLP Engineer' }, { k: 'Institution', v: 'Universitas Budi Luhur' }, { k: 'Focus', v: 'Rule-Based Extraction' }],
      stack: ['Python', 'Regex', 'BIO Tagging/NER', 'Gazetteer'],
      links: { pdf: 'Data_Portofolio/Laporan Proyek UAS NLP (1).pdf', pdf_label: 'Read NLP Project Report (PDF)' }
    },
    sentimen: {
      title: 'Sentiment Analysis: Jokowi Fake Degree Controversy',
      category: 'ML Midterm · Sentiment Analysis',
      year: '2026',
      glyph: '💬',
      accent: '#ff6b81',
      img: 'img/sentimen.jpg',
      tagline: 'Public sentiment classification on the Jokowi fake degree controversy on Twitter/X using Naive Bayes and the KSI Lexicon.',
      overview: 'A research paper for the Machine Learning Midterm (UTS) at Universitas Budi Luhur. The project analyzes public sentiment on X regarding the "Jokowi Fake Degree" controversy. Analyzing 979 cleaned tweets, we performed entropy modeling (Shannon entropy: 2.628) and term frequency distribution, followed by classification comparing the 9,071-word Indonesian KSI Lexicon against a Naive Bayes classifier.',
      features: [
        'Preprocessed 1,000 crawled tweets into 979 clean data points.',
        'Entropy modeling (Shannon entropy: 2.628) and text distribution analysis.',
        'Identified dominant terms: "ijazah" (274), "jokowi" (237), and "palsu" (235).',
        'Manual annotation of 350 tweets for sentiment baseline training.',
        'Classification comparison using Naive Bayes vs the 9,071-word KSI Lexicon.'
      ],
      metrics: [{ v: '2.628', l: 'Shannon Entropy' }, { v: '979', l: 'Clean Tweets' }, { v: '9,071', l: 'KSI Lexicon Words' }, { v: '350', l: 'Manually Labeled' }],
      facts: [{ k: 'Role', v: 'Data Scientist' }, { k: 'Institution', v: 'Universitas Budi Luhur' }, { k: 'Course', v: 'Machine Learning Midterm' }],
      stack: ['Python', 'Naive Bayes', 'KSI Lexicon', 'Entropy Modeling', 'Text Mining'],
      links: { pdf: 'Data_Portofolio/Ijazah Palsu Jokowi.pdf', pdf_label: 'Read Sentiment Analysis Report (PDF)' }
    },
    pkm: {
      title: 'Hydro-Chain AI Protocol',
      category: 'PKM-GFT (Future-Oriented Written Idea) 2026',
      year: '2026',
      glyph: '💧',
      accent: '#4eb8ff',
      img: 'img/pkm.jpg',
      tagline: 'Group Leader | Passed internal campus selection at Universitas Budi Luhur.',
      overview: 'Led the group as team leader: initiated the core idea and concept, divided roles among members, and coordinated proposal development until passing internal selection. Designed the Hydro-Chain AI Protocol concept to address the invisible water footprint of AI data centers by integrating IoT sensors, blockchain (tokenizing "Digital Water Credits"), and AI; formulated a three-layer architecture, a 5-year timeline, and policy recommendations based on an international literature review.',
      features: [
        'Initiated the core concept and distributed tasks among team members.',
        'Coordinated proposal development to pass the internal campus selection.',
        'Designed a three-layer architecture integrating IoT, blockchain, and AI.',
        'Developed a 5-year implementation roadmap and policy recommendations based on literature.'
      ],
      metrics: [{ v: 'Lead', l: 'Group' }, { v: 'Passed', l: 'Internal Selection' }, { v: '3-Layer', l: 'Architecture' }, { v: '5-Year', l: 'Roadmap' }],
      facts: [{ k: 'Role', v: 'Group Leader' }, { k: 'Institution', v: 'Universitas Budi Luhur' }, { k: 'Status', v: 'Passed Campus Selection' }],
      stack: ['IoT', 'Blockchain', 'Artificial Intelligence', 'Literature Review'],
      slides: ['img/pkm/pkm-01.jpg', 'img/pkm/pkm-02.jpg', 'img/pkm/pkm-03.jpg', 'img/pkm/pkm-04.jpg', 'img/pkm/pkm-05.jpg', 'img/pkm/pkm-06.jpg', 'img/pkm/pkm-07.jpg', 'img/pkm/pkm-08.jpg', 'img/pkm/pkm-09.jpg', 'img/pkm/pkm-10.jpg', 'img/pkm/pkm-11.jpg', 'img/pkm/pkm-12.jpg', 'img/pkm/pkm-13.jpg', 'img/pkm/pkm-14.jpg'],
      links: { pdf: 'Data_Portofolio/PKM-GFT_2026.pdf' }
    },
    umkm: {
      title: 'Warkop UMKM Digitalization',
      category: 'Aplikasi Wawasan Budi Luhur Project 2025',
      year: '2025',
      glyph: '☕',
      accent: '#c6f24e',
      img: 'img/umkm.jpg',
      tagline: 'Team Leader | Community service project for UMKM digital transformation.',
      overview: 'Led the team as leader: distributed tasks, coordinated members, and ensured digital solutions were completed in line with the UMKM\'s needs & budget. Built a business website profile for a local coffee shop (Google Sites) with table-side QR codes for quick customer access to the menu and business info. Registered and optimized the business profile on Google Maps (Business Profile) to improve visibility and reach more customers.',
      features: [
        'Led the team: assigned tasks, coordinated members, and delivered on-budget solutions.',
        'Built a Google Sites business profile integrated with table-side QR codes.',
        'Registered and optimized the shop\'s profile on Google Maps (Business Profile).'
      ],
      metrics: [{ v: 'Lead', l: 'Team' }, { v: 'Web', l: 'Google Sites' }, { v: 'Maps', l: 'Google Maps' }, { v: 'QR', l: 'Menu Access' }],
      facts: [{ k: 'Role', v: 'Team Leader' }, { k: 'Course', v: 'Aplikasi Wawasan Budi Luhur' }, { k: 'Year', v: '2025' }],
      stack: ['Google Sites', 'QR Code', 'Google Maps', 'Local SEO'],
      video: 'https://drive.google.com/file/d/1xkQ6zLQMVEwJKD39G8sV3dGT_Ud91NPx/view?usp=drive_link',
      links: { video: 'https://drive.google.com/file/d/1xkQ6zLQMVEwJKD39G8sV3dGT_Ud91NPx/view?usp=drive_link' }
    }
  };

  /* ---------- Galeri: scroll horizontal + progress ---------- */
  var viewport = document.getElementById('galleryViewport');
  var bar = document.getElementById('galleryBar');
  if (viewport) {
    var updateBar = function () {
      if (!bar) return;
      var max = viewport.scrollWidth - viewport.clientWidth;
      var pct = max > 0 ? (viewport.scrollLeft / max) * 100 : 0;
      bar.style.width = Math.max(12, Math.min(100, pct || 12)) + '%';
    };
    updateBar();
    viewport.addEventListener('scroll', updateBar, { passive: true });
    window.addEventListener('resize', updateBar);

    // Wheel vertikal → horizontal saat hover galeri (desktop)
    viewport.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      var max = viewport.scrollWidth - viewport.clientWidth;
      if (max <= 0) return;
      var atStart = viewport.scrollLeft <= 0;
      var atEnd = viewport.scrollLeft >= max - 1;
      // hanya ambil alih bila masih bisa scroll horizontal ke arah itu
      if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
        e.preventDefault();
        viewport.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    // Drag untuk menggeser (desktop & touch)
    var down = false, startX = 0, startScroll = 0, moved = 0;
    viewport.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return; // biarkan native untuk sentuh
      down = true; moved = 0; startX = e.clientX; startScroll = viewport.scrollLeft;
      viewport.classList.add('is-grabbing');
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX; moved += Math.abs(dx);
      viewport.scrollLeft = startScroll - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false; viewport.classList.remove('is-grabbing');
    });
  }

  /* ---------- Modal studi kasus ---------- */
  var modal = document.getElementById('pmodal');
  if (modal) {
    var $ = function (id) { return document.getElementById(id); };
    var elTitle = $('pmTitle'), elCat = $('pmCat'), elYear = $('pmYear'),
      elTag = $('pmTagline'), elLinks = $('pmLinks'), elGlyph = $('pmGlyph'),
      elCover = $('pmCover'), elCoverImg = $('pmCoverImg'), elCoverVideo = $('pmCoverVideo'), elCoverIframe = $('pmCoverIframe'), elCoverGlyph = $('pmCoverGlyph'), elOverview = $('pmOverview'), elFeatures = $('pmFeatures'),
      elMetrics = $('pmMetrics'), elFacts = $('pmFacts'), elStack = $('pmStack'),
      elScroll = $('pmScroll'),
      elSlides = $('pmSlides'), elSlidesTrack = $('pmSlidesTrack'), elSlidesCount = $('pmSlidesCount');
    var lastFocus = null;

    var titleHTML = function (t) {
      var w = t.split(' ');
      if (w.length < 2) return t;
      var last = w.pop();
      return w.join(' ') + ' <span class="stroke">' + last + '</span>';
    };

    var fill = function (p) {
      elTitle.innerHTML = titleHTML(p.title);
      elCat.textContent = p.category;
      elYear.textContent = p.year;
      elTag.textContent = p.tagline;
      if (elGlyph) elGlyph.textContent = p.glyph;

      // Reset video
      if (elCoverVideo) {
        elCoverVideo.removeAttribute('src');
        elCoverVideo.style.display = 'none';
        elCoverVideo.pause();
      }
      if (elCover) elCover.classList.remove('has-video');

      // Reset iframe
      if (elCoverIframe) {
        elCoverIframe.src = 'about:blank';
        elCoverIframe.style.display = 'none';
      }
      if (elCover) elCover.classList.remove('has-iframe');
      if (elCover) elCover.classList.toggle('has-screenshot', !!p.previewScreenshot);

      var isDirectVideo = p.video && !p.video.includes('drive.google.com') && !p.video.includes('docs.google.com') && !p.video.includes('youtube.com') && !p.video.includes('youtu.be');
      var isDriveVideo = p.video && (p.video.includes('drive.google.com') || p.video.includes('docs.google.com'));
      if (isDirectVideo) {
        if (elCoverVideo) {
          elCoverVideo.src = p.video;
          elCoverVideo.style.display = 'block';
          elCoverVideo.muted = true;
          elCoverVideo.loop = true;
          elCoverVideo.load();
          elCoverVideo.play().catch(function (e) { console.log("Autoplay prevented:", e); });
        }
        if (elCoverImg) { elCoverImg.removeAttribute('src'); elCoverImg.style.display = 'none'; }
        if (elCover) {
          elCover.classList.remove('no-img');
          elCover.classList.add('has-video');
        }
      } else if (isDriveVideo) {
        var embedUrl = p.video;
        if (embedUrl.includes('/view')) {
          embedUrl = embedUrl.split('/view')[0] + '/preview';
        }
        if (elCoverIframe) {
          elCoverIframe.src = embedUrl;
          elCoverIframe.style.display = 'block';
        }
        if (elCoverImg) { elCoverImg.removeAttribute('src'); elCoverImg.style.display = 'none'; }
        if (elCover) {
          elCover.classList.remove('no-img');
          elCover.classList.add('has-iframe');
        }
      } else if (p.slides && p.slides.length) {
        if (elCoverImg) { elCoverImg.removeAttribute('src'); elCoverImg.style.display = 'none'; }
      } else if (p.links && p.links.pdf) {
        if (elCoverIframe) {
          elCoverIframe.src = p.links.pdf + '#toolbar=0&navpanes=0';
          elCoverIframe.style.display = 'block';
        }
        if (elCoverImg) { elCoverImg.removeAttribute('src'); elCoverImg.style.display = 'none'; }
        if (elCover) {
          elCover.classList.remove('no-img');
          elCover.classList.add('has-iframe');
        }
      } else if (p.img) {
        if (elCoverImg) { elCoverImg.src = p.img; elCoverImg.style.display = ''; }
        if (elCover) elCover.classList.remove('no-img');
      } else {
        if (elCoverImg) { elCoverImg.removeAttribute('src'); elCoverImg.style.display = 'none'; }
        if (elCover) elCover.classList.add('no-img');
      }
      if (elCoverGlyph) elCoverGlyph.textContent = p.glyph || '';
      elCover.style.setProperty('--accent', p.accent);
      elOverview.textContent = p.overview;
      elFeatures.innerHTML = p.features.map(function (f) { return '<li>' + f + '</li>'; }).join('');
      elMetrics.innerHTML = p.metrics.map(function (m) { return '<div class="m"><b>' + m.v + '</b><span>' + m.l + '</span></div>'; }).join('');
      elFacts.innerHTML = p.facts.map(function (f) { return '<div class="f"><span>' + f.k + '</span><b>' + f.v + '</b></div>'; }).join('');
      elStack.innerHTML = p.stack.map(function (s) { return '<span>' + s + '</span>'; }).join('');
      if (elSlides) {
        if (p.slides && p.slides.length) {
          elSlidesTrack.innerHTML = p.slides.map(function (s, i) { return '<figure class="pmslide"><img loading="lazy" src="' + s + '" alt="Slide ' + (i + 1) + '" /></figure>'; }).join('');
          if (elSlidesCount) elSlidesCount.textContent = '01 / ' + (p.slides.length < 10 ? '0' : '') + p.slides.length;
          elSlides.hidden = false;
          if (elCover) elCover.classList.add('has-slides');
          elSlidesTrack.scrollLeft = 0;
        } else {
          elSlides.hidden = true;
          if (elCover) elCover.classList.remove('has-slides');
          elSlidesTrack.innerHTML = '';
        }
      }
      var links = '';
      if (p.links && p.links.live) links += '<a class="primary" href="' + p.links.live + '" target="_blank" rel="noopener noreferrer">🌐 Live Demo</a>';
      if (p.links && p.links.pdf) {
        var label = p.links.pdf_label || 'Read Proposal (PDF)';
        links += '<a class="primary" href="' + p.links.pdf + '" target="_blank" rel="noopener">📄 ' + label + '</a>';
      }
      if (p.links && p.links.chart) links += '<a class="primary" href="' + p.links.chart + '" target="_blank" rel="noopener">📊 View Analysis Result</a>';
      if (p.links && p.links.video) links += '<a class="primary" href="' + p.links.video + '" target="_blank" rel="noopener">🎬 Watch Demo Video</a>';
      if (p.links && p.links.repo) links += '<a class="ghost" href="' + p.links.repo + '" target="_blank" rel="noopener noreferrer">⎙ Source Code</a>';
      if (p.links && p.links.dashboard) links += '<a class="ghost" href="' + p.links.dashboard + '" target="_blank" rel="noopener noreferrer">▣ Dashboard Code</a>';
      if (p.links && p.links.slides) {
        var label = p.links.slides_label || 'Download PPT';
        links += '<a class="ghost" href="' + p.links.slides + '" target="_blank" rel="noopener">📑 ' + label + '</a>';
      }
      elLinks.innerHTML = links;
      elLinks.style.display = links ? '' : 'none';
      modal.querySelector('.pmodal__panel').style.setProperty('--accent', p.accent);
    };

    var open = function (key, trigger) {
      var p = PROJECTS[key]; if (!p) return;
      lastFocus = trigger || null;
      fill(p);
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      if (elScroll) elScroll.scrollTop = 0;
      var closeBtn = modal.querySelector('.pmodal__close');
      if (closeBtn) closeBtn.focus();
    };
    var close = function () {
      if (elCoverVideo) {
        elCoverVideo.pause();
      }
      if (elCoverIframe) {
        elCoverIframe.src = 'about:blank';
      }
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    // Buka dari kartu galeri + kartu award
    document.querySelectorAll('[data-project]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('a')) return;
        open(el.getAttribute('data-project'), el);
      });
      el.addEventListener('keydown', function (e) {
        if (e.target.closest && e.target.closest('a')) return;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el.getAttribute('data-project'), el); }
      });
    });
    // Tutup
    modal.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', close); });
    // Navigasi slide PPT
    var slPrev = $('pmSlidesPrev'), slNext = $('pmSlidesNext'), slTrack = $('pmSlidesTrack'), slCount = $('pmSlidesCount');
    var slStep = function (dir) {
      if (!slTrack) return;
      var fig = slTrack.querySelector('.pmslide');
      var w = slTrack.clientWidth;
      slTrack.scrollBy({ left: dir * w, behavior: 'smooth' });
    };
    if (slPrev) slPrev.addEventListener('click', function () { slStep(-1); });
    if (slNext) slNext.addEventListener('click', function () { slStep(1); });
    if (slTrack) slTrack.addEventListener('scroll', function () {
      var fig = slTrack.querySelector('.pmslide'); if (!fig || !slCount) return;
      var w = slTrack.clientWidth || 1;
      var total = slTrack.querySelectorAll('.pmslide').length;
      var idx = Math.round(slTrack.scrollLeft / w) + 1;
      if (idx < 1) idx = 1; if (idx > total) idx = total;
      slCount.textContent = (idx < 10 ? '0' : '') + idx + ' / ' + (total < 10 ? '0' : '') + total;
    });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
  }
})();

/* ===== Skill cards: dynamic interactive network graph & telemetry canvas ===== */
(function () {
  const cards = document.querySelectorAll('.skill-card');
  if (!cards.length) return;

  // Telemetry logs specific to each category to make it highly informative and fun!
  const telemetryData = {
    'data analysis': {
      title: 'DATA_ANALYSIS_SCANNER v2.10',
      lines: [
        'STATUS: DIAGNOSTIC_OK',
        'PIPELINE: INGEST -> CLEAN -> VISUAL',
        'METRIC: R2_SCORE = 0.942',
        'ENGINE: Pandas & NumPy active',
        'QUERY: SELECT * FROM insights'
      ]
    },
    'machine learning': {
      title: 'ML_MODEL_EVALUATOR v3.04',
      lines: [
        'STATUS: COMPILATION_SUCCESS',
        'ALGORITHMS: XGBoost, DBSCAN, NB',
        'CROSS_VAL: 5-FOLD (ACC: 96.8%)',
        'EXPLAINABILITY: SHAP values loaded',
        'LOSS: categorical_crossentropy: 0.021'
      ]
    },
    'nlp': {
      title: 'NLP_SEMANTIC_PARSER v1.02',
      lines: [
        'STATUS: SYSTEM_READY',
        'MODEL: SBERT / SentenceEmbeddings',
        'TOKENIZER: Indonesian-vocab (128k)',
        'PIPELINES: TF-IDF -> NER -> Semantic',
        'SENTIMENT: rule_based + embeddings'
      ]
    },
    'programming & tools': {
      title: 'DEV_ENVIRONMENT_DIAG v4.11',
      lines: [
        'STATUS: RUNNING',
        'WORKSPACE: Git/GitHub repo verified',
        'CONTAINER: Docker engine active',
        'DASHBOARD: Streamlit dashboard live',
        'SNA: Gephi network engine loaded'
      ]
    }
  };

  cards.forEach(card => {
    // 1. Create canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'skill-card__canvas';
    card.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let width = 0;
    let height = 0;
    let scanY = 0;
    let scanDirection = 1;
    let activeChipName = null;
    let packets = [];
    let lastPacketTime = 0;

    // Retrieve accent color
    let accentColor = getComputedStyle(card).getPropertyValue('--accent').trim() || '#c6f24e';
    let cardTitle = card.querySelector('h3').textContent.trim();
    let tele = telemetryData[cardTitle.toLowerCase()] || {
      title: 'SYSTEM_DIAGNOSTICS v1.00',
      lines: ['STATUS: ACTIVE', 'CHANNELS: READY']
    };

    function hexToRgba(hex, alpha) {
      hex = hex.replace('#', '');
      if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
      }
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function resize() {
      const rect = card.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    }

    // Dynamic coordinates matching DOM elements
    function getElementCoords() {
      const cardRect = card.getBoundingClientRect();

      // Icon
      const icon = card.querySelector('.skill-card__icon');
      let iconX = 58 / 2 + 30; // fallbacks matching CSS padding
      let iconY = 58 / 2 + 30;
      if (icon) {
        const r = icon.getBoundingClientRect();
        iconX = r.left - cardRect.left + r.width / 2;
        iconY = r.top - cardRect.top + r.height / 2;
      }

      // Chips
      const chips = card.querySelectorAll('.chips span');
      const targets = [];
      chips.forEach(chip => {
        const r = chip.getBoundingClientRect();
        targets.push({
          el: chip,
          name: chip.textContent.trim(),
          x: r.left - cardRect.left + r.width / 2,
          y: r.top - cardRect.top + r.height / 2,
          w: r.width,
          h: r.height
        });
      });

      return { icon: { x: iconX, y: iconY }, targets };
    }

    function animate(time) {
      ctx.clearRect(0, 0, width, height);
      const coords = getElementCoords();

      // 1. Draw Grid Background Matrix
      ctx.strokeStyle = hexToRgba(accentColor, 0.035);
      ctx.lineWidth = 0.5;
      const gridSize = 14;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Scanner Line Sweep
      scanY += 0.8 * scanDirection;
      if (scanY > height) { scanY = height; scanDirection = -1; }
      else if (scanY < 0) { scanY = 0; scanDirection = 1; }

      let grad = ctx.createLinearGradient(0, scanY - 15 * scanDirection, 0, scanY);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, hexToRgba(accentColor, 0.12));
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanDirection > 0 ? scanY - 30 : scanY, width, 30);

      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.strokeStyle = hexToRgba(accentColor, 0.28);
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Draw circuit connections from Icon to Chips
      coords.targets.forEach(t => {
        const isHovered = activeChipName && activeChipName.toLowerCase() === t.name.toLowerCase();

        ctx.beginPath();
        ctx.moveTo(coords.icon.x, coords.icon.y);
        // Brutalist 90-degree circuit route
        ctx.lineTo(t.x, coords.icon.y);
        ctx.lineTo(t.x, t.y);

        ctx.strokeStyle = isHovered ? hexToRgba(accentColor, 0.4) : hexToRgba(accentColor, 0.08);
        ctx.lineWidth = isHovered ? 1.6 : 0.8;
        ctx.stroke();

        // If chip is hovered, draw a small glowing outline around it on the canvas
        if (isHovered) {
          ctx.beginPath();
          ctx.roundRect(t.x - t.w / 2 - 2, t.y - t.h / 2 - 2, t.w + 4, t.h + 4, 99);
          ctx.strokeStyle = hexToRgba(accentColor, 0.35);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // 4. Generate & Animate Data Packets
      if (time - lastPacketTime > 600) {
        lastPacketTime = time;
        // Spawn one packet for each chip target
        coords.targets.forEach(t => {
          packets.push({
            x: coords.icon.x,
            y: coords.icon.y,
            target: t,
            progress: 0,
            speed: 0.02 + Math.random() * 0.015
          });
        });
      }

      packets.forEach((p, index) => {
        p.progress += p.speed;

        // Circuit 90-degree position calculation
        let curX, curY;
        if (p.progress < 0.5) {
          // Travel horizontally
          const subProgress = p.progress / 0.5;
          curX = p.x + (p.target.x - p.x) * subProgress;
          curY = p.y;
        } else {
          // Travel vertically
          const subProgress = (p.progress - 0.5) / 0.5;
          curX = p.target.x;
          curY = p.y + (p.target.y - p.y) * subProgress;
        }

        ctx.beginPath();
        ctx.arc(curX, curY, 2, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.fill();

        // Subtle glow around packet
        ctx.beginPath();
        ctx.arc(curX, curY, 4, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(accentColor, 0.3);
        ctx.fill();

        if (p.progress >= 1.0) {
          packets.splice(index, 1);
        }
      });

      // 5. Render High-Tech Telemetry Diagnostics Overlay
      ctx.font = '8.5px monospace';
      ctx.fillStyle = hexToRgba(accentColor, 0.5);
      ctx.textAlign = 'left';

      // Draw title block
      ctx.fillText(`[ ${tele.title} ]`, 22, height - 110);

      // Print telemetry text lines
      tele.lines.forEach((line, idx) => {
        ctx.fillText(line, 22, height - 94 + idx * 11);
      });

      // Show real-time interaction feedback
      if (activeChipName) {
        ctx.fillStyle = accentColor;
        ctx.fillText(`> QUERY: ${activeChipName.toUpperCase()} -> [OK_READY]`, 22, height - 28);
      } else {
        ctx.fillStyle = hexToRgba(accentColor, 0.28);
        ctx.fillText(`> CONSOLE_STREAM: IDLE_STANDBY`, 22, height - 28);
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    // Setup hover listeners
    card.addEventListener('pointerenter', () => {
      resize();
      packets = [];
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(animate);
    });

    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, width, height);
      activeChipName = null;
    });

    // Sub-chips listeners
    const chipsSpans = card.querySelectorAll('.chips span');
    chipsSpans.forEach(span => {
      span.addEventListener('pointerenter', (e) => {
        activeChipName = span.textContent.trim();
      });
      span.addEventListener('pointerleave', () => {
        activeChipName = null;
      });
    });

    // Resize on window changes
    window.addEventListener('resize', () => {
      if (card.matches(':hover')) {
        resize();
      }
    });
  });
})();

/* ===== Skills & Project Intelligence Hub ===== */
(function () {
  'use strict';

  // Skill Mapping Database
  const SKILL_MAP = {
    'Pandas': {
      prof: 'Expert | Data Science',
      project: 'retail',
      projTitle: 'Retail Crisis & Recovery',
      desc: 'Cleaned and structured sales time-series datasets of 400+ participants, handled post-crisis anomalies, calculated moving average trends, and formatted inputs for Market Basket Analysis.',
      metrics: 'Top 100 Hackathon Finalist (Rank #89/464)'
    },
    'NumPy': {
      prof: 'Advanced | Numerical Computing',
      project: 'sentimen',
      projTitle: 'Jokowi Fake Degree Sentiment',
      desc: 'Managed matrix data structures of term frequency frequencies and statistical distributions for Naive Bayes baseline classifier calculations.',
      metrics: '979 Cleaned Tweets Processed'
    },
    'Matplotlib': {
      prof: 'Advanced | Data Visualization',
      project: 'retail',
      projTitle: 'Retail Crisis & Recovery',
      desc: 'Generated visual sales trends, moving average trend plots, and frequency distribution charts for the Hackathon case study presentation.',
      metrics: '4 Production Presentation Charts'
    },
    'SQL': {
      prof: 'Advanced | Database Querying',
      project: 'retail',
      projTitle: 'Retail Crisis & Recovery',
      desc: 'Queried transactional sales databases, performed aggregations, and joined product catalogs to identify post-crisis retail recovery trends.',
      metrics: 'Processed 10,000+ transaction rows'
    },
    'scikit-learn': {
      prof: 'Advanced | Predictive Modeling',
      project: 'sentimen',
      projTitle: 'Jokowi Fake Degree Sentiment',
      desc: 'Employed to model Naive Bayes classification pipelines, calculate validation metrics, and evaluate performance bounds.',
      metrics: 'Statistical model evaluation'
    },
    'XGBoost': {
      prof: 'Expert | Ensemble Learning',
      project: 'buzzer',
      projTitle: 'Coordinated Buzzer Detection (IGRS)',
      desc: 'Trained a high-performance gradient boosting classifier using semantic duplication scores and network interaction features to detect coordinated bot behavior.',
      metrics: '93.1% Avg Accuracy / 97.6% AUC'
    },
    'Naive Bayes': {
      prof: 'Advanced | Statistical Classification',
      project: 'sentimen',
      projTitle: 'Jokowi Fake Degree Sentiment',
      desc: 'Built a statistical Naive Bayes model to categorize public sentiment regarding political controversies on social media.',
      metrics: 'Shannon Entropy 2.628 Baseline'
    },
    'SHAP': {
      prof: 'Advanced | Model Interpretability',
      project: 'buzzer',
      projTitle: 'Coordinated Buzzer Detection (IGRS)',
      desc: 'Calculated Shapley additive explanations (SHAP values) to audit classification decisions, demonstrating that semantic duplication was the primary feature.',
      metrics: 'Explainable AI Feature Importance'
    },
    'SBERT': {
      prof: 'Expert | Semantic Embeddings',
      project: 'buzzer',
      projTitle: 'Coordinated Buzzer Detection (IGRS)',
      desc: 'Extracted semantic vectors from tweet bodies using Sentence-BERT to compute pairwise cosine similarities, highlighting automated content duplication.',
      metrics: 'Cosine Similarity Semantic Vectors'
    },
    'TF-IDF': {
      prof: 'Advanced | Vectorization',
      project: 'sentimen',
      projTitle: 'Jokowi Fake Degree Sentiment',
      desc: 'Transformed unstructured tweet data into mathematical term-frequency vectors to compare lexicons against classifiers.',
      metrics: '9,071 Words Lexicon Mapping'
    },
    'NER': {
      prof: 'Advanced | Named Entity Recognition',
      project: 'banjir',
      projTitle: 'Sumatra Flood Disaster Extraction',
      desc: 'Engineered BIO-tagging patterns and a geographic gazetteer dictionary to identify location and casualty details from Sumatra tweet corpora.',
      metrics: 'Indonesian Sequence Tagging Pipeline'
    },
    'Rule-based NLP': {
      prof: 'Expert | Natural Language Processing',
      project: 'banjir',
      projTitle: 'Sumatra Flood Disaster Extraction',
      desc: 'Engineered a highly precise 4-stage pipeline (Scanner, Parser, Translator, Evaluator) to query Twitter logs and map flood events.',
      metrics: '97% Disaster Event Detection'
    },
    'Python': {
      prof: 'Expert | Core Development',
      project: 'buzzer',
      projTitle: 'Cross-Project Implementation',
      desc: 'The foundational language for all data acquisition, parsing, training scripts, feature engineering, and model deployments.',
      metrics: 'Used across 5 Core Projects'
    },
    'Three.js': {
      prof: 'Advanced | Web 3D Graphics',
      project: 'museum',
      projTitle: 'Nusantara Museum 3D',
      desc: 'Designed an interactive virtual 3D museum world with collision bounds, lighting zones, and cultural showcase zones.',
      metrics: '3D Web Scene Engine'
    },
    'Node.js': {
      prof: 'Advanced | Backend API Integration',
      project: 'museum',
      projTitle: 'Nusantara Museum 3D',
      desc: 'Structured backend Express routers to query the Gemini API curator chatbot, integrating guardrails and prompt validations.',
      metrics: 'Secure API Middleware'
    },
    'Docker': {
      prof: 'Advanced | DevOps Containerization',
      project: 'museum',
      projTitle: 'Nusantara Museum 3D',
      desc: 'Packaged microservices into Docker containers for reliable builds and server deployments via Google Cloud Build.',
      metrics: 'Containerized Deployment Flow'
    },
    'Gephi': {
      prof: 'Expert | Graph Visualization',
      project: 'buzzer',
      projTitle: 'Coordinated Buzzer Detection (IGRS)',
      desc: 'Imported interaction networks to compute in-degree distributions and modularity classes to graph broadcast social clusters.',
      metrics: 'Social Network Analysis (SNA)'
    },
    'Streamlit': {
      prof: 'Advanced | Interactive Dashboards',
      project: 'buzzer',
      projTitle: 'IGRS Dashboard App',
      desc: 'Developed a local Streamlit web dashboard to showcase spatial plots, text distribution summaries, and model prediction metrics.',
      metrics: 'Rapid ML App Prototyping'
    },
    'Team Leadership': {
      prof: 'Lead | Team Management',
      project: 'umkm',
      projTitle: 'UMKM & Research Teams',
      desc: 'Led multi-disciplinary student teams for PKM research and UMKM digitalization, managing milestones, schedules, and deliverables.',
      metrics: '2 Mapped Leadership Roles'
    },
    'Project Management': {
      prof: 'Agile Coordinator',
      project: 'pkm',
      projTitle: 'Hydro-Chain AI Protocol',
      desc: 'Managed development sprints, research documentation, and internal reviews to pass competitive academic selections.',
      metrics: 'Passed internal selection process'
    },
    'Technical Writing': {
      prof: 'Academic & Proposals',
      project: 'pkm',
      projTitle: 'Hydro-Chain AI Protocol',
      desc: 'Authored the formal PKM-GFT research proposal outlining the technical blueprint of blockchain, IoT, and AI integration for data center water footprint reduction.',
      metrics: 'Passed competitive internal selection'
    },
    'Community Engagement': {
      prof: 'Social Impact',
      project: 'umkm',
      projTitle: 'Warkop UMKM Digitalization',
      desc: 'Coordinated directly with local UMKM owners to map operations, digitize physical menus, set up tables QR codes, and boost local search visibility.',
      metrics: 'Aplikasi Wawasan Budi Luhur 2025'
    },
    'Gemini API': {
      prof: 'Advanced | LLM Integration',
      project: 'museum',
      projTitle: 'Nusantara Museum 3D',
      desc: 'Integrated Google Gemini API to power the interactive 3D museum virtual curator chatbot, designing custom system prompts and response guardrails.',
      metrics: 'AI-driven Virtual Curator backend'
    }
  };

  const canvas = document.getElementById('intelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const triggers = document.querySelectorAll('.skill-trigger');
  const statusEl = document.getElementById('intelStatus');
  const terminalBody = document.getElementById('intelTerminalBody');
  let width = 0, height = 0, dpr = 1;
  let activeSkill = null;
  let activeProject = null;
  let activeCategory = null;
  let animFrameId = null;

  // Radar Chart Values & Target States for Lerping
  let currentValues = [0.90, 0.85, 0.80, 0.85];
  let targetValues = [0.90, 0.85, 0.80, 0.85];

  const axes = [
    { label: 'DATA', angle: -Math.PI / 2, color: '#c6f24e' },
    { label: 'MACHINE LEARNING', angle: 0, color: '#9b6bff' },
    { label: 'LEADERSHIP', angle: Math.PI / 2, color: '#ff6b81' },
    { label: 'PROGRAMMING', angle: Math.PI, color: '#4eb8ff' }
  ];

  // Helper to map skill name to axis index
  function getSkillAxis(skillName) {
    const dataSkills = ['Pandas', 'NumPy', 'Matplotlib', 'SQL', 'Gephi', 'TF-IDF', 'NER', 'Rule-based NLP'];
    const mlSkills = ['scikit-learn', 'XGBoost', 'Naive Bayes', 'SHAP', 'SBERT'];
    const leadSkills = ['Team Leadership', 'Project Management', 'Technical Writing', 'Community Engagement'];

    if (dataSkills.includes(skillName)) return 0;
    if (mlSkills.includes(skillName)) return 1;
    if (leadSkills.includes(skillName)) return 2;
    return 3;
  }

  // Helper to get skill proficiency value as a float
  function getSkillValue(skillName) {
    const valMap = {
      'Pandas': 0.90, 'NumPy': 0.85, 'Matplotlib': 0.80, 'SQL': 0.85,
      'scikit-learn': 0.85, 'XGBoost': 0.93, 'Naive Bayes': 0.80, 'SHAP': 0.80,
      'SBERT': 0.85, 'TF-IDF': 0.80, 'NER': 0.85, 'Rule-based NLP': 0.90,
      'Python': 0.95, 'Three.js': 0.75, 'Node.js': 0.80, 'Docker': 0.75,
      'Gephi': 0.80, 'Streamlit': 0.85,
      'Team Leadership': 0.90, 'Project Management': 0.88,
      'Technical Writing': 0.85, 'Community Engagement': 0.85,
      'Gemini API': 0.88
    };
    return valMap[skillName] || 0.85;
  }

  function resize() {
    const parent = canvas.parentElement;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.width = parent.clientWidth * dpr;
    height = canvas.height = parent.clientHeight * dpr;
    canvas.style.width = parent.clientWidth + 'px';
    canvas.style.height = parent.clientHeight + 'px';
  }

  window.addEventListener('resize', resize);
  setTimeout(resize, 100);

  // Category statistics data map
  const CATEGORY_MAP = {
    'data': {
      title: 'Data Analysis & Processing',
      axisIndex: 0,
      skills: 'Pandas, NumPy, Matplotlib, SQL, Gephi, TF-IDF, NER, Rule-based NLP',
      projects: 'Retail Crisis & Recovery, Sumatra Flood NLP, Jokowi Sentiment Analysis',
      metrics: 'Avg Proficiency: 86% | 3 Case Studies Mapped',
      desc: 'Wrangling, modeling, and analyzing structured and unstructured datasets. Specializing in time-series sales forecasting, social network modeling (SNA), named entity recognition, and pattern extraction.'
    },
    'machine-learning': {
      title: 'Machine Learning & Predictive Modeling',
      axisIndex: 1,
      skills: 'scikit-learn, XGBoost, Naive Bayes, SHAP, SBERT',
      projects: 'Coordinated Buzzer Detection (IGRS), Jokowi Fake Degree Sentiment',
      metrics: 'Avg Proficiency: 85% | Peak Accuracy: 93.1%',
      desc: 'Designing and deploying statistical and ensemble classifiers. Specializing in tabular feature engineering, explainable AI attribution (SHAP), model validation, and sentiment classifier benchmarks.'
    },
    'lead': {
      title: 'Leadership & Collaboration',
      axisIndex: 2,
      skills: 'Team Leadership, Project Management, Technical Writing, Community Engagement',
      projects: 'Hydro-Chain AI Protocol (PKM-GFT), Warkop UMKM Digitalization',
      metrics: '2 Mapped Leadership Roles | Passed Internal Selection',
      desc: 'Leading multidisciplinary student teams for academic paper development and digital transformation. Experienced in resource scheduling, workflow coordination, and version control.'
    },
    'programming': {
      title: 'Programming',
      axisIndex: 3,
      skills: 'Python, Three.js, Node.js, Docker, Streamlit, Gemini API',
      projects: 'Nusantara Museum 3D, IGRS Dashboard App',
      metrics: 'Avg Proficiency: 82% | 6 Production Tools Integrated',
      desc: 'Building interactive user interfaces, virtual 3D web spaces (WebGL), data dashboards, and containerized backend services to serve machine learning models to end-users.'
    }
  };

  const categoryKeys = ['data', 'machine-learning', 'lead', 'programming'];
  const cards = document.querySelectorAll('.intel-card');

  // Helper to show category report
  function showCategoryReport(key) {
    const data = CATEGORY_MAP[key];
    if (!data) return;
    statusEl.textContent = `CATEGORY_ACTIVE: ${key.toUpperCase()}`;
    statusEl.style.color = '#c6f24e';

    targetValues = [0.35, 0.35, 0.35, 0.35];
    targetValues[data.axisIndex] = 0.90;

    terminalBody.innerHTML = `
      <div class="terminal-report">
        <p class="green-text report-title">&gt; CATEGORY STATISTICS: ${data.title.toUpperCase()}</p>
        <div class="report-row">
          <span class="lbl">Core Technologies:</span>
          <span class="val green-text">${data.skills}</span>
        </div>
        <div class="report-row">
          <span class="lbl">Primary Projects:</span>
          <span class="val cyan-text">${data.projects}</span>
        </div>
        <div class="report-row">
          <span class="lbl">Output Telemetry:</span>
          <span class="val amber-text">${data.metrics}</span>
        </div>
        <div class="report-desc">&gt; Summary: ${data.desc}</div>
      </div>
    `;
  }

  // Helper to reset back to idle state
  function resetToIdle() {
    triggers.forEach(t => t.classList.remove('active'));
    cards.forEach(c => c.classList.remove('active-card'));
    activeSkill = null;
    activeProject = null;
    activeCategory = null;
    statusEl.textContent = 'CORE_NETWORK_IDLE';
    statusEl.style.color = 'var(--muted)';
    targetValues = [0.90, 0.85, 0.80, 0.85];

    terminalBody.innerHTML = `
      <div class="terminal-default">
        <p class="green-text">&gt; SYSTEMS_READY: TRUE</p>
        <p>&gt; Mapped tech stack nodes: 19</p>
        <p>&gt; Linked project nodes: 7</p>
        <p class="dim-text">&gt; Click on any skill category panel or hover over any technical skill on the left to trace neural mapping and load specific telemetry.</p>
      </div>
    `;
  }

  // Click bindings for category panels
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      // Prevent card click when clicking chip/trigger specifically
      if (e.target.classList.contains('skill-trigger')) {
        return;
      }

      const key = categoryKeys[index];
      if (activeCategory === key) {
        // Toggle off if clicked again
        resetToIdle();
      } else {
        cards.forEach(c => c.classList.remove('active-card'));
        card.classList.add('active-card');
        triggers.forEach(t => t.classList.remove('active'));

        activeSkill = null;
        activeProject = null;
        activeCategory = key;
        showCategoryReport(key);
      }
    });
  });

  // Hover bindings for individual skill chips
  triggers.forEach(trigger => {
    trigger.addEventListener('pointerenter', () => {
      const skillName = trigger.getAttribute('data-skill');
      const data = SKILL_MAP[skillName];

      triggers.forEach(t => t.classList.remove('active'));
      trigger.classList.add('active');

      if (data) {
        activeSkill = skillName;
        activeProject = data.project;
        statusEl.textContent = `TRACE_ACTIVE: ${skillName.toUpperCase()}`;
        statusEl.style.color = '#c6f24e';

        // Update target radar shapes to lock on the matching axis and dim the rest
        const axisIdx = getSkillAxis(skillName);
        const skillVal = getSkillValue(skillName);

        targetValues = [0.35, 0.35, 0.35, 0.35];
        if (axisIdx !== -1) {
          targetValues[axisIdx] = skillVal;
        }

        // Update Terminal Panel
        terminalBody.innerHTML = `
          <div class="terminal-report">
            <p class="green-text report-title">&gt; TRACE COMPLETED: ${skillName.toUpperCase()}</p>
            <div class="report-row">
              <span class="lbl">Proficiency Level:</span>
              <span class="val green-text">${data.prof} (${Math.round(skillVal * 100)}%)</span>
            </div>
            <div class="report-row">
              <span class="lbl">Applied Case Study:</span>
              <span class="val cyan-text">${data.projTitle}</span>
            </div>
            <div class="report-row">
              <span class="lbl">Output Telemetry:</span>
              <span class="val amber-text">${data.metrics}</span>
            </div>
            <div class="report-desc">&gt; Applied Work: ${data.desc}</div>
          </div>
        `;
      }
    });

    trigger.addEventListener('pointerleave', () => {
      if (activeCategory) {
        // Snap back to category stats
        triggers.forEach(t => t.classList.remove('active'));
        activeSkill = null;
        activeProject = null;
        showCategoryReport(activeCategory);
      } else {
        // No category active, reset to idle
        resetToIdle();
      }
    });
  });

  // Reset to default report if mouse leaves section
  const section = document.getElementById('skills');
  if (section) {
    section.addEventListener('mouseleave', () => {
      resetToIdle();
    });
  }

  // Animation Loop
  let time = 0;
  let sweepAngle = -Math.PI / 2;

  function animate() {
    time += 0.015;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const R = Math.min(width, height) * 0.35;

    // Draw grid background
    ctx.strokeStyle = 'rgba(255,255,255,0.012)';
    ctx.lineWidth = 0.5;
    const gridSz = 25;
    for (let x = 0; x < width; x += gridSz) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSz) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // 1. Draw Concentric Radar Grid (Diamond/4-sided webs)
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.setLineDash([4, 4]);
    for (let r = 0.25; r <= 1.0; r += 0.25) {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const x = cx + Math.cos(axes[i].angle) * R * r;
        const y = cy + Math.sin(axes[i].angle) * R * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Percentage labels
      ctx.font = `${7 * dpr}px monospace`;
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.textAlign = 'left';
      ctx.fillText(`${r * 100}%`, cx + 4 * dpr, cy - R * r + 2 * dpr);
    }
    ctx.setLineDash([]);

    // 2. Draw Axis Lines & Text Labels
    axes.forEach((axis, i) => {
      const outerX = cx + Math.cos(axis.angle) * R;
      const outerY = cy + Math.sin(axis.angle) * R;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();

      // Axis label placement
      ctx.font = `bold ${8.5 * dpr}px monospace`;
      ctx.fillStyle = (activeSkill && getSkillAxis(activeSkill) === i) || (activeCategory && CATEGORY_MAP[activeCategory].axisIndex === i) ? '#ffffff' : 'rgba(255,255,255,0.4)';
      ctx.textAlign = 'center';

      let labelOffset = 22 * dpr;
      if (axis.angle === 0) {
        ctx.textAlign = 'left';
        labelOffset = 15 * dpr;
      } else if (axis.angle === Math.PI) {
        ctx.textAlign = 'right';
        labelOffset = 15 * dpr;
      }

      const lx = cx + Math.cos(axis.angle) * (R + labelOffset);
      const ly = cy + Math.sin(axis.angle) * (R + (Math.abs(Math.sin(axis.angle)) > 0.5 ? 20 * dpr : 3 * dpr));
      ctx.fillText(axis.label, lx, ly);
    });

    // 3. Smooth Lerping of values
    for (let i = 0; i < 4; i++) {
      currentValues[i] += (targetValues[i] - currentValues[i]) * 0.12;
    }

    // 4. Draw Competency Polygon Shape
    const polyPoints = [];
    const breath = 1 + Math.sin(time * 2.5) * 0.012; // subtle organic pulse
    for (let i = 0; i < 4; i++) {
      const val = currentValues[i] * breath;
      const x = cx + Math.cos(axes[i].angle) * R * val;
      const y = cy + Math.sin(axes[i].angle) * R * val;
      polyPoints.push({ x, y });
    }

    // Gradient fill
    ctx.fillStyle = 'rgba(198, 242, 78, 0.12)';
    ctx.beginPath();
    ctx.moveTo(polyPoints[0].x, polyPoints[0].y);
    for (let i = 1; i < 4; i++) {
      ctx.lineTo(polyPoints[i].x, polyPoints[i].y);
    }
    ctx.closePath();
    ctx.fill();

    // Solid Neon Stroke
    ctx.strokeStyle = '#c6f24e';
    ctx.lineWidth = 2.2;
    ctx.shadowColor = '#c6f24e';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(polyPoints[0].x, polyPoints[0].y);
    for (let i = 1; i < 4; i++) {
      ctx.lineTo(polyPoints[i].x, polyPoints[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 5. Draw Target Axis Locks (Target Marker + Top-Left HUD box)
    if (activeSkill) {
      const axisIdx = getSkillAxis(activeSkill);
      if (axisIdx !== -1) {
        const activeX = cx + Math.cos(axes[axisIdx].angle) * R * currentValues[axisIdx];
        const activeY = cy + Math.sin(axes[axisIdx].angle) * R * currentValues[axisIdx];

        // Pulsating target marker (circle only, no colliding text!)
        ctx.beginPath();
        ctx.arc(activeX, activeY, (6 + Math.sin(time * 8) * 2) * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = '#c6f24e';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(activeX, activeY, 3 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Active Telemetry HUD (drawn in empty top-left space to prevent overlaps)
        const skillVal = getSkillValue(activeSkill);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.strokeStyle = 'rgba(78, 184, 255, 0.4)';
        ctx.lineWidth = 1;

        const hudW = 120 * dpr;
        const hudH = 38 * dpr;
        const hudX = 14 * dpr;
        const hudY = 14 * dpr;

        ctx.beginPath();
        ctx.rect(hudX, hudY, hudW, hudH);
        ctx.fill();
        ctx.stroke();

        // Corner pointer accent
        ctx.fillStyle = '#4eb8ff';
        ctx.fillRect(hudX, hudY, 4 * dpr, 4 * dpr);

        ctx.font = `bold ${7 * dpr}px monospace`;
        ctx.fillStyle = '#4eb8ff';
        ctx.textAlign = 'left';
        ctx.fillText('TARGET ACQUIRED', hudX + 8 * dpr, hudY + 11 * dpr);

        ctx.font = `${7.5 * dpr}px monospace`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`NODE: ${activeSkill.toUpperCase()}`, hudX + 8 * dpr, hudY + 22 * dpr);
        ctx.fillText(`VAL : ${Math.round(skillVal * 100)}%`, hudX + 8 * dpr, hudY + 31 * dpr);
      }
    }

    // 6. Draw Sonar Radar Sweep Line
    if (activeSkill) {
      // Lock sweep on target axis angle
      const axisIdx = getSkillAxis(activeSkill);
      if (axisIdx !== -1) {
        const targetAngle = axes[axisIdx].angle;
        let diff = targetAngle - sweepAngle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        sweepAngle += diff * 0.15;
      }
    } else {
      // Constant sweep rotation in idle mode
      sweepAngle = (time * 1.2) % (Math.PI * 2);
    }

    // Sweep line gradient draw
    ctx.strokeStyle = 'rgba(198, 242, 78, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweepAngle) * R * 1.12, cy + Math.sin(sweepAngle) * R * 1.12);
    ctx.stroke();

    // 7. Corner Telemetry Dashboard Details
    // Bottom-right Jittering Equalizer bars
    const barW = 3.5 * dpr;
    const barGap = 3 * dpr;
    const startX = width - 42 * dpr;
    const startY = height - 16 * dpr;
    for (let i = 0; i < 5; i++) {
      let val = 0.35 + 0.45 * Math.sin(time * 6 + i * 2.3);
      if (activeSkill) {
        val = (0.2 + 0.65 * Math.sin(time * 12 + i * 1.8)) * 0.8;
      }
      const h = Math.max(3 * dpr, val * 18 * dpr);
      ctx.fillStyle = '#c6f24e';
      ctx.fillRect(startX + i * (barW + barGap), startY - h, barW, h);
    }

    // Bottom-left static metrics text
    ctx.font = `${7.5 * dpr}px monospace`;
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.textAlign = 'left';
    ctx.fillText(`SYS_RADAR: LOCK_READY`, 14 * dpr, height - 26 * dpr);
    ctx.fillText(`FREQ: ${(48 + Math.floor(Math.sin(time * 15) * 4))}Hz`, 14 * dpr, height - 17 * dpr);
    ctx.fillText(`SWEEP_SCAN: ACTIVE`, 14 * dpr, height - 8 * dpr);

    animFrameId = requestAnimationFrame(animate);
  }
  animate();

})();
