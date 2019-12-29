var express = require('express');
var fs = require('fs');

var app = express();

var PORT = 3000;

app.get('/', function(req, res) {
    const rawData = fs.readFileSync('./status.real', { encoding: 'utf-8'});
    let dataArray = rawData.split('\n\n');
    const parsed = dataArray.reduce((accumulator, current) => {
        let filtered = current.split('\n').filter(line => line.startsWith('Package', 'Depends', 'Description'));
        if(filtered.length === 0) return accumulator;

        let object = filtered.map(line => {
            const key = line.slice(0, line.indexOf(':'));
            const value = line.slice(line.indexOf(':') + 1);
            return { [key]: value }
        })

        accumulator.push(object);

        return accumulator;
    }, [])

    res.json(parsed);
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});