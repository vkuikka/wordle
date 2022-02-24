String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length)
        return this.valueOf();
    var chars = this.split('');
    chars[index] = replacement;
    return chars.join('');
}

function addElem(color, char) {
	let newDiv = document.createElement("div")
	newDiv.style = 'background-color: ' + color + ';'
	newDiv.innerHTML = char
	document.getElementById("chars").appendChild(newDiv)
}

let	word = '12345'
let	allowed = 0
let	answers = 0
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
	"wrong": ['a', 'b'],
	"position": [['a', 'b'], ['w'], ['a'], [], []],
	"correct": ['c', 'a', 'x']
}

document.getElementById("input_box").onchange = function() {
	console.log(tries + ' / 6')
	word = this.value.toLowerCase()
	let	encountered = {}
	let tmpWinner = winner

	if (word.length != 5)
	// if (word.length != 5 || (!allowed.includes(word) && !answers.includes(word)))
		console.log("not valid word")
	else
	{
		tries += 1
		let i = 0
		while (i < 5)
		{
			if (word[i] == tmpWinner[i])
				tmpWinner = tmpWinner.replaceAt(i, '_')
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
					addElem('yellow', word.charAt(i))
				else
					addElem('grey', word.charAt(i))
			}
			else
				addElem('grey', word.charAt(i))
			i += 1
		}
	}
	this.value = ""
};
