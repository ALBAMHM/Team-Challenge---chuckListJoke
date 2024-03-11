const addButton = document.getElementById('fetchJoke');
const deleteAllButton = document.getElementById('delete-all');
const jokeListContainer = document.getElementById('jokeList');
const jokesStorageKey = 'jokes';

let jokes = getJokesFromLocalStorage();


function getJokesFromLocalStorage() {
	const value = JSON.parse(localStorage.getItem(jokesStorageKey));
	return value ? value : [];
}

function saveJokesToLocalStorage() {
	localStorage.setItem(jokesStorageKey, JSON.stringify(jokes));
}


addButton.addEventListener('click', handleAdd);
deleteAllButton.addEventListener('click', handleDeleteAll);




function handleAdd() {
	fetch('https://api.chucknorris.io/jokes/random')
		.then(res => res.json())
		.then(({ id, value: joke }) => {
			jokes.push({ id, joke });
			saveJokesToLocalStorage();
			update();
		});
}

function handleDeleteAll() {
	jokes = [];
	saveJokesToLocalStorage();
	update();
}



function update() {
	jokeListContainer.innerHTML = '';

	jokes.forEach(({ id, joke }) => {
		const listItem = document.createElement('li');
		const paragraph = document.createElement('p');
		paragraph.textContent = joke;


		listItem.append(paragraph);
		jokeListContainer.appendChild(listItem);
	});
}

