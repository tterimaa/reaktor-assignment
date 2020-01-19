'use-strict'

const baseUrl = '/api/data.json';

window.onload = function() {

    const rootElement = document.querySelector('#root');

    const fetchData = async () => {
        const res = await fetch(baseUrl);
        return await res.json();
    }

    fetchData().then(res => {
        console.log(res);
        const ul = document.createElement('ul');
        res.map(e => {
            const li = document.createElement('li');
            li.textContent = e.Package;
            ul.appendChild(li);
        })
        rootElement.appendChild(ul);
    });

}