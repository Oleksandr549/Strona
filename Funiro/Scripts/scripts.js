
window.onload = function () {
   //header
   const headerElement = document.querySelector(`.header`);

   const callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
         headerElement.classList.remove(`_scroll`)
      } else {
         headerElement.classList.add(`_scroll`);
      }
   };

   const headerObsever = new IntersectionObserver(callback);
   headerObsever.observe(headerElement);


   //Gallety
   const furniture = document.querySelector(`.furniture__body`);
   if (furniture && !isMobile.any()) {
      const furnitureItems = document.querySelector(`.furniture__items`);
      const furnitureColumn = document.querySelectorAll(`.furniture__column`);
      //speed
      const speed = furniture.CDATA_SECTION_NODE.speed;
      //Обьявление перемених
      let positionX = 0;
      let coordXprocent = 0;


      function setMouseGalletyStyle() {
         let furnitureItemsWidth = 0;
         furnitureColumn.forEach(element => {
            furnitureItemsWidth += element.offsetWidth;
         });

         const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
         const distX = Math.floor(coordXprocent - positionX);

         positionX = positionX + (distX * speed);
         let position = furnitureDifferent / 200 * positionX;

         furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

         if (Math.abs(distX) > 0) {
            requestAnimationFrame(setMouseGalletyStyle);
         } else {
            furniture.classList.remove('_init');
         }
      }
      furniture.addEventListener("mousemove", function (e) {
         //получение ширини
         const furnitureWidth = furniture.offsetWidth;
         //ноль по серелине
         const coordx = e.pageX - furnitureWidth / 2;
         //получение процентов
         coordXprocent = coordx / furnitureWidth * 200;

         if (!furniture.classList.contains('_init')) {
            requestAnimationFrame(setMouseGalletyStyle);
            furniture.classList.add('_init');
         }

      });
   }

}