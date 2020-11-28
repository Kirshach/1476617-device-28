"use strict";

// Выключаем ссылки-заглушки
let linkList = document.querySelectorAll('a[href=""]');
for (let i = 0; i < linkList.length; i++) {
  linkList[i].addEventListener("click", (evt) => {
    evt.preventDefault();
  });
}

/// Данный код - рукопашная замена :focus-visible, о котором я не знал на момент написания кода
let mouseDown = false;
let customFocusList = document.querySelectorAll(
  ".main-header a,\
  .main-footer a,\
	.catalog-depth-nav a,\
	.filter-range-slider,\
	.filter-form label,\
	.catalog-sorting-section a,\
	.compare-item,\
	.catalog-pagination-container a,\
	.contact-us-map,\
	.promo-pagination-list button"
);

for (let i = 0; i < customFocusList.length; i++) {
  customFocusList[i].addEventListener("mousedown", () => {
    mouseDown = true;
  });

  customFocusList[i].addEventListener("mouseup", (evt) => {
    evt.preventDefault();
    mouseDown = false;
  });

  customFocusList[i].addEventListener("mousemove", (evt) => {
    evt.preventDefault();
    mouseDown = false;
  });

  customFocusList[i].addEventListener("focus", () => {
    if (!mouseDown) {
      customFocusList[i].classList.add("focused-by-keyboard");
    }
  });

  customFocusList[i].addEventListener("blur", () => {
    customFocusList[i].classList.remove("focused-by-keyboard");
  });
}

//////////////////////////////////
///                            ///
///      Главная страница      ///
///                            ///
//////////////////////////////////

// Скрипты слайд-шоу промо-блока

let promoImagesList = document.querySelectorAll(".promo-image-slide");
let promoDescriptionsList = document.querySelectorAll(
  ".promo-description-slide"
);
let promoButtonsList = document.querySelectorAll(
  ".promo-pagination-list button"
);
let promoLength = promoDescriptionsList.length;

if (promoLength !== 0) {
  let promoCurrent = 0;

  if (
    promoDescriptionsList.length !== promoImagesList.length ||
    promoDescriptionsList.length !== promoButtonsList.length
  ) {
    alert(
      "Я сломался из-за того, что количество слайдов изображений, их описаний, и кнопок, им соответствующих, не равно ( ͡° ͜ʖ ͡°)"
    );
  }

  // Задаём функцию смены слайдов
  const showPromoSlide = (newCurrent) => {
    if (newCurrent === promoCurrent) {
      return;
    }
    for (let i = 0; i < promoLength; i++) {
      promoButtonsList[i].disabled = true;
    }

    // Переназначаем классы
    promoImagesList[promoCurrent].classList.remove("current-slide");
    promoDescriptionsList[promoCurrent].classList.remove("current-slide");
    promoButtonsList[promoCurrent].classList.remove("current-button");
    promoImagesList[newCurrent].classList.add("current-slide");
    promoDescriptionsList[newCurrent].classList.add("current-slide");
    promoButtonsList[newCurrent].classList.add("current-button");

    // Применяем анимацию исчезновения слайдов, отменяя правило по её окончании
    promoDescriptionsList[promoCurrent].style.animation = "dissolve-down 1s";
    promoImagesList[promoCurrent].style.animation = "dissolve-down 1s";
    setTimeout(() => {
      promoDescriptionsList[promoCurrent].style.animation = "none";
      promoImagesList[promoCurrent].style.animation = "none";
    }, 650);

    // Возвращаем активность кнопкам и обновляем переменную
    setTimeout(() => {
      for (let i = 0; i < promoLength; i++) {
        promoButtonsList[i].disabled = false;
      }
      promoButtonsList[newCurrent].disabled = true;
      promoCurrent = newCurrent;
    }, 650);
  };

  // Добавляем интерактивность кнопкам смены слайдов
  for (let i = 0; i < promoLength; i++) {
    promoButtonsList[i].addEventListener("click", (evt) => {
      promoButtonsList[i].blur();
      showPromoSlide(i);
    });

    promoButtonsList[i].addEventListener("keydown", function (event) {
      if (event.key === "Space") {
        setTimeout(() => {
          if (i < promoLength - 1) {
            promoButtonsList[i + 1].focus();
          } else {
            promoButtonsList[0].focus();
          }
        }, 720);
      }
    });
  }
}

// Скрипты блока "Сервисы"

let servicesButtonList = document.querySelectorAll(".services-button");
let servicesInfoList = document.querySelectorAll(".services-info-item");
let servicesLength = servicesButtonList.length;

if (servicesLength !== 0) {
  let servicesCurrent = 0;
  if (servicesButtonList.length !== servicesInfoList.length) {
    alert("Добавил кпопку - добавь и слайд ( ͡° ͜ʖ ͡°)");
  }

  const showServicesSlide = (newCurrent) => {
    servicesButtonList[servicesCurrent].disabled = false;
    servicesButtonList[newCurrent].disabled = true;

    servicesInfoList[servicesCurrent].style.animation = "dissolve 1s";
    setTimeout(() => {
      servicesInfoList[newCurrent].style.animation = "appear-from-left 1s";
    }, 200);

    // Устанавливаем высоту контейнера равной высоте абсолютно спозиционированного элемента
    let servicesContainer = document.querySelector(".services-info-list");
    let currentInfoItem = document.querySelector(
      `.services-info-item:nth-of-type(${newCurrent + 1})`
    );

    servicesContainer.style.height = `${currentInfoItem.clientHeight}px`;

    // Переназначаем классы
    servicesInfoList[servicesCurrent].classList.remove("current-info-item");
    servicesButtonList[servicesCurrent].classList.remove(
      "services-current-button"
    );
    servicesInfoList[newCurrent].classList.add("current-info-item");
    servicesButtonList[newCurrent].classList.add("services-current-button");
    servicesCurrent = newCurrent;
  };

  for (let i = 0; i < servicesLength; i++) {
    servicesButtonList[i].addEventListener("click", (evt) => {
      showServicesSlide(i);
    });
  }
}

// Скрипты каталога

let filterInputList = document.querySelectorAll(".filter-form input");
let filterLabelList = document.querySelectorAll(".filter-form label");
let labelsLength = filterLabelList.length;

for (let i = 0; i < labelsLength; i++) {
  filterLabelList[i].addEventListener("keydown", function (evt) {
    if (evt.key === "Space" || evt.key === "Enter") {
      if (
        filterInputList[i].checked &&
        filterInputList[i].type === "checkbox"
      ) {
        filterInputList[i].checked = false;
      } else {
        filterInputList[i].checked = true;
      }
    }
  });
}

//////////////////////////////////
///                            ///
///          Поп-апы           ///
///                            ///
//////////////////////////////////

///        Поп-ап карты        ///

let mapPopup = document.querySelector(".map-popup");
let mapIframe = document.querySelector(".map-popup iframe");
if (mapPopup) {
  let mapOpenButton = document.querySelector(".contact-us-map");
  let mapCloseButton = document.querySelector(".close-map-popup");

  mapOpenButton.addEventListener("click", () => {
    mapPopup.classList.add("is-displayed");
    mapPopup.focus();
  });

  mapCloseButton.addEventListener("click", () => {
    mapPopup.classList.remove("is-displayed");
    mapOpenButton.focus();
  });

  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      if (mapPopup.classList.contains("is-displayed")) {
        evt.preventDefault();
        mapPopup.classList.remove("is-displayed");
      }
    }
  });
}

///  Поп-ап "Напишите нам"  ///

let writeUsPopup = document.querySelector(".write-us-popup");
let writeUsForm = document.querySelector(".write-us-form");
if (writeUsPopup) {
  let writeUsOpenButton = document.querySelector(".write-us-button");
  let writeUsCloseButton = document.querySelector(".close-write-us-popup");
  let writeUsName = document.getElementById("write-us-name");
  let writeUsEmail = document.getElementById("write-us-email");
  let writeUsMessage = document.getElementById("write-us-message");
  let hasStorage = true;
  let storageName = "";
  let storageEmail = "";

  try {
    storageName = localStorage.getItem("name");
    storageEmail = localStorage.getItem("email");
  } catch (err) {
    hasStorage = false;
  }

  writeUsOpenButton.addEventListener("click", () => {
    writeUsPopup.classList.add("is-displayed");
    setTimeout(function () {
      if (storageName) {
        writeUsName.value = storageName;
        writeUsEmail.value = storageEmail;
        writeUsMessage.focus();
      } else {
        writeUsName.focus();
      }
    }, 100);
  });

  writeUsForm.addEventListener("submit", (evt) => {
    if (!writeUsName.value || !writeUsEmail.value || !writeUsMessage.value) {
      evt.preventDefault();
      writeUsPopup.classList.remove("error-animation");
      writeUsPopup.offsetWidth;
      writeUsPopup.classList.add("error-animation");
    } else {
      if (hasStorage) {
        localStorage.setItem("name", writeUsName.value);
        localStorage.setItem("email", writeUsEmail.value);
        writeUsPopup.classList.remove("error-animation");
      }
    }
  });

  writeUsCloseButton.addEventListener("click", (evt) => {
    writeUsPopup.classList.remove("is-displayed");
  });

  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      if (writeUsPopup.classList.contains("is-displayed")) {
        writeUsPopup.classList.remove("is-displayed");
      }
    }
  });
}
