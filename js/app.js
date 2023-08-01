const closeElem = function(elem, elemToClose, removeClass) {
	elem.addEventListener('click', () => {
		elemToClose.forEach((e, i) => {
			document.body.style.overflow = 'auto',
			e.classList.remove(removeClass[i])
		});
	});
};
const openElem = function(elem, elemToOpen, addClass) {
	elem.addEventListener('click', () => {
		elemToOpen.forEach((e, i) => {
			document.body.style.overflow = 'hidden',
			e.classList.add(addClass[i])
		});
	});
};

const hamburger = document.querySelector('.hamburger'),
		menu = document.querySelector('.menu'),
		menuClose = document.querySelector('.menu__close'),
		menuOverlay = document.querySelector('.menu__overlay'),
		menuItems = document.querySelectorAll('.menu__item');

openElem(hamburger, [menu], ['menu_active']);


closeElem(menuClose, [menu], ['menu_active']);
closeElem(menuOverlay, [menu], ['menu_active']);
menuItems.forEach((e) => closeElem(e, [menu], ['menu_active']));

const form = document.querySelector('.form'),
		formClose = document.querySelector('.form__close'),
		formWrapper = document.querySelector('.form__wrapper'),
		greetingButton = document.querySelector('.greeting__button');


openElem(greetingButton, [form, formWrapper], ['form_active', 'form__wrapper_active']);

closeElem(formClose, [form, formWrapper], ['form_active', 'form__wrapper_active']);

const telInput = document.querySelector('.form__tel');
const regex = /^(0|[1-9]\d*)$/
telInput.addEventListener('input', () => {
	if (!regex.test(telInput.value) || telInput.value.length > 11) {
		telInput.value = telInput.value.slice(0, telInput.value.length - 1);
	}
});

function postData(form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		for (const [key, value] of formData.entries()) {
			console.log(key, value);
		}

		fetch('server.php', {
			method: 'POST',
			body: formData
		})
			.then(response => response.text())
			.then(data => {
				console.log(data);
				if (data === 'success') {
					form.reset();
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
	});
}

postData(form);

const swiper = new Swiper('.mySwiper', {
	loop: true,

	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		},
		
	navigation: {
		nextEl: '.reviews__swiper-button-next',
		prevEl: '.reviews__swiper-button-prev',
		},
	});


const swiper2 = new Swiper('.mySwiper2', {
	centeredSlides: true,

	breakpoints: {
		200: {
			slidesPerView: 1,
			spaceBetween: 10,
			pagination: {
				enabled: true,
				el: '.swiper-pagination',
				type: 'bullets',
				},
		},
		576: {
			pagination: {
				enabled: false
			},
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
	},
	navigation: {
		nextEl: '.photos__swiper-button-next',
		prevEl: '.photos__swiper-button-prev',
		},
});


const contactsForm = document.querySelector('.contacts__form'),
		contactsButton = document.querySelector('.contacts__form-button'),
		contactsEmail = document.querySelector('.contacts__form-input-email'),
		contactsName = document.querySelector('.contacts__form-input-name');

contactsButton.addEventListener('click', (e) => {
	const validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!(contactsEmail.value.match(validRegex))) {
		e.preventDefault();
		contactsEmail.classList.add('contacts__form-input_error');
	} 
	if (contactsName.value === '') {
		e.preventDefault();
		contactsName.classList.add('contacts__form-input_error');
	}
	if (contactsName.value != '' && contactsEmail.value.match(validRegex)) {
		e.preventDefault();
		contactsForm.reset();
	}
});

function clearErrorClass(input) {
	input.addEventListener('input', () => {
		input.classList.remove('contacts__form-input_error');
	});
};

clearErrorClass(contactsEmail);
clearErrorClass(contactsName);
