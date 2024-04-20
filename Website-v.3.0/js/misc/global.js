function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function horizontalSlide() {
	return document.body.clientWidth <= 1375;
}

function stringToHTML(src, isHTML = false) {
	if (isHTML) {
		src = src
			.replaceAll('></body>', '>\n\t</body>')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll(' ', '&nbsp;');
	}
	src = src.replaceAll('\n', '<br>').replaceAll('\t', '&nbsp;&nbsp;&nbsp;&nbsp;');
	return src;
}

function filePathtoName(filepath) {
	return filepath.substring(filepath.lastIndexOf('/') + 1);
}

function replaceFirstChild(parent, replacementElement) {
	if (parent.firstChild) {
		parent.firstChild.remove();
		parent.insertBefore(replacementElement, parent.firstChild);
	} else {
		parent.appendChild(replacementElement);
	}
}
