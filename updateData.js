const monk = require('monk');

const url = 'localhost:27017/Arcade'; // MongoDB connection URL
const db = monk(url);

const collectionName = 'Games'; // Collection name

// Specify the condition to find the document to update
const updateCondition = {
  title: 'Sample Game' // Example condition: update documents where the title is 'Sample Game'
};

// Specify the data to be updated in the document
const updateData = {
  $set: {
    genre: 'Updated Genre', // Updated field(s) and their new values
    platform: 'Updated Platform'
    // Add more fields to update as needed
  }
};

const gamesCollection = db.get(collectionName);

gamesCollection
  .update(updateCondition, updateData)
  .then((result) => {
    console.log('Data updated successfully:', result);
  })
  .catch((err) => {
    console.error('Error updating data in MongoDB:', err);
  })
  .finally(() => {
    db.close(); // Close the MongoDB connection
  });
