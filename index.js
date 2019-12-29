const fetchData = async () => {
    const data = await fetch('https://localhost:8000/');
    console.log(data);
}

const div = document.createElement('div');
fetchData();