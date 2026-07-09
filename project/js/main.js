/* ==========================================================================
   ART BY MAHEEN — main.js
   Preloader → nav behaviour → marquee gallery (with drag) → scroll reveals
   → collection list → lightbox with keyboard/swipe support → contact form.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     DATA — the collection. Edit titles / moods / years freely; images
     live in assets/paintings/painting-01.jpg ... painting-12.jpg
  ------------------------------------------------------------------ */
  const PAINTINGS = [
    { file: "painting-01.jpg", title: "Whispering Trail",     mood: "a dirt path forking under green canopy light", year: "2026" },
    { file: "painting-02.jpg", title: "Tides Under Starlight", mood: "night waves catching a crescent moon",         year: "2026" },
    { file: "painting-03.jpg", title: "Golden Hollow",        mood: "sunbeams pooling into a hidden blue stream",   year: "2026" },
    { file: "painting-04.jpg", title: "Misty River Bend",     mood: "light falling through mountains onto still water", year: "2026" },
    { file: "painting-05.jpg", title: "Evening Over the Ridge", mood: "a crescent moon above a sleeping valley",     year: "2026" },
    { file: "painting-06.jpg", title: "Lone Watcher",         mood: "a solitary tree against a burning sky",        year: "2026" },
    { file: "painting-07.jpg", title: "Birds at Dusk",        mood: "a thin flock crossing a fading horizon",       year: "2026" },
    { file: "painting-08.jpg", title: "Sailing Into Amber",   mood: "a lone boat drifting toward a molten sun",     year: "2026" },
    { file: "painting-09.jpg", title: "Fields Before Nightfall", mood: "wildflowers watching the last light leave", year: "2026" },
    { file: "painting-10.jpg", title: "Marshlight",           mood: "a quiet wetland lit teal and ember at dusk",   year: "2026" },
    { file: "painting-11.jpg", title: "The Quiet Knight",     mood: "armor at rest among daisies and dappled light", year: "2026" },
    { file: "painting-12.jpg", title: "Wires at Dawn",        mood: "birds gathered on a line above painted hills", year: "2026" },
    { file: "painting-13.jpg", title: "Second Light",         mood: "a new study in oil and quiet colour",          year: "2026" },
    { file: "painting-14.jpg", title: "Morning Study",        mood: "soft light gathering at the edge of a scene",  year: "2026" },
    { file: "painting-15.jpg", title: "Between Seasons",      mood: "colour shifting across a remembered view",     year: "2026" },
    { file: "painting-16.jpg", title: "Quiet Horizon",        mood: "a far line where sky and land meet",           year: "2026" },
    { file: "painting-17.jpg", title: "Afternoon Hush",       mood: "stillness held in layered brushwork",          year: "2026" },
    { file: "painting-18.jpg", title: "Fading Light Study",   mood: "the last warmth before colour cools",          year: "2026" },
    { file: "painting-19.jpg", title: "Distant Weather",      mood: "clouds gathering over an open scene",          year: "2026" },
    { file: "painting-20.jpg", title: "Low Sun",               mood: "long shadows and a low golden light",          year: "2026" },
    { file: "painting-21.jpg", title: "Passing Shade",         mood: "light and shadow trading places slowly",       year: "2026" },
    { file: "painting-22.jpg", title: "Evening Palette",       mood: "warm tones settling into dusk",                year: "2026" },
    { file: "painting-23.jpg", title: "Wandering Path",        mood: "a trail leading somewhere unseen",             year: "2026" },
    { file: "painting-24.jpg", title: "Soft Weather",          mood: "muted colour under an overcast sky",           year: "2026" },
    { file: "painting-25.jpg", title: "Held Light",            mood: "a moment of brightness kept in oil",           year: "2026" },
    { file: "painting-26.jpg", title: "Late Afternoon",        mood: "colour lengthening as the day turns",          year: "2026" },
    { file: "painting-27.jpg", title: "Quiet Waters",          mood: "a calm surface holding the sky's colour",      year: "2026" },
    { file: "painting-28.jpg", title: "Turning Light",         mood: "the sky changing colour mid-thought",          year: "2026" },
    { file: "painting-29.jpg", title: "Study in Stillness",    mood: "a slow, deliberate quiet",                     year: "2026" },
    { file: "painting-30.jpg", title: "Far Field",             mood: "open land under a wide sky",                   year: "2026" },
    { file: "painting-31.jpg", title: "Coming Dusk",           mood: "the day folding gently into evening",          year: "2026" },
    { file: "painting-32.jpg", title: "Gathering Clouds",      mood: "weather building at the horizon",              year: "2026" },
    { file: "painting-33.jpg", title: "Warm Hour",             mood: "golden light held a little longer",           year: "2026" },
    { file: "painting-34.jpg", title: "Quiet Passage",         mood: "a path through changing light",                year: "2026" },
    { file: "painting-35.jpg", title: "Half Light",            mood: "the in-between hour, neither day nor night",   year: "2026" },
    { file: "painting-36.jpg", title: "Still Point",           mood: "a moment the light seemed to pause",           year: "2026" },
    { file: "painting-37.jpg", title: "Evening Study No. 2",   mood: "another study in dusk's palette",              year: "2026" },
    { file: "painting-38.jpg", title: "Open Sky",              mood: "wide, unhurried colour overhead",              year: "2026" },
    { file: "painting-39.jpg", title: "Long Shadows",          mood: "late light stretching across the ground",      year: "2026" },
    { file: "painting-40.jpg", title: "Faraway Weather",       mood: "a sky doing something quietly dramatic",       year: "2026" },
    { file: "painting-41.jpg", title: "Soft Horizon",          mood: "edges blurring where land meets air",          year: "2026" },
    { file: "painting-42.jpg", title: "Colour at Rest",        mood: "hues settling after a long day",               year: "2026" },
    { file: "painting-43.jpg", title: "Last Warmth",           mood: "the final light before it goes",               year: "2026" },
    { file: "painting-44.jpg", title: "Evening Return",        mood: "a familiar view revisited at dusk",            year: "2026" },
    { file: "painting-45.jpg", title: "New Ground",            mood: "a wider scene, a different palette",           year: "2026" },
  ];
  const MEDIUM = "Oil on Canvas";

  /* ------------------------------------------------------------------
     PRELOADER
  ------------------------------------------------------------------ */
  /* The whole intro (preload → spread → fly into the two diagonal film reels)
     is owned by initIntroReels(), defined further down. */

  /* ------------------------------------------------------------------
     NAV — scrolled state + mobile menu
  ------------------------------------------------------------------ */
  const nav = document.getElementById("siteNav");
  const burger = document.getElementById("navBurger");
  const mobileMenu = document.getElementById("mobileMenu");

  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-open");
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => mobileMenu.classList.remove("is-open"))
  );

  /* ------------------------------------------------------------------
     CURSOR GLOW (desktop ambient light, echoes the sunburst motif)
  ------------------------------------------------------------------ */
  const glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia("(hover: hover)").matches) {
    let gx = 0, gy = 0, gTick = false;
    document.addEventListener("mousemove", (e) => {
      gx = e.clientX; gy = e.clientY;
      if (gTick) return;
      gTick = true;
      requestAnimationFrame(() => {
        // compositor-only move (no per-mousemove repaint of the 400px gradient)
        glow.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;
        gTick = false;
      });
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     INTRO → TWO DIAGONAL FILM REELS
     ------------------------------------------------------------------
     ① preload : tiles stacked at centre, flipping like a video
     ② spread  : that picture bursts apart, tiles fly to every corner
     ③ fly     : each tile glides into one of the two diagonal reels
     ④ orbit   : the reels turn forever behind the centred text

     The smooth handoff: a tile never has its transform "handed over" between
     GSAP and the render loop (that causes a jump). Instead each tile keeps
     BOTH positions plus a `blend` value, and the loop paints
     lerp(scatter, orbit, blend) every frame. GSAP only tweens `blend` 0→1.
  ------------------------------------------------------------------ */
  const orbitStage = document.getElementById("orbitStage");

  (function initIntroReels() {
    const preloader = document.getElementById("preloader");
    const plBg = document.getElementById("preloaderBg");
    const plInner = document.getElementById("preloaderInner");
    const plBar = document.getElementById("preloaderBar");
    const layer = document.getElementById("introTiles");
    if (!orbitStage || !layer) return;

    const CFG = {
      count: 24,
      tiltA: 44, tiltB: -44,        // the two reels cross on the diagonal
      offX: 0.09, offY: 0.00,       // reel centres, as a fraction of the stage
      rx: 0.24, ry: 0.05,           // flat ellipse => reads as a film strip
      period: 33, mirror: true,     // seconds per turn; reels counter-rotate
      big: 2.6, flip: 700,          // preload picture scale + flip interval
      spreadDur: 1.1, spreadStag: 0.03, spreadHold: 0.5,
      flyDur: 1.6, flyStag: 0.04, flyEase: "power3.inOut",
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasGSAP = typeof window.gsap !== "undefined";

    /* ---- build the tiles (each one a cell of film) ---- */
    const tiles = Array.from({ length: CFG.count }, (_, i) => {
      const pi = Math.round((i * (PAINTINGS.length - 1)) / (CFG.count - 1));
      const p = PAINTINGS[pi];
      const el = document.createElement("div");
      el.className = "reel-tile";
      el.dataset.index = pi;
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-label", `View ${p.title}`);
      // 480px thumbnail (≈21KB) instead of the full-res original (up to 3.2MB)
      const img = document.createElement("img");
      img.className = "reel-tile__img";
      img.src = `assets/paintings/sm/${p.file}`;
      img.alt = `${p.title} — original oil painting by Maheen`;
      img.width = 480; img.height = 480;
      img.decoding = "async";
      if (i === 0) img.fetchPriority = "high";
      const tag = document.createElement("span");
      tag.className = "reel-tile__tag";
      tag.textContent = p.title;
      el.appendChild(img);
      el.appendChild(tag);
      layer.appendChild(el);
      return { el, img, i, reel: i % 2, baseAngle: 0, blend: 0, sx: 0, sy: 0, srot: 0 };
    });
    // space each reel's tiles evenly around its ellipse
    [0, 1].forEach((r) => {
      const grp = tiles.filter((t) => t.reel === r);
      grp.forEach((t, k) => (t.baseAngle = (k / grp.length) * Math.PI * 2));
    });

    /* ---- interaction ---- */
    let paused = false;
    tiles.forEach((t) => {
      const open = () => openLightbox(Number(t.el.dataset.index));
      t.el.addEventListener("mouseenter", () => {
        orbitStage.classList.add("is-hovering");
        t.el.classList.add("is-active");
        paused = true;
      });
      t.el.addEventListener("mouseleave", () => {
        orbitStage.classList.remove("is-hovering");
        t.el.classList.remove("is-active");
        paused = false;
      });
      t.el.addEventListener("click", open);
      t.el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });

    /* ---- geometry (cached — ZERO getBoundingClientRect reads inside the loop) ----
       While the tiles live in the fixed intro layer their 50%/50% anchor is the
       viewport centre; once re-parented into the stage it becomes the stage
       centre. offCX/offCY bridge the two so the swap is invisible. The stage
       size only changes on resize, so we measure once here and cache it. */
    let inStage = false;
    let stageW = 1, stageH = 1, offCX = 0, offCY = 0;
    function measureStage() {
      const r = orbitStage.getBoundingClientRect();
      stageW = r.width || 1;
      stageH = r.height || 1;
      if (inStage) { offCX = 0; offCY = 0; }
      else {
        offCX = r.left + r.width / 2 - window.innerWidth / 2;
        offCY = r.top + r.height / 2 - window.innerHeight / 2;
      }
    }

    function orbitPos(t, time) {
      const rx = CFG.rx * stageW, ry = CFG.ry * stageH;
      const ox = CFG.offX * stageW, oy = CFG.offY * stageH;
      const left = t.reel === 0;
      const tiltDeg = left ? CFG.tiltA : CFG.tiltB;
      const tilt = (tiltDeg * Math.PI) / 180;
      const cx = left ? -ox : ox;
      const cy = left ? oy : -oy;
      const dir = CFG.mirror ? (left ? 1 : -1) : 1;
      const a = t.baseAngle + dir * (time / CFG.period) * Math.PI * 2;

      // a tilted ellipse — the path the strip of film runs along
      const lx = Math.cos(a) * rx, ly = Math.sin(a) * ry;
      const x = offCX + cx + lx * Math.cos(tilt) - ly * Math.sin(tilt);
      const y = offCY + cy + lx * Math.sin(tilt) + ly * Math.cos(tilt);

      const depth = (1 - Math.sin(a)) / 2; // 1 = front, 0 = back
      return {
        x, y,
        rot: tiltDeg - Math.cos(a) * 4,     // frames stay parallel => a strip
        scale: 0.72 + depth * 0.40,
        opacity: 0.55 + depth * 0.45,
        z: Math.round(10 + depth * 28),     // always below the text (z 60)
      };
    }

    const lerp = (a, b, u) => a + (b - a) * u;
    function paint(t, x, y, rot, s, o, z) {
      t.el.style.transform =
        `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(3)})`;
      if (!t.el.classList.contains("is-active")) {
        // only touch opacity / z-index when the rounded value actually changed
        const oo = o.toFixed(3);
        if (t._o !== oo) { t.el.style.opacity = oo; t._o = oo; }
        if (z != null && t._z !== z) { t.el.style.zIndex = String(z); t._z = z; }
      }
    }

    /* ---- render loop, pausable when offscreen or tab hidden (C5) ---- */
    let elapsed = 0, last = 0, raf = null;
    let loopEnabled = false, onScreen = true;
    function shouldRun() { return loopEnabled && onScreen && !document.hidden; }
    function startLoop() { if (raf == null && shouldRun()) { last = 0; raf = requestAnimationFrame(frame); } }
    function stopLoop() { if (raf != null) { cancelAnimationFrame(raf); raf = null; } }
    function frame(now) {
      if (!shouldRun()) { raf = null; return; }
      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      // when fully settled and paused (e.g. hover), the frame is identical — skip it
      if (paused && elapsed === frame._le) { raf = requestAnimationFrame(frame); return; }
      if (!paused) elapsed += dt;
      frame._le = elapsed;
      for (let k = 0; k < tiles.length; k++) {
        const t = tiles[k];
        const op = orbitPos(t, elapsed);
        const b = t.blend;
        paint(t,
          lerp(t.sx, op.x, b), lerp(t.sy, op.y, b),
          lerp(t.srot, op.rot, b), lerp(1, op.scale, b),
          lerp(1, op.opacity, b), Math.round(lerp(30, op.z, b)));
      }
      raf = requestAnimationFrame(frame);
    }

    /* ---- scatter targets: a jittered grid that covers the whole viewport ---- */
    function computeScatter() {
      const W = window.innerWidth, H = window.innerHeight, n = tiles.length;
      const cols = Math.ceil(Math.sqrt((n * W) / H));
      const rows = Math.ceil(n / cols);
      tiles.forEach((t, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const jx = Math.sin(i * 12.9898) * 0.5 * (W / cols) * 0.40;
        const jy = Math.cos(i * 78.233) * 0.5 * (H / rows) * 0.40;
        t.sx = ((c + 0.5) / cols) * W - W / 2 + jx;
        t.sy = ((r + 0.5) / rows) * H - H / 2 + jy;
        t.srot = Math.sin(i * 3.7) * 12;
      });
    }

    function moveIntoStage() {
      tiles.forEach((t) => orbitStage.appendChild(t.el));
      inStage = true;
      measureStage();
      if (preloader) preloader.classList.add("is-hidden");
      document.body.classList.add("intro-done", "loaded");
      initRevealObserver();
    }

    // pause the reel loop whenever the hero scrolls out of view or the tab hides
    const heroIO = new IntersectionObserver((es) => {
      onScreen = es[0].isIntersecting;
      if (onScreen) startLoop(); else stopLoop();
    }, { threshold: 0 });
    heroIO.observe(orbitStage);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopLoop(); else startLoop();
    });

    /* ---- reduced motion (or no GSAP): skip straight to the reels ---- */
    if (reduce || !hasGSAP) {
      moveIntoStage();
      tiles.forEach((t) => (t.blend = 1));
      loopEnabled = true;
      startLoop();
      return;
    }

    /* ---- ① preload: tiles stacked at centre, flipping like a video ---- */
    measureStage();
    computeScatter();
    let cur = 0;
    const showCur = () =>
      tiles.forEach((t, i) => paint(t, 0, 0, 0, CFG.big, i === cur ? 1 : 0, i === cur ? 40 : 30));
    showCur();
    requestAnimationFrame(() =>
      requestAnimationFrame(() => preloader && preloader.classList.add("is-ready")));

    const flipT = setInterval(() => { cur = (cur + 1) % tiles.length; showCur(); }, CFG.flip);

    // honest progress: fill the bar as each tile thumbnail actually decodes,
    // and start the intro once they're decoded (not when every page byte loads)
    let decoded = 0;
    const total = tiles.length;
    const decodes = tiles.map((t) =>
      t.img.decode().catch(() => {}).then(() => {
        decoded++;
        if (plBar) plBar.style.width = Math.round((decoded / total) * 100) + "%";
      })
    );
    Promise.race([
      Promise.all(decodes),
      new Promise((res) => setTimeout(res, 2500)), // don't wait forever on a slow tile
    ]).then(() => startIntro());
    setTimeout(startIntro, 6000); // absolute safety net

    let started = false;
    function startIntro() {
      if (started) return;
      started = true;
      clearInterval(flipT);
      if (plBar) plBar.style.width = "100%";
      computeScatter();
      measureStage();

      const tl = gsap.timeline();

      // ② spread — the one big picture bursts apart across the page
      tiles.forEach((t, i) => {
        const px = { x: 0, y: 0, rot: 0, s: CFG.big, o: i === cur ? 1 : 0 };
        tl.to(px, {
          x: t.sx, y: t.sy, rot: t.srot, s: 1, o: 1,
          duration: CFG.spreadDur, ease: "power3.out",
          onUpdate: () => paint(t, px.x, px.y, px.rot, px.s, px.o, 30),
        }, i * CFG.spreadStag);
      });

      // the loading screen dissolves while the tiles scatter (the tiles stay)
      tl.to([plBg, plInner, plBar], { opacity: 0, duration: 0.8, ease: "power2.out" },
        CFG.spreadDur * 0.55);

      // ③ fly into the two diagonal reels — start the loop, then blend 0→1
      tl.call(() => { loopEnabled = true; startLoop(); }, null, `+=${CFG.spreadHold}`);
      tiles.forEach((t, i) => {
        tl.to(t, { blend: 1, duration: CFG.flyDur, ease: CFG.flyEase },
          `<${(i * CFG.flyStag).toFixed(3)}`);
      });

      // ④ settle into the hero and let the reels turn forever
      tl.call(moveIntoStage);
    }

    let rzTick = false;
    window.addEventListener("resize", () => {
      if (rzTick) return;
      rzTick = true;
      requestAnimationFrame(() => { computeScatter(); measureStage(); rzTick = false; });
    }, { passive: true });
  })();

  /* ------------------------------------------------------------------
     BUILD MARQUEE GALLERY
  ------------------------------------------------------------------ */
  const track = document.getElementById("marqueeTrack");
  const marquee = document.getElementById("marquee");

  function cardHTML(p, i) {
    return `
      <div class="canvas-card" data-index="${i}" role="button" tabindex="0" aria-label="Preview ${p.title}">
        <img src="assets/paintings/sm/${p.file}" alt="${p.title} — original oil painting by Maheen" loading="lazy" decoding="async">
        <span class="canvas-card__view">＋</span>
        <div class="canvas-card__overlay">
          <span class="canvas-card__index">${String(i + 1).padStart(2, "0")} / ${PAINTINGS.length}</span>
          <h3 class="canvas-card__title">${p.title}</h3>
        </div>
      </div>`;
  }

  // duplicate the list once for a seamless infinite loop
  const cardsA = PAINTINGS.map(cardHTML).join("");
  const cardsB = PAINTINGS.map(cardHTML).join("");
  track.innerHTML = cardsA + cardsB;

  track.querySelectorAll(".canvas-card").forEach((card) => {
    card.addEventListener("click", () => openLightbox(Number(card.dataset.index)));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(Number(card.dataset.index));
      }
    });
  });

  // pause on hover
  marquee.addEventListener("mouseenter", () => track.classList.add("is-paused"));
  marquee.addEventListener("mouseleave", () => track.classList.remove("is-paused"));

  // drag-to-scroll
  let isDown = false, startX = 0, startScroll = 0, dragged = false;
  marquee.addEventListener("pointerdown", (e) => {
    isDown = true; dragged = false;
    startX = e.clientX;
    startScroll = track.getBoundingClientRect().left;
    marquee.classList.add("is-dragging");
    track.classList.add("is-paused");
    marquee.setPointerCapture(e.pointerId);
  });
  marquee.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) dragged = true;
    track.style.transform = `translateX(${dx}px)`;
  });
  function endDrag() {
    if (!isDown) return;
    isDown = false;
    marquee.classList.remove("is-dragging");
    track.style.transform = "";
    setTimeout(() => track.classList.remove("is-paused"), 300);
  }
  marquee.addEventListener("pointerup", endDrag);
  marquee.addEventListener("pointerleave", endDrag);

  /* ------------------------------------------------------------------
     MANTRA SECTION — a painting trail that follows the cursor
     (ported from the React Bits "TextCursor" component pattern,
     using images instead of text)
  ------------------------------------------------------------------ */
  const mantraSection = document.getElementById("mantra");

  function initImageCursorTrail({
    container,
    images,
    spacing = 90,
    followMouseDirection = true,
    randomFloat = true,
    exitDuration = 0.4,
    removalInterval = 30,
    maxPoints = 6,
  }) {
    const layer = document.createElement("div");
    layer.className = "image-cursor-trail";
    container.appendChild(layer);

    let trail = [];
    let lastPoint = null;
    let lastMoveTime = Date.now();
    let idCounter = 0;

    function spawnAt(x, y, angleDeg) {
      const file = images[idCounter % images.length];
      idCounter++;
      const el = document.createElement("div");
      el.className = "image-cursor-trail__item";
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.setProperty("--base-rot", (followMouseDirection ? angleDeg : 0) + "deg");
      el.style.setProperty("--exit-duration", exitDuration + "s");
      if (randomFloat) {
        el.style.setProperty("--fx", (Math.random() * 16 - 8).toFixed(1) + "px");
        el.style.setProperty("--fy", (Math.random() * 16 - 8).toFixed(1) + "px");
        el.style.setProperty("--frot", (Math.random() * 12 - 6).toFixed(1) + "deg");
      }
      el.innerHTML = `<img src="assets/paintings/sm/${file}" alt="" loading="lazy" decoding="async">`;
      layer.appendChild(el);
      requestAnimationFrame(() => el.classList.add("is-visible"));

      const record = { el };
      trail.push(record);
      if (trail.length > maxPoints) removeOldest();
    }

    function removeOldest() {
      const rec = trail.shift();
      if (!rec) return;
      rec.el.classList.remove("is-visible");
      rec.el.classList.add("is-exiting");
      setTimeout(() => rec.el.remove(), exitDuration * 1000 + 40);
    }

    function handleMove(e) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (!lastPoint) {
        spawnAt(x, y, 0);
        lastPoint = { x, y };
      } else {
        const dx = x - lastPoint.x;
        const dy = y - lastPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= spacing) {
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
          const steps = Math.floor(dist / spacing);
          for (let i = 1; i <= steps; i++) {
            const t = (spacing * i) / dist;
            spawnAt(lastPoint.x + dx * t, lastPoint.y + dy * t, angle);
          }
          lastPoint = { x, y };
        }
      }
      lastMoveTime = Date.now();
    }

    container.addEventListener("mousemove", handleMove);

    setInterval(() => {
      if (Date.now() - lastMoveTime > 120 && trail.length > 0) removeOldest();
    }, removalInterval);
  }

  if (window.matchMedia("(hover: hover)").matches) {
    initImageCursorTrail({
      container: mantraSection,
      images: PAINTINGS.map((p) => p.file),
      spacing: 70,
      maxPoints: 7,
      exitDuration: 0.35,
      removalInterval: 40,
      followMouseDirection: true,
      randomFloat: true,
    });
  }

  /* ------------------------------------------------------------------
     COLLECTION LIST
  ------------------------------------------------------------------ */
  const listEl = document.getElementById("collectionList");
  listEl.innerHTML = PAINTINGS.map((p, i) => `
    <div class="collection__row" data-index="${i}" role="button" tabindex="0" aria-label="View ${p.title}">
      <span class="collection__num">${String(i + 1).padStart(2, "0")}</span>
      <div class="collection__title-wrap">
        <span class="collection__title">${p.title}</span>
        <span class="collection__mood">${p.mood}</span>
      </div>
      <span class="collection__medium">${MEDIUM}</span>
      <span class="collection__year">${p.year}</span>
      <span class="collection__arrow">→</span>
    </div>`).join("");

  listEl.querySelectorAll(".collection__row").forEach((row) => {
    row.addEventListener("click", () => openLightbox(Number(row.dataset.index)));
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(Number(row.dataset.index));
      }
    });
  });

  /* ------------------------------------------------------------------
     LIGHTBOX
  ------------------------------------------------------------------ */
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lightboxImage");
  const lbTitle = document.getElementById("lightboxTitle");
  const lbDetails = document.getElementById("lightboxDetails");
  const lbIndex = document.getElementById("lightboxIndex");
  let currentIndex = 0;

  lbImage.decoding = "async";
  function prefetch(i) {
    const p = PAINTINGS[(i + PAINTINGS.length) % PAINTINGS.length];
    const im = new Image();
    im.src = `assets/paintings/md/${p.file}`;
  }
  function renderLightbox() {
    const p = PAINTINGS[currentIndex];
    lbImage.src = `assets/paintings/md/${p.file}`;
    lbImage.alt = `${p.title} — original oil painting by Maheen`;
    lbTitle.textContent = p.title;
    lbDetails.textContent = `${MEDIUM} · ${p.year} — ${p.mood}`;
    lbIndex.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${PAINTINGS.length}`;
    prefetch(currentIndex + 1);   // neighbours ready → instant arrow nav
    prefetch(currentIndex - 1);
  }

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function stepLightbox(delta) {
    currentIndex = (currentIndex + delta + PAINTINGS.length) % PAINTINGS.length;
    renderLightbox();
  }

  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxBackdrop").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lightboxNext").addEventListener("click", () => stepLightbox(1));

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") stepLightbox(1);
    if (e.key === "ArrowLeft") stepLightbox(-1);
  });

  // basic swipe support on the lightbox image
  let touchX = null;
  const imgWrap = document.querySelector(".lightbox__image-wrap");
  imgWrap.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  imgWrap.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) stepLightbox(dx > 0 ? -1 : 1);
    touchX = null;
  });

  /* ------------------------------------------------------------------
     SCROLL REVEAL
  ------------------------------------------------------------------ */
  function initRevealObserver() {
    const targets = document.querySelectorAll("[data-reveal]:not(.is-visible)");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((t) => io.observe(t));
  }
  initRevealObserver();

  // collection rows fade in as a staggered list once in view
  const collectionRows = () => document.querySelectorAll(".collection__row");
  const rowObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("is-visible"), i * 40);
        rowObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  // observe after list is built
  requestAnimationFrame(() => collectionRows().forEach((r) => rowObserver.observe(r)));

  /* ------------------------------------------------------------------
     CONTACT FORM (front-end only demo — wire up to your own endpoint
     or a service like Formspree / EmailJS to actually receive mail)
  ------------------------------------------------------------------ */
  const form = document.getElementById("commissionForm");
  const formNote = document.getElementById("formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formNote.textContent = "Thank you — your note has been noted locally. Connect this form to an email service to receive it in your inbox.";
    form.reset();
  });

  /* ------------------------------------------------------------------
     COLLECTION REEL — scroll-driven gallery zoom-out with adaptive frame.
     Paintings flip like a video; the frame reshapes to each image; the whole
     thing scales from immersive (1.45) down to a framed picture (0.42).
     Vanilla (no GSAP): CSS `position: sticky` pins it, a scroll handler ties
     the scale to how far you've scrolled through the tall .reel-track.
  ------------------------------------------------------------------ */
  (function initCollectionReel() {
    const track  = document.getElementById("reelTrack");
    const pin     = track ? track.querySelector(".reel-pin") : null;
    const frame   = document.getElementById("reelFrame");
    const screenEl = document.getElementById("reelScreen");
    const caption = document.getElementById("reelCaption");
    if (!track || !frame || !screenEl) return;

    // tunables (mirrors the approved preview defaults)
    const START_SCALE = 1.45;   // immersive / fills the view
    const END_SCALE   = 0.42;   // small framed picture on the wall
    const FLIP_MS     = 1000;   // painting change interval
    const FRAME_H     = 0.60;   // frame height as a fraction of viewport height
    const SQUARE_AS_CIRCLE = false;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Images are built LAZILY (only when the section nears the viewport) so the
    // 45-image catalogue no longer competes with the intro on first load.
    let shots = [];
    let built = false;
    let idx = 0;

    function build() {
      if (built) return;
      built = true;
      shots = PAINTINGS.map((p, i) => {
        const im = new Image();
        im.className = "reel-shot" + (i === 0 ? " is-on" : "");
        im.decoding = "async";
        im.src = `assets/paintings/md/${p.file}`;   // 1200px (~120KB) not full-res
        im.alt = `${p.title} — original oil painting by Maheen`;
        screenEl.appendChild(im);
        return im;
      });
      const first = shots[0];
      if (first.complete && first.naturalWidth) applyShape(first);
      else first.addEventListener("load", () => applyShape(first), { once: true });
      setCaption(0);
    }

    function classify(ar) {
      return ar >= 1.15 ? "landscape" : ar <= 0.87 ? "portrait" : "square";
    }
    function applyShape(img) {
      let ar = img._ar;
      if (!ar) { ar = (img.naturalWidth / img.naturalHeight) || 0.75; if (img.naturalWidth) img._ar = ar; }
      const shape = classify(ar);
      const isCircle = shape === "square" && SQUARE_AS_CIRCLE;
      const vh = window.innerHeight, vw = window.innerWidth;
      let h = vh * FRAME_H, w = h * ar;
      const maxW = vw * 0.82;
      if (w > maxW) { w = maxW; h = w / ar; }
      frame.style.width = w + "px";
      frame.style.height = h + "px";
      frame.classList.toggle("is-circle", isCircle);
    }
    function setCaption(i) {
      if (caption) caption.textContent =
        `${String(i + 1).padStart(2, "0")} / ${PAINTINGS.length} — ${PAINTINGS[i].title}`;
    }
    function showShot(n) {
      if (!shots.length) return;
      shots[idx].classList.remove("is-on");
      idx = n;
      shots[idx].classList.add("is-on");
      applyShape(shots[idx]);
      setCaption(idx);
    }

    // click / keyboard → open the lightbox at the current painting
    frame.setAttribute("role", "button");
    frame.setAttribute("tabindex", "0");
    frame.setAttribute("aria-label", "Open the current painting");
    frame.addEventListener("click", () => { if (shots.length) openLightbox(idx); });
    frame.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (shots.length) openLightbox(idx); }
    });

    // --- reduced motion: no pinning, no cycling; show a calm framed picture ---
    if (reduce) {
      track.classList.add("reel--static");
      pin.classList.add("is-framed");
      frame.style.transform = "none";
      build();
      return;
    }

    // --- scale tied to scroll progress through the track ---
    function onScroll() {
      const rect = track.getBoundingClientRect();
      const dist = rect.height - window.innerHeight;
      let p = dist > 0 ? (-rect.top) / dist : 0;
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      const scale = START_SCALE + (END_SCALE - START_SCALE) * p;
      frame.style.transform = `scale(${scale.toFixed(3)})`;
      pin.classList.toggle("is-framed", scale < (START_SCALE + END_SCALE) / 2);
    }
    let onView = false, ticking = false;
    function requestScroll() {
      if (!onView || ticking) return;      // only compute while the reel is on screen
      ticking = true;
      requestAnimationFrame(() => { onScroll(); ticking = false; });
    }
    window.addEventListener("scroll", requestScroll, { passive: true });
    let rTick = false;
    window.addEventListener("resize", () => {
      if (rTick) return;
      rTick = true;
      requestAnimationFrame(() => { if (shots.length) applyShape(shots[idx]); if (onView) onScroll(); rTick = false; });
    }, { passive: true });

    // flipbook — only runs while the reel is visible and the tab is active
    let flipTimer = null;
    function startFlip() { if (!flipTimer && shots.length) flipTimer = setInterval(() => showShot((idx + 1) % shots.length), FLIP_MS); }
    function stopFlip() { if (flipTimer) { clearInterval(flipTimer); flipTimer = null; } }

    // build + activate only when the section approaches the viewport; pause when it leaves
    const io = new IntersectionObserver((es) => {
      onView = es[0].isIntersecting;
      if (onView) { build(); onScroll(); if (!document.hidden) startFlip(); }
      else stopFlip();
    }, { rootMargin: "300px 0px 300px 0px", threshold: 0 });
    io.observe(track);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopFlip();
      else if (onView) startFlip();
    });
  })();

  /* ------------------------------------------------------------------
     FOOTER YEAR
  ------------------------------------------------------------------ */
  document.getElementById("year").textContent = new Date().getFullYear();

})();
