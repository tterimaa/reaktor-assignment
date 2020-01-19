const parseDeps = depsString => {
    let deps = depsString.split(', ');
    let normal = deps.filter(d => !d.includes('|')).map(d => d.slice(0, d.indexOf(' ')));
    let alt = deps.filter(d => d.includes('|')).map(d => d.split(' | ')).flat().map(d => d.slice(0, d.indexOf(' ')));
    return { normal, alt };
}

const parseData = rawData => {
    const array = rawData.split('\n\n');

    const parsed = array.reduce((accumulator, current) => {
    let filtered = current.split('\n').filter(line => line.startsWith('Package') || line.startsWith('Depends') || line.startsWith('Description'));
        if(filtered.length === 0) return accumulator;
        
        let entry = {};
        filtered.forEach(line => {
            const keyValue = line.split(': ');
            let value = keyValue[0] === 'Depends' ? parseDeps(keyValue[1]) : keyValue[1];
            entry[keyValue[0]] = value;
        })

        entry.hasOwnProperty('Depends') ? accumulator.push(entry) : accumulator.push({...entry, Depends: { normal: [], alt: []}});
        return accumulator;
    }, []);
    return parsed;
}

module.exports = parseData;