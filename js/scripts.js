'use strict'

///////////////////////////////////////////////////////////////////////////////
///                                                                         ///
///                          Не судите код строго   =)                      ///
///  Он ни разу не DRY, я ещё не изучал JS на момент вёрстки этого макета   ///
///                                                                         ///
///////////////////////////////////////////////////////////////////////////////

/// ALERT!
/// Следующий кусок кода уродлив
/// Я ещё не знаю js, но очень хотел стилизовать focus по клавиатуре, 
/// но не по клику. Имплементация уродливая, но лучшая, которую я мог написать
/// на текущем уровне (не)знания JS

let mouseDown = false;
let customFocusList = document.querySelectorAll('.main-header a:not(.header-logo), \
																.main-footer a:not(.footer-logo), \
																.promo-pagination-list button');

for (let i = 0; i < customFocusList.length; i++) {

	customFocusList[i].addEventListener('mousedown', function() {
	  mouseDown = true;
	});

	customFocusList[i].addEventListener('mouseup', function(event) {
		event.preventDefault();
		mouseDown = false;
	});

	customFocusList[i].addEventListener('mousemove', function(event) {
		event.preventDefault();
		mouseDown = false;
	});

	customFocusList[i].addEventListener('focus', function() {
		if (!mouseDown) {
			customFocusList[i].classList.add('focused-by-keyboard');
		};
	});

	customFocusList[i].addEventListener('blur', function() {
			customFocusList[i].classList.remove('focused-by-keyboard');
		});

};

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
		}, 650);

		// Возвращаем активность кнопкам и обновляем переменную
		setTimeout(function() {
			for (let i = 0; i < promoLength; i++) {
				promoButtonsList[i].disabled = false;
			};
			promoButtonsList[newCurrent].disabled = true;
			promoCurrent = newCurrent;
		}, 650);

	};

	for (let i = 0; i < promoLength; i++) {
		promoButtonsList[i].onclick = function(event) {
			promoButtonsList[i].blur();
			event.preventDefault();
			showPromoSlide(i);
		};

		promoButtonsList[i].onkeyup = function(e){
			if (e.keyCode == 32) { 
				setTimeout(function() {
					if (i < promoLength - 1) {
						promoButtonsList[i+1].focus();
					} else {
						promoButtonsList[0].focus();
					};
				}, 720);
			};
		};

	};

};

// Скрипты блока "Сервисы"

let servicesButtonList = document.querySelectorAll('.services-button');
let servicesInfoList = document.querySelectorAll('.services-info-item');
let servicesLength = servicesButtonList.length;

if (servicesLength !== 0) {

	let servicesCurrent = 0;

	if (servicesButtonList.length !== servicesInfoList.length) { 
		alert('Добавил кпопку - добавь и слайд ( ͡° ͜ʖ ͡°)') };

	function showServicesSlide(newCurrent) {

		servicesButtonList[servicesCurrent].disabled = false;
		servicesButtonList[newCurrent].disabled = true;


		servicesInfoList[servicesCurrent].style.animation = "dissolve 1s";
		setTimeout(function() {
			servicesInfoList[newCurrent].style.animation = "appear-from-left 1s";
		}, 200);


		// Устанавливаем высоту контейнера равной высоте абсолютно спозиционированного элемента

		let servicesContainer = document.querySelector('.services-info-list');
		let currentInfoItem = document.querySelector(`.services-info-item:nth-of-type(${newCurrent + 1})`);

		servicesContainer.style.height = `${currentInfoItem.clientHeight}px`;

		// Переназначаем классы
		servicesInfoList[servicesCurrent].classList.remove('current-info-item');
		servicesButtonList[servicesCurrent].classList.remove('services-current-button');
		servicesInfoList[newCurrent].classList.add('current-info-item');
		servicesButtonList[newCurrent].classList.add('services-current-button');

		servicesCurrent = newCurrent;

	};

	for (let i = 0; i < servicesLength; i++) {
		servicesButtonList[i].onclick = function(event) {
			event.preventDefault();
			showServicesSlide(i);
		};
	};

};

