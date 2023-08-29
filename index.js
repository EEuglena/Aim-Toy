const form = document.querySelector("form");
const button = document.querySelector("button");
const board = document.querySelector(".board");
const point = document.querySelector(".point");
const score = document.querySelector(".score");

const PLAY_TIME = 10_000;
const ACCURACY_COUNT = 25;
const ACCURACY_DELAY = 2_000;

const drawPoint = () => {
	const top = Math.floor(Math.random() * 300) + "px";
	const left = Math.floor(Math.random() * 300) + "px";
	point.style.top = top;
	point.style.left = left;
};

const playCount = () => {
	let countScore = 0;
	button.disabled = true;
	drawPoint();
	const handler = (event) => {
		if (event.target.className === "point") {
			countScore++;
			drawPoint();
		}
	};
	board.addEventListener("click", handler);
	setTimeout(() => {
		board.removeEventListener("click", handler);
		score.textContent = `10초 동안 ${countScore}개 성공하셨습니다!`;
		button.disabled = false;
	}, PLAY_TIME);
};

const playAccuracy = () => {
	let accuracyScore = 0;
	let totalClick = 0;
	let timer;
	button.disabled = true;
	const checkEnd = () => {
		if (totalClick === ACCURACY_COUNT) {
			clearTimeout(timer);
			board.removeEventListener("click", handler);
			score.textContent = `${ACCURACY_COUNT}개 중 ${accuracyScore}개 성공하셨습니다! (${(
				(accuracyScore / ACCURACY_COUNT) *
				100
			).toFixed(1)}%)`;
			button.disabled = false;
		}
	};
	const tick = () => {
		clearTimeout(timer);
		drawPoint();
		timer = setTimeout(() => {
			totalClick++;
			checkEnd();
			drawPoint();
		}, ACCURACY_DELAY);
	};
	const handler = (event) => {
		if (event.target.className === "point") {
			accuracyScore++;
		}
		totalClick++;
		checkEnd();
		tick();
	};
	board.addEventListener("click", handler);
	tick();
};

const handleSubmit = (event) => {
	event.preventDefault();
	const data = new FormData(event.target);
	const mode = data.get("mode");
	if (mode === "count") {
		playCount();
	} else if (mode === "accuracy") {
		playAccuracy();
	} else {
		throw new Error("unexpected mode");
	}
};

form.addEventListener("submit", handleSubmit);
