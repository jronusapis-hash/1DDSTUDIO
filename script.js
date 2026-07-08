let data={};
const $=(s)=>document.querySelector(s);
const el=(tag,cls)=>{const n=document.createElement(tag); if(cls)n.className=cls; return n;};
const img=(src,alt)=>{const i=new Image(); i.src=src; i.alt=alt||''; i.loading='lazy'; return i;};

async function loadContent(){
  try{const r=await fetch('content.json',{cache:'no-store'}); data=await r.json();}
  catch(e){console.error('Cannot load content.json',e); return;}
  applySeo(); renderHero(); renderBenefits(); renderProducts(); renderBeforeAfter(); renderSteps(); renderReviews(); renderFaq(); setupBooking(); setupNav(); renderSchema();
}

function applySeo(){
  if(data.seo?.title) document.title=data.seo.title;
  const desc=document.querySelector('meta[name="description"]'); if(desc&&data.seo?.description) desc.content=data.seo.description;
}

let heroIndex=0, heroTimer;
function renderHero(){
  const dots=$('#heroDots'); dots.innerHTML='';
  data.hero.forEach((_,i)=>{const b=el('button'); b.type='button'; b.addEventListener('click',()=>setHero(i,true)); dots.appendChild(b);});
  setHero(0); heroTimer=setInterval(()=>setHero((heroIndex+1)%data.hero.length),5200);
}
function setHero(i,manual=false){
  heroIndex=i; const h=data.hero[i];
  $('#heroBg').style.backgroundImage=`url('${h.image}')`;
  $('#heroEyebrow').textContent=h.eyebrow; $('#heroTitle').textContent=h.title; $('#heroSubtitle').textContent=h.subtitle;
  [...$('#heroDots').children].forEach((d,idx)=>d.classList.toggle('active',idx===i));
  if(manual){clearInterval(heroTimer); heroTimer=setInterval(()=>setHero((heroIndex+1)%data.hero.length),5200);}
}

function renderBenefits(){
  $('#benefits').innerHTML=data.benefits.map(b=>`<article class="benefit-card"><h3>${b.title}</h3><p>${b.text}</p></article>`).join('');
}
function renderProducts(){
  $('#productGrid').innerHTML=data.products.map(p=>`<article class="product-card"><div class="product-img-wrap"><img src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="product-body"><span class="badge">${p.badge}</span><h3>${p.name}</h3><p>${p.description}</p><div class="price">${p.discount ? `<del>${p.price} บาท</del><strong>${p.discount}</strong><span>บาท</span>` : `<strong>${p.price}</strong><span>บาท</span>`}</div><ul class="features">${p.features.map(f=>`<li>${f}</li>`).join('')}</ul></div></article>`).join('');
}

let baIndex=0;
function renderBeforeAfter(){
  $('#baPrev').addEventListener('click',()=>setBa((baIndex-1+data.beforeAfter.length)%data.beforeAfter.length));
  $('#baNext').addEventListener('click',()=>setBa((baIndex+1)%data.beforeAfter.length));
  setBa(0);
}
function setBa(i){
  baIndex=i; const b=data.beforeAfter[i];
  $('#baBefore').src=b.before; $('#baAfter').src=b.after; $('#baTitle').textContent=b.title; $('#baText').textContent=b.text;
}
function renderSteps(){
  $('#steps').innerHTML=data.process.map(s=>`<div class="step"><strong>${s}</strong></div>`).join('');
}

let reviewIndex=0, reviewTimer;
function renderReviews(){
  $('#reviewPrev').addEventListener('click',()=>setReview((reviewIndex-1+data.reviews.length)%data.reviews.length,true));
  $('#reviewNext').addEventListener('click',()=>setReview((reviewIndex+1)%data.reviews.length,true));
  setReview(0); reviewTimer=setInterval(()=>setReview((reviewIndex+1)%data.reviews.length),4500);
}
function setReview(i,manual=false){
  reviewIndex=i; const r=data.reviews[i];
  $('#reviewCard').innerHTML=`<img src="${r.image}" alt="${r.name}" loading="lazy"><div class="review-copy"><h3>${r.name}</h3><p>“${r.text}”</p></div>`;
  if(manual){clearInterval(reviewTimer); reviewTimer=setInterval(()=>setReview((reviewIndex+1)%data.reviews.length),4500);}
}
function renderFaq(){
  $('#faqList').innerHTML=data.faq.map((f,i)=>`<details class="faq-item" ${i===0?'open':''}><summary>${f.q}</summary><p>${f.a}</p></details>`).join('');
}
function setupBooking(){
  const line=(data.site.line||'@1ddstudio').replace('@','');
  $('#lineLink').href=`https://line.me/R/ti/p/${encodeURIComponent(data.site.line)}`;
  $('#waLink').href=`https://wa.me/${data.site.whatsapp}?text=${encodeURIComponent('สวัสดีครับ สนใจจองคิว/ปรึกษาวิกผมชาย 1DD STUDIO')}`;
  $('#bookingForm').addEventListener('submit',e=>{
    e.preventDefault(); const fd=new FormData(e.currentTarget);
    const body=[`ชื่อ: ${fd.get('name')}`,`ติดต่อ: ${fd.get('contact')}`,`บริการ: ${fd.get('service')}`,`วันที่ต้องการ: ${fd.get('date')||'-'}`,`รายละเอียด: ${fd.get('message')||'-'}`].join('\n');
    location.href=`mailto:1ddstudio@gmail.com?subject=${encodeURIComponent('จองคิว 1DD STUDIO')}&body=${encodeURIComponent(body)}`;
  });
}
function setupNav(){
  const btn=$('.nav-toggle'), nav=$('.nav');
  btn.addEventListener('click',()=>{const open=nav.classList.toggle('open'); btn.setAttribute('aria-expanded',String(open));});
  nav.addEventListener('click',e=>{if(e.target.tagName==='A'){nav.classList.remove('open'); btn.setAttribute('aria-expanded','false');}});
}
function renderSchema(){
  const schema={"@context":"https://schema.org","@type":"HairSalon","name":data.site.name,"telephone":data.site.phone,"address":{"@type":"PostalAddress","addressLocality":"Surat Thani","addressCountry":"TH"},"url":location.origin,"image":`${location.origin}/hero-1.jpg`,"priceRange":"฿฿"};
  $('#schemaJson').textContent=JSON.stringify(schema);
}
loadContent();
