"use strict"

let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
	//Добавление класса _touch для HTML если браузер мобильный
	if (isMobile.any()) document.documentElement.classList.add('touch');
}

// Убрать класс из всех элементов массива
function removeClasses(array, className) {
	for (var i = 0; i < array.length; i++) {
		array[i].classList.remove(className);
	}
}

//Класс ibg 

function ibg() {

	let ibg = document.querySelectorAll("._ibg");

	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();



///BurgerMenu============================================
var burger = document.querySelector(".icon-menu");
var burgerBody = document.querySelector(".menu-header")
burger.addEventListener("click", function (e) {
	burger.classList.toggle("menu-open");
	burgerBody.classList.toggle("_active");
	document.querySelector(".body-header__lable").classList.toggle('_open');
	document.querySelector(".body-header__buy").classList.toggle('_open');
}
)

// Email validation


const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const input = document.querySelector('.input');
const button = document.querySelector('.contact-footer__button');
const inputSign = document.querySelector('.inputSign');
const buttonSign = document.querySelector('.sign__button');


function isEmailValid(value) {
	return EMAIL_REGEXP.test(value);
}

button.addEventListener('click', function (event) {
	if (isEmailValid(input.value)) {
		input.style.color = 'green';
	} else {
		input.style.color = 'red';
		event.preventDefault();
		input.value = "Incorrect Email!"
	}

});
buttonSign.addEventListener('click', function (event) {
	if (isEmailValid(inputSign.value)) {
		inputSign.style.color = 'green';
	} else {
		inputSign.style.color = 'red';
		event.preventDefault();
		inputSign.value = "Incorrect Email!"
	}

});
document.addEventListener("click", function (e) {
	const targetElement = e.target;
	if (!targetElement.closest('.sign__button') && !targetElement.closest('.inputSign')) {
		inputSign.value = "";
		inputSign.style.color = '#1A0A03';
	}
});
document.addEventListener("click", function (e) {
	const targetElement = e.target;
	if (!targetElement.closest('.contact-footer__button') && !targetElement.closest('.input')) {
		input.value = "";
		input.style.color = '#1A0A03';
	}
});

//==========================================================

// Spoiler=======================

const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// Получение обычных слойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Инициализация обычных слойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Получение слойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// Инициализация слойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}

}


//========================================================================================================================================================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

//========================================================================================================================================================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например:
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px
	
Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/




//=======================================================

//=============================================================
//Price
var slider = document.getElementById("myRange");
var output = document.getElementById("price");
output.innerHTML = `$` + slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
	output.innerHTML = `$` + this.value;
}

//items in spoiller choise

document.addEventListener('click', function (e) {
	const targetElement = e.target;

	let item = targetElement.getAttribute('id');
	let title = document.getElementById(item);
	title.innerHTML = targetElement.innerText;
	if (title) {
		title.classList.remove('_active');
		_slideUp(title.nextElementSibling, 500);
	}

})




//=========================================================
//video========

let playButton = document.querySelector('.block-video__button');
playButton.addEventListener('click', function () {
	playButton.classList.toggle('_active');
	if (playButton.classList.contains('_active')) {
		let video = document.querySelector('.block-video__clip');
		video.setAttribute('controls', '');
		video.play();
	}
})
//================================

window.addEventListener("load", function (e) {
	//ajax запрос
	//Все продукты
	//функциия more products===========================================================================
	async function getProducts() {
		const file = "json/products.json";
		let response = await fetch(file, {
			method: "GET"
		});
		if (response.ok) {
			let result = await response.json();
			loadProducts(result);

		} else {
			alert("Ошибка");
		}
	}

	function loadProducts(data) {

		const productsItems = document.querySelector('.slider-body__wrapper');

		data.products.forEach(item => {

			const productId = item.id;
			const productDataSet = item.data;
			const productImage = item.image;
			const productTitle = item.title;
			const productPrice = item.price;

			let productTemplate = `	<div class="slider-body__slide swiper-slide animate__animated animate__bounceInDown" id="${productId}" data-set="${productDataSet}">
	<div class="slider-body__image ">
		<img src="img/gallary/${productImage}" alt="image">
	</div>
	<div class="slider-body__cont">
		<div class="slider-body__titl">${productTitle}</div>
		<div class="slider-body__size">Size:<span>Dubble-XL</span></div>
		<div class="slider-body__price">Price:<span>${productPrice}</span></div>
		<button class="slider-body__button _btn">Buy now</button>
	</div>
</div>`;

			productsItems.insertAdjacentHTML('beforeEnd', productTemplate);

		}
		);

	};
	//=================================================================================
	//Продукты по атрибуту====================================
	async function getProductsAtr(atr) {
		const file = "json/products.json";
		let response = await fetch(file, {
			method: "GET"
		});
		if (response.ok) {
			let result = await response.json();
			loadProductsAtr(result, atr);

		} else {
			alert("Ошибка");
		}
	}

	function loadProductsAtr(data, atr) {

		const productsItems = document.querySelector('.slider-body__wrapper');

		data.products.forEach(item => {
			if (item.data == atr) {
				const productId = item.id;
				const productDataSet = item.data;
				const productImage = item.image;
				const productTitle = item.title;
				const productPrice = item.price;

				let productTemplate = `	<div class="slider-body__slide swiper-slide animate__animated 
				animate__bounceInDown" id="${productId}" data-set="${productDataSet}">
<div class="slider-body__image ">
	<img src="img/gallary/${productImage}" alt="image">
</div>
<div class="slider-body__cont">
	<div class="slider-body__titl">${productTitle}</div>
	<div class="slider-body__size">Size:<span>Dubble-XL</span></div>
	<div class="slider-body__price">Price:<span>${productPrice}</span></div>
	<button class="slider-body__button _btn">Buy now</button>
</div>
</div>`;

				productsItems.insertAdjacentHTML('beforeEnd', productTemplate);

			}
		}
		);

	};
	//=========================================================
	getProducts();

	//Смена категорий=================================
	let categoriesList = document.querySelector('.gallary__categories');
	categoriesList.addEventListener('click', function (e) {
		const targetElement = e.target;
		let categoriesItem = document.querySelectorAll('.categories__item');
		for (var i = 0; i < categoriesItem.length; i++) {
			categoriesItem[i].classList.remove('_active');
		}
		if (!targetElement.closest('.categories__item').classList.contains('_active')) {
			targetElement.closest('.categories__item').classList.add('_active');
		};
		e.preventDefault();
		changeCategories(targetElement);
	});
	function changeCategories(e) {
		let atr = e.closest('.categories__item').getAttribute('data-set');
		let slids = document.querySelectorAll('.slider-body__slide');

		if (atr == "male") {
			for (var i = 0; i < slids.length; i++) {
				slids[i].remove();
			}
			getProductsAtr(atr);
		}
		if (atr == "female") {
			for (var i = 0; i < slids.length; i++) {
				slids[i].remove();
			}
			getProductsAtr(atr);
		}
		if (atr == "kids") {
			for (var i = 0; i < slids.length; i++) {
				slids[i].remove();
			}
			getProductsAtr(atr);
		}
		if (atr == "all") {
			for (var i = 0; i < slids.length; i++) {
				slids[i].remove();
			}
			getProducts();
		}
	}


	//========================================================
});


//Слайдер swipper

let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}

//first slider
function sliders_bild_callback(params) { }
if (document.querySelector('.slider__bodys')) {
	new Swiper('.slider__bodys', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 10,
		watchOverflow: false,
		speed: 1500,
		loop: false,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,

		// Arrows
		navigation: {
			nextEl: '.main-slider .slider__arrow-next ',
			prevEl: '.main-slider .slider__arrow-prev',
		}
	});
}
//second slider
if (document.querySelector('.gallary__slider-body')) {

	new Swiper('.gallary__slider-body', {
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		slidesPerView: 4,
		spaceBetween: 23,
		watchOverflow: true,
		speed: 800,
		loop: false,
		loopedSlides: 4,
		loopAdditionalSlides: 5,
		preloadImages: true,
		parallax: true,
		//initialSlide: 8,
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 1,
			},
			480: {
				slidesPerView: 1.5,
			},
			768: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 3.5,
			},
			1152: {
				slidesPerView: 4,
			}
		},

		// Arrows
		navigation: {
			nextEl: '.gallary ._next-arrow',
			prevEl: '.gallary ._prev-arrow',
		}
	});
}

//third slider======================
if (document.querySelector('.slider-testimonials__body')) {

	new Swiper('.slider-testimonials__body', {
		observer: true,
		observeParents: true,

		slidesPerView: 1,
		spaceBetween: 30,
		watchOverflow: true,
		speed: 800,
		loop: false,
		//loopedSlides: 4,
		loopAdditionalSlides: 5,
		preloadImages: true,
		parallax: true,
		// Arrows
		navigation: {
			nextEl: '.testimonials__slider ._next-arrow',
			prevEl: '.testimonials__slider ._prev-arrow',
		}
	});
}



//Смена кнопок=============================
let mainSlider = document.getElementsByClassName('slider__slide');
let sliderLenght = mainSlider.length;
let buttonSliderNext = document.querySelector('.slider__arrow-next');
let buttonSliderPrev = document.querySelector('.slider__arrow-prev');
buttonSliderNext.addEventListener('click', function () {
	let activeSlide = document.querySelector('.swiper-slide-active');
	let idslide = activeSlide.getAttribute('id');
	if (idslide == sliderLenght) {
		buttonSliderNext.classList.add('_active');
		buttonSliderPrev.classList.add('_active');
	}
})
buttonSliderPrev.addEventListener('click', function () {
	let activeSlide = document.querySelector('.swiper-slide-active');
	let idslide = activeSlide.getAttribute('id');
	if (idslide == 1) {
		buttonSliderNext.classList.remove('_active');
		buttonSliderPrev.classList.remove('_active')
	}
})
//==========================











