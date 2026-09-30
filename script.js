(() => {
  'use strict';
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalKicker = document.getElementById('modalKicker');
  const modalIntro = document.getElementById('modalIntro');
  const modalMeta = document.getElementById('modalMeta');
  const modalContent = document.getElementById('modalContent');
  const progress = document.getElementById('scrollProgress');
  let previousFocus = null;

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menuToggle.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
    navLinks.classList.toggle('open', !expanded);
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }));

  const projectData = {
    fintech: {title:'Fintech Wallet App',category:'UI/UX DESIGN · MOBILE PRODUCT',intro:'A modern mobile banking experience designed around simplicity, accessibility and clear financial interactions.',tags:['Product strategy','Mobile UI','Wireframing','Prototyping'],overview:'A concept for a mobile wallet that helps people understand and manage everyday money with confidence. The interface puts essential information first and keeps common actions close at hand.',problem:'Financial apps can feel dense when balances, transfers and transaction details compete for attention. This exploration focuses on reducing cognitive load while keeping important information easy to find.',process:'Mapped the core money-management journey, sketched key screens, then explored a calm visual system with reusable components. A clickable prototype would be used to validate navigation and task clarity.',solution:'A dashboard built around a clear balance card, direct quick actions and a readable activity feed. A restrained palette, deliberate spacing and consistent interaction patterns support the experience.',result:'The outcome is a visual product concept showing a coherent path from overview to everyday financial actions. It is a portfolio exploration, not a released banking product or measured user study.',visual:true},
    irrigation:{title:'Smart Irrigation Dashboard',category:'DASHBOARD · PRODUCT CONCEPT',intro:'A data-focused dashboard concept for making irrigation status and field insights easier to scan.',tags:['Dashboard UI','Data visualization','Responsive layout'],overview:'A responsive control-center concept that brings field conditions, water use and system status into one clear workspace.',problem:'Operational dashboards can overwhelm users with competing metrics and dense information. Important status changes need to be visible without searching through multiple views.',process:'Organized the information into a field overview, key status indicators and a simple trend visualization. Established hierarchy around the information needed for quick monitoring.',solution:'A modular dashboard with clear status cards, a compact trend chart and a navigation structure that can adapt to additional fields and devices.',result:'A concept direction for an at-a-glance experience. Further validation with growers and real sensor data would guide the next iteration.',visual:false},
    banking:{title:'Mobile Banking UI',category:'MOBILE UI · CONCEPT',intro:'A warm, approachable banking interface exploring a more human tone for everyday money tasks.',tags:['Mobile UI','Visual design','Interaction design'],overview:'A mobile banking concept designed to make common account actions feel straightforward and approachable.',problem:'Banking interfaces need to balance trust, speed and the amount of information shown on a small screen.',process:'Explored the key dashboard hierarchy, account summary, shortcuts and recent activity. Developed a soft neutral palette with a strong typographic rhythm.',solution:'A focused home screen with a prominent balance, compact actions and a simple activity list, supported by consistent spacing and clear labels.',result:'A visual interface study intended to communicate a cohesive product direction; usability testing and product integration would be future steps.',visual:true},
    identity:{title:'Brand Identity Project',category:'BRAND IDENTITY · VISUAL STUDY',intro:'A flexible identity exploration built around form, contrast and a recognizable typographic voice.',tags:['Art direction','Logo exploration','Typography','Brand assets'],overview:'An identity study exploring how a compact symbol, typography and a limited palette can work together across touchpoints.',problem:'A brand needs to be recognizable at different sizes and remain consistent across both digital and print applications.',process:'Explored a typographic foundation, simplified mark geometry and a small set of supporting graphic elements before applying them to sample layouts.',solution:'A concise visual system with a core mark, expressive type hierarchy and repeatable layout principles for future collateral.',result:'A concept identity presentation. The final system would be refined against the client’s positioning, audience and production requirements.',visual:false},
    website:{title:'Website UI Concept',category:'WEB DESIGN · CONCEPT',intro:'An editorial-inspired web direction that gives content room to breathe and guides visitors with clarity.',tags:['Web UI','Responsive design','Typography','Layout'],overview:'A responsive website concept for a contemporary lifestyle brand, balancing editorial character with clear navigation.',problem:'A visually rich site still needs to help visitors understand the offer and find the next step without friction.',process:'Set a content hierarchy, explored responsive page composition and paired expressive display typography with restrained supporting UI.',solution:'A spacious landing page with a direct navigation, confident headline, clear call to action and visual focal point.',result:'A visual direction ready for content and interaction testing before development.',visual:false}
  };
  function openProject(key) {
    const data = projectData[key]; if (!data) return;
    previousFocus = document.activeElement;
    modalKicker.textContent = data.category;
    modalTitle.textContent = data.title;
    modalIntro.textContent = data.intro;
    modalMeta.innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join('');
    const visual = data.visual ? '<div class="case-visual" aria-label="Abstract mobile interface preview"><div class="case-screen"><span></span><i></i><i></i><b></b><i></i><i></i></div><div class="case-screen"><span></span><i></i><b></b><i></i><i></i></div><div class="case-screen"><span></span><i></i><i></i><b></b><i></i></div></div>' : '';
    modalContent.innerHTML = `${visual}<h3>Project overview</h3><p>${data.overview}</p><h3>The problem</h3><p>${data.problem}</p><h3>Design process</h3><p>${data.process}</p><h3>Solution</h3><p>${data.solution}</p><h3>Result</h3><p>${data.result}</p>`;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
    modal.querySelector('.modal-close').focus();
  }
  function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); if (previousFocus && previousFocus.focus) previousFocus.focus(); }
  document.querySelectorAll('[data-project]').forEach(el => el.addEventListener('click', () => openProject(el.dataset.project)));
  modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const message = `Hello Victor, my name is ${values.get('name')}.\nEmail: ${values.get('email')}\nProject type: ${values.get('project')}\n\nProject details:\n${values.get('message')}`;
    const url = `https://wa.me/2347065273868?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  const steps = [...document.querySelectorAll('.process-step')];
  function activateStep(step) { steps.forEach(item => item.classList.toggle('active', item === step)); }
  steps.forEach(step => { step.addEventListener('click', () => activateStep(step)); step.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateStep(step); } }); });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold:.12, rootMargin:'0px 0px -25px 0px'});
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add('is-visible'));

  let ticking = false;
  function updateProgress() { const max = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`; ticking = false; }
  window.addEventListener('scroll', () => { if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; } }, {passive:true});
  updateProgress();
})();
