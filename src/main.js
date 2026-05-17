		/* ── CURSOR ── */
		const cur = document.getElementById('cursor');
		const ring = document.getElementById('cursor-ring');
		let mx = window.innerWidth / 2,
		 my = window.innerHeight / 2,
		 rx = mx,
		 ry = my;
		
		document.addEventListener('mousemove', e => {
		 mx = e.clientX;
		 my = e.clientY;
		 cur.style.left = mx + 'px';
		 cur.style.top = my + 'px';
		});
		(function lerp() {
		 rx += (mx - rx) * .11;
		 ry += (my - ry) * .11;
		 ring.style.left = rx + 'px';
		 ring.style.top = ry + 'px';
		 requestAnimationFrame(lerp);
		})();
		
		document.addEventListener('mouseleave', () => {
		 cur.style.opacity = '0';
		 ring.style.opacity = '0'
		});
		document.addEventListener('mouseenter', () => {
		 cur.style.opacity = '1';
		 ring.style.opacity = '1'
		});
		document.querySelectorAll('a,button').forEach(el => {
		 el.addEventListener('mouseenter', () => {
		  cur.style.transform = 'translate(-50%,-50%) scale(2)';
		  ring.style.width = '50px';
		  ring.style.height = '50px';
		  ring.style.borderColor = 'var(--accent)';
		 });
		 el.addEventListener('mouseleave', () => {
		  cur.style.transform = 'translate(-50%,-50%) scale(1)';
		  ring.style.width = '34px';
		  ring.style.height = '34px';
		  ring.style.borderColor = 'rgba(91,143,255,.35)';
		 });
		});
		
		/* ── THEME ── */
		const html = document.documentElement;
		const tb = document.getElementById('themeToggle');
		const saved = localStorage.getItem('theme');
		const sys = window.matchMedia('(prefers-color-scheme:dark)').matches;
		html.setAttribute('data-theme', saved || (sys ? 'dark' : 'light'));
		tb.addEventListener('click', () => {
		 const n = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
		 html.setAttribute('data-theme', n);
		 localStorage.setItem('theme', n);
		});
		
		/* ── PARTICLES ── */
		const pc = document.getElementById('ptcls');
		for (let i = 0; i < 40; i++) {
		 const p = document.createElement('div');
		 p.className = 'p';
		 const s = Math.random() * 2.5 + .8;
		 Object.assign(p.style, {
		  left: Math.random() * 100 + '%',
		  bottom: Math.random() * -15 + '%',
		  width: s + 'px',
		  height: s + 'px',
		  animationDuration: (8 + Math.random() * 18) + 's',
		  animationDelay: (Math.random() * 18) + 's',
		  opacity: '0',
		 });
		 pc.appendChild(p);
		}
		
		/* ── TYPED ── */
		const phrases = [
		 'typing random things.',
		 'wasting perfectly fine free time.',
		 'debugging things that werent even broken.',
		 'pretending to know what Im doing.',
		 'doing this instead of sleeping.',
		 'hiding bugs in plain sight.',
		 'making things look pretty.'
		];
		let pi = 0,
		 ci = 0,
		 del = false;
		const el = document.getElementById('typed');
		
		function type() {
		 const ph = phrases[pi];
		 if (!del) {
		  el.textContent = ph.slice(0, ++ci);
		  if (ci === ph.length) {
		   del = true;
		   setTimeout(type, 1700);
		   return
		  }
		  setTimeout(type, 55 + Math.random() * 30);
		 } else {
		  el.textContent = ph.slice(0, --ci);
		  if (ci === 0) {
		   del = false;
		   pi = (pi + 1) % phrases.length;
		   setTimeout(type, 420);
		   return
		  }
		  setTimeout(type, 28);
		 }
		}
		setTimeout(type, 1500);
		
		/* ── SCROLL REVEAL ── */
		const rvObs = new IntersectionObserver(es => {
		 es.forEach(e => {
		  if (e.isIntersecting) {
		   e.target.classList.add('in');
		   rvObs.unobserve(e.target)
		  }
		 });
		}, { threshold: .5 });
		document.querySelectorAll('.rv').forEach(r => rvObs.observe(r));
		
		/* ── SKILL BARS ── */
		const sbObs = new IntersectionObserver(es => {
		 es.forEach(e => {
		  if (e.isIntersecting) {
		   e.target.querySelectorAll('.sk-fill').forEach(b => b.classList.add('go'));
		   sbObs.unobserve(e.target);
		  }
		 });
		}, { threshold: .25 });
		const sb = document.getElementById('skillBars');
		if (sb) sbObs.observe(sb);
		
		/* ── ACTIVE NAV ── */
		const secs = document.querySelectorAll('section[id]');
		const nas = document.querySelectorAll('.nav-links a');
		const navObs = new IntersectionObserver(es => {
		 es.forEach(e => {
		  if (e.isIntersecting) {
		   nas.forEach(a => {
		    const active = a.getAttribute('href') === '#' + e.target.id;
		    a.classList.toggle('active', active);
		   });
		  }
		 });
		}, { threshold: .45 });
		secs.forEach(s => navObs.observe(s));