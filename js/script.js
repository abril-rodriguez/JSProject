const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '19bbce460dmsh4072dacd7d45517p193147jsn4ec8ba0b1c86',
        'X-RapidAPI-Host': 'genius.p.rapidapi.com',
    }
};

var idArtist = null;
if (idArtist === null) {
    document.getElementById("boton").style.display = 'none';
}

document.getElementById("label2").addEventListener("keyup", _.debounce(search, 2000));

function search() {
    // Declarar v para pasarle como parametro el artista que quiere buscar
    //const variable = prompt("Enter the artist you want"); No puedo editar el contenido visual si uso prompt, con el html puedo cambiar el diseño
    //document.getElementById("label2").innerHTML = variable; //Para obtener el valor del input
    const variable = document.getElementById("label2").value;
    if (variable !== "") {
        fetch(`https://genius.p.rapidapi.com/search?q=${variable}`, options)
            .then(response => response.json())
            .then(data => displayData(data.response.hits))
            .catch(err => console.error(err));
    } else {
        const tbodyEl = document.querySelector("tbody")
        tbodyEl.replaceChildren();
        document.getElementById("resultado").style.display = "none"
        document.getElementById("boton").style.display = "none";
    }

}

function displayData(hits) {
    console.log(hits)
    const songs = hits.map(hit => hit.result) //Para cada objeto me traigo solo la propiedad que necesito, en este caso result
    var columnas = ["full_title", "artist_names", "release_date_for_display"];
    var filas = songs.length;

    idArtist = songs[0]["primary_artist"]["id"];
    document.getElementById("resultado").style.display = "block"

    const tbodyEl = document.querySelector("tbody")
    tbodyEl.replaceChildren(); //Borra la tabla antes de comenzar

    for (let i = 0; i < filas; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < columnas.length; j++) {
            const td = document.createElement("td");
            td.textContent = songs[i][columnas[j]];
            tr.appendChild(td);
        }
        tbodyEl.appendChild(tr); //Añade la celda correspondiente
    }
    const result = document.getElementById("resultado");
    result.style.display = "block";
    document.getElementById("boton").style.display = '';
}

function searchInfo() {
    if (idArtist === null) {
        window.alert('First, enter a valid artist.');
    } else if (idArtist !== null) {
        fetch(`https://genius.p.rapidapi.com/artists/${idArtist}`, options)
            .then(response => response.json())
            .then(data => displayDataArtist(data.response.artist))
            .catch(err => console.error(err));
    }
}

function displayDataArtist(artist) {
    //document.getElementById("infoArtist").innerHTML = artist.url;
    window.location.href = artist.url;
    console.log(window.location.href);
}


//Codigo para mostrarlo en el html
