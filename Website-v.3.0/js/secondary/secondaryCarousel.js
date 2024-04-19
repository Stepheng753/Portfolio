let secondaryCarousel = document.getElementsByClassName('carousel secondary')[0];
let secondaryCarouselChildren = secondaryCarousel.children;
let upArrow = document.getElementsByClassName('arrow up')[0];

let numSecondaryChildren = 0;
let secondaryCarouselIndex = 0;
let desiredSecondaryCarouselIndex = 0;

function secondaryCarouselInit() {
	createFirstCards();

	secondaryCarousel.addEventListener('transitionend', () => {
		secondaryCarousel.classList.remove('shifting');
		if (
			secondaryCarouselIndex % numSecondaryChildren == desiredSecondaryCarouselIndex &&
			primarySecondaryBothMoving
		) {
			getContent(desiredSecondaryCarouselIndex);
			primarySecondaryBothMoving = false;
		}

		if (secondaryCarouselIndex % numSecondaryChildren != desiredSecondaryCarouselIndex) {
			secondarySlide();
		} else if (secondaryCarouselIndex >= numSecondaryChildren) {
			secondaryCarouselIndex = secondaryCarouselIndex % numSecondaryChildren;
			setSecondaryCarouselPosition();
		}
		slideInProgress = false;
	});
}

function secondarySlide() {
	if (
		!secondaryCarousel.classList.contains('shifting') &&
		secondaryCarouselIndex != desiredSecondaryCarouselIndex
	) {
		sleep(0).then(() => {
			projectSlide();
			secondaryCarousel.classList.add('shifting');
			secondaryCarouselIndex += 1;
			setSecondaryCarouselPosition();
		});
	}
}

function setSecondaryCarouselPosition() {
	let newPosition = secondaryCarouselIndex * -100;
	if (horizontalSlide()) {
		secondaryCarousel.style.left = newPosition + 'vw';
	} else {
		secondaryCarousel.style.top = newPosition + 'vh';
	}
}

function upArrowClick() {
	upArrow.addEventListener('click', () => {
		if (!slideInProgress) {
			slideInProgress = true;
			desiredSecondaryCarouselIndex = (secondaryCarouselIndex + 1) % numSecondaryChildren;
			secondarySlide();
		}
	});
}

secondaryCarouselInit();
upArrowClick();
