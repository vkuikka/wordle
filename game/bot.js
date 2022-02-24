import { answers, input_word } from "./main.js"

document.getElementById("botButton").onclick = function() {
	let all = []
	answers.forEach(word => {
		if (word != 0)
			all.push(word)
	});
	// console.log(all)
	// console.log(Math.floor(Math.random() * all.length))
	// console.log(all.length)

	let ans = all[Math.floor(Math.random() * all.length)];
	document.getElementById("input_box").value = ans
	// console.log(ans)
	input_word(ans)
}
