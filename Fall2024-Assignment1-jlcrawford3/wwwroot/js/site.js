// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// JP Crawford

function getMovie() {
    const apiKey = '4dfe0453';   // OMDb API key
    const imdbID = 'tt0390384';  // Primer movie ID
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

    fetch(url)
        .then((response) => response.json())
        .then(data => {
            document.getElementById('Title').textContent = data.Title;
            document.getElementById('CoverArt').alt = `Movie still from '${data.Title}'`;
            document.getElementById('Rating').textContent = `IMDB Rating: ${data.Ratings[0].Value}`;
            document.getElementById('Summary').textContent = data.Plot;
            document.getElementById('IMDBLink').href = `https://www.imdb.com/title/${data.imdbID}/`;

            const actorsList = document.getElementById('Actors');
            actorsList.innerHTML = '';
            data.Actors.split(', ').forEach(actor => {
                const li = document.createElement('li');
                li.textContent = actor;
                actorsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching movie data: ', error));
}

document.addEventListener('DOMContentLoaded', getMovie);