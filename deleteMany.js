const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'Arcade'; // Database name
const collectionName = 'Games'; // Collection name

async function deleteDocuments() {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Define the deletion criteria (documents where the title starts with "Sample Game")
    const deleteCriteria = {
      title: /^New Game/
      //title:/^Sample/
    };

    // Delete documents that match the criteria
    const result = await collection.deleteMany(deleteCriteria);
    console.log('Documents deleted successfully:', result.deletedCount);
  } catch (error) {
    console.error('Error deleting documents:', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

// Call the function to delete documents
deleteDocuments();
