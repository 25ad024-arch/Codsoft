function recommendMovie() {

    let genre = document.getElementById("genre").value;
    let result = document.getElementById("result");

    const movies = {
        action: [
            "Avengers: Endgame",
            "John Wick",
            "Mission Impossible",
            "Mad Max: Fury Road"
        ],

        comedy: [
            "3 Idiots",
            "Jumanji",
            "Home Alone",
            "The Mask"
        ],

        romance: [
            "Titanic",
            "The Notebook",
            "La La Land",
            "Me Before You"
        ],

        scifi: [
            "Interstellar",
            "Inception",
            "Avatar",
            "The Martian"
        ]
    };

    if(genre === ""){
        result.innerHTML =
        "<p>❌ Please select a genre.</p>";
        return;
    }

    let output =
    `<h3>🎥 Recommended Movies</h3><br>`;

    movies[genre].forEach(movie => {
        output += `⭐ ${movie}<br>`;
    });

    result.innerHTML = output;
}