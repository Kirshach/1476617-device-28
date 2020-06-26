'use strict'

//////////////////////////////////
///                            ///
///      Главная страница      ///
///                            ///
//////////////////////////////////

// Скрипты слайд-шоу промо-блока

// Не судите строго код =)
// Он ни разу не DRY, я ещё совсем не вникал в синтаксис JS

let promoImagesList = document.querySelectorAll('.promo-image-slide');
let promoDescriptionsList = document.querySelectorAll('.promo-description-slide');
let promoButtonsList = document.querySelectorAll('.promo-pagination-list button');
let promoLength = promoDescriptionsList.length;
let promoCurrent = 0;
let promoPrevious = null;

if (promoLength !== 0) {

	if (promoDescriptionsList.length !== promoImagesList.length ||
		 promoDescriptionsList.length !== promoButtonsList.length) { 
		alert('Я сломался из-за того, что количество слайдов изображений, их описаний, и кнопок, им соответствующих, не равно ( ͡° ͜ʖ ͡°)') };

	function showPromoSlide(newCurrent) {

		// Удаляем старые классы

		if (promoPrevious !== null) {
			promoImagesList[promoPrevious].classList.remove('previous-slide');
			promoDescriptionsList[promoPrevious].classList.remove('previous-slide');
		}

		promoImagesList[promoCurrent].classList.remove('current-slide');
		promoDescriptionsList[promoCurrent].classList.remove('current-slide');
		promoButtonsList[promoCurrent].classList.remove('current-button');

		// Переназначаем переменные

		promoPrevious = promoCurrent;
		promoCurrent = newCurrent;

		// Добавляем новые классы

		promoImagesList[promoPrevious].classList.add('previous-slide');
		promoDescriptionsList[promoPrevious].classList.add('previous-slide');

		promoImagesList[promoCurrent].classList.add('current-slide');
		promoDescriptionsList[promoCurrent].classList.add('current-slide');
		promoButtonsList[promoCurrent].classList.add('current-button');

		// Удаляем классы 'previous-slide' по окончании анимации
		// для корректного отображения повторого появления слайда

		setTimeout(function() {
			promoImagesList[promoPrevious].classList.remove('previous-slide');
			promoDescriptionsList[promoPrevious].classList.remove('previous-slide');
		}, 600);
	};

	for (let i = 0; i < promoLength; i++) {
		promoButtonsList[i].onclick = function(event) {
			event.preventDefault();
			showPromoSlide(i);
		};
	};

}