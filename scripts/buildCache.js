fs = require('fs');

const baseUrl = 'https://sheet.best/api/sheets/aa1f111c-28d5-4803-bf7f-64a3f2295352';

const fetchData = (url, file) => {
    fetch(`${baseUrl}${url ?? ''}`)
        .then(response => response.json())
        .then(json => fs.writeFile(`public/cache/${file}`, JSON.stringify(json, null, 2), callback));
}

const callback = (err) => {
    if (err) return console.error(err);
    console.log('Success');
}

fetchData('', 'books.json');
fetchData('/tabs/Book%20Stats', 'stats.json');
fetchData('/tabs/Reader%20Stats', 'readerStats.json');
