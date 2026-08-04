let data={};
let lang=localStorage.getItem('1dd-lang')||'th';
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

async function loadContent(){
  try{const r=await fetch('content.json',{cache:'no-store'});data=await r.json();}
  catch(e){console.error(e);return;}
  applySeo(); setupLanguage(); renderHero(); renderBenefits(); renderMainServices(); renderProducts(); renderComparison(); renderBA(); renderSteps(); renderReviews(); renderServices(); renderCare(); renderContact(); renderFaq(); setupBooking(); setupMap(); setupNav(); setupChat(); renderSchema(); setupPwa();
}
function t(obj,key){if(typeof obj==='string') return obj; return obj?.[lang]||obj?.th||obj?.en||key||''}
function applySeo(){document.title=data.seo?.title||document.title;const d=document.querySelector('meta[name=description]');if(d)d.content=data.seo?.description||d.content}
function setupLanguage(){
  const btn=$('#langToggle');btn.textContent=lang==='th'?'EN':'TH';
  const apply=()=>{$$('[data-th]').forEach(el=>{el.textContent=el.dataset[lang]||el.dataset.th});document.documentElement.lang=lang;btn.textContent=lang==='th'?'EN':'TH';};apply();
  btn.onclick=()=>{lang=lang==='th'?'en':'th';localStorage.setItem('1dd-lang',lang);apply();renderHero(true);renderProducts();renderComparison();renderBenefits();renderMainServices();renderSteps();renderReviews();renderServices();renderCare();renderContact();renderFaq();};
}
function renderHero(keep=false){let i=0,timer;const slides=data.hero||[];const bg=$('#heroBg'),dots=$('#heroDots');dots.innerHTML='';slides.forEach((_,n)=>{const b=document.createElement('button');b.ariaLabel=`Slide ${n+1}`;b.onclick=()=>show(n);dots.append(b)});function show(n){i=(n+slides.length)%slides.length;const s=slides[i];bg.style.backgroundImage=`url('${s.image}')`;$('#heroEyebrow').textContent=t(s.eyebrow);$('#heroTitle').textContent=t(s.title);$('#heroSubtitle').textContent=t(s.subtitle);[...dots.children].forEach((d,x)=>d.classList.toggle('active',x===i));clearInterval(timer);timer=setInterval(()=>show(i+1),6500)}show(0)}
function renderBenefits(){$('#benefits').innerHTML=(data.benefits||[]).map((b,i)=>`<article class="benefit-card"><span class="eyebrow gold">0${i+1}</span><h3>${esc(t(b.title))}</h3><p>${esc(t(b.text))}</p></article>`).join('')}
function renderProducts(){$('#productGrid').innerHTML=(data.products||[]).map((p,i)=>`<article class="product-card"><div class="product-media"><span class="product-badge">${esc(p.badge)}</span><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"></div><div class="product-body"><p class="eyebrow gold">${esc(p.badge)}</p><h3>${esc(p.name)}</h3><p>${esc(t(p.description))}</p><div class="product-price">${esc(p.price)} บาท</div><ul class="product-features">${(p.features||[]).map(x=>`<li>${esc(t(x))}</li>`).join('')}</ul><a class="btn btn-outline" href="#booking">${lang==='th'?'สนใจรุ่นนี้':'Ask about this model'}</a></div></article>`).join('')}
function renderComparison(){const rows=data.comparison?.rows||[];const products=data.products||[];$('#comparisonTable').innerHTML=`<thead><tr><th>${lang==='th'?'หัวข้อ':'Feature'}</th>${products.map(p=>`<th>${esc(p.name)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(t(r.label))}</td>${r.values.map(v=>`<td>${esc(t(v))}</td>`).join('')}</tr>`).join('')}</tbody>`}
let baIndex=0;let baTimer;function renderBA(){
  const slides=data.beforeAfter||[];
  const beforeImage=$('#baBeforeImage'),afterImage=$('#baAfterImage');
  const badge=$('#baSlideBadge'),dots=$('#baDots'),card=$('#baPairCard');
  if(!slides.length||!beforeImage||!afterImage)return;

  const show=n=>{
    baIndex=(n+slides.length)%slides.length;
    const x=slides[baIndex];
    beforeImage.src=x.before;
    afterImage.src=x.after;
    beforeImage.alt=`Before — ${t(x.title)}`;
    afterImage.alt=`After — ${t(x.title)}`;
    badge.textContent=`CASE ${String(baIndex+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
    $('#baTitle').textContent=t(x.title);
    $('#baText').textContent=t(x.text);
    dots.innerHTML=slides.map((_,i)=>`<button class="${i===baIndex?'active':''}" aria-label="เคสที่ ${i+1}"></button>`).join('');
    [...dots.children].forEach((dot,i)=>dot.onclick=()=>{show(i);restart()});
    card.classList.remove('ba-pair-enter');
    void card.offsetWidth;
    card.classList.add('ba-pair-enter');
  };

  const restart=()=>{
    clearInterval(baTimer);
    baTimer=setInterval(()=>show(baIndex+1),7000);
  };

  $('#baPrev').onclick=()=>{show(baIndex-1);restart()};
  $('#baNext').onclick=()=>{show(baIndex+1);restart()};

  let touchX=0;
  card.ontouchstart=e=>touchX=e.changedTouches[0].clientX;
  card.ontouchend=e=>{
    const dx=e.changedTouches[0].clientX-touchX;
    if(Math.abs(dx)>45){show(baIndex+(dx<0?1:-1));restart()}
  };

  show(0);
  restart();
}
function renderSteps(){$('#steps').innerHTML=(data.process||[]).map((x,i)=>`<article class="step"><strong>${i+1}</strong><p>${esc(t(x))}</p></article>`).join('')}
let reviewIndex=0,reviewTimer;function renderReviews(){const arr=data.reviews||[],card=$('#reviewCard'),dots=$('#reviewDots');dots.innerHTML=arr.map((_,i)=>`<button aria-label="Review ${i+1}"></button>`).join('');[...dots.children].forEach((b,i)=>b.onclick=()=>show(i));function show(n){reviewIndex=(n+arr.length)%arr.length;const r=arr[reviewIndex];card.innerHTML=`<span class="premium-ribbon">PREMIUM</span><img src="${esc(r.image)}" alt="${esc(r.name)}" loading="lazy"><div class="review-copy"><div class="stars">★★★★★</div><h3>${esc(r.name)}</h3><blockquote>“${esc(t(r.text))}”</blockquote><a class="btn btn-gold" href="#booking">${lang==='th'?'จองคิวเลย':'Book now'}</a></div>`;[...dots.children].forEach((d,i)=>d.classList.toggle('active',i===reviewIndex));clearInterval(reviewTimer);reviewTimer=setInterval(()=>show(reviewIndex+1),6000)}$('#reviewPrev').onclick=()=>show(reviewIndex-1);$('#reviewNext').onclick=()=>show(reviewIndex+1);show(0)}
function renderServices(){$('#serviceGrid').innerHTML=(data.services||[]).map(s=>`<article class="service-card"><div class="eyebrow gold">${esc(s.icon||'✦')}</div><h3>${esc(t(s.title))}</h3><p>${esc(t(s.text))}</p></article>`).join('')}
function renderMainServices(){$('#mainServiceGrid').innerHTML=(data.mainServices||[]).map((s,i)=>`<article class="geo-service-card"><span>0${i+1}</span><p class="eyebrow gold">${esc(t(s.enLabel||s.title))}</p><h3>${esc(t(s.title))}</h3><p>${esc(t(s.text))}</p><a href="#booking">${lang==='th'?'ปรึกษาบริการนี้ →':'Ask about this service →'}</a></article>`).join('')}
function renderCare(){$('#careList').innerHTML=(data.careGuide||[]).map((x,i)=>`<li><strong>${String(i+1).padStart(2,'0')}</strong><div><h3>${esc(t(x.title))}</h3><p>${esc(t(x.text))}</p></div></li>`).join('')}
function renderContact(){const s=data.site||{},items=[['โทรศัพท์',`<a href="tel:${esc(s.phone)}">${esc(s.phone)}</a>`],['LINE',`<a href="${esc(s.lineAddUrl)}" target="_blank" rel="noopener">${esc(s.line)}</a>`],['WhatsApp',`<a href="https://wa.me/${esc(s.whatsapp)}" target="_blank" rel="noopener">+${esc(s.whatsapp)}</a>`],['เวลาทำการ',esc(s.hours||'ทุกวัน 10:00–22:00 น.')],['พื้นที่ให้บริการ',esc(t(s.serviceArea)||s.address)],['แผนที่',`<a href="${esc(s.map)}" target="_blank" rel="noopener">Google Maps →</a>`]];$('#contactDetailGrid').innerHTML=items.map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}
function renderFaq(){$('#faqList').innerHTML=(data.faq||[]).map((x,i)=>`<article class="faq-item"><button aria-expanded="false"><span>${esc(t(x.q))}</span><b>+</b></button><div class="faq-answer">${esc(t(x.a))}</div></article>`).join('');$$('.faq-item button').forEach(b=>b.onclick=()=>{const item=b.parentElement,open=item.classList.toggle('open');b.setAttribute('aria-expanded',open);b.querySelector('b').textContent=open?'−':'+'})}
function setupBooking(){const f=data.googleForm||{},link=$('#googleFormLink'),wrap=$('#googleFormEmbedWrap');link.href=f.formUrl||'#';const use=f.enableEmbed&&String(f.embedUrl).startsWith('http');if(use){wrap.hidden=false;wrap.innerHTML=`<iframe class="google-form-frame" src="${esc(f.embedUrl)}" title="1DD STUDIO Booking Google Form" loading="lazy"></iframe>`}const line=data.site.lineAddUrl||`https://line.me/ti/p/~${data.site.line}`;['lineLink','floatingLine','mobileLine'].forEach(id=>{const el=$('#'+id);if(el)el.href=line});$('#lineQr').src=data.site.lineQr||'line-qr-mozzjro.png';$('#waLink').href=`https://wa.me/${data.site.whatsapp||''}`}
function setupMap(){const frame=$('#mapFrame'),link=$('#mapOpenLink');frame.src=data.site.mapEmbed||'';link.href=data.site.map||'#'}
function setupNav(){const btn=$('.nav-toggle'),nav=$('.nav');btn.onclick=()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)};nav.onclick=e=>{if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded','false')}}}
function setupChat(){const panel=$('#chatPanel'),body=$('#chatBody'),form=$('#chatForm'),input=$('#chatInput'),qs=$('#quickQuestions');const history=[];const quick=lang==='th'?['ราคาเท่าไหร่','ติดตั้งใช้เวลานานไหม','ต่างจังหวัดจองได้ไหม','ต้องดูแลอย่างไร']:['What are the prices?','How long is installation?','Can out-of-province clients book?','How do I care for it?'];qs.innerHTML=quick.map(q=>`<button type="button">${q}</button>`).join('');const fallback=q=>{const s=q.toLowerCase();if(/ราคา|price/.test(s))return lang==='th'?'มีราคา 3 ระดับ 8,000 / 15,000 / 18,000 บาท กรุณาตรวจสอบรายละเอียดปัจจุบันกับร้านทาง LINE mozzjro ครับ':'There are three price levels: 8,000 / 15,000 / 18,000 THB. Please confirm current details via LINE mozzjro.';if(/ชั่วโมง|เวลา|long|time/.test(s))return lang==='th'?'ติดตั้งและปรับทรงใช้เวลาประมาณ 2 ชั่วโมง ขึ้นอยู่กับแต่ละเคสครับ':'Installation and styling take about two hours, depending on the case.';if(/ต่างจังหวัด|province|nationwide/.test(s))return lang==='th'?'ลูกค้าต่างจังหวัดส่งรูปและปรึกษาสเปกทาง LINE mozzjro ก่อนจองได้ครับ':'Out-of-province customers can send photos and consult via LINE mozzjro before booking.';if(/ดูแล|care|ล้าง/.test(s))return lang==='th'?'ควรหวีเบา ๆ ใช้ผลิตภัณฑ์ที่เหมาะ ลดความร้อน และเข้าดูแลตามรอบที่ช่างแนะนำครับ':'Brush gently, use suitable products, limit heat and follow the recommended maintenance schedule.';return lang==='th'?'คำถามนี้ต้องให้ร้านตรวจสอบเพิ่มเติม กรุณาติดต่อ LINE mozzjro หรือโทร 0895490884 ครับ':'Please contact LINE mozzjro or call 0895490884 for a case-specific answer.'};const add=(cls,text)=>{body.insertAdjacentHTML('beforeend',`<div class="${cls}">${esc(text)}</div>`);body.scrollTop=body.scrollHeight};async function send(q){q=q.trim();if(!q)return;add('user-msg',q);history.push({role:'user',content:q});input.disabled=true;const wait=document.createElement('div');wait.className='bot-msg typing';wait.textContent=lang==='th'?'กำลังค้นหาคำตอบ…':'Finding an answer…';body.append(wait);body.scrollTop=body.scrollHeight;let answer='';try{const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,history:history.slice(-6,-1)})});if(!r.ok)throw new Error('fallback');answer=(await r.json()).answer||fallback(q)}catch{answer=fallback(q)}wait.remove();add('bot-msg',answer);history.push({role:'assistant',content:answer});input.disabled=false;input.focus()}$('#chatOpen').onclick=()=>{panel.classList.add('open');panel.setAttribute('aria-hidden','false');input.focus()};$('#chatClose').onclick=()=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true')};qs.onclick=e=>{if(e.target.tagName==='BUTTON')send(e.target.textContent)};form.onsubmit=e=>{e.preventDefault();const q=input.value;input.value='';send(q)}}
function renderSchema(){const base=(location.origin&&location.origin!=='null'?location.origin:'https://1ddstudio.pages.dev').replace(/\/$/,'');const sameAs=[data.site.facebook,data.site.tiktok].filter(x=>x&&x!=='https://www.facebook.com/'&&x!=='https://www.tiktok.com/');const graph=[{"@type":["HairSalon","LocalBusiness"],"@id":`${base}/#business`,"name":data.site.name,"description":data.seo.description,"url":`${base}/`,"telephone":"+66895490884","image":[`${base}/hero-1.jpg`,`${base}/after-v9-01.jpg`],"priceRange":"฿฿฿","address":{"@type":"PostalAddress","addressLocality":"Surat Thani","addressRegion":"Surat Thani","addressCountry":"TH"},"areaServed":[{"@type":"City","name":"Surat Thani"},{"@type":"Country","name":"Thailand"}],"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"10:00","closes":"22:00"}],"sameAs":sameAs,"knowsAbout":["Men's Hair System","Men's Wig","Hair Replacement","Hair System Installation","Hair System Maintenance"]},{"@type":"WebSite","@id":`${base}/#website`,"url":`${base}/`,"name":"1DD STUDIO","inLanguage":["th","en"],"publisher":{"@id":`${base}/#business`}},{"@type":"ItemList","name":"บริการของ 1DD STUDIO","itemListElement":(data.mainServices||[]).map((x,i)=>({"@type":"ListItem","position":i+1,"item":{"@type":"Service","name":x.title.th,"description":x.text.th,"provider":{"@id":`${base}/#business`}}}))},{"@type":"FAQPage","mainEntity":(data.faq||[]).map(x=>({"@type":"Question","name":x.q.th,"acceptedAnswer":{"@type":"Answer","text":x.a.th}}))}];$('#schemaJson').textContent=JSON.stringify({"@context":"https://schema.org","@graph":graph})}
function setupPwa(){if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js').catch(()=>{}))}
loadContent();
