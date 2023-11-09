const http = require('http');
const MongoClient = require('mongodb').MongoClient;

// Connection URL and Database Name
const url = 'mongodb://localhost:27017';
const dbName = 'Sampledb';

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Connect to MongoDB and fetch data
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
      return;
    }

    const db = client.db(dbName);
    const collection = db.collection('Persons');

    collection.find({}).toArray((err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      }

      // Close the MongoDB connection
      client.close();
    });
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
