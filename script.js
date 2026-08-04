let data={};
let lang=localStorage.getItem('1dd-lang')||'th';
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

async function loadContent(){
  try{const r=await fetch('content.json',{cache:'no-store'});data=await r.json();}
  catch(e){console.error(e);return;}
  applySeo(); setupLanguage(); renderHero(); renderBenefits(); renderProducts(); renderComparison(); renderBA(); renderSteps(); renderReviews(); renderServices(); renderFaq(); setupBooking(); setupMap(); setupNav(); setupChat(); renderSchema(); setupMotion(); setupPwa();
}
function t(obj,key){if(typeof obj==='string') return obj; return obj?.[lang]||obj?.th||obj?.en||key||''}
function applySeo(){document.title=data.seo?.title||document.title;const d=document.querySelector('meta[name=description]');if(d)d.content=data.seo?.description||d.content}
function setupLanguage(){
  const btn=$('#langToggle');btn.textContent=lang==='th'?'EN':'TH';
  const apply=()=>{$$('[data-th]').forEach(el=>{el.textContent=el.dataset[lang]||el.dataset.th});document.documentElement.lang=lang;btn.textContent=lang==='th'?'EN':'TH';};apply();
  btn.onclick=()=>{lang=lang==='th'?'en':'th';localStorage.setItem('1dd-lang',lang);apply();renderHero(true);renderProducts();renderComparison();renderBenefits();renderSteps();renderReviews();renderServices();renderFaq();};
}
function renderHero(keep=false){let i=0,timer;const slides=data.hero||[];const bg=$('#heroBg'),dots=$('#heroDots');dots.innerHTML='';slides.forEach((_,n)=>{const b=document.createElement('button');b.ariaLabel=`Slide ${n+1}`;b.onclick=()=>show(n);dots.append(b)});function show(n){i=(n+slides.length)%slides.length;const s=slides[i];bg.style.backgroundImage=`url('${s.image}')`;$('#heroEyebrow').textContent=t(s.eyebrow);$('#heroTitle').textContent=t(s.title);$('#heroSubtitle').textContent=t(s.subtitle);[...dots.children].forEach((d,x)=>d.classList.toggle('active',x===i));clearInterval(timer);timer=setInterval(()=>show(i+1),6500)}show(0)}
function renderBenefits(){$('#benefits').innerHTML=(data.benefits||[]).map((b,i)=>`<article class="benefit-card reveal-item"><span class="eyebrow gold">0${i+1}</span><h3>${esc(t(b.title))}</h3><p>${esc(t(b.text))}</p></article>`).join('')}
function renderProducts(){$('#productGrid').innerHTML=(data.products||[]).map((p,i)=>`<article class="product-card reveal-item ${i===2?'featured-product':''}"><div class="product-media"><span class="product-badge">${esc(p.badge)}</span><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"></div><div class="product-body"><p class="eyebrow gold">${esc(p.badge)}</p><h3>${esc(p.name)}</h3><p>${esc(t(p.description))}</p><div class="product-price">${esc(p.price)} บาท</div><ul class="product-features">${(p.features||[]).map(x=>`<li>${esc(t(x))}</li>`).join('')}</ul><a class="btn btn-outline" href="#booking">${lang==='th'?'สนใจรุ่นนี้':'Ask about this model'}</a></div></article>`).join('');observeReveals()}
function renderComparison(){const rows=data.comparison?.rows||[];const products=data.products||[];$('#comparisonTable').innerHTML=`<thead><tr><th>${lang==='th'?'หัวข้อ':'Feature'}</th>${products.map(p=>`<th>${esc(p.name)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(t(r.label))}</td>${r.values.map(v=>`<td>${esc(t(v))}</td>`).join('')}</tr>`).join('')}</tbody>`}
let baIndex=0;let baTimer;function renderBA(){
  const slides=data.beforeAfter||[];
  const beforeImage=$('#baBeforeImage'),afterImage=$('#baAfterImage');
  const badge=$('#baSlideBadge'),dots=$('#baDots'),card=$('#baPairCard');
  const compareBefore=$('#baCompareBefore'),compareAfter=$('#baCompareAfter');
  if(!slides.length||!beforeImage||!afterImage)return;

  const show=n=>{
    baIndex=(n+slides.length)%slides.length;
    const x=slides[baIndex];
    beforeImage.src=x.before;
    afterImage.src=x.after;
    compareBefore.src=x.before;
    compareAfter.src=x.after;
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

  const pairGrid=$('.ba-pair-grid'),interactive=$('#baInteractive');
  const pairMode=$('#baPairMode'),compareMode=$('#baCompareMode'),range=$('#baRange');
  const syncCompareWidth=()=>interactive.style.setProperty('--compare-width',interactive.clientWidth+'px');
  const setMode=compare=>{pairGrid.hidden=compare;interactive.hidden=!compare;pairMode.classList.toggle('active',!compare);compareMode.classList.toggle('active',compare);if(compare)requestAnimationFrame(syncCompareWidth)};
  pairMode.onclick=()=>setMode(false);compareMode.onclick=()=>setMode(true);
  range.oninput=()=>{const v=range.value+'%';$('#baCompareBeforeLayer').style.width=v;$('#baDragLine').style.left=v};
  addEventListener('resize',syncCompareWidth,{passive:true});

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
function renderFaq(){$('#faqList').innerHTML=(data.faq||[]).map((x,i)=>`<article class="faq-item"><button aria-expanded="false"><span>${esc(t(x.q))}</span><b>+</b></button><div class="faq-answer">${esc(t(x.a))}</div></article>`).join('');$$('.faq-item button').forEach(b=>b.onclick=()=>{const item=b.parentElement,open=item.classList.toggle('open');b.setAttribute('aria-expanded',open);b.querySelector('b').textContent=open?'−':'+'})}
function setupBooking(){const f=data.googleForm||{},link=$('#googleFormLink'),wrap=$('#googleFormEmbedWrap');link.href=f.formUrl||'#';const use=f.enableEmbed&&String(f.embedUrl).startsWith('http');if(use){wrap.hidden=false;wrap.innerHTML=`<iframe class="google-form-frame" src="${esc(f.embedUrl)}" title="1DD STUDIO Booking Google Form" loading="lazy"></iframe>`}const line=data.site.lineAddUrl||`https://line.me/ti/p/~${data.site.line}`;['lineLink','floatingLine','mobileLine'].forEach(id=>{const el=$('#'+id);if(el)el.href=line});$('#lineQr').src=data.site.lineQr||'line-qr-mozzjro.png';$('#waLink').href=`https://wa.me/${data.site.whatsapp||''}`}
function setupMap(){const frame=$('#mapFrame'),link=$('#mapOpenLink');frame.src=data.site.mapEmbed||'';link.href=data.site.map||'#'}
function setupNav(){const btn=$('.nav-toggle'),nav=$('.nav');btn.onclick=()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)};nav.onclick=e=>{if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded','false')}}}
function setupChat(){const panel=$('#chatPanel'),body=$('#chatBody'),form=$('#chatForm'),input=$('#chatInput'),qs=$('#quickQuestions');const quick=lang==='th'?['ราคาเท่าไหร่','ใช้เวลากี่ชั่วโมง','ต่างจังหวัดได้ไหม','ดูแลยังไง']:['What are the prices?','How long does it take?','Do you serve other provinces?','How do I care for it?'];qs.innerHTML=quick.map(q=>`<button type="button">${q}</button>`).join('');const answer=q=>{const s=q.toLowerCase();if(/ราคา|price/.test(s))return lang==='th'?'มี 3 รุ่น: 8,000 / 15,000 / 18,000 บาท ดูรายละเอียดในส่วนสินค้าได้เลยครับ':'There are 3 packages: 8,000 / 15,000 / 18,000 THB.';if(/ชั่วโมง|เวลา|long|time/.test(s))return lang==='th'?'ขั้นตอนติดตั้งและปรับทรงใช้เวลาประมาณ 2 ชั่วโมง ขึ้นกับงานของแต่ละคนครับ':'Installation and styling take about 2 hours depending on the case.';if(/ต่างจังหวัด|province|nationwide/.test(s))return lang==='th'?'รองรับลูกค้าต่างจังหวัด สามารถส่งรูปและคุยสเปกออนไลน์ก่อนจองได้ครับ':'Yes. Out-of-province customers can send photos and discuss specifications online.';if(/ดูแล|care|ล้าง/.test(s))return lang==='th'?'หลังติดตั้งร้านจะแนะนำวิธีล้าง จัดทรง และนัดดูแลตามสภาพการใช้งานครับ':'We provide washing, styling and maintenance guidance after installation.';if(/จอง|book/.test(s))return lang==='th'?'กดปุ่มจองคิวด้านล่างเพื่อกรอก Google Form ได้เลยครับ':'Use the booking button below to submit the Google Form.';return lang==='th'?'สอบถามรายละเอียดเฉพาะเคสได้ทาง LINE: mozzjro หรือโทร 0895490884 ครับ':'For a case-specific answer, contact LINE: mozzjro or call 0895490884.'};function send(q){if(!q.trim())return;body.insertAdjacentHTML('beforeend',`<div class="user-msg">${esc(q)}</div>`);setTimeout(()=>{body.insertAdjacentHTML('beforeend',`<div class="bot-msg">${esc(answer(q))}</div>`);body.scrollTop=body.scrollHeight},250);body.scrollTop=body.scrollHeight}$('#chatOpen').onclick=()=>{panel.classList.add('open');panel.setAttribute('aria-hidden','false')};$('#chatClose').onclick=()=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true')};qs.onclick=e=>{if(e.target.tagName==='BUTTON')send(e.target.textContent)};form.onsubmit=e=>{e.preventDefault();send(input.value);input.value=''}}
function renderSchema(){const s={"@context":"https://schema.org","@type":"HairSalon","name":data.site.name,"telephone":data.site.phone,"address":{"@type":"PostalAddress","addressLocality":"Surat Thani","addressCountry":"TH"},"url":location.origin,"image":`${location.origin}/hero-1.jpg`,"priceRange":"฿฿","sameAs":[data.site.facebook,data.site.tiktok]};$('#schemaJson').textContent=JSON.stringify(s)}
function setupPwa(){if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js').catch(()=>{}))}
function observeReveals(){
  const els=$$('.reveal-item, main section:not(.hero):not(.stats)');
  if(!('IntersectionObserver'in window)){els.forEach(el=>el.classList.add('is-visible'));return}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -45px'});
  els.forEach(el=>{if(!el.classList.contains('is-visible'))io.observe(el)});
}
function setupMotion(){
  const progress=$('#scrollProgress');
  const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`};
  addEventListener('scroll',update,{passive:true});update();observeReveals();
}
loadContent();
