const monk = require('monk');

const url = 'localhost:27017/Arcade'; // MongoDB connection URL
const db = monk(url);

const collectionName = 'Games'; // Collection name

// Specify the condition to find the document to update
const updateCondition = {
  title: 'Sample Game' // Example condition: update documents where the title is 'Sample Game'
};

// Specify the entire updated data for the document
const updatedDocument = {
  title: 'Updated Game Title', // Updated field(s) and their new values
  genre: 'Updated Genre',
  platform: 'Updated Platform',
  // Add more fields for the updated document as needed
};

const gamesCollection = db.get(collectionName);

gamesCollection
  .update(updateCondition, updatedDocument)
  .then((result) => {
    console.log('Data updated successfully:', result);
  })
  .catch((err) => {
    console.error('Error updating data in MongoDB:', err);
  })
  .finally(() => {
    db.close(); // Close the MongoDB connection
  });
