'use-strict'

const baseUrl = '/api/data.json';
let data = [];

window.onload = function() {
    fetch(baseUrl).then(res => {
        res.json().then(json => {
            data = json;
            console.log(json);
            renderPackagesList();
            renderInfo(data[0].Package);
        });
    })
}

const newListener = packageName => {
    return listener = () => {
        console.log('Package', packageName, 'clicked');     
        renderInfo(packageName);
    }
}

const renderPackagesList = () => {
    const packages = document.querySelector('#packages');
    const ul = document.createElement('ul');
    data.map(e => ul.appendChild(newElement('li', e.Package, newListener(e.Package))));
    packages.appendChild(ul);
}

const renderInfo = name => {
    const info = document.querySelector('#info');
    cleanInfo(info);
    const package = data.find(e => e.Package === name);
    info.appendChild(newElement('h1', package.Package));
    info.appendChild(newElement('p', package.Description));
    const normalDeps = document.createElement('ul');
    const altDeps = document.createElement('ul');
    package.Depends.normal.map(dep => normalDeps.appendChild(newElement('li', dep, newListener(dep))));
    package.Depends.alt.map(dep => altDeps.appendChild(newElement('li', dep, newListener(dep))));
    info.appendChild(normalDeps);
    info.appendChild(altDeps);
}

const cleanInfo = element => {
    while(element.firstChild) element.removeChild(element.firstChild);
}

const newElement = (type, content, listener) => {
    const element = document.createElement(type);
    element.textContent = content;
    if (listener) element.addEventListener('click', e => {
        e.preventDefault();
        listener();
    })
    return element;
}