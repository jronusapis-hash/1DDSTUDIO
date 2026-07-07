const CONFIG = {
  bookingUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd_To--VtE0scQhIIFc2NkcRiBkTA5WimYZrx9qPvPSFtinRg/viewform?usp=header",
  lineUrl: "https://line.me/R/ti/p/~mozzjro",
  whatsappUrl: "https://wa.me/66895490884",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=1DD+STUDIO+Surat+Thani",
  phone: "0895490884",
  hours: "10:00–22:00"
};

const heroImages = ["hero-1.jpg", "hero-2.jpg", "hero-3.jpg"];
const reviewImages = ["review-1.jpg", "review-2.jpg", "review-3.jpg", "review-4.jpg", "review-5.jpg"];
const beforeAfter = [
  {before:"ba-1.jpg", after:"ba-2.jpg", title:"เคสที่ 1 เปลี่ยนลุคให้ดูมั่นใจ", note:"ก่อนและหลังติดตั้ง Hair System"},
  {before:"ba-2.jpg", after:"ba-3.jpg", title:"เคสที่ 2 ทรงดูหนาและเป็นธรรมชาติ", note:"บาลานซ์รูปให้ดูง่ายบนมือถือและคอม"},
  {before:"ba-3.jpg", after:"ba-4.jpg", title:"เคสที่ 3 เซ็ตทรงได้จริง", note:"เหมาะกับลูกค้าที่ต้องการลุคธรรมชาติ"},
  {before:"ba-4.jpg", after:"ba-1.jpg", title:"เคสที่ 4 ดูแลง่าย พร้อมออกงาน", note:"ติดแน่น ดูแลง่าย และปรับทรงได้"}
];

const products = [
  {name:"Essential", price:"เริ่มต้น 8,000.-", img:"essential.jpg", points:["คุ้มค่า เริ่มต้นง่าย", "เหมาะกับผู้เริ่มลอง", "ลุคธรรมชาติ"]},
  {name:"Standard", price:"เริ่มต้น 15,000.-", img:"standard.jpg", points:["ยอดนิยม", "สมดุลเรื่องราคาและคุณภาพ", "ดูแลง่าย"]},
  {name:"Premium", price:"เริ่มต้น 18,000.-", img:"premium.jpg", points:["พรีเมียมที่สุด", "งานละเอียด ดูเป็นธรรมชาติ", "เหมาะกับลูกค้าที่ต้องการลุคดีที่สุด"]}
];
const faq = [
  {q:"ติดแล้วดูออกไหม?", a:"ถ้าเลือกสี ความหนาแน่น และทรงให้เหมาะกับลูกค้า งานจะดูเป็นธรรมชาติมาก"},
  {q:"อยู่ได้นานแค่ไหน?", a:"ขึ้นอยู่กับรุ่น การดูแล เหงื่อ และไลฟ์สไตล์ โดยร้านจะแนะนำวิธีดูแลหลังติดตั้ง"},
  {q:"จองคิวยังไง?", a:"กดปุ่มจองคิวปรึกษาฟรี หรือทัก LINE: mozzjro ได้เลย"}
];

function setLinks(){
  const map = {
    bookingTop: CONFIG.bookingUrl, bookingHero: CONFIG.bookingUrl,
    whatsappHero: CONFIG.whatsappUrl, lineBtn: CONFIG.lineUrl,
    floatingLine: CONFIG.lineUrl, mapBtn: CONFIG.mapUrl
  };
  Object.entries(map).forEach(([id,url])=>{const el=document.getElementById(id); if(el) el.href=url;});
  const contact = document.getElementById("contactInfo");
  if(contact) contact.textContent = `โทร ${CONFIG.phone} • LINE: mozzjro • เปิด ${CONFIG.hours} • 1DD STUDIO Surat Thani`;
}
function dots(containerId, total, active, callbackName){
  const el = document.getElementById(containerId); if(!el) return;
  el.innerHTML = Array.from({length:total},(_,i)=>`<button class="${i===active?'active':''}" onclick="${callbackName}(${i})" aria-label="slide ${i+1}"></button>`).join('');
}
let heroIndex=0, reviewIndex=0, baIndex=0;
function renderHero(){
  const img=document.getElementById("heroSlideImage"); if(!img) return;
  img.src=heroImages[heroIndex]; dots("heroDots", heroImages.length, heroIndex, "goHero");
}
function goHero(i){heroIndex=i; renderHero();}
function moveHero(step){heroIndex=(heroIndex+step+heroImages.length)%heroImages.length; renderHero();}
function renderReview(){
  const img=document.getElementById("reviewImage"); if(!img) return;
  img.src=reviewImages[reviewIndex]; dots("reviewDots", reviewImages.length, reviewIndex, "goReview");
}
function goReview(i){reviewIndex=i; renderReview();}
function moveReview(step){reviewIndex=(reviewIndex+step+reviewImages.length)%reviewImages.length; renderReview();}
function renderBA(){
  const item=beforeAfter[baIndex];
  const before=document.getElementById("baBefore"), after=document.getElementById("baAfter");
  if(!before || !after) return;
  before.src=item.before; after.src=item.after;
  document.getElementById("baTitle").textContent=item.title;
  document.getElementById("baNote").textContent=item.note;
  dots("baDots", beforeAfter.length, baIndex, "goBA");
}
function goBA(i){baIndex=i; renderBA();}
function moveBA(step){baIndex=(baIndex+step+beforeAfter.length)%beforeAfter.length; renderBA();}
function renderProducts(){
  const el=document.getElementById("productGrid"); if(!el) return;
  el.innerHTML=products.map((p,i)=>`<article class="productCard ${i===1?'featured':''}"><img src="${p.img}" alt="${p.name}"><h3>${p.name}</h3><div class="price">${p.price}</div><ul>${p.points.map(x=>`<li>${x}</li>`).join('')}</ul></article>`).join('');
}
function renderFAQ(){
  const el=document.getElementById("faqList"); if(!el) return;
  el.innerHTML=faq.map(x=>`<article class="faqItem"><h3>${x.q}</h3><p>${x.a}</p></article>`).join('');
}

document.addEventListener("DOMContentLoaded",()=>{
  setLinks(); renderHero(); renderReview(); renderBA(); renderProducts(); renderFAQ();
  document.querySelector(".heroPrev")?.addEventListener("click",()=>moveHero(-1));
  document.querySelector(".heroNext")?.addEventListener("click",()=>moveHero(1));
  document.getElementById("prevReview")?.addEventListener("click",()=>moveReview(-1));
  document.getElementById("nextReview")?.addEventListener("click",()=>moveReview(1));
  document.getElementById("prevBA")?.addEventListener("click",()=>moveBA(-1));
  document.getElementById("nextBA")?.addEventListener("click",()=>moveBA(1));
  setInterval(()=>moveHero(1), 4500);
  setInterval(()=>moveReview(1), 5200);
});
