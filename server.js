const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const parseData = require('./parser');

app.use(cors());
app.use(express.static('.'));

const PORT = process.env.PORT || 3001;
const filePath = './status.real';

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/api/data.json', function(req, res) {
    const rawData = fs.readFileSync(filePath, { encoding: 'utf-8'});
    const parsedData = parseData(rawData);
    res.status(200).json(parsedData);
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});