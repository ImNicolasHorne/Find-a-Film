const apiKey = "ca3674f8";
const yearInput = document.getElementById("year__container");
const searchInput = document.querySelector(".search__input");
const typeInput = document.getElementById("type__container"); // New type filter dropdown

async function movies(searchInputValue, yearInputValue, typeInputValue) {
  const url = new URL("https://www.omdbapi.com/");
  url.searchParams.append("apikey", apiKey);
  url.searchParams.append("plot", "full");

  if (searchInputValue) {
    url.searchParams.append("s", searchInputValue);
  }

  if (yearInputValue && yearInputValue !== "default") {
    url.searchParams.append("y", yearInputValue);
  }

  if (typeInputValue && typeInputValue !== "default") {
    url.searchParams.append("type", typeInputValue);
  }

  try {
    const response = await fetch(url);
    const filmsData = await response.json();
    console.log("API URL:", url.toString());
    displayResults(filmsData);
  } catch (error) {
    console.error("Error fetching movies:", error);
    displayResults({ Response: "False", Error: "Failed to fetch movies" });
  }
}

function main() {
  const yearList = [
    `<option class="year__option" value="default" selected>Year</option>`,
  ];
  const typeList = [
    `<option class="type__option" value="default" selected>Type</option>`,
    `<option class="type__option" value="movie">Movie</option>`,
    `<option class="type__option" value="series">Series</option>`,
    `<option class="type__option" value="episode">Episode</option>`,
  ];
  const max = new Date().getFullYear() + 1;
  const min = 1900;

  for (let index = max - 1; index >= min; index--) {
    yearList.push(
      `<option class="year__option" value="${index}">${index}</option>`
    );
  }

  yearInput.innerHTML = yearList.join("");
  typeInput.innerHTML = typeList.join(""); // Add type dropdown
}

function displayResults(data) {
  const resultsContainer = document.querySelector(".results__container");
  resultsContainer.innerHTML = "";

  if (data.Response === "True" && data.Search && data.Search.length > 0) {
    data.Search.forEach((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.className = "movie__card";

      const posterUrl =
        movie.Poster !== "N/A" ? movie.Poster : "placeholder-image.jpg";

      movieDiv.innerHTML = `
        <div class="movie__poster">
          <img src="${posterUrl}" 
               alt="${movie.Title} poster"
               onerror="this.src='placeholder-image.jpg'">
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
    const noResultsDiv = document.createElement("div");
    noResultsDiv.className = "no__results";
    noResultsDiv.textContent = "Sorry 😔 we couldn't find that 🤨";
    resultsContainer.appendChild(noResultsDiv);
  }
}

document.getElementById("search__form").addEventListener("submit", (event) => {
  event.preventDefault();
  const yearValue = yearInput.value;
  const typeValue = typeInput.value; // Get the type filter value
  movies(searchInput.value, yearValue, typeValue); // Pass the type value
});

main();