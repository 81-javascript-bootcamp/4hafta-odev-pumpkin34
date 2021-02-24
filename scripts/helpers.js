import genreColours from "./genres.js";



export const searchMovieByTitle = (movie, searchValue) => {
    return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
}

export const makeBgActive = (movie) => {
    document.querySelector(`tr[data-id='${movie.id}']`).style.background = "#d7f0f7";
}

export const makeBgActivePerGenre = (movie) => {
    document.querySelector(`tr[data-id='${movie.id}']`).style.background = genreColours[movie.genre];

}