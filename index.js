'use-strict'

const baseUrl = '/api/data.json';

window.onload = function() {
    fetch(baseUrl).then(res => {
        res.json().then(json => createView(json));
    })
}

const createView = data => {
    console.log(data);
    const rootElement = document.querySelector('#root');
    const ul = document.createElement('ul');
    data.map(e => {
        const li = document.createElement('li');
        li.textContent = e.Package;
        ul.appendChild(li);
    })
    rootElement.appendChild(ul);
}