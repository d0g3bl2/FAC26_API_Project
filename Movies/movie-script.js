const API_KEY = "api_key=683d96387e767b542036c834aeb06770";
const BASE_URL = "https://api.themoviedb.org/3";
const POPULARITY_URL = "/discover/movie?sort_by=popularity.desc&";
const API_URL = BASE_URL + POPULARITY_URL + API_KEY;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img src="${
      movie.poster_path
        ? IMAGE_URL + movie.poster_path
        : "https://www.cinemahalls.com/wp-content/uploads/2019/10/Picture-Not-Available-1.jpg"
    }"
    alt="${title} image"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getColor(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3>${title}</h3>
    ${overview}
  </div>`;

    main.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCH_URL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});