const API_KEY = 'Te9BE13NqllNyZiDMqTWTaeBPBb7bcgRtPppwVbvapo';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('button-search');
const photosContainer = document.getElementById('container-images');

// Fonction pour rechercher des photos
const searchPhotos = async (query) => {
	const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${API_KEY}`;
	const response = await fetch(url);
	const data = await response.json();
	console.log(data.results);
	return data.results;
};

// Fonction pour afficher les photos

const displayPhotos = (photos) => {
	photosContainer.innerHTML = ''; // // Effacer les résultats précédents

	if (photos.length === 0) {
		// Afficher un message d'erreur
		const errorMessage = document.createElement('p');
		errorMessage.classList.add('error-message');
		errorMessage.textContent = 'Aucune image trouvée... 😞 ';
		photosContainer.appendChild(errorMessage);
		return;
	}

	photos.forEach((photo) => {
		const img = document.createElement('img');
		const containerImage = document.createElement('div');
		const containerDescription = document.createElement('div');

		containerDescription.classList.add('desc');

		// Ajouter le titre de l'image
		const title = document.createElement('h3');

		title.classList.add('title-img');

		title.textContent = photo.alt_description;
		containerDescription.appendChild(title);

		// Ajouter l'auteur de l'image
		const author = document.createElement('p');
		author.classList.add('author');
		author.textContent = `Photo by ${photo.user.name}`;

		containerDescription.appendChild(author);

		// Ajouter le nombre de likes
		const likes = document.createElement('p');
		likes.classList.add('likes');
		likes.textContent = `👍 ${photo.likes} likes`;

		containerDescription.appendChild(likes);

		containerImage.classList.add('container-image');
		img.setAttribute('loading', 'lazy');
		img.src = photo.urls.regular;
		img.alt = photo.description;

		containerImage.appendChild(img);

		containerImage.appendChild(containerDescription);

		photosContainer.appendChild(containerImage);
	});
};

// Fonction pour gérer la recherche

const handleSearch = async () => {
	const query = searchInput.value.toLowerCase();
	if (!query) return;

	// Afficher un indicateur de chargement
	const loadingIndicator = document.createElement('div');
	loadingIndicator.classList.add('loading');
	photosContainer.appendChild(loadingIndicator);
	const photos = await searchPhotos(query);

	loadingIndicator.remove();
	displayPhotos(photos);

	searchInput.value = '';
};

// Ecouteur d'événement sur le bouton de recherche

searchButton.addEventListener('click', handleSearch);

// Ecouteur d'événement sur le  form de recherche

const formSearch = document.querySelector('form');
if (formSearch) {
	formSearch.addEventListener('submit', (e) => {
		e.preventDefault();
		handleSearch();
	});
}
