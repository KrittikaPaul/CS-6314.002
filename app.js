const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const monk = require('monk');

const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const db = monk('localhost:27017/Arcade'); // Connect to your MongoDB database named "Arcade"
const gamesCollection = db.get('Games'); // "Games" is the name of your collection

db.on('open', () => {
  // Event listener for successful connection
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  // Event listener for connection error
  console.error('Error connecting to MongoDB:', err);
});

app.get('/gamelist', async (req, res) => {
  try {
    const games = await gamesCollection.find({});
    //console.log('Fetched games:', games);
    console.log("/games called");
    res.json(games);
  } catch (err) {
    console.error('Error retrieving data from MongoDB:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/games', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.redirect('/games');
});

// Serve create.html for the /create route
app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create.html'));
});

// Serve update.html for the /update route
app.get('/games/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'details.html'));
});

app.post('/games', async (req, res) => {
  try {
    const { title, genre, platform, releaseYear, developer, rating } = req.body;
    const newGame = {
      title,
      genre,
      platform,
      releaseYear: parseInt(releaseYear),
      developer,
      rating: parseFloat(rating)
    };

    const insertedGame = await gamesCollection.insert(newGame);

    // Redirect to the main page after successful form submission
    res.redirect('/index.html'); // Redirect to the root URL
  } catch (err) {
    console.error('Error creating new game:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
