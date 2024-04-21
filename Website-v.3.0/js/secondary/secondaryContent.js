let secondary_content = {
	home: {
		h1: 'This is Home!',
		p: 'Welcome to my Home',
	},
	about: {
		h1: 'This is My About!',
		p: 'Male, 24, San Diego',
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
		h1: 'Contact Me Here!',
		p: 'Call Me at 858-216-5827',
		phone: '858-216-5827',
		email: 'StephenG753@Gmail.com',
		facebook: 'https://www.Facebook.com/StephenG753/',
		instagram: 'https://www.Instagram.com/CrossroadsTravel753/',
		linkedIn: 'https://www.LinkedIn.com/in/StephenG753/',
		tutoring: 'https://www.CrossRoadsTutoring.com/',
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
}

function createAboutContent() {
	let imgGioStephen = createElement('img', ['about-img-half']);
	imgGioStephen.src = './images/gio-stephen.jpg';
	let imgJacobStephen = createElement('img', ['about-img-half']);
	imgJacobStephen.src = './images/jacob-stephen.jpg';

	// let card = createCardWithH1P(secondary_content.about.h1, secondary_content.about.p);
	createHierarchy([
		secondaryCarousel,
		createContainer(),
		createHeight90(),
		linkParentToChildren(createCard(), [
			createH1('Trip to NYC'),
			createP(
				'For my Birthday, my closest friends and I went to NYC where we were able to take in the full NYC scene.  On the first day, we walked over 26 miles from central Manhattan all the way down to mid Brooklyn.  We tried all the iconic and historic food spots on the way!  This included: Grays Papaya, Joes Pizza, Russ and Daughters, Katz Deli, Wah Fungs, and Lucalis! On day 2, we went to the MET, Grand Central Station, and the Rockfeller Center.  For the last day, we went to Sylvias Restaurant (Our Favorite Spot!), Peter Lugars, and Central Park.'
			),
			linkParentToChildren(createElement('div', ['side-by-side']), [imgGioStephen, imgJacobStephen]),
		]),
	]);
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
	let a_tel = createElement('a', [], secondary_content.contact.phone);
	a_tel.href = 'tel:' + secondary_content.contact.phone;
	let contact_p1 = linkParentToChildren(createP('Call Me At: ', ['contact-link']), [a_tel]);
	let a_email = createElement('a', [], secondary_content.contact.email);
	a_email.href = 'mailto:' + secondary_content.contact.email;
	let contact_p2 = linkParentToChildren(createP('Email Me At: ', ['contact-link']), [a_email]);

	createHierarchy([
		secondaryCarousel,
		createContainer(),
		createHeight90(),
		linkParentToChildren(createCard(), [createH1(secondary_content.contact.h1), contact_p1, contact_p2]),
	]);

	let fb_link = createA(secondary_content.contact.facebook, [], secondary_content.contact.facebook);
	let social_p1 = linkParentToChildren(createP('Facebook: <br />', ['contact-link']), [fb_link]);
	let ig_link = createA(secondary_content.contact.instagram, [], secondary_content.contact.instagram);
	let social_p2 = linkParentToChildren(createP('Instagram: <br />', ['contact-link']), [ig_link]);
	let LI_link = createA(secondary_content.contact.linkedIn, [], secondary_content.contact.linkedIn);
	let social_p3 = linkParentToChildren(createP('LinkedIn: <br />', ['contact-link']), [LI_link]);
	let CT_link = createA(secondary_content.contact.tutoring, [], secondary_content.contact.tutoring);
	let social_p4 = linkParentToChildren(createP('Tutoring: <br />', ['contact-link']), [CT_link]);

	createHierarchy([
		secondaryCarousel,
		createContainer(),
		createHeight90(),
		linkParentToChildren(createCard(), [createH1('Connect With Me!'), social_p1, social_p2, social_p3, social_p4]),
	]);
}

function createFirstCards(secondaryCarouselIndexParam = 0, desiredSecondaryCarouselIndexParam = 0) {
	clearContent(secondaryCarousel);

	let home_card = createCardWithH1P(secondary_content.home.h1, secondary_content.home.p);
	let about_card = createCardWithH1P(secondary_content.about.h1, secondary_content.about.p);
	let projects_card = createCardWithH1P(secondary_content.projects.h1, secondary_content.projects.p);
	let resume_card = createCardWithH1P(secondary_content.resume.h1, secondary_content.resume.p);
	let contact_card = createCardWithH1P(secondary_content.contact.h1, secondary_content.contact.p);
	let firstCards = [home_card, about_card, projects_card, resume_card, contact_card];

	for (let i = 0; i < firstCards.length; i++) {
		createHierarchy([secondaryCarousel, createContainer(), createHeight90(), firstCards[i]]);
	}

	addContent(secondaryCarouselIndexParam, desiredSecondaryCarouselIndexParam);
	upArrow.classList.add('display-none');
}
