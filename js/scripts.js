'use strict'

///////////////////////////////////////////////////////////////////////////////
///                                                                         ///
///                          Не судите код строго   =)                      ///
///  Он ни разу не DRY, я ещё не изучал JS на момент вёрстки этого макета   ///
///                                                                         ///
///////////////////////////////////////////////////////////////////////////////

//////////////////////////////////
///                            ///
///      Главная страница      ///
///                            ///
//////////////////////////////////

// Скрипты слайд-шоу промо-блока

let promoImagesList = document.querySelectorAll('.promo-image-slide');
let promoDescriptionsList = document.querySelectorAll('.promo-description-slide');
let promoButtonsList = document.querySelectorAll('.promo-pagination-list button');
let promoLength = promoDescriptionsList.length;

if (promoLength !== 0) {

	let promoCurrent = 0;

	if (promoDescriptionsList.length !== promoImagesList.length ||
		 promoDescriptionsList.length !== promoButtonsList.length) { 
		alert('Я сломался из-за того, что количество слайдов изображений, их описаний, и кнопок, им соответствующих, не равно ( ͡° ͜ʖ ͡°)') };

	function showPromoSlide(newCurrent) {

		// Отключаем кнопки на время анимации
		for (let i = 0; i < promoLength; i++) {
			promoButtonsList[i].disabled = true;
		};

		// Переназначаем классы
		promoImagesList[promoCurrent].classList.remove('current-slide');
		promoDescriptionsList[promoCurrent].classList.remove('current-slide');
		promoButtonsList[promoCurrent].classList.remove('current-button');
		promoImagesList[newCurrent].classList.add('current-slide');
		promoDescriptionsList[newCurrent].classList.add('current-slide');
		promoButtonsList[newCurrent].classList.add('current-button');

		// Применяем анимацию исчезновения слайдов, отменяя правило по её окончании
		promoDescriptionsList[promoCurrent].style.animation = "dissolve-down 1s";
		promoImagesList[promoCurrent].style.animation = "dissolve-down 1s";
		setTimeout(function() {
			promoDescriptionsList[promoCurrent].style.animation = "none"
			promoImagesList[promoCurrent].style.animation = "none"; 
		}, 200);

		// Возвращаем активность кнопкам
		setTimeout(function() {
			for (let i = 0; i < promoLength; i++) {
				promoButtonsList[i].disabled = false;
			};
			promoButtonsList[newCurrent].disabled = true;
			promoCurrent = newCurrent;
		}, 700);

	};

	for (let i = 0; i < promoLength; i++) {
		promoButtonsList[i].onclick = function(event) {
			event.preventDefault();
			showPromoSlide(i);
		};
	};

}