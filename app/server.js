
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./frontend/src/routes/userRoutes');
const authRoutes = require('./frontend/src/routes/authRoutes');
const conceptRoutes = require('./frontend/src/routes/conceptRoutes');
const topicRoutes = require('./frontend/src/routes/topicRoutes');
const levelRoutes = require('./frontend/src/routes/levelRoutes');

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
