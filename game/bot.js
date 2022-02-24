import { encounters } from "./main.js"

let answers = []
let allowed = []

fetch('../data/allowed.txt')
	.then(response => response.text())
	.then(text => allowed = text.split('\n'))
fetch('../data/answers.txt')
	.then(response => response.text())
	.then(text => {answers = text.split('\n')})

document.getElementById("botButton").onclick = function() {
	// console.log(answers)
	// console.log(allowed)

	let index = 0
	answers.forEach(word => {
		if (word)
			for (let i = 0; i < 5; i++) {
				if (word != 0 && encounters["correct"][i] != '_' && word.charAt(i) != encounters["correct"][i]) {
					answers[index] = 0
					break;
				}
			}
		index++
	})
	answers.forEach(word => {
		if (word)
			console.log(word)
	})
}
