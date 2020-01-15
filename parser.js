'use strict'

const parseData = rawData => {
    let strings = rawData.split('\n\n');
    let parsed = parseStrings(strings);
    let parsedWithDeps = parseDeps(parsed)
    return parsedWithDeps;
}

const parseDeps = data => {
    let withDeps = data.reduce((accumulator, current) => {
        if(!current.Depends) {
            accumulator.push(current);
            return accumulator;
        }
        current.Depends = current.Depends.split(',');
        accumulator.push(current);
        return accumulator;
    }, [])
    return withDeps;
}

const parseStrings = array => {
    return array.reduce((accumulator, current) => {
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
}

module.exports = parseData;