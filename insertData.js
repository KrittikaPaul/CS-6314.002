const monk = require('monk');

const url = 'localhost:27017/Arcade'; // MongoDB connection URL
const db = monk(url);

const collectionName = 'Games'; // Collection name

const dataToInsert = {
  name: 'Sample Game',
  genre: 'Adventure',
  platform: 'PC',
  releaseYear: 2022,
  developer: 'Sample Developer',
  rating: 4.5
};

const gamesCollection = db.get(collectionName);

gamesCollection
  .insert(dataToInsert)
  .then((insertedData) => {
    console.log('Data inserted successfully:', insertedData);
  })
  .catch((err) => {
    console.error('Error inserting data into MongoDB:', err);
  })
  .finally(() => {
    db.close(); // Close the MongoDB connection
  });
