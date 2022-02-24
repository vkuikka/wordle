answers = []
allowed = []

fetch('../data/allowed.txt')
	.then(response => response.text())
	.then(text => allowed = text.split('\n'))
fetch('../data/answers.txt')
	.then(response => response.text())
	.then(text => {answers = text.split('\n')})

document.getElementById("botButton").onclick = function() {
	console.log(answers)
	console.log(allowed)
}
