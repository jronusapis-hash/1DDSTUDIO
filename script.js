async function loadContent(){
  const res = await fetch('content.json?cache=' + Date.now());
  const data = await res.json();
  const brand = data.brand;
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('heroBadge').textContent = data.hero.badge;
  document.getElementById('heroTitle').textContent = data.hero.titleTH;
  document.getElementById('heroSub').textContent = data.hero.subtitleTH;
  document.getElementById('heroSubEn').textContent = data.hero.subtitleEN;
  document.getElementById('heroBg').style.backgroundImage = `url('${data.hero.image}')`;
  const bookLinks = ['bookingBtn','navBooking','contactBooking'];
  bookLinks.forEach(id=>document.getElementById(id).href=brand.bookingUrl);
  document.getElementById('whatsappBtn').href = `https://wa.me/${brand.whatsapp}`;
  document.getElementById('lineBtn').href = `https://line.me/R/ti/p/~${brand.lineId}`;
  document.getElementById('floatingLine').href = `https://line.me/R/ti/p/~${brand.lineId}`;
  document.getElementById('callBtn').href = `tel:${brand.phone}`;
  document.getElementById('contactInfo').innerHTML = `${brand.location}<br>เปิดบริการ ${brand.hours}<br>โทร ${brand.phone} • LINE: ${brand.lineId}`;
  document.getElementById('mapFrame').src = brand.mapUrl;

  let baIndex = 0;
  function renderBeforeAfter(){
    const item = data.beforeAfter[baIndex];
    document.getElementById('baGrid').innerHTML = `
      <div class="ba-slider-v3 reveal">
        <button class="ba-nav-btn" id="baPrev" aria-label="ก่อนหน้า">‹</button>
        <article class="ba-card ba-card-v3">
          <div class="ba-images ba-images-v3">
            <div class="ba-img ba-img-v3" data-label="ก่อนทำ" style="background-image:url('${item.before}')"></div>
            <div class="ba-img ba-img-v3" data-label="หลังทำ" style="background-image:url('${item.after}')"></div>
          </div>
          <div class="ba-info"><h3>${item.title}</h3><p>${item.note}</p></div>
        </article>
        <button class="ba-nav-btn" id="baNext" aria-label="ถัดไป">›</button>
      </div>
      <div class="ba-dots-v3">
        ${data.beforeAfter.map((_,i)=>`<button class="${i===baIndex?'active':''}" data-ba="${i}" aria-label="เคส ${i+1}"></button>`).join('')}
      </div>`;
    document.getElementById('baPrev').onclick = () => { baIndex = (baIndex - 1 + data.beforeAfter.length) % data.beforeAfter.length; renderBeforeAfter(); };
    document.getElementById('baNext').onclick = () => { baIndex = (baIndex + 1) % data.beforeAfter.length; renderBeforeAfter(); };
    document.querySelectorAll('[data-ba]').forEach(btn=>btn.onclick = () => { baIndex = Number(btn.dataset.ba); renderBeforeAfter(); });
  }
  renderBeforeAfter();

  document.getElementById('proofStrip').innerHTML = data.proof.map(p=>`<div class="proof-item"><b>${p.value}</b><span>${p.label}</span></div>`).join('');

  document.getElementById('productGrid').innerHTML = data.products.map(p=>`
    <article class="product-card reveal">
      <div class="product-image" style="background-image:url('${p.image}')"></div>
      <div class="product-card-content"><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${p.price}</div><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul></div>
    </article>`).join('');

  document.getElementById('serviceGrid').innerHTML = data.services.map((s,i)=>`<div class="service-item"><b>0${i+1}</b><p>${s}</p></div>`).join('');
  document.getElementById('reviewGrid').innerHTML = data.reviews.map(r=>`<article class="review-card"><p>“${r.text}”</p><b>${r.name}</b></article>`).join('');
  document.getElementById('faqList').innerHTML = data.faq.map((f,i)=>`<div class="faq-item ${i===0?'open':''}"><div class="faq-q">${f.q}<span>+</span></div><div class="faq-a">${f.a}</div></div>`).join('');
  document.querySelectorAll('.faq-q').forEach(q=>q.addEventListener('click',()=>q.parentElement.classList.toggle('open')));
}
loadContent();
