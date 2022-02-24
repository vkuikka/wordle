import { encounters } from "./main.js"
import { answers } from "./main.js"

export function updateAssistant() {
	let d = document.getElementById("assistant")
	let index = 0

	answers.forEach(word => {
		if (word)
			for (let i = 0; i < 5; i++) {
				if (encounters["correct"][i] != '_' && word.charAt(i) != encounters["correct"][i]) {
					answers[index] = 0
					break;
				}
			}
		index++
	})
	index = 0
	answers.forEach(word => {
		if (word)
			for (let i = 0; i < 5; i++) {
				if (encounters["wrong"].includes(word.charAt(i)) && word.charAt(i) != encounters["correct"][i]) {
					answers[index] = 0
				}
			}
		index++
	})
	index = 0
	answers.forEach(word => {
		if (word)
			for (let i = 0; i < 5; i++)
			{
				encounters["position"][i].forEach(c => {
					if (word.charAt(i) == c || !word.includes(c))
						answers[index] = 0
				})
			}
		index++
	})

	if (document.getElementById("assistantButton").checked)
	{
		let str = ""
		answers.forEach(word => {
			if (word)
				str += " ~ " + word
		})
		d.innerHTML = str
	}
	else
		d.innerHTML = ""
}
