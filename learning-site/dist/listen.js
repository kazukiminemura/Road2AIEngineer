const recording = document.querySelector("audio");
const status = document.getElementById("play-status");

for (const button of document.querySelectorAll("button[data-time]")) {
	button.addEventListener("click", async () => {
		try {
			recording.currentTime = Number(button.dataset.time);
			await recording.play();
			status.textContent = `${button.textContent}を再生中`;
		} catch {
			status.textContent = "再生ボタンを押してください。";
		}
	});
}

recording.addEventListener("timeupdate", () => {
	if (!recording.paused && status.textContent) status.textContent = "";
});
