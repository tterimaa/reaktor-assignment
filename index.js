'use-strict'

window.onload = function() {

    const rootElement = document.querySelector('#root');
    console.log(rootElement);

    const fetchData = async () => {
        const res = await fetch('http://localhost:3000/api/data.json');
        return await res.json();
    }

    fetchData().then(res => {
        const ul = document.createElement('ul');
        res.map(e => {
            const li = document.createElement('li');
            li.textContent = e.Package;
            ul.appendChild(li);
        })
        rootElement.appendChild(ul);
    });
    
}