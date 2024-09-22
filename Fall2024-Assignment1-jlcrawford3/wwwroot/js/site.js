// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// JP Crawford

// Default movie data (September 2024)
const defaultMovieData = {
    Title: 'Primer',
    imdbRating: '6.7',
    Plot: 'Four friends/fledgling entrepreneurs, knowing that there\'s something bigger and more innovative than the different error-checking devices they\'ve built, wrestle over their new invention.',
    imdbID: 'tt0390384',
    Actors: 'Shane Carruth, David Sullivan, Casey Gooden'
};

function updateMovieData(data) {
    document.getElementById('CoverArt').alt = `Image from the movie '${data.Title}'`;
    document.getElementById('Title').textContent = data.Title;
    document.getElementById('Rating').textContent = `IMDB Rating: ${data.imdbRating}/10`;
    document.getElementById('Summary').textContent = data.Plot;
    document.getElementById('IMDBLink').href = `https://www.imdb.com/title/${data.imdbID}/`;

    const actorsList = document.getElementById('Actors');
    actorsList.innerHTML = '';
    const actors = data.Actors.split(', ');
    for (let i = 0; i < actors.length && i < 5; i++) {
        const li = document.createElement('li');
        li.textContent = actors[i];
        actorsList.appendChild(li);
    }
}

function getMovie() {
    const apiKey = '4dfe0453';   // OMDb API key
    const imdbID = 'tt0390384';  // Primer movie ID
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

    // Set default data
    document.getElementById('ErrorMessage').textContent = '';
    updateMovieData(defaultMovieData);

    // Update with OMDb API data
    fetch(url)
        .then((response) => response.json())
        .then(data => {
            updateMovieData(data);
        })
        .catch(error => {
            console.error('Error fetching movie data: ', error);
            document.getElementById('ErrorMessage').textContext = 'Unable to fetch latest movie data. Showing default information.';
        });
}

document.addEventListener('DOMContentLoaded', getMovie);