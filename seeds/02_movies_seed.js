exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("movies")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("movies").insert([
        {
          id: 1,
          name: "Citizen Kane",
          gender: "Drama, Mystery",
          directors: "Orson Welles",
          description:
            "Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance; 'Rosebud'.",
          release_year: "1941",
          stars: "Orson Welles, Joseph Cotten, Dorothy Comingore",
        },
        {
          id: 2,
          name: "Pulp Fiction",
          gender: "Crime, Drama",
          directors: "Quentin Tarantino",
          description:
            "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
          release_year: "1994",
          stars: "John Travolta, Uma Thurman, Samuel L. Jackson",
        },
        {
          id: 3,
          name: "Grease",
          gender: "Musical, Romance",
          directors: "Randal Kleiser",
          description:
            "Good girl Sandy Olsson (Olivia Newton-John) and greaser Danny Zuko (John Travolta) fell in love over the summer. When they unexpectedly discover they're now in the same high school, will they be able to rekindle their romance?",
          release_year: "1978",
          stars: "John Travolta, Olivia Newton-John, Stockard Channing",
        },
        {
          id: 4,
          name: "John Wick",
          gender: "Action, Crime, Thriller",
          directors: "Chad Stahelski, David Leitch",
          description:
            "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
          release_year: "1978",
          stars: "Keanu Reeves, Michael Nyqvist, Alfie Allen ",
        },
        {
          id: 5,
          name: "The Shawshank Redemption",
          gender: "Drama",
          directors: "Frank Darabont",
          description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          release_year: "1994",
          stars: "Tim Robbins, Morgan Freeman, Bob Gunton",
        },
        {
          id: 6,
          name: "The Godfather",
          gender: "Crime, Drama",
          directors: "Francis Ford Coppola",
          description:
            "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
          release_year: "1972",
          stars: "Marlon Brando, Al Pacino, James Caan",
        },
        {
          id: 7,
          name: "The Godfather: Part II",
          gender: "Crime, Drama",
          directors: "Francis Ford Coppola",
          description:
            "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
          release_year: "1972",
          stars: "Al Pacino, Robert De Niro, Robert Duvall",
        },
        {
          id: 8,
          name: "The Dark Knight",
          gender: "Action, Crime, Drama",
          directors: "Francis Ford Coppola",
          release_year: "2008",
          description:
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
          stars: "Christian Bale, Heath Ledger, Aaron Eckhart",
        },
        {
          id: 9,
          name: "The Lord of the Rings: The Return of the King",
          gender: "Action, Adventure, Drama",
          directors: "Peter Jackson",
          release_year: "2003",
          description:
            "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
          stars: "Elijah Wood, Viggo Mortensen, Ian McKellen",
        },
      ]);
    });
};
