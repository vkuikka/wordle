import { answers, input_word } from "./main.js"

document.getElementById("botButton").onclick = botButtonAction

export function solveOnce() {
	let i = 0
	while (i < 7) {
		botButtonAction()
		i += 1
	}
}

function removeDuplicates(arr) {
	return arr.filter((item, 
		index) => arr.indexOf(item) === index);
}

function	botButtonAction() {
	let all = []
	answers.forEach(word => {
		if (word != 0)
			all.push(word)
	});
	let	last = 0
	let	index = Math.floor(Math.random() * all.length);
	let	ans = all[index]
	while (removeDuplicates(ans.split('')).length < 5 && last != index)
	{
		last = index
		ans = all[index];
		index = Math.floor(Math.random() * all.length);
	}
	document.getElementById("input_box").value = ans
	input_word(ans)
}
