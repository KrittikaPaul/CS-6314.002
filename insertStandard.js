const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'Arcade'; // Database name
const collectionName = 'Games'; // Collection name

async function insertOneDocument() {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Document to be inserted
    const document = {
      title: 'New Game',
      genre: 'Adventure',
      platform: 'Console',
      releaseYear: 2022,
      developer: 'Game Studio',
      rating: 4.9
    };

    // Insert the document into the collection
    const result = await collection.insertOne(document);
    console.log('Document inserted successfully:', result.insertedId);
  } catch (error) {
    console.error('Error inserting document:', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

// Call the function to insert a document
insertOneDocument();
