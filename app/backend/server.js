
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const conceptRoutes = require('./src/routes/conceptRoutes');
const topicRoutes = require('./src/routes/topicRoutes');
const levelRoutes = require('./src/routes/levelRoutes');
const aiRoutes = require('./src/routes/aiRoutes');

const deckRoutes = require('./src/routes/deckRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/concepts', conceptRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/levels', levelRoutes);
app.use('/api/ai', aiRoutes);

app.use('/api/decks', deckRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
