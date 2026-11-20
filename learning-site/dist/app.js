const main = document.querySelector("main");
const start = document.getElementById("start");
const statusLine = document.getElementById("storage");
const prefix = document.body.dataset.course === "operations"
	? "design-operations-v1-"
	: "design-class-v1-";
function read(key) {
	try {
		return localStorage.getItem(prefix + key) || "";
	} catch {
		return "";
	}
}
function save(key, value) {
	try {
		localStorage.setItem(prefix + key, value);
	} catch {
		statusLine.textContent = "このブラウザーでは学習記録を保存できません。";
	}
}
function render() {
	const route = location.hash.slice(1);
	const active = document.getElementById(`s${route}`);
	const section =
		active?.tagName === "SECTION" ? active : document.getElementById("shome");
	for (const item of main.querySelectorAll("section"))
		item.hidden = item !== section;
	if (/^[1-6]-[1-3]$/.test(route) || route === "finish")
		save("position", route);
	const last = read("position");
	if (route === "finish") {
		for (const note of section.querySelectorAll("[data-ref]")) {
			note.textContent =
				document.getElementById(note.dataset.ref).value || "まだ記入していません。";
		}
	}
	if (/^[1-6]-[1-3]$/.test(last) || last === "finish") {
		start.href = `#${last}`;
		start.textContent =
			last === "finish"
				? "修了課題を再開する"
				: `第${last[0]}章の続きから読む`;
	}
	document.title = `${section.querySelector("h1").textContent}｜設計教室`;
	main.focus({ preventScroll: true });
	window.scrollTo(0, 0);
}
for (const field of document.querySelectorAll("textarea")) {
	field.value = read(field.id);
	field.addEventListener("input", () => save(field.id, field.value));
}
window.addEventListener("hashchange", render);
render();
