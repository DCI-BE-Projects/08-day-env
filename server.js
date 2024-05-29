import express from 'express';

const port = process.env.PORT || 4444;
const URL = process.env.URL
const SECRET = process.env.SECRET

const app = express();

app.get('/', (req, res) => {
    res.send('I am awake!');
})

app.get('/weather', async (req, res) => {
    try {
        const response = await fetch(`${URL}${SECRET}`);
        const data = await response.json();

        // Log the entire structure of the result object
        // console.dir(data, { depth: null, colors: true });

        res.json(data); // Send the result back to the client
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})