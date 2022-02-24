import { updateAssistant } from "./assistant.js";

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

function addElem(color, char) {
	let newDiv = document.createElement("div")
	newDiv.style = 'background-color: ' + color + ';'
	newDiv.innerHTML = char
	document.getElementById("chars").appendChild(newDiv)
}

let	word = '12345'
let	allowed = 0
export let	answers = 0
let	winner = 0

fetch('../data/allowed.txt')
	.then(response => response.text())
	.then(text => allowed = text.split('\n'))
fetch('../data/answers.txt')
	.then(response => response.text())
	.then(text => {
		answers = text.split('\n')
		winner = answers[Math.floor(Math.random() * answers.length)];
		console.log('winning word: ', winner)
	})

let tries = 1

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

export function	input_word(word) {
	console.log(tries + ' / 6')
	word = word.toLowerCase()
	let	encountered = {}
	let tmpWinner = winner
	let	i

	i = 0
	if (word.length != 5)
	// if (word.length != 5 || (!allowed.includes(word) && !answers.includes(word)))
		console.log("not valid word")
	else
	{
		tries += 1
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
				addElem('green', word.charAt(i))
			else if (tmpWinner.includes(word[i]))
			{
				if (encountered[word[i]] == undefined)
					encountered[word[i]] = 1
				else
					encountered[word[i]] += 1
				if (tmpWinner.split(word[i]).length - 1 >= encountered[word[i]])
					addElem('orange', word.charAt(i))
				else
					addElem('grey', word.charAt(i))
				if (encounters['correct'][i] == '_')
					encounters['position'][i].push(word[i])
			}
			else if (!encounters['correct'].includes(word[i]))
			{
				addElem('grey', word.charAt(i))
				encounters['wrong'].push(word.charAt(i))
			}
			else
				addElem('lightgrey', word.charAt(i))
			i += 1
		}
	}
	encounters = updateEncounters(encounters)
	updateAssistant()
};
