function createHierarchy(hierarchy) {
	for (let i = hierarchy.length - 1; i >= 1; i--) {
		hierarchy[i - 1].appendChild(hierarchy[i]);
	}
	return hierarchy[0];
}

function linkParentToChildren(parent, children) {
	for (let i = 0; i < children.length; i++) {
		parent.appendChild(children[i]);
	}
	return parent;
}

function clearContent(carousel) {
	while (carousel.firstChild) {
		carousel.removeChild(carousel.lastChild);
	}
}

function reverseChildren(carousel) {
	let reverseChildList = [];
	for (let i = carousel.children.length - 1; i >= 0; i--) {
		reverseChildList.push(carousel.children[i]);
	}
	clearContent(carousel);
	for (let i = 0; i < reverseChildList.length; i++) {
		carousel.appendChild(reverseChildList[i]);
	}
}

function createElement(tag, appendClassList = []) {
	let element = document.createElement(tag);
	element.classList.add(...appendClassList);
	return element;
}

function createContainer(appendClassList = []) {
	return createElement('div', ['container', ...appendClassList]);
}

function createHeight90(appendClassList = []) {
	return createElement('div', ['height-90', ...appendClassList]);
}

function createCard(appendClassList = []) {
	return createElement('div', ['card', ...appendClassList]);
}

function createH1(h1Text, appendClassList = []) {
	let h1 = createElement('h1', ['heading-1', 'bold', ...appendClassList]);
	h1.innerHTML = h1Text;
	return h1;
}

function createP(pText, appendClassList = []) {
	let p = createElement('p', ['paragraph', ...appendClassList]);
	p.innerHTML = pText;
	return p;
}

function createCardWithH1P(h1Text, pText, appendClassList = []) {
	return linkParentToChildren(createCard(appendClassList), [createH1(h1Text), createP(pText)]);
}

function hoverFullBrightness(element) {
	element.addEventListener('mouseover', () => {
		element.classList.remove('half-brightness');
		element.classList.add('full-brightness');
	});

	element.addEventListener('mouseout', () => {
		element.classList.add('half-brightness');
		element.classList.remove('full-brightness');
	});
}

function arrowHighlight() {
	let arrows = document.getElementsByClassName('arrow');
	for (let i = 0; i < arrows.length; i++) {
		hoverFullBrightness(arrows[i]);
	}
}

arrowHighlight();
