const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
})

const slidesData = [ // ← 修正名稱
  {
    title: "天然原料",
    text: "我們嚴選無香料的台灣茶葉與當季水果，讓每一口都喝得到真材實料。",
    image: "img/natural_raw_materials.jpg"
  },
  {
    title: "現點現做",
    text: "我們堅持每一杯都是現場手工搖製，保留茶的香氣與新鮮口感。",
    image: "img/Cooked_to_order.jpg"
  },
  {
    title: "永續包裝",
    text: "我們使用環保減塑包材，與你一起守護地球，讓美味不留下負擔。",
    image: "img/Sustainable_packaging.jpg"
  }
];

const container = document.getElementById("slide-container");
let currentIndex = 0;

function animateSlide(slide, startAngle, endAngle, duration, callback) { /* Callback 函式就是你傳入的某段程式碼，它不會馬上執行，而是會等到某個時間點才被「叫回來（call back）」執行。 */
  const radius = 350;
  const centerX = radius;
  const centerY = radius;
  const startTime = performance.now(); /* 現在的效能*/

  function step(time) {
    const elapsed = time - startTime;
    let progress = elapsed / duration;
    if (progress > 1) progress = 1;

    // 角度從 startAngle 到 endAngle，單位為弧度
    const angle = startAngle + (endAngle - startAngle) * progress;

    // 圓周軌跡 (x, y)
    // x軸：半圓的右邊為0度，左邊為180度 (Math.PI)
    // y軸：半圓向上為正方向
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // 調整位置，使 slide 底部對齊 container 底部
    // 由於slide固定高度，底部放在 y座標
    // transform以translate(x,y)移動，相對於初始底部左下角(0,0)
    const translateX = x - radius; // -radius 是將圓心當作0點  // 
    const translateY = radius - y; // 將圓上座標 (x, y) 轉換成以圓心為基準的 CSS translate 座標，並修正 y 軸方向相反的問題

    slide.style.transform = `translate(${translateX}px, ${translateY}px)`;

    if (progress < 1) {
      requestAnimationFrame(step); /* 裡面每次的 requestAnimationFrame(step) 是「踩油門繼續往前」 一直到開到目的地（動畫完成），才停下來 */
    } else {
      if (callback) callback();
    }
  }
  requestAnimationFrame(step); /* 這一行是在 函式一開始時就呼叫一次，讓動畫進入「第一幀（frame）」的運算。 第一次 requestAnimationFrame(step) 是「開車」*/
}

  function renderSlides() {
    container.innerHTML = "";
    slidesData.forEach((slide, idx) => {
      const slideEl = document.createElement("div");
      slideEl.classList.add("slide");
      if (idx === currentIndex) {
        slideEl.classList.add("active");
        slideEl.style.opacity = "1";
        slideEl.style.transform = `translate(0px, 0px)`;
      } else {
        slideEl.style.opacity = "0";
        slideEl.style.transform = `translate(700px, 0px)`;
      }
      slideEl.innerHTML = `
        <div class="slide-image" style="background-image: url('${slide.image}')"></div>
        <div class="slide-text">
          <h3>${slide.title}</h3>
          <p>${slide.text}</p>
        </div>
      `;
      container.appendChild(slideEl);
    });
  }

function goToSlide(newIndex) {
  const slides = document.querySelectorAll('.slide');
  const oldSlide = slides[currentIndex];
  const newSlide = slides[newIndex];

  oldSlide.style.pointerEvents = "none";
  newSlide.style.pointerEvents = "none";

  // 角度單位：0度為半圓右端 (0 弧度)，往左到 180度 (Math.PI)
  // 往下一頁方向：從 0 -> Math.PI (右到左)
  // 往上一頁方向：從 Math.PI -> 0 (左到右)
  let duration = 700; /* 毫秒 */
  if (newIndex > currentIndex) {
  // 如果點的是「下一頁」：目前這張要往左滑出，新的一張從右邊滑進

  // 讓舊的 slide 沿著半圓路徑從右邊(0度)走到左邊(Math.PI)，像是往左飛出去
  animateSlide(oldSlide, 0, Math.PI, duration, () => {
    oldSlide.classList.remove("active");       // 拿掉 active 樣式
    oldSlide.style.opacity = "0";              // 設為透明
    oldSlide.style.transform = `translate(700px, 0px)`; // 將它收進右邊畫面外
  });

  // 讓新的 slide 出現、加上 active 樣式
  newSlide.style.opacity = "1";
  newSlide.classList.add("active");

  // 新的 slide 從圓的左側 (-Math.PI) 沿半圓跑進中間 (0度)
  animateSlide(newSlide, -Math.PI, 0, duration, () => {
    newSlide.style.transform = "translate(0,0)";        // 定位到正中間
    newSlide.style.pointerEvents = "auto";              // 啟用互動
  });

} else {
  // 如果點的是「上一頁」：目前這張要往右滑出，新的一張從左邊滑進

  // 舊的 slide 從左邊(Math.PI)跑到右邊(0)，就像往右飛出去
  animateSlide(oldSlide, Math.PI, 0, duration, () => {
    oldSlide.classList.remove("active");       // 拿掉 active 樣式
    oldSlide.style.opacity = "0";              // 設為透明
    oldSlide.style.transform = `translate(-700px, 0px)`; // 將它收進左邊畫面外
  });

  // 讓新的 slide 出現、加上 active 樣式
  newSlide.style.opacity = "1";
  newSlide.classList.add("active");

  // 新的 slide 從右側(0) 跑到左側(Math.PI)，等於從右邊滑進中間
  animateSlide(newSlide, 0, Math.PI, duration, () => {
    newSlide.style.transform = "translate(0,0)";         // 定位到正中間
    newSlide.style.pointerEvents = "auto";               // 啟用互動
  });
}
// 最後更新 currentIndex，讓系統知道現在在哪一張 slide 上
currentIndex = newIndex; /* 你已經換到新的一張了，那它就變成現在那一張啦！*/
}

document.getElementById("prevBtn").addEventListener("click", ()=>{
  /* 確保：不會出現負數索引、一定是有效的幻燈片位置、可以正常切換畫面，所以才最後呼叫函式 */
  let newIndex = currentIndex - 1; 
  if(newIndex < 0) newIndex = slidesData.length - 1;
  goToSlide(newIndex);
});

/* 這裡 newIndex：

一開始是根據目前位置 currentIndex - 1 算出來的

但如果它小於 0，就「重新賦值」為最後一張的索引（slidesData.length - 1）

這就是為什麼不能用 const，因為你會 改變這個變數的值*/

document.getElementById("nextBtn").addEventListener("click", ()=>{
  let newIndex = (currentIndex + 1) % slidesData.length;
  goToSlide(newIndex);
});

renderSlides();

const slides = document.getElementById('slides');
const slideCount = slides.children.length;

const slide = slides.children[0]; /* 這行取得「slides」底下的第一個子元素（index 從 0 開始算）。 */
const slideWidth = slide.offsetWidth + 100; /* 瀏覽器幫你計算好的這個元素（幻燈片）寬度（單位是像素）。 這個 slideWidth 是用來控制幻燈片移動時的距離，讓幻燈片可以完整換到下一張，不會只移一半。*/
let position = 0; /* 初始值設成 0，代表還沒移動（剛開始在第一張幻燈片的位置）。後續會用這個變數記錄目前畫面左移的距離，控制幻燈片的滑動。 */

for(let i = 0; i < slideCount; i++){
  const clone = slides.children[i].cloneNode(true); /* .cloneNode(true)：複製這個元素。true 表示連裡面的內容一起複製（深層複製，包括圖片、文字等）。 */
  slides.appendChild(clone);
}

function moveSlide(){
  position -= slideWidth;
  slides.style.transition = 'transform 0.8s ease';
  slides.style.transform = `translateX(${position}px)`;
  
  if (Math.abs(position) >= slideWidth * slideCount){
    setTimeout(()=>{
      slides.style.transition = 'none'; /* 關掉動畫，這樣等一下移動 transform 時就不會有動畫。因為我們要瞬間把畫面「移回最左邊」，如果不關掉動畫，會變成反方向滑回去，被發現了。 */
    position = 0;
    slides.style.transform = `translateX(${position}px)`; /* 這個跳轉是「瞬間完成」，使用者感覺不到。 */
    },750);
  }
}

setInterval(moveSlide, 3000);

const dropletsContainer = document.getElementById('floating-droplets');
const droplets = [];
const dropletCount = 10;

for(let i = 0; i < dropletCount; i++){
  const droplet = document.createElement('div');
  droplet.classList.add('droplet');
  dropletsContainer.appendChild(droplet);
  droplets.push(droplet);
}

const wavePath = document.getElementById('wavePath');
const pathLength = wavePath.getTotalLength();
const startTimes = droplets.map (() => Math.random() * 10); /* map() 會對這 10 個水滴每一個都執行一次裡面的箭頭函式 () => Math.random() * 10。 */

function animateDroplets(timeStamps = 0){
  droplets.forEach((droplet, i) =>{
    let t = ((timeStamps / 1000 + startTimes[i]) % 10) /10;  /* t值 是 "比例" 比例就是說 要知道現在走到哪裡了，%這是取模（modulo）運算，會讓數值每 10 秒重新歸零，形成週期性循環。*/ /* 7.067 / 10 = 0.7067
這表示水滴走完路徑的 70.67% */
  /* 把動畫的「當前時間」加上一個針對第 i 個元素的「起始偏移」，讓每個元素的動畫看起來是在不同時間點開始。 */
    let distance = pathLength * t;
    let point = wavePath.getPointAtLength(distance);
    droplet.style.left = point.x + 'px';
    droplet.style.top = point.y + 'px';
  });
  requestAnimationFrame(animateDroplets);
}

animateDroplets();

const tooltip = document.createElement('div');
tooltip.id = 'tooltip';
document.body.appendChild(tooltip);

document.querySelectorAll('.node').forEach(node => {
  node.addEventListener('mouseenter', () => {
    const rect = node.getBoundingClientRect(); /* 因為我們的 tooltip 是一個獨立的 div，要讓它浮動到滑鼠移入的那個節點附近顯示，所以我們必須知道那個節點在哪裡，才能用 tooltip.style.left/top 把它放在正確的位置。 */
    tooltip.textContent = node.getAttribute('data-text');
    tooltip.style.left = (rect.left + rect.width / 2 + window.scrollX) + 'px'; /* window.scrollX：如果頁面有水平滾動，就要把滾動距離加進去，才能算出在整個頁面上的實際位置。 */
    tooltip.style.top = (rect.top - 40 + window.scrollY) + 'px'; /* 加上垂直滾動距離 */
    tooltip.classList.add('visible');
  })
  node.addEventListener('mouseleave', ()=>{
    tooltip.classList.remove('visible');
  })
})

function positionNodes() {
  const path = document.getElementById('wavePath');
  const pathLength = path.getTotalLength();

  document.querySelectorAll('.node').forEach(node => {
    const length = parseFloat(node.dataset.length);
    const point = path.getPointAtLength(length);
    
    node.style.position = 'absolute';
    node.style.left = `${point.x}px`;
    node.style.top = `${point.y}px`;
  });
}

window.addEventListener('load', positionNodes);
window.addEventListener('resize', positionNodes);
