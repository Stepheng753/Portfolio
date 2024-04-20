let projectLinesContainer = document.getElementsByClassName('project-lines-container');
projectLinesContainer = projectLinesContainer[projectLinesContainer.length - 1];

let projectFileInfo = [
	{
		projectName: 'ChessAIv3',
		filePaths: [
			'Personal-Projects/p5.js/ChessAI/ChessAIv3/piece.js',
			'Personal-Projects/p5.js/ChessAI/ChessAIv3/index.js',
			'Personal-Projects/p5.js/ChessAI/ChessAIv3/helperFunctions.js',
			'Personal-Projects/p5.js/ChessAI/ChessAIv3/chessGame.js',
			'Personal-Projects/p5.js/ChessAI/ChessAIv3/chessAI.js',
			'Personal-Projects/p5.js/ChessAI/ChessAIv3/ChessAI.html',
		],
	},
	{
		projectName: 'Circles',
		filePaths: [
			'Personal-Projects/p5.js/Circles/FullColor.js',
			'Personal-Projects/p5.js/Circles/Circle.js',
			'Personal-Projects/p5.js/Circles/FullColor.html',
		],
	},
	{
		projectName: 'DoublePendulum',
		filePaths: [
			'Personal-Projects/p5.js/DoublePendulum/DoublePendulum.js',
			'Personal-Projects/p5.js/DoublePendulum/DoublePendulum.html',
		],
	},
	{
		projectName: 'EstimatePi',
		filePaths: [
			'Personal-Projects/p5.js/EstimatePi/EstimatePi.js',
			'Personal-Projects/p5.js/EstimatePi/EstimatePi.html',
		],
	},
	{
		projectName: 'HilbertCurve',
		filePaths: [
			'Personal-Projects/p5.js/HilbertCurve/PathFunctions.js',
			'Personal-Projects/p5.js/HilbertCurve/HilbertCurve.js',
			'Personal-Projects/p5.js/HilbertCurve/HilbertCurve.html',
		],
	},
	{
		projectName: 'PictureToSound',
		filePaths: [
			'Personal-Projects/p5.js/HilbertCurve/PictureToSound/RGBAtoHSLA.js',
			'Personal-Projects/p5.js/HilbertCurve/PictureToSound/PictureToSound.js',
			'Personal-Projects/p5.js/HilbertCurve/PictureToSound/PictureToSound.html',
		],
	},
	{
		projectName: 'ImageProcessing',
		filePaths: [
			'Personal-Projects/p5.js/ImageProcessing/ImageASCII/ImageASCII.js',
			'Personal-Projects/p5.js/ImageProcessing/ImageASCII/ImageASCII.html',
			'Personal-Projects/p5.js/ImageProcessing/VideoCaptureASCII/VideoCaptureASCII.js',
			'Personal-Projects/p5.js/ImageProcessing/VideoCaptureASCII/VideoCaptureASCII.html',
		],
	},
	{
		projectName: 'MazeGen',
		filePaths: [
			'Personal-Projects/p5.js/MazeGen/MazeGen.js',
			'Personal-Projects/p5.js/MazeGen/MazeGen.html',
		],
	},
	{
		projectName: 'OpticalIllusion',
		filePaths: [
			'Personal-Projects/p5.js/OpticalIllusion/OpticalIllusion.js',
			'Personal-Projects/p5.js/OpticalIllusion/OpticalIllusion.html',
		],
	},
	{
		projectName: 'Rockets',
		filePaths: [
			'Personal-Projects/p5.js/Rockets/sketch.js',
			'Personal-Projects/p5.js/Rockets/Rocket.js',
			'Personal-Projects/p5.js/Rockets/Population.js',
			'Personal-Projects/p5.js/Rockets/DNA.js',
			'Personal-Projects/p5.js/Rockets/Rockets.html',
		],
	},
	{
		projectName: 'SlidePuzzle',
		filePaths: [
			'Personal-Projects/p5.js/SlidePuzzle/slidePuzzle.js',
			'Personal-Projects/p5.js/SlidePuzzle/slidePuzzle.html',
		],
	},
	{
		projectName: 'SnakeGame',
		filePaths: [
			'Personal-Projects/p5.js/SnakeGame/SnakeGame.js',
			'Personal-Projects/p5.js/SnakeGame/Snake.js',
			'Personal-Projects/p5.js/SnakeGame/Grid.js',
			'Personal-Projects/p5.js/SnakeGame/SnakeGame.html',
		],
	},
	{
		projectName: 'SortingAlgorithms',
		filePaths: [
			'Personal-Projects/p5.js/SortingAlgorithms/BubbleSort/BubbleSort.js',
			'Personal-Projects/p5.js/SortingAlgorithms/BubbleSort/BubbleSort.html',
			'Personal-Projects/p5.js/SortingAlgorithms/InsertionSort/InsertionSort.js',
			'Personal-Projects/p5.js/SortingAlgorithms/InsertionSort/InsertionSort.html',
			'Personal-Projects/p5.js/SortingAlgorithms/MergeSort/MergeSort.js',
			'Personal-Projects/p5.js/SortingAlgorithms/MergeSort/MergeSort.html',
			'Personal-Projects/p5.js/SortingAlgorithms/QuickSort/QuickSort.js',
			'Personal-Projects/p5.js/SortingAlgorithms/QuickSort/QuickSort.html',
			'Personal-Projects/p5.js/TimesTable/TimesTable.js',
			'Personal-Projects/p5.js/TimesTable/TimesTable.html',
		],
	},
];

function setProjectNames() {
	let currProjectLine = 0;
	for (let i = 0; i < projectFileInfo.length; i++) {
		let codeLink = createElement('a', ['code']);
		codeLink.addEventListener('click', () => {
			if (!slideInProgress && i != secondaryCarouselIndex) {
				slideInProgress = true;
				desiredSecondaryCarouselIndex = i;
				secondarySlide();
			}
		});
		let h2 = createElement('h2', ['heading-2', 'code-link']);
		h2.innerHTML = projectFileInfo[i].projectName;
		if (i % 2 == 0) {
			currProjectLine = createElement('div', ['project-line']);
			projectLinesContainer.appendChild(currProjectLine);
		}
		createHierarchy([currProjectLine, codeLink, h2]);
	}
	projectLinesContainer.getElementsByTagName('h2')[0].classList.add('bold');
}

function setFileIndices(skipIndex = -1) {
	for (let i = 0; i < projectFileInfo.length; i++) {
		if (i != skipIndex) {
			projectFileInfo[i].fileIndex = 0;
		}
	}
}

function initFilePaths() {
	let parent_dir = '../';
	if (window.location.hostname.includes('127') || window.location.hostname.includes('local')) {
		parent_dir = '../../';
	}
	setFileIndices();
	for (let i = 0; i < projectFileInfo.length; i++) {
		for (let j = 0; j < projectFileInfo[i].filePaths.length; j++) {
			projectFileInfo[i].filePaths[j] = parent_dir + projectFileInfo[i].filePaths[j];
		}
	}
}

setProjectNames();
initFilePaths();
