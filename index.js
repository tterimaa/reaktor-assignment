'use-strict'

const baseUrl = '/api/data.json';
let data = [];

window.onload = function() {
    fetch(baseUrl).then(res => {
        res.json().then(json => {
            data = json;
            createView(json)
        });
    })
}

const createView = data => {
    console.log(data);
    const packages = document.querySelector('#packages');
    const ul = document.createElement('ul');
    data.map(e => {
        ul.appendChild(newElement('li', e.Package, newListener(e.Package)));
    })
    packages.appendChild(ul);
}

const newListener = packageName => {
    return listener = () => {
        console.log('Package', packageName, 'clicked');     
        renderInfo(packageName);
    }
}

const renderInfo = name => {
    const info = document.querySelector('#info');
    const package = data.find(e => e.Package === name);
    info.appendChild(newElement('h1', package.Package));
    info.appendChild(newElement('p', package.Description));
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