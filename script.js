async function loadContent(){
  const res=await fetch('content.json',{cache:'no-store'});
  const data=await res.json();
  window.SITE=data;
  fillText(data); fillLinks(data); renderProducts(data); renderPromos(data); renderSteps(data); renderReviews(data); renderFaqs(data); reveal();
}
function get(obj,path){return path.split('.').reduce((a,k)=>a&&a[k],obj)||''}
function fillText(data){document.querySelectorAll('[data-text]').forEach(el=>{el.textContent=get(data,el.dataset.text)})}
function fillLinks(data){
  const b=data.brand;
  const links={booking:b.bookingUrl,line:`https://line.me/ti/p/~${b.lineId}`,whatsapp:`https://wa.me/${b.whatsapp}`,phone:`tel:${b.phone}`};
  document.querySelectorAll('[data-link]').forEach(el=>{const key=el.dataset.link;if(links[key]){el.href=links[key];el.target=key==='phone'?'':'_blank';}});
  const map=document.getElementById('mapFrame'); if(map) map.src=b.mapUrl;
}
function renderProducts(data){
  const el=document.getElementById('productGrid'); if(!el)return;
  el.innerHTML=data.products.map(p=>`<article class="product-card reveal"><h3>${p.name}</h3><div class="price">${p.price}</div><p><strong>เหมาะกับ:</strong> ${p.bestFor}</p><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul><p><strong>ข้อควรรู้:</strong> ${p.weakness}</p></article>`).join('');
}
function renderPromos(data){
  const el=document.getElementById('promoGrid'); if(!el)return;
  el.innerHTML=data.promotions.map(p=>`<article class="promo-card reveal"><h3>${p.name}</h3><p class="old">ปกติ ${p.before} บาท</p><div class="new">${p.after} บาท</div><p>${p.note}</p></article>`).join('');
}
function renderSteps(data){const el=document.getElementById('stepsList'); if(el) el.innerHTML=data.steps.map(s=>`<li class="reveal">${s}</li>`).join('')}
function renderReviews(data){const el=document.getElementById('reviewGrid'); if(el) el.innerHTML=data.reviews.map(r=>`<article class="review-card reveal"><h3>${r.name}</h3><p>“${r.text}”</p></article>`).join('')}
function renderFaqs(data){const el=document.getElementById('faqList'); if(el) el.innerHTML=data.faqs.map(f=>`<article class="faq-item reveal"><h3>${f.q}</h3><p>${f.a}</p></article>`).join('')}
function reveal(){const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el))}
loadContent().catch(err=>{document.body.insertAdjacentHTML('afterbegin','<div style="padding:16px;background:#7f1d1d;color:white">โหลดข้อมูลเว็บไซต์ไม่สำเร็จ กรุณาตรวจ content.json</div>');console.error(err)})
