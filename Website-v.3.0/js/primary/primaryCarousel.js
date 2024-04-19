let primaryCarousel = document.getElementsByClassName('carousel primary')[0];
let downArrow = document.getElementsByClassName('arrow down')[0];

let numPrimaryChildren = 0;
let primaryCarouselIndex = 0;
let desiredPrimaryCarouselIndex = 0;

function primaryCarouselInit() {
	let primaryCarouselChildren = primaryCarousel.children;
	numPrimaryChildren = primaryCarousel.children.length;
	for (let i = 0; i < numPrimaryChildren; i++) {
		primaryCarousel.appendChild(primaryCarouselChildren[i].cloneNode(true));
	}

	reverseChildren(primaryCarousel);
	setPrimaryCarouselPosition();

	primaryCarousel.addEventListener('transitionend', () => {
		primaryCarousel.classList.remove('shifting');
		if (primaryCarouselIndex % numPrimaryChildren != desiredPrimaryCarouselIndex) {
			primarySlide();
		} else if (primaryCarouselIndex >= numPrimaryChildren) {
			primaryCarouselIndex = primaryCarouselIndex % numPrimaryChildren;
			setPrimaryCarouselPosition();
		}
		slideInProgress = false;
	});
}

function primarySlide() {
	navBarHighlight(desiredPrimaryCarouselIndex);

	if (!primaryCarousel.classList.contains('shifting')) {
		primaryCarousel.classList.add('shifting');
		primaryCarouselIndex += 1;
		setPrimaryCarouselPosition();
	}
}

function setPrimaryCarouselPosition() {
	let newPosition = (numPrimaryChildren * 2 - primaryCarouselIndex - 1) * -100;
	if (horizontalSlide()) {
		primaryCarousel.style.left = newPosition + 'vw';
	} else {
		primaryCarousel.style.top = newPosition + 'vh';
	}
}

function downArrowClick() {
	downArrow.addEventListener('click', () => {
		if (!slideInProgress) {
			slideInProgress = true;
			desiredPrimaryCarouselIndex = (primaryCarouselIndex + 1) % numPrimaryChildren;
			primarySlide();

			createFirstCards(primaryCarouselIndex - 1, desiredPrimaryCarouselIndex);
			primarySecondaryBothMoving = true;
			secondarySlide();
		}
	});
}

primaryCarouselInit();
downArrowClick();
