// File Name starts with the directory where index.html is.

function setScrCode(filename, card) {
	fetch(filename)
		.then((response) => {
			return response.text();
		})
		.then((code) => {
			let codeDiv = createElement('code', ['prettyprint', 'linenums']);
			codeDiv.innerHTML = stringToHTML(code);
			codeDiv.classList.remove('prettyprinted');
			replaceFirstChild(card, codeDiv);
			PR.prettyPrint();
		});
}

function setOutput(filename, card) {
	let iFrameDiv = createElement('iframe', ['output']);
	iFrameDiv.setAttribute('type', 'text/html');
	iFrameDiv.src = filename;
	replaceFirstChild(card, iFrameDiv);
}

function createProjectContainer(project) {
	let codeCard = createCard(['code-card']);
	let arrowDiv = createElement('div', ['code-switcher']);
	let fileNameH1 = createElement('h1', ['file-name']);
	let arrowImg = createElement('img', ['arrow', 'code-switch-arrow', 'half-brightness']);
	hoverFullBrightness(arrowImg);
	arrowImg.src = './images/code-arrow.svg';
	arrowImg.addEventListener('click', () => {
		if (!slideInProgress) {
			project.fileIndex = (project.fileIndex + 1) % project.filePaths.length;
			updateProjectContent(project, fileNameH1, codeCard);
		}
	});

	createHierarchy([
		secondaryCarousel,
		createContainer(),
		linkParentToChildren(createHeight90(), [
			codeCard,
			linkParentToChildren(arrowDiv, [fileNameH1, arrowImg]),
		]),
	]);

	updateProjectContent(project, fileNameH1, codeCard);
}

function updateProjectContent(project, fileNameH1, codeCard) {
	fileNameH1.innerHTML = filePathtoName(project.filePaths[project.fileIndex]);

	if (project.filePaths[project.fileIndex].includes('.html')) {
		setOutput(project.filePaths[project.fileIndex], codeCard);
	} else {
		setScrCode(project.filePaths[project.fileIndex], codeCard);
	}
}

function scrollBarColorChange(index) {
	let codeCard = document.getElementsByClassName('code-card')[index];
	codeCard.addEventListener('scroll', () => {
		document.body.style.setProperty('--scrollbar-color', '#ed254e');
	});
	codeCard.addEventListener('scrollend', () => {
		document.body.style.setProperty('--scrollbar-color', '#d6dee1');
	});
}

function projectSlide() {
	if (!primarySecondaryBothMoving) {
		for (let j = 0; j < projectLinesContainer.getElementsByTagName('h2').length; j++) {
			if (projectLinesContainer.getElementsByTagName('h2')[j].classList.contains('bold')) {
				projectLinesContainer.getElementsByTagName('h2')[j].classList.remove('bold');
				setFileIndices(j);
				setScrCode(
					projectFileInfo[j].filePaths[0],
					document.getElementsByClassName('code-card')[j]
				);
			}
		}

		projectLinesContainer
			.getElementsByTagName('h2')
			[desiredSecondaryCarouselIndex].classList.add('bold');
	}
}
