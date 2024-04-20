let secondary_content = {
	home: {
		h1: 'This is Home!',
		p: 'Home G = Emoh G = Emoji',
	},
	about: {
		h1: 'This is About!',
		p: 'I am Stephen',
	},
	projects: {
		h1: 'Chess AI',
		p: 'Chess Project',
	},
	resume: {
		h1: 'Download My Resume Here!',
		p: '<a href="./assets/Resume.pdf">Click Here for My Resume</a>',
		src: './assets/Resume.pdf',
	},
	contact: {
		h1: 'Contact',
		p: 'Call Me ig',
		phone: '858-216-5827',
		email: 'StephenG753@Gmail.com',
		tutoring: 'CrossRoadsTutoring.com',
		facebook: 'https://www.Facebook.com/StephenG753',
		instagram: 'https://www.Instagram.com/CrossroadsTravel753/',
		linkedIn: 'https://www.LinkedIn.com/in/StephenG753/',
	},
};

function getContent(index) {
	clearContent(secondaryCarousel);
	switch (index) {
		case 0:
			createHomeContent();
			break;
		case 1:
			createAboutContent();
			break;
		case 2:
			createProjectsContent();
			break;
		case 3:
			createResumeContent();
			break;
		case 4:
			createContactContent();
			break;
	}
	addContent();
}

function addContent(secondaryCarouselIndexParam = 0, desiredSecondaryCarouselIndexParam = 0) {
	secondaryCarouselIndex = secondaryCarouselIndexParam;
	desiredSecondaryCarouselIndex = desiredSecondaryCarouselIndexParam;
	numSecondaryChildren = secondaryCarouselChildren.length;
	for (let i = 0; i < numSecondaryChildren; i++) {
		secondaryCarousel.appendChild(secondaryCarouselChildren[i].cloneNode(true));
	}
	setSecondaryCarouselPosition();

	if (numSecondaryChildren <= 1) {
		upArrow.classList.add('display-none');
	} else {
		upArrow.classList.remove('display-none');
	}
}

function createHomeContent() {
	let card = createCardWithH1P(secondary_content.home.h1, secondary_content.home.p);
	createHierarchy([secondaryCarousel, createContainer(), createHeight90(), card]);
	createHierarchy([secondaryCarousel, createContainer(), createHeight90(), card.cloneNode(true)]);
}

function createAboutContent() {
	let card = createCardWithH1P(secondary_content.about.h1, secondary_content.about.p);
	createHierarchy([secondaryCarousel, createContainer(), createHeight90(), card]);
	createHierarchy([secondaryCarousel, createContainer(), createHeight90(), card.cloneNode(true)]);
}

function createProjectsContent() {
	for (let i = 0; i < projectFileInfo.length; i++) {
		createProjectContainer(projectFileInfo[i]);
	}
}

function createResumeContent() {
	let object = createElement('object', ['pdf']);
	object.data = secondary_content.resume.src;
	object.appendChild(createCardWithH1P(secondary_content.resume.h1, secondary_content.resume.p));
	createHierarchy([secondaryCarousel, createContainer(), createHeight90(), object]);
}

function createContactContent() {
	createHierarchy([
		secondaryCarousel,
		createContainer(),
		createHeight90(),
		createCardWithH1P(
			secondary_content.contact.h1,
			secondary_content.contact.phone + '<br/>' + secondary_content.contact.email
		),
	]);

	let p_2_html =
		'Facebook: ' +
		secondary_content.contact.facebook +
		'<br />' +
		'Instagram: ' +
		secondary_content.contact.instagram +
		'<br />' +
		'LinkedIn: ' +
		secondary_content.contact.linkedIn +
		'<br />' +
		'Tutoring: ' +
		secondary_content.contact.tutoring;
	createHierarchy([
		secondaryCarousel,
		createContainer(),
		createHeight90(),
		createCardWithH1P('Socials', p_2_html),
	]);
}

function createFirstCards(secondaryCarouselIndexParam = 0, desiredSecondaryCarouselIndexParam = 0) {
	clearContent(secondaryCarousel);
	let home_card = createCardWithH1P(secondary_content.home.h1, secondary_content.home.p);
	let about_card = createCardWithH1P(secondary_content.about.h1, secondary_content.about.p);
	let projects_card = createCardWithH1P(
		secondary_content.projects.h1,
		secondary_content.projects.p
	);
	let resume_card = createCardWithH1P(secondary_content.resume.h1, secondary_content.resume.p);
	let contact_card = createCardWithH1P(secondary_content.contact.h1, secondary_content.contact.p);
	let firstCards = [home_card, about_card, projects_card, resume_card, contact_card];

	for (let i = 0; i < firstCards.length; i++) {
		createHierarchy([secondaryCarousel, createContainer(), createHeight90(), firstCards[i]]);
	}

	addContent(secondaryCarouselIndexParam, desiredSecondaryCarouselIndexParam);
}
