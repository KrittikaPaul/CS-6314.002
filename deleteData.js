const monk = require('monk');

const url = 'localhost:27017/Arcade'; // MongoDB connection URL
const db = monk(url);

const collectionName = 'Games'; // Collection name

// Specify the condition for deleting documents
const deleteCondition = {
  title: 'Sample Game' // Example condition: delete documents where the title is 'Sample Game'
};

const gamesCollection = db.get(collectionName);

gamesCollection
  .remove(deleteCondition)
  .then((result) => {
    console.log('Data deleted successfully:', result);
  })
  .catch((err) => {
    console.error('Error deleting data from MongoDB:', err);
  })
  .finally(() => {
    db.close(); // Close the MongoDB connection
  });
