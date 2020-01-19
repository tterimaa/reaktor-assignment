const parseDeps = depsStr => {
    const deps = depsStr.split(', ');
    const normal = deps.filter(d => !d.includes('|')).map(d => d.slice(0, d.indexOf(' ')));
    const alt = deps.filter(d => d.includes('|')).map(d => d.split(' | ')).flat().map(d => d.slice(0, d.indexOf(' ')));
    return { normal, alt };
}

const parseDescription = elementStr => {
    const idxMaintainer = elementStr.indexOf('Original-Maintainer:');
    const idxHomepage = elementStr.indexOf('Homepage:');
    const lastIndex = idxMaintainer === -1 && idxHomepage === -1 ? null : idxMaintainer > -1 && idxHomepage > -1 ? Math.min(idxHomepage, idxMaintainer) : Math.max(idxHomepage, idxMaintainer);
    console.log(lastIndex);
    return lastIndex ? elementStr.substring(elementStr.indexOf('Description: '), lastIndex - 1).replace('Description: ', '') : elementStr.substring(elementStr.indexOf('Description: ')).replace('Description: ', '');
}

const parseData = rawData => {
    const array = rawData.split('\n\n');

    const parsed = array.reduce((accumulator, current) => {
    const filtered = current.split('\n').filter(line => line.startsWith('Package') || line.startsWith('Depends'))
        if(filtered.length === 0) return accumulator;
        
        let entry = {};
        filtered.forEach(line => {
            const keyValue = line.split(': ');
            let value = keyValue[0] === 'Depends' ? parseDeps(keyValue[1]) : keyValue[1];
            entry[keyValue[0]] = value;
        })

        const description = current.includes('Description') ? parseDescription(current) : null;
        entry['Description'] = description;

        entry.hasOwnProperty('Depends') ? accumulator.push(entry) : accumulator.push({...entry, Depends: { normal: [], alt: []}});
        return accumulator;
    }, []);
    return parsed;
}

module.exports = parseData;