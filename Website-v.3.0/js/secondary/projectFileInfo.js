let projectLinesContainer = document.getElementsByClassName('project-lines-container');
projectLinesContainer = projectLinesContainer[projectLinesContainer.length - 1];

let projectFileInfo = [
	{
		projectName: 'ChessAI',
		filePaths: [
			'PersonalProjects/p5.js/ChessAI/ChessAIv3/Piece.js',
			'PersonalProjects/p5.js/ChessAI/ChessAIv3/Index.js',
			'PersonalProjects/p5.js/ChessAI/ChessAIv3/HelperFunctions.js',
			'PersonalProjects/p5.js/ChessAI/ChessAIv3/ChessGame.js',
			'PersonalProjects/p5.js/ChessAI/ChessAIv3/ChessAI.js',
			'PersonalProjects/p5.js/ChessAI/ChessAIv3/ChessAI.html',
		],
	},
	{
		projectName: 'Circles',
		filePaths: [
			'PersonalProjects/p5.js/Circles/FullColor.js',
			'PersonalProjects/p5.js/Circles/Circle.js',
			'PersonalProjects/p5.js/Circles/FullColor.html',
		],
	},
	{
		projectName: 'DoublePendulum',
		filePaths: [
			'PersonalProjects/p5.js/DoublePendulum/DoublePendulum.js',
			'PersonalProjects/p5.js/DoublePendulum/DoublePendulum.html',
		],
	},
	{
		projectName: 'EstimatePi',
		filePaths: [
			'PersonalProjects/p5.js/EstimatePi/EstimatePi.js',
			'PersonalProjects/p5.js/EstimatePi/EstimatePi.html',
		],
	},
	{
		projectName: 'HilbertCurve',
		filePaths: [
			'PersonalProjects/p5.js/HilbertCurve/PathFunctions.js',
			'PersonalProjects/p5.js/HilbertCurve/HilbertCurve.js',
			'PersonalProjects/p5.js/HilbertCurve/HilbertCurve.html',
		],
	},
	{
		projectName: 'PictureToSound',
		filePaths: [
			'PersonalProjects/p5.js/HilbertCurve/PictureToSound/RGBAtoHSLA.js',
			'PersonalProjects/p5.js/HilbertCurve/PictureToSound/PictureToSound.js',
			'PersonalProjects/p5.js/HilbertCurve/PictureToSound/PictureToSound.html',
		],
	},
	{
		projectName: 'ImageProcessing',
		filePaths: [
			'PersonalProjects/p5.js/ImageProcessing/ImageASCII/ImageASCII.js',
			'PersonalProjects/p5.js/ImageProcessing/ImageASCII/ImageASCII.html',
			'PersonalProjects/p5.js/ImageProcessing/VideoCaptureASCII/VideoCaptureASCII.js',
			'PersonalProjects/p5.js/ImageProcessing/VideoCaptureASCII/VideoCaptureASCII.html',
		],
	},
	{
		projectName: 'MazeGen',
		filePaths: ['PersonalProjects/p5.js/MazeGen/MazeGen.js', 'PersonalProjects/p5.js/MazeGen/MazeGen.html'],
	},
	{
		projectName: 'OpticalIllusion',
		filePaths: [
			'PersonalProjects/p5.js/OpticalIllusion/OpticalIllusion.js',
			'PersonalProjects/p5.js/OpticalIllusion/OpticalIllusion.html',
		],
	},
	{
		projectName: 'Rockets',
		filePaths: [
			'PersonalProjects/p5.js/Rockets/SketchRockets.js',
			'PersonalProjects/p5.js/Rockets/Rocket.js',
			'PersonalProjects/p5.js/Rockets/Population.js',
			'PersonalProjects/p5.js/Rockets/DNA.js',
			'PersonalProjects/p5.js/Rockets/Rockets.html',
		],
	},
	{
		projectName: 'SlidePuzzle',
		filePaths: [
			'PersonalProjects/p5.js/SlidePuzzle/SlidePuzzle.js',
			'PersonalProjects/p5.js/SlidePuzzle/SlidePuzzle.html',
		],
	},
	{
		projectName: 'SnakeGame',
		filePaths: [
			'PersonalProjects/p5.js/SnakeGame/SnakeGame.js',
			'PersonalProjects/p5.js/SnakeGame/Snake.js',
			'PersonalProjects/p5.js/SnakeGame/Grid.js',
			'PersonalProjects/p5.js/SnakeGame/SnakeGame.html',
		],
	},
	{
		projectName: 'SortingAlgorithms',
		filePaths: [
			'PersonalProjects/p5.js/SortingAlgorithms/BubbleSort/BubbleSort.js',
			'PersonalProjects/p5.js/SortingAlgorithms/BubbleSort/BubbleSort.html',
			'PersonalProjects/p5.js/SortingAlgorithms/InsertionSort/InsertionSort.js',
			'PersonalProjects/p5.js/SortingAlgorithms/InsertionSort/InsertionSort.html',
			'PersonalProjects/p5.js/SortingAlgorithms/MergeSort/MergeSort.js',
			'PersonalProjects/p5.js/SortingAlgorithms/MergeSort/MergeSort.html',
			'PersonalProjects/p5.js/SortingAlgorithms/QuickSort/QuickSort.js',
			'PersonalProjects/p5.js/SortingAlgorithms/QuickSort/QuickSort.html',
			'PersonalProjects/p5.js/TimesTable/TimesTable.js',
			'PersonalProjects/p5.js/TimesTable/TimesTable.html',
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
		let h2 = createElement('h2', ['heading-2', 'code-link'], projectFileInfo[i].projectName);
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
