let slideInProgress = false;
let primarySecondaryBothMoving = false;

let linkContainers = document
	.getElementsByClassName('navigation')[0]
	.getElementsByClassName('link-container');

function navBarEvents() {
	for (let i = 0; i < linkContainers.length; i++) {
		linkContainers[i].addEventListener('click', () => {
			if (!primaryCarousel.classList.contains('shifting') && primaryCarouselIndex != i) {
				desiredPrimaryCarouselIndex = i;
				primarySlide();

				createFirstCards(primaryCarouselIndex - 1, i);
				primarySecondaryBothMoving = true;
				secondarySlide();
			}
		});

		linkContainers[i].addEventListener('mouseover', () => navBarHighlight(i));
		linkContainers[i].addEventListener('mouseout', () =>
			navBarHighlight(desiredPrimaryCarouselIndex)
		);
	}
}

function navBarHighlight(index) {
	linkContainers[index].classList.remove('half-brightness');
	linkContainers[index].classList.add('full-brightness');
	linkContainers[index]
		.getElementsByClassName('folder closed')[0]
		.classList.remove('full-opacity');
	linkContainers[index].getElementsByClassName('folder closed')[0].classList.add('zero-opacity');
	linkContainers[index].getElementsByClassName('folder open')[0].classList.remove('zero-opacity');
	linkContainers[index].getElementsByClassName('folder open')[0].classList.add('full-opacity');

	for (let j = 0; j < linkContainers.length; j++) {
		if (j != index) {
			linkContainers[j].classList.remove('full-brightness');
			linkContainers[j].classList.add('half-brightness');
			linkContainers[j]
				.getElementsByClassName('folder closed')[0]
				.classList.remove('zero-opacity');
			linkContainers[j]
				.getElementsByClassName('folder closed')[0]
				.classList.add('full-opacity');
			linkContainers[j]
				.getElementsByClassName('folder open')[0]
				.classList.remove('full-opacity');
			linkContainers[j]
				.getElementsByClassName('folder open')[0]
				.classList.add('zero-opacity');
		}
	}
}

navBarEvents();
