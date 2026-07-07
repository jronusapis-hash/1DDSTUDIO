async function loadContent(){
  const res = await fetch('content.json?v=' + Date.now());
  return res.json();
}
let reviewIndex = 0;
let reviewImages = [];
function renderReview(){
  const img = document.getElementById('reviewImage');
  const dots = document.getElementById('reviewDots');
  if(!img || !dots || !reviewImages.length) return;
  img.src = reviewImages[reviewIndex];
  dots.innerHTML = reviewImages.map((_,i)=>`<button class="${i===reviewIndex?'active':''}" onclick="goReview(${i})"></button>`).join('');
}
function moveReview(step){ reviewIndex=(reviewIndex+step+reviewImages.length)%reviewImages.length; renderReview(); }
function goReview(i){ reviewIndex=i; renderReview(); }
loadContent().then(data=>{
  const b=data.brand,h=data.hero;
  document.getElementById('heroBadge').textContent=h.badge;
  document.getElementById('heroTitle').textContent=h.title;
  document.getElementById('heroSubtitle').textContent=h.subtitle;
  document.getElementById('heroImage').src=h.image;
  document.getElementById('bookingTop').href=b.bookingUrl;
  document.getElementById('bookingHero').href=b.bookingUrl;
  document.getElementById('whatsappHero').href=`https://wa.me/${b.whatsapp}`;
  document.getElementById('lineBtn').href=`https://line.me/ti/p/~${b.lineId}`;
  document.getElementById('floatingLine').href=`https://line.me/ti/p/~${b.lineId}`;
  document.getElementById('mapBtn').href=b.mapUrl;
  document.getElementById('contactInfo').textContent=`LINE: ${b.lineId} • โทร ${b.phone} • เวลา ${b.hours} • ${b.location}`;
  reviewImages=data.reviewImages;
  renderReview();
  document.getElementById('prevReview').onclick=()=>moveReview(-1);
  document.getElementById('nextReview').onclick=()=>moveReview(1);
  document.getElementById('productGrid').innerHTML=data.products.map(p=>`
    <article class="product"><img src="${p.image}" alt="${p.name}"><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${p.price}</div><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul></article>
  `).join('');
  document.getElementById('faqList').innerHTML=data.faq.map(f=>`<article class="faqItem"><h3>${f.q}</h3><p>${f.a}</p></article>`).join('');
});
