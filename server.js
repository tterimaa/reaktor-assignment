var express = require('express');
var fs = require('fs');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.static('.'));

const PORT = process.env.PORT || 3001;
const filePath = './status.real';

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/api/data.json', function(req, res) {
    const rawData = fs.readFileSync(filePath, { encoding: 'utf-8'});
    let dataArray = rawData.split('\n\n');
    let parsed = dataArray.reduce((accumulator, current) => {
        let filtered = current.split('\n').filter(line => line.startsWith('Package') || line.startsWith('Depends') || line.startsWith('Description'));
        if(filtered.length === 0) return accumulator;

        let entry = {};
        
        filtered.forEach(line => {
            const key = line.slice(0, line.indexOf(':'));
            const value = line.slice(line.indexOf(':') + 1).trim();
            entry[key] = value;
        })

        accumulator.push(entry);

        return accumulator;
    }, [])
    res.status(200).json(parsed);
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});