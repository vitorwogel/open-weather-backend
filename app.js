import express from 'express';
import nodeFetch from 'node-fetch';
import cors from 'cors';

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('server is running');
})

app.get('/api', async (req, res) => {
    const { key, cityName } = req.query;

    if (!key || !cityName) {
        return res.status(400).json({ error: 'Both key and cityName are required' });
    }

    const response = await nodeFetch(`http://api.weatherstack.com/current?access_key=${key}&query=${cityName}`);
    
    if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        res.json(data);
    } else {
        res.status(response.status).json({ error: 'Failed to fetch data from the external API' });
    }
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
})