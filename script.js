document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Menu Toggle ---
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileBtn.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileBtn.classList.remove('active');
      });
    });
  }

  // --- 2. Interactive Before & After Slider ---
  const sliderContainer = document.getElementById('beforeAfterSlider');
  const beforeWrapper = document.getElementById('beforeWrapper');
  const sliderHandle = document.getElementById('sliderHandle');

  if (sliderContainer && beforeWrapper && sliderHandle) {
    let isDragging = false;

    function setSliderPosition(xPos) {
      const rect = sliderContainer.getBoundingClientRect();
      let offsetX = xPos - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      beforeWrapper.style.width = `${percentage}%`;
      sliderHandle.style.left = `${percentage}%`;
    }

    sliderContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile
    sliderContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // --- 3. Portfolio Filter Tabs ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 4. Stamped Textures & Finishes Visualizer Data ---
  const textureData = {
    ashlar: {
      badge: 'SIGNATURE PATIO FINISH',
      title: 'Ashlar Roman Slate Stamping',
      desc: 'Our most requested luxury finish. Replicates hand-cut natural limestone and slate slabs with deep, organic grout lines. Finished with a multi-tone antique color release and an industrial-grade UV sealant that repels water, wine, grease, and Colorado snow melt.',
      durability: '4,500+ PSI Air-Entrained',
      colors: 'Charcoal, Sandstone, Walnut, Terra',
      slip: 'Micro-Silica Non-Slip Additive',
      bestFor: 'Patios, Pool Decks, Courtyards'
    },
    cobble: {
      badge: 'OLD-WORLD LUXURY',
      title: 'European & London Cobblestone',
      desc: 'Classic European street stone textures with soft-curved or radial fan interlocking patterns. Perfect for luxury motor courts, circular driveways, and historical mountain estates requiring authentic stone aesthetics with zero shifting pavers.',
      durability: '5,000 PSI High Heavy-Load Mix',
      colors: 'Granite Gray, Antique Pewter, Basalt Black',
      slip: 'High Traction Natural Texture',
      bestFor: 'Driveways, Motor Courts, Entryways'
    },
    wood: {
      badge: 'RUSTIC MOUNTAIN MODERN',
      title: 'Reclaimed Timber Wood Plank',
      desc: 'Authentic reclaimed barnwood grain textures, knot details, and plank borders stamped directly into monolithic structural concrete. Enjoy the warmth and rustic charm of a Colorado wood deck without rot, warping, splinters, or annual staining.',
      durability: '4,500 PSI Fiber Reinforced',
      colors: 'Weathered Oak, Saddle Brown, Driftwood',
      slip: 'Textured Wood Grain Grip',
      bestFor: 'Pergola Decks, Mountain Cabins, Covered Patios'
    },
    boardform: {
      badge: 'ARCHITECTURAL CONTEMPORARY',
      title: 'Board-Formed Walls & Floating Steps',
      desc: 'The benchmark of modern architectural concrete design. Cast-in-place retaining walls and cantilevered floating steps bearing the subtle texture of rough-sawn lumber. Integrated with hidden LED channels for dramatic evening illumination.',
      durability: '5,000 PSI Self-Consolidating',
      colors: 'Natural Cement Grey, Matte Graphite',
      slip: 'Cast Cantilever Diamond Edges',
      bestFor: 'Cantilever Steps, Modern Walls, Fire Features'
    },
    broomed: {
      badge: 'CLEAN MINIMALIST STANDARD',
      title: 'Heavy Broomed + Picture-Frame Borders',
      desc: 'Crisp, contemporary flatwork featuring a consistent directional broom finish bordered by a 4-inch hand-troweled smooth picture frame. Engineered for maximum traction during icy winter mornings and clean architectural lines.',
      durability: '4,500 PSI Mountain Standard',
      colors: 'Natural Light Gray, Integral Smoke, Buff',
      slip: 'Maximum Non-Skid Traction',
      bestFor: 'Driveways, Sidewalks, Commercial Pads'
    }
  };

  const textureButtons = document.querySelectorAll('#textureNav .t-btn');
  const textureBadge = document.getElementById('textureBadge');
  const textureTitle = document.getElementById('textureTitle');
  const textureDesc = document.getElementById('textureDesc');
  const textureFeatures = document.getElementById('textureFeatures');

  textureButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      textureButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-texture');
      const data = textureData[key];

      if (data && textureBadge && textureTitle && textureDesc && textureFeatures) {
        textureBadge.textContent = data.badge;
        textureTitle.textContent = data.title;
        textureDesc.textContent = data.desc;

        textureFeatures.innerHTML = `
          <div class="t-feat">
            <span class="feat-icon">💎</span>
            <strong>Durability</strong>
            <span>${data.durability}</span>
          </div>
          <div class="t-feat">
            <span class="feat-icon">🎨</span>
            <strong>Color Palette</strong>
            <span>${data.colors}</span>
          </div>
          <div class="t-feat">
            <span class="feat-icon">🛡️</span>
            <strong>Slip Resistance</strong>
            <span>${data.slip}</span>
          </div>
          <div class="t-feat">
            <span class="feat-icon">🏡</span>
            <strong>Best For</strong>
            <span>${data.bestFor}</span>
          </div>
        `;
      }
    });
  });

  // --- 5. Interactive 3D Project Cost Estimator & Material Engine ---
  const rates = {
    stamped: { base: 14.5, prepDemo: 4.2, prepDirt: 2.2, thicknessMul: { 4: 1.0, 5: 1.15, 6: 1.30 }, psi: '4,500 PSI Air-Entrained' },
    driveway: { base: 11.0, prepDemo: 3.8, prepDirt: 2.0, thicknessMul: { 4: 1.0, 5: 1.12, 6: 1.25 }, psi: '5,000 PSI Heavy-Load' },
    steps: { base: 17.0, prepDemo: 4.5, prepDirt: 2.5, thicknessMul: { 4: 1.0, 5: 1.15, 6: 1.30 }, psi: '5,000 PSI High Strength' },
    slab: { base: 9.8, prepDemo: 3.5, prepDirt: 1.8, thicknessMul: { 4: 1.0, 5: 1.12, 6: 1.25 }, psi: '4,500 PSI Structural' },
    kitchen: { base: 16.0, prepDemo: 4.0, prepDirt: 2.2, thicknessMul: { 4: 1.0, 5: 1.15, 6: 1.30 }, psi: '4,500 PSI Decorative' }
  };

  const projectTypeOptions = document.querySelectorAll('#projectTypes .calc-opt');
  const sqftRange = document.getElementById('sqftRange');
  const sqftDisplay = document.getElementById('sqftDisplay');
  const prepSelect = document.getElementById('calcPrep');
  const thicknessSelect = document.getElementById('calcThickness');
  
  const priceDisplay = document.getElementById('calcPriceDisplay');
  const yardageEstimate = document.getElementById('yardageEstimate');
  const timelineEstimate = document.getElementById('timelineEstimate');
  const psiEstimate = document.getElementById('psiEstimate');

  let currentType = 'stamped';

  function calculateFullEstimate() {
    if (!sqftRange || !priceDisplay) return;

    const sqft = parseInt(sqftRange.value);
    sqftDisplay.textContent = `${sqft.toLocaleString()} sq ft`;

    const prep = prepSelect ? prepSelect.value : 'demo';
    const thickness = thicknessSelect ? parseInt(thicknessSelect.value) : 4;
    const cfg = rates[currentType] || rates.stamped;

    // Base cost per sq ft
    let costPerSqft = cfg.base;

    // Prep cost
    if (prep === 'demo') costPerSqft += cfg.prepDemo;
    else if (prep === 'dirt') costPerSqft += cfg.prepDirt;

    // Thickness multiplier
    const tMul = cfg.thicknessMul[thickness] || 1.0;
    costPerSqft = costPerSqft * tMul;

    // Estimated Price Range
    const minPrice = Math.round((sqft * costPerSqft * 0.94) / 50) * 50;
    const maxPrice = Math.round((sqft * costPerSqft * 1.12) / 50) * 50;

    priceDisplay.textContent = `$${minPrice.toLocaleString()} – $${maxPrice.toLocaleString()}`;

    // Estimated Concrete Volume in Cubic Yards (with 10% safety overage)
    const cubicFeet = sqft * (thickness / 12);
    const cubicYards = ((cubicFeet / 27) * 1.10).toFixed(1);
    if (yardageEstimate) {
      yardageEstimate.textContent = `${cubicYards} Cubic Yards`;
    }

    // Estimated Project Timeline
    if (timelineEstimate) {
      let days = 3;
      if (sqft > 600) days = 4;
      if (sqft > 1100) days = 5;
      if (sqft > 1600) days = 6;
      if (prep === 'demo') days += 1;
      timelineEstimate.textContent = `${days} to ${days + 1} Business Days`;
    }

    // PSI Strength
    if (psiEstimate) {
      psiEstimate.textContent = cfg.psi;
    }
  }

  projectTypeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      projectTypeOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      currentType = opt.getAttribute('data-type');
      calculateFullEstimate();
    });
  });

  if (sqftRange) sqftRange.addEventListener('input', calculateFullEstimate);
  if (prepSelect) prepSelect.addEventListener('change', calculateFullEstimate);
  if (thicknessSelect) thicknessSelect.addEventListener('change', calculateFullEstimate);

  // Initial calculation
  calculateFullEstimate();

  // --- 6. Lightbox Modal Functionality ---
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  const portfolioImageWrappers = document.querySelectorAll('.p-img-wrap');

  portfolioImageWrappers.forEach(wrap => {
    wrap.addEventListener('click', () => {
      const img = wrap.querySelector('.p-img');
      const card = wrap.closest('.portfolio-card');
      const title = card ? card.querySelector('h3').textContent : 'Project Photo';
      const loc = card ? card.querySelector('.p-loc').textContent : '';

      if (lightbox && lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxCaption) lightboxCaption.textContent = `${title} • ${loc}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightboxModal() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightboxModal);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightboxModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightboxModal();
  });

  // --- 7. Form Handler & Toast Notification ---
  window.handleFormSubmit = function() {
    const nameInput = document.getElementById('formName');
    const phoneInput = document.getElementById('formPhone');
    const serviceInput = document.getElementById('formService');

    const name = nameInput ? nameInput.value.trim() : 'Customer';
    const service = serviceInput ? serviceInput.value : 'Concrete Estimate';

    // Show Toast
    showToast(`Thank you, ${name}! Your request for ${service} has been received. Our master estimator will call you within 2 hours.`);

    // Reset Form
    const form = document.getElementById('leadForm');
    if (form) form.reset();
  };

  function showToast(msg) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = msg;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

});
