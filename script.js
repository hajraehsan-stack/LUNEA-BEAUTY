/* ==========================================================================
   Lunéa Beauty — High-Fashion GSAP Animations & Interactive System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Custom Luxury Glass Cursor
  initCustomCursor();

  // Initialize Ambient Sparkle Background Canvas
  initSparkleCanvas();

  // Safe GSAP Initialization
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initGSAPAnimations();
  } else {
    // Fallback if GSAP fails to load
    document.querySelectorAll('.scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-up').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // UI Interactive Systems
  initHeroParallax();
  initShadeSelector();
  initNavbarScroll();
  initMobileMenu();
  initCartDrawer();
});

/* --------------------------------------------------------------------------
   Custom Soft Luxury Glass Cursor
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const follower = document.getElementById('cursorFollower');
  if (!dot || !follower || window.innerWidth <= 768) return;

  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  gsap.ticker.add(() => {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;
    follower.style.left = `${posX}px`;
    follower.style.top = `${posY}px`;
  });

  const hoverTargets = 'a, button, .swatch-btn, .product-card, .ingredient-hotspot, .quiz-opt-btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

/* --------------------------------------------------------------------------
   Ambient Sparkle Canvas Background
   -------------------------------------------------------------------------- */
function initSparkleCanvas() {
  const canvas = document.getElementById('sparkleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 28;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      alpha: Math.random() * 0.6 + 0.2,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      color: Math.random() > 0.4 ? 'rgba(232, 156, 174, ' : 'rgba(212, 175, 55, '
    });
  }

  function drawSparkles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(232, 156, 174, 0.5)';
      ctx.fill();
    });

    requestAnimationFrame(drawSparkles);
  }

  drawSparkles();
}

/* --------------------------------------------------------------------------
   GSAP Motion & ScrollTrigger Systems
   -------------------------------------------------------------------------- */
function initGSAPAnimations() {
  // 1. Hero Entrance Timeline
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.1 } });

  heroTl
    .from('#navbar', { y: -50, opacity: 0, duration: 0.8 })
    .from('.hero-anim', { y: 40, opacity: 0, stagger: 0.15 }, '-=0.4')
    .from('#heroProductImg', { scale: 0.88, opacity: 0, duration: 1.2, ease: 'power2.out' }, '-=0.9')
    .from('#floatTag1', { x: -30, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.7')
    .from('#floatTag2', { x: 30, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.7');

  // 2. Hero Floating Oscillation
  gsap.to('.hero-anim-img', {
    y: -14,
    duration: 3.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // 3. Featured Collection Stagger Reveal
  const productCards = document.querySelectorAll('.product-card');
  if (productCards.length > 0) {
    gsap.fromTo('.product-card', 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#shop',
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out'
      }
    );
  }

  // 4. Showcase & Editorial Reveals
  gsap.fromTo('.scroll-reveal-left', 
    { x: -40, opacity: 0 },
    {
      scrollTrigger: {
        trigger: '.product-showcase',
        start: 'top 80%'
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }
  );

  gsap.fromTo('.scroll-reveal-right', 
    { x: 40, opacity: 0 },
    {
      scrollTrigger: {
        trigger: '.product-showcase',
        start: 'top 80%'
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }
  );

  gsap.utils.toArray('.scroll-reveal-up').forEach(item => {
    gsap.fromTo(item, 
      { y: 35, opacity: 0 },
      {
        scrollTrigger: {
          trigger: item,
          start: 'top 88%'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }
    );
  });

  // Refresh ScrollTrigger positions after page load
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
}

/* --------------------------------------------------------------------------
   Mouse Tilt Parallax Effect in Hero
   -------------------------------------------------------------------------- */
function initHeroParallax() {
  const container = document.getElementById('heroVisualContainer');
  const imgWrapper = document.querySelector('.hero-image-wrapper');
  const tag1 = document.getElementById('floatTag1');
  const tag2 = document.getElementById('floatTag2');

  if (!container || !imgWrapper || window.innerWidth <= 768) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -8;
    const tiltY = (x / (rect.width / 2)) * 8;

    gsap.to(imgWrapper, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.5,
      ease: 'power1.out'
    });

    gsap.to(tag1, { x: tiltY * 1.5, y: tiltX * 1.5, duration: 0.4 });
    gsap.to(tag2, { x: tiltY * -1.5, y: tiltX * -1.5, duration: 0.4 });
  });

  container.addEventListener('mouseleave', () => {
    gsap.to(imgWrapper, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power2.out' });
    gsap.to(tag1, { x: 0, y: 0, duration: 0.8 });
    gsap.to(tag2, { x: 0, y: 0, duration: 0.8 });
  });
}

/* --------------------------------------------------------------------------
   Hero Finish Intensity Selector
   -------------------------------------------------------------------------- */
function setHeroFinish(type, btn) {
  document.querySelectorAll('.finish-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  const heroBgGlow = document.getElementById('heroBgGlow');
  const heroFinishTagText = document.getElementById('heroFinishTagText');
  const heroSwatchMini = document.getElementById('heroSwatchMini');

  if (type === 'sheer') {
    if (heroBgGlow) heroBgGlow.style.background = 'radial-gradient(circle, rgba(232, 156, 174, 0.35) 0%, transparent 70%)';
    if (heroFinishTagText) heroFinishTagText.textContent = 'Soft Sheer Rose';
    if (heroSwatchMini) heroSwatchMini.style.backgroundColor = '#E89CAE';
  } else if (type === 'hydrating') {
    if (heroBgGlow) heroBgGlow.style.background = 'radial-gradient(circle, rgba(200, 141, 123, 0.45) 0%, transparent 70%)';
    if (heroFinishTagText) heroFinishTagText.textContent = 'High-Gloss Caramel';
    if (heroSwatchMini) heroSwatchMini.style.backgroundColor = '#C88D7B';
  } else if (type === 'mirror') {
    if (heroBgGlow) heroBgGlow.style.background = 'radial-gradient(circle, rgba(107, 35, 53, 0.45) 0%, transparent 70%)';
    if (heroFinishTagText) heroFinishTagText.textContent = 'Crystal Plum Mirror';
    if (heroSwatchMini) heroSwatchMini.style.backgroundColor = '#6B2335';
  }
}

/* --------------------------------------------------------------------------
   Ingredient Hotspots Interaction
   -------------------------------------------------------------------------- */
function selectHotspot(type, el) {
  document.querySelectorAll('.ingredient-hotspot').forEach(h => h.classList.remove('active'));
  el.classList.add('active');

  document.querySelectorAll('.feature-checklist li').forEach(li => li.classList.remove('active'));
  if (type === 'hyaluronic') {
    document.getElementById('featHyaluronic').classList.add('active');
  } else if (type === 'jojoba') {
    document.getElementById('featJojoba').classList.add('active');
  } else if (type === 'collagen') {
    document.getElementById('featCollagen').classList.add('active');
  }
}

/* --------------------------------------------------------------------------
   Interactive Shade Selector Swapper
   -------------------------------------------------------------------------- */
let activeShadeData = {
  name: 'Rose Glow',
  price: 26,
  img: 'images/rose_glow.jpg',
  finish: 'Soft Rose Tint'
};

function initShadeSelector() {
  const swatches = document.querySelectorAll('.swatch-btn');
  const displayImg = document.getElementById('shadeDisplayImg');
  const shadeAura = document.getElementById('shadeAura');
  const shadeTitle = document.getElementById('shadeTitle');
  const shadeNumTag = document.getElementById('shadeNumTag');
  const shadeFinish = document.getElementById('shadeFinish');
  const shadeDesc = document.getElementById('shadeDesc');
  const shadeBadgeLive = document.getElementById('shadeBadgeLive');
  const btnShadeName = document.getElementById('btnShadeName');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      const name = swatch.dataset.name;
      const num = swatch.dataset.num;
      const finish = swatch.dataset.finish;
      const badge = swatch.dataset.badge;
      const desc = swatch.dataset.desc;
      const imgSrc = swatch.dataset.img;
      const auraColor = swatch.dataset.auracolor;

      activeShadeData = { name, price: 26, img: imgSrc, finish };

      if (btnShadeName) btnShadeName.textContent = name;

      if (typeof gsap !== 'undefined') {
        gsap.to(displayImg, {
          opacity: 0,
          scale: 0.94,
          duration: 0.25,
          onComplete: () => {
            displayImg.src = imgSrc;
            shadeTitle.textContent = name;
            shadeNumTag.textContent = num;
            shadeFinish.textContent = finish;
            shadeDesc.textContent = desc;
            if (shadeBadgeLive) shadeBadgeLive.textContent = badge;
            if (shadeAura) shadeAura.style.background = auraColor;

            gsap.to(displayImg, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
          }
        });
      } else {
        displayImg.src = imgSrc;
        shadeTitle.textContent = name;
        shadeNumTag.textContent = num;
        shadeFinish.textContent = finish;
        shadeDesc.textContent = desc;
        if (shadeBadgeLive) shadeBadgeLive.textContent = badge;
        if (shadeAura) shadeAura.style.background = auraColor;
      }
    });
  });
}

function addCurrentShadeToCart() {
  addToCart(activeShadeData.name, activeShadeData.price, activeShadeData.img, activeShadeData.finish);
}

/* --------------------------------------------------------------------------
   Testimonials Filter
   -------------------------------------------------------------------------- */
function filterReviews(shade, btn) {
  document.querySelectorAll('.review-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const items = document.querySelectorAll('.testimonial-editorial-item');

  items.forEach(item => {
    const itemShade = item.dataset.reviewShade;
    if (shade === 'all' || itemShade === shade) {
      item.style.display = 'flex';
      gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
    } else {
      item.style.display = 'none';
    }
  });
}

/* --------------------------------------------------------------------------
   Shade Finder Quiz System
   -------------------------------------------------------------------------- */
let quizUndertone = 'warm';

function openQuizModal() {
  document.getElementById('quizModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  resetQuiz();
}

function closeQuizModal(e) {
  if (e && e.target !== document.getElementById('quizModalOverlay')) return;
  document.getElementById('quizModalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function nextQuizStep(undertone) {
  quizUndertone = undertone;
  document.getElementById('quizStep1').classList.remove('active');
  document.getElementById('quizStep2').classList.add('active');
}

function finishQuiz(vibe) {
  document.getElementById('quizStep2').classList.remove('active');
  document.getElementById('quizResultStep').classList.add('active');

  const resultTitle = document.getElementById('quizResultTitle');
  const resultShadeName = document.getElementById('quizResultShadeName');
  const resultShadeDesc = document.getElementById('quizResultShadeDesc');
  const resultImg = document.getElementById('quizResultImg');

  if (vibe === 'rose') {
    resultTitle.textContent = 'Rose Glow';
    resultShadeName.textContent = 'Rose Glow';
    resultShadeDesc.textContent = 'Soft Sheer Rose • Golden Micro-Shimmer';
    resultImg.src = 'images/rose_glow.jpg';
    activeQuizMatch = { name: 'Rose Glow', price: 26, img: 'images/rose_glow.jpg', finish: 'Soft Rose Tint' };
  } else if (vibe === 'nude') {
    resultTitle.textContent = 'Nude Muse';
    resultShadeName.textContent = 'Nude Muse';
    resultShadeDesc.textContent = 'Warm Honey Nude • Satin Finish';
    resultImg.src = 'images/nude_muse.jpg';
    activeQuizMatch = { name: 'Nude Muse', price: 26, img: 'images/nude_muse.jpg', finish: 'Warm Caramel Nude' };
  } else {
    resultTitle.textContent = 'Berry Crush';
    resultShadeName.textContent = 'Berry Crush';
    resultShadeDesc.textContent = 'Deep Burgundy Plum • Mirror Glass';
    resultImg.src = 'images/berry_crush.jpg';
    activeQuizMatch = { name: 'Berry Crush', price: 26, img: 'images/berry_crush.jpg', finish: 'Deep Plum Berry' };
  }
}

let activeQuizMatch = { name: 'Rose Glow', price: 26, img: 'images/rose_glow.jpg', finish: 'Soft Rose Tint' };

function addQuizMatchToCart() {
  addToCart(activeQuizMatch.name, activeQuizMatch.price, activeQuizMatch.img, activeQuizMatch.finish);
  closeQuizModal(null);
}

function resetQuiz() {
  document.getElementById('quizStep1').classList.add('active');
  document.getElementById('quizStep2').classList.remove('active');
  document.getElementById('quizResultStep').classList.remove('active');
}

/* --------------------------------------------------------------------------
   Cart Drawer System
   -------------------------------------------------------------------------- */
let cart = [];

function addToCart(title, price, img, shade) {
  const existing = cart.find(item => item.title === title);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ title, price, img, shade, qty: 1 });
  }

  updateCartUI();
  showToast(`Added ${title} to bag`);
  openCart();
}

function removeFromCart(title) {
  cart = cart.filter(item => item.title !== title);
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartFooter = document.getElementById('cartFooter');
  const cartSubtotal = document.getElementById('cartSubtotal');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cartCount) cartCount.textContent = totalItems;

  if (totalItems === 0) {
    if (cartEmptyState) cartEmptyState.style.display = 'block';
    if (cartFooter) cartFooter.style.display = 'none';
    cartItemsContainer.innerHTML = '';
    cartItemsContainer.appendChild(cartEmptyState);
  } else {
    if (cartEmptyState) cartEmptyState.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'block';

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.img}" alt="${item.title}" class="cart-item-img" />
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <span class="cart-item-shade">${item.shade} (x${item.qty})</span>
          <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.title}')">Remove</button>
      `;
      cartItemsContainer.appendChild(itemEl);
    });

    if (cartSubtotal) cartSubtotal.textContent = `$${totalCost.toFixed(2)}`;
  }
}

function initCartDrawer() {
  const cartBtn = document.getElementById('cartBtn');
  const cartClose = document.getElementById('cartClose');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('cartOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('cartOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function checkoutAlert() {
  alert('Thank you for choosing Lunéa Beauty! Proceeding to secure checkout...');
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

/* --------------------------------------------------------------------------
   Navbar & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) mobileMenu.classList.remove('active');
}

/* --------------------------------------------------------------------------
   Newsletter Handler
   -------------------------------------------------------------------------- */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletterEmail');
  const msg = document.getElementById('newsletterMsg');

  if (emailInput && emailInput.value) {
    msg.textContent = 'Welcome to the Lunéa inner circle! Check your inbox for 15% off.';
    emailInput.value = '';
    setTimeout(() => { msg.textContent = ''; }, 5000);
  }
}
