const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
})


window.addEventListener('load', () => {
  const princess = document.getElementById('princess');
  const handShakenDrinks = document.getElementById('hand_shaken_drinks');
  const animal = document.getElementById('animal');
  const girlAndFlower = document.getElementById('girl_and_flower');
  const coffeeAroma = document.getElementById('coffee_aroma');
  const PearlMilkTea = document.getElementById('Pearl_milk_tea');
  const teapot = document.getElementById('teapot');
  const girl = document.getElementById('girl');
  const download = document.getElementById('download');
  const allMenus = document.querySelectorAll('#menu-text, #menu-text2, #menu-text3, #menu-text4, #menu-text5, #menu-text6, #menu-text7, #menu-text8, #info-block, #features, #features-2'); // 所有文字區塊

  // 新增：三個虛線框元素
  const princessBox = document.getElementById('princess-box');
  const handShakenBox = document.getElementById('hand_shaken_drinks_box');
  const animalBox = document.getElementById('animal-box');
  const girlAndFlowerBox = document.getElementById('girl_and_flower_box') // 圖片與虛線框同時淡入
  const coffeeAromaBox = document.getElementById('coffee_aroma_box');
  const pearlMilkTeaBox = document.getElementById('Pearl_milk_tea_box');
  const teapotBox = document.getElementById('teapot_box');
  const girlBox = document.getElementById('girl_box');
  const downloadBox = document.getElementById('download_box');

  setTimeout(() => {
    princess.style.opacity = 1;
    handShakenDrinks.style.opacity = 1;
    animal.style.opacity = 1;
    girlAndFlower.style.opacity = 1;
    coffeeAroma.style.opacity = 1;
    PearlMilkTea.style.opacity = 1;
    teapot.style.opacity = 1;
    girl.style.opacity = 1;
    download.style.opacity = 1;

    // ✅ 同步淡入框線（稍微柔和一些）
    princessBox.style.opacity = 0.6;
    handShakenBox.style.opacity = 0.6;
    animalBox.style.opacity = 0.6;
    girlAndFlowerBox.style.opacity = 0.6;
    coffeeAromaBox.style.opacity = 0.6;
    pearlMilkTeaBox.style.opacity = 0.6;
    teapotBox.style.opacity = 0.6;
    girlBox.style.opacity = 0.6;
    downloadBox.style.opacity = 0.6;
  }, 5100);

  // 淡入所有文字（同時）
  setTimeout(() => {
    allMenus.forEach(menu => {
      menu.style.opacity = 1;
    });
  }, 5600);
});
