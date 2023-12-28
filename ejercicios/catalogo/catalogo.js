// initialize empty songs catalog
let songs = [];

// define createCatalog and all related functions
function createCatalog() {
  // Helper function to validate MM:SS format
  function isValid(duration) {
    return /^\d{2}:[0-5]\d$/.test(duration);
  }

  // Add new song
  const addSong = (title, genre, duration) => {
    title = prompt("Introduce el título de la canción:");
    genre = prompt("Introduce un género para la canción:");
    duration = prompt(
      "Introduce la duración de la canción (en formato MM:SS):"
    );

    if (isValid(duration) === false) {
      console.log(
        "Duración de canción incorrecta, por favor introduce los datos de nuevo"
      );
    } else {
      const newSong = {
        title: title,
        genre: genre.toLowerCase(),
        duration: duration,
      };
      songs.push(newSong);
      console.clear();
      listSongs(songs);
    }
  };

  // List current songs in catalog
  const listSongs = () => {
    if (songs.length === 0) {
      console.log("No hay canciones en el catálogo");
    } else {
      console.clear();
      console.log(`# CATALOGO:`);
      console.table(songs);
    }
  };

  // Search by genre
  const searchByGenre = () => {
    genre = prompt("Introduce el género que quieres buscar");
    const filtered = songs.filter((song) => {
      return song.genre === genre.toLowerCase();
    });

    if (filtered.length === 0) {
      console.log(`No hay canciones del género "${genre}" en el catálogo`);
    } else {
      console.clear();
      console.log(`# Canciones bajo el género "${genre.toUpperCase()}":`);
      console.table(filtered, ["title", "duration"]);
    }
  };

  // Calculate average song duration
  const calcAverageDuration = () => {
    let totalDuration = 0;

    for (let song of songs) {
      let temp = song.duration.split(":");
      totalDuration += Number(temp[0] * 60);
      totalDuration += Number(temp[1]);
    }

    const calcAverage = totalDuration / songs.length;
    const calcMinutes = Math.floor(calcAverage / 60).toString();
    const calcSeconds = Math.floor(calcAverage % 60).toString();
    const averageDuration = `${calcMinutes
      .toString()
      .padStart(2, "0")}:${calcSeconds.toString().padStart(2, "0")}`;
    return averageDuration;
  };

  return {
    addSong: addSong,
    listSongs: listSongs,
    searchByGenre: searchByGenre,
    calcAverageDuration: calcAverageDuration,
  };
}

let myJukebox = createCatalog();

const addButton = document.querySelector("#addButton");
const listButton = document.querySelector("#listButton");
const searchButton = document.querySelector("#searchButton");
const calcButton = document.querySelector("#calcButton");

addButton.addEventListener("click", myJukebox.addSong);
listButton.addEventListener("click", myJukebox.listSongs);
searchButton.addEventListener("click", myJukebox.searchByGenre);
calcButton.addEventListener("click", function () {
  console.log(
    "\n# Duración promedio de las canciones en catálogo: ",
    myJukebox.calcAverageDuration()
  );
});
