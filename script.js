const heroImages=['hero-1.jpg','hero-2.jpg','hero-3.jpg'];
const reviewImages=['review-1.jpg','review-2.jpg','review-3.jpg','review-4.jpg','review-5.jpg'];
const baImages=[
  {img:'ba-1.jpg',title:'Before / After Case 1'},
  {img:'ba-2.jpg',title:'Before / After Case 2'},
  {img:'ba-3.jpg',title:'Before / After Case 3'},
  {img:'ba-4.jpg',title:'Before / After Case 4'}
];
let hero=0, review=0, ba=0;
function makeDots(id,total,active,fn){const el=document.getElementById(id);if(!el)return;el.innerHTML=Array.from({length:total},(_,i)=>`<button class="${i===active?'active':''}" onclick="${fn}(${i})"></button>`).join('')}
function renderHero(){document.getElementById('heroImg').src=heroImages[hero];makeDots('heroDots',heroImages.length,hero,'goHero')}
function goHero(i){hero=i;renderHero()}function moveHero(s){hero=(hero+s+heroImages.length)%heroImages.length;renderHero()}
function renderReview(){document.getElementById('reviewImg').src=reviewImages[review];makeDots('reviewDots',reviewImages.length,review,'goReview')}
function goReview(i){review=i;renderReview()}function moveReview(s){review=(review+s+reviewImages.length)%reviewImages.length;renderReview()}
function renderBA(){const item=baImages[ba];document.getElementById('baImg').src=item.img;document.getElementById('baTitle').textContent=item.title;makeDots('baDots',baImages.length,ba,'goBA')}
function goBA(i){ba=i;renderBA()}function moveBA(s){ba=(ba+s+baImages.length)%baImages.length;renderBA()}
document.addEventListener('DOMContentLoaded',()=>{renderHero();renderReview();renderBA();document.getElementById('heroPrev').onclick=()=>moveHero(-1);document.getElementById('heroNext').onclick=()=>moveHero(1);document.getElementById('reviewPrev').onclick=()=>moveReview(-1);document.getElementById('reviewNext').onclick=()=>moveReview(1);document.getElementById('baPrev').onclick=()=>moveBA(-1);document.getElementById('baNext').onclick=()=>moveBA(1);setInterval(()=>moveHero(1),4500);setInterval(()=>moveReview(1),5200);});
