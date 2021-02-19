import data from "./data.js";
import {searchMovieByTitle, makeBgActive, makeBgActivePerGenre} from "./helpers.js";

class MoviesApp {
    constructor(options) {
        const {root, searchInput, searchForm, yearHandler, genreHandler, yearSubmitter, genreSubmitter,genreFilter, yearFilter} = options;
        this.$tableEl = document.getElementById(root);
        this.$tbodyEl = this.$tableEl.querySelector("tbody");
        

        this.$searchInput = document.getElementById(searchInput);
        this.$searchForm   = document.getElementById(searchForm);
        this.yearHandler = yearHandler;
        this.genreHandler = genreHandler;
        this.$yearSubmitter = document.getElementById(yearSubmitter);
        this.$genreSubmitter= document.getElementById(genreSubmitter);
        this.$genreFilter = document.getElementById(genreFilter);
        this.$yearFilter = document.getElementById(yearFilter);
    }

    createMovieEl(movie){
        const {image, title, genre, year,id} = movie;
        return `<tr data-id="${id}"><td><img src="${image}"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`
    }

    createGenreEl(genre,count){
        return  `<div class="form-check">
            <input class="form-check-input" type="checkbox" value="${genre}" id="${genre}">
            <label class="form-check-label" for="${genre}">
                ${genre}(${count})
            </label>
        </div>`
    }

    createYearEl(year,count){
        return `<div class="form-check">
        <input class="form-check-input" type="radio" name="year" id="${year}" value="${year}">
        <label class="form-check-label" for="${year}">
            ${year}(${count})
        </label>
    </div>`
    }

    fillTable(){
        /* const moviesHTML = data.reduce((acc, cur) => {
            return acc + this.createMovieEl(cur);
        }, "");*/
        const moviesArr = data.map((movie) => {
           return this.createMovieEl(movie)
        }).join("");
        this.$tbodyEl.innerHTML = moviesArr;
    }

    fillGenres(){
        let genres = this.countGenres(); 
        let genreKeys = Object.keys(genres);   
        const genresArray = genreKeys.map((genre) => {
            return this.createGenreEl(genre,genres[genre]);
        }).join("");
        this.$genreFilter.innerHTML = genresArray;
    }

    fillYears(){
        let years = this.countYears();
        let yearKey = Object.keys(years);
        const yearsArray = yearKey.map((year) => {
            return this.createYearEl(year,years[year]);
        }).join("");
        this.$yearFilter.innerHTML = yearsArray;
    }

    reset(){
        this.$tbodyEl.querySelectorAll("tr").forEach((item) => {
            item.style.background = "transparent";
        })
    }

    countGenres(){
        let genres = [];
        data.forEach((movie) => {
            genres[movie.genre] = genres[movie.genre] ? genres[movie.genre] + 1 : 1; 
            /*if (genres[movie.genre]){   
                genres[movie.genre] += 1;
            }else{
                genres[movie.genre] = 1; 
            }*/
        });
        return genres;  
    }

    countYears(){
        let years = [];
        data.forEach((movie) => {
            years[movie.year] = years[movie.year] ? years[movie.year] + 1 : 1;
             /*if (years[movie.year]){   
                years[movie.year] += 1;
            }else{
                years[movie.year] = 1; 
            }*/
        });
        return years; 

    }


    handleSearch(){
        this.$searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.reset();
            const searchValue = this.$searchInput.value;
            const matchedMovies = data.filter((movie) => {
                return searchMovieByTitle(movie, searchValue);
            }).forEach(makeBgActive)

            this.$searchInput.value = ""; //bonus

        });
    }




    handleYearFilter(){
        this.$yearSubmitter.addEventListener("click", () => {
            this.reset();
            const selectedYear = document.querySelector(`input[name='${this.yearHandler}']:checked`)?.value
            const matchedMovies = data.filter((movie) => {
                return movie.year === selectedYear;
            }).forEach(makeBgActive)
        });
    }

    
    handleGenreFilter() {
        this.$genreSubmitter.addEventListener("click", () => {
            this.reset();
            const selectedGenres = document.querySelectorAll(`input[type='checkbox']:checked`)
            selectedGenres.forEach((item) => {
                const matchedMovies = data.filter((movie) => {
                    return movie.genre === item.value;
                }).forEach(makeBgActivePerGenre)
            })

        });
    }



    init(){
        this.fillTable();
        this.handleSearch();
        this.handleYearFilter();
        this.handleGenreFilter();
        this.fillGenres();
        this.fillYears();
    }
}

let myMoviesApp = new MoviesApp({
    root: "movies-table",
    searchInput: "searchInput",
    searchForm: "searchForm",
    yearHandler: "year",
    genreHandler: "genre",
    yearSubmitter: "yearSubmitter",
    genreSubmitter: "genreSubmitter",
    genreFilter: "genreFilter",
    yearFilter: "yearFilter"
});

myMoviesApp.init();
