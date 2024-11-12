const apiKey = 'ca3674f8';

async function movies(query) {
    const films = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    const filmsData = await films.json();
    console.log(filmsData);
    displayResults(filmsData);
}

function displayResults(data) {
    const resultsContainer = document.querySelector('.results__container');
    console.log('Results container:', resultsContainer);
    console.log('Data response:', data.Response);
    console.log('Search results:', data.Search);
    
    resultsContainer.innerHTML = '';

    if (data.Response === 'True') {
        data.Search.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.className = 'movie__card'; // Add a class for styling

            movieDiv.innerHTML = `
                <div class="movie__poster">
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder-image.jpg'}" 
                         alt="${movie.Title} poster">
                </div>
                <div class="movie__info">
                    <h3 class="movie__title">${movie.Title}</h3>
                    <p class="movie__year">Year: ${movie.Year}</p>
                    <p class="movie__type">Type: ${movie.Type}</p>
                </div>
            `;
            resultsContainer.appendChild(movieDiv);
        });
    } else {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no__results';
        noResultsDiv.textContent = "sorry 😔 we couldn't find that 🤨";
        resultsContainer.appendChild(noResultsDiv);
    }
}

document.getElementById('search__form').addEventListener('submit', (event) => {
    event.preventDefault();
    const searchInput = document.querySelector('.search__input');
    movies(searchInput.value);
    searchInput.value = '';
})

