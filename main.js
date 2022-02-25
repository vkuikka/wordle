import { updateAssistant } from "./assistant.js";
import { solveOnce } from "./bot.js";

String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length)
        return this.valueOf();
    var chars = this.split('');
    chars[index] = replacement;
    return chars.join('');
}

function updateEncounters(encounters) {
	encounters['correct'].forEach(correct_c => {
		for (let i = 0; i < 5; i++)
			encounters['position'][i].forEach(c => {
				if (correct_c == c)
					encounters['position'][i].splice(encounters['position'][i].indexOf(c), 1)
			})
	})
	return (encounters)
}

function addElem(color, char, tries) {
	let newDiv = document.createElement("div")
	let	style = 'background-color: ' + color + ';'
	if (tries > 6)
		style += 'color: red;'
	newDiv.style = style
	newDiv.innerHTML = char
	document.getElementById("chars").appendChild(newDiv)
}

export let	answers = 0
let	answers_file = 0
let	allowed = 0
let	winner = 0

fetch('./data/allowed.txt')
	.then(response => response.text())
	.then(text => allowed = text.split('\n'))
	.then(() => fetch('./data/answers.txt')
		.then(response => response.text())
		.then(text => {
			answers = text.split('\n')
			answers_file = text.split('\n')
			winner = answers[Math.floor(Math.random() * answers.length)];
		})
		// .then(() => solveOnce())
	)

export let encounters = {
	"wrong": [],
	"position": [[], [], [], [], []],
	"correct": ['_', '_', '_', '_', '_']
}

document.getElementById("assistantButton").onchange = function() {
	updateAssistant()
}

document.getElementById("input_box").onchange = function() {
	input_word(this.value)
	this.value = ''
}

let tries = 1

export function	input_word(word) {
	let win = 1
	encounters['correct'].forEach(e => {
		if (e == '_')
			win = 0
	})
	if (win)
		return (1)

	word = word.toLowerCase()
	let	encountered = {}
	let tmpWinner = winner
	let	i

	if (word.length != 5 || (!allowed.includes(word) && !answers_file.includes(word)))
		console.log("not valid word")
	else
	{
		i = 0
		while (i < 5)
		{
			if (word[i] == tmpWinner[i]) {
				encounters['correct'][i] = word[i]
				tmpWinner = tmpWinner.replaceAt(i, '_')
			}
			i += 1
		}
		i = 0
		while (i < 5)
		{
			if (tmpWinner[i] == '_')
				addElem('green', word.charAt(i), tries)
			else if (tmpWinner.includes(word[i]))
			{
				if (encountered[word[i]] === undefined)
					encountered[word[i]] = 1
				else
					encountered[word[i]] += 1
				if (tmpWinner.split(word[i]).length - 1 >= encountered[word[i]])
					addElem('orange', word.charAt(i), tries)
				else
					addElem('grey', word.charAt(i), tries)
				if (encounters['correct'][i] == '_')
					encounters['position'][i].push(word[i])
			}
			else
			{
				addElem('grey', word.charAt(i), tries)
				encounters['wrong'].push(word.charAt(i))
			}
			i += 1
		}
		tries += 1
		encounters = updateEncounters(encounters)
		updateAssistant()
	}
};
