let siteData = null;

const getValue = (path) => path.split('.').reduce((obj, key) => obj?.[key], siteData) ?? '';

function setTextContent() {
  document.querySelectorAll('[data-content]').forEach((el) => {
    el.textContent = getValue(el.dataset.content);
  });
}

function placeholderSvg(label) {
  const safe = encodeURIComponent(label);
  return `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 1100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%2324180a'/%3E%3Cstop offset='1' stop-color='%23060606'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='1100' fill='url(%23g)'/%3E%3Ccircle cx='450' cy='430' r='210' fill='none' stroke='%23d7ad55' stroke-width='5' opacity='.45'/%3E%3Ctext x='50%25' y='54%25' text-anchor='middle' fill='%23f2d58a' font-size='58' font-family='Arial' font-weight='700'%3E${safe}%3C/text%3E%3Ctext x='50%25' y='62%25' text-anchor='middle' fill='%23b8ad9d' font-size='24' font-family='Arial'%3EReplace image in GitHub%3C/text%3E%3C/svg%3E`;
}

function imageTag(src, alt, label) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt || label;
  img.loading = 'lazy';
  img.onerror = () => { img.src = placeholderSvg(label); };
  return img;
}

function renderHeroSlider() {
  const slider = document.getElementById('heroSlider');
  slider.innerHTML = siteData.hero.slides.map((slide, index) => `<div class="slide ${index === 0 ? 'active' : ''}" data-slide="hero"><img src="${slide.image}" alt="${slide.alt}" onerror="this.src='${placeholderSvg(`Hero ${index + 1}`)}'"></div>`).join('');
  startSlider('[data-slide="hero"]', 3600);
}

function startSlider(selector, interval) {
  const slides = [...document.querySelectorAll(selector)];
  if (slides.length <= 1) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, interval);
}

function renderTrust() {
  document.getElementById('trustList').innerHTML = siteData.trust.map(item => `<div class="trust-item">✦ ${item}</div>`).join('');
}

function renderProducts() {
  document.getElementById('productGrid').innerHTML = siteData.products.map((product) => `
    <article class="product-card">
      <div class="product-image"><img src="${product.image}" alt="${product.name}" onerror="this.src='${placeholderSvg(product.name)}'"></div>
      <div class="product-top"><h3>${product.name}</h3><span class="badge">${product.label}</span></div>
      <p class="price">฿${product.price}</p>
      <p>${product.description}</p>
      <ul>${product.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
    </article>`).join('');
}

function renderBeforeAfter() {
  const slider = document.getElementById('beforeAfterSlider');
  slider.innerHTML = siteData.beforeAfter.map((item, index) => `
    <div class="slide ${index === 0 ? 'active' : ''}" data-slide="ba">
      <div class="ba-pair">
        <figure><img src="${item.before}" alt="Before" onerror="this.src='${placeholderSvg('Before')}'"><figcaption>Before</figcaption></figure>
        <figure><img src="${item.after}" alt="After" onerror="this.src='${placeholderSvg('After')}'"><figcaption>After</figcaption></figure>
      </div>
      <p class="ba-caption">${item.caption}</p>
    </div>`).join('');
  startSlider('[data-slide="ba"]', 4200);
}

function renderSteps() {
  document.getElementById('stepsGrid').innerHTML = siteData.steps.map((step, index) => `
    <article class="step"><div class="step-number">0${index + 1}</div><h3>${step.title}</h3><p>${step.text}</p></article>`).join('');
}

function renderReviews() {
  document.getElementById('reviewSlider').innerHTML = siteData.reviews.map((review, index) => `
    <article class="review ${index === 0 ? 'active' : ''}" data-slide="review"><blockquote>“${review.text}”</blockquote><cite>${review.name}</cite></article>`).join('');
  startSlider('[data-slide="review"]', 3800);
}

function handleBooking(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const message = `สวัสดีครับ 1DD STUDIO%0Aชื่อ: ${data.get('name')}%0Aเบอร์: ${data.get('phone')}%0Aวันที่สนใจ: ${data.get('date') || '-'}%0Aรายละเอียด: ${data.get('detail') || '-'}`;
  document.getElementById('formStatus').textContent = 'กำลังเปิดข้อความสำหรับส่งจองคิว...';
  window.location.href = `sms:${siteData.brand.phone}?&body=${message}`;
  return false;
}

async function init() {
  const response = await fetch('content.json');
  siteData = await response.json();
  setTextContent();
  renderHeroSlider();
  renderTrust();
  renderProducts();
  renderBeforeAfter();
  renderSteps();
  renderReviews();
}

init().catch((error) => {
  console.error(error);
  document.body.insertAdjacentHTML('afterbegin', '<p style="padding:16px;background:#3b2208;color:#fff">โหลด content.json ไม่สำเร็จ กรุณาตรวจสอบไฟล์</p>');
});
