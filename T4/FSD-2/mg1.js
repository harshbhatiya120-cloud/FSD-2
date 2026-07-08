const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:21017/movieDB')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define the Schema
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  genre: String,
  rating: Number,
  releaseYear: Number,
  language: String
});

// Create the Model
const Movie = mongoose.model('Movie', movieSchema);

// Initial Data
const movies = [
  { title: "3 Idiots", director: "Rajkumar Hirani", genre: "Comedy", rating: 9.2, releaseYear: 2009, language: "Hindi" },
  { title: "KGF Chapter 2", director: "Prashanth Neel", genre: "Action", rating: 8.8, releaseYear: 2022, language: "Kannada" },
  { title: "Dangal", director: "Nitesh Tiwari", genre: "Drama", rating: 8.9, releaseYear: 2016, language: "Hindi" },
  { title: "Baahubali", director: "S. S. Rajamouli", genre: "Action", rating: 8.7, releaseYear: 2015, language: "Telugu" },
  { title: "Jawan", director: "Atlee", genre: "Action", rating: 7.8, releaseYear: 2023, language: "Hindi" },
  { title: "Drishyam", director: "Nishikant Kamat", genre: "Thriller", rating: 8.4, releaseYear: 2015, language: "Hindi" },
  { title: "Pushpa", director: "Sukumar", genre: "Action", rating: 8.1, releaseYear: 2021, language: "Telugu" }
];

async function runDatabaseOperations() {
  try {
    // Clear existing data to avoid duplicates on re-runs (Optional)
    await Movie.deleteMany({});

    // 1. Insert multiple movie documents
    const insertedMovies = await Movie.insertMany(movies);
    console.log('\n--- 1. Movies Inserted Successfully ---');

    // 2. Display all movies having a rating greater than 8.5
    const highRatedMovies = await Movie.find({ rating: { $gt: 8.5 } });
    console.log('\n--- 2. Movies with Rating > 8.5 ---');
    console.log(highRatedMovies);

    // 3. Display the title and rating of the movie having the second highest rating
    // Sorts descending by rating, skips the highest, and limits to 1 result
    const secondHighest = await Movie.find({}, { title: 1, rating: 1, _id: 0 })
      .sort({ rating: -1 })
      .skip(1)
      .limit(1);
    console.log('\n--- 3. Movie with Second Highest Rating ---');
    console.log(secondHighest[0]);

    // 4. Increase the rating of all Action movies by 0.2
    await Movie.updateMany({ genre: 'Action' }, { $inc: { rating: 0.2 } });
    console.log('\n--- 4. Updated Rating of Action Movies by +0.2 ---');

    // 5. Count the total number of Hindi movies
    const hindiMovieCount = await Movie.countDocuments({ language: 'Hindi' });
    console.log(`\n--- 5. Total Hindi Movies Count: ${hindiMovieCount} ---`);

    // 6. Delete the movie having the title "Jawan"
    const deleteResult = await Movie.deleteOne({ title: 'Jawan' });
    console.log('\n--- 6. Movie "Jawan" Deleted ---');
    console.log(deleteResult);

  } catch (error) {
    console.error('Error executing operations:', error);
  } finally {
    // Close the connection
    mongoose.disconnect();
    console.log('\nDisconnected from MongoDB.');
  }
}

// Execute the functions

runDatabaseOperations();
