const fetchData = async () => {
    const data = await fetch('./status.real', { mode: 'no-cors' });
    console.log(data);
}

const div = document.createElement('div');
fetchData();