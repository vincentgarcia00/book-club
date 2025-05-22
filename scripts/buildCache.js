const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
dotenv.config();

const baseUrl = process.env.SHEETDB_URL + process.env.SHEETDB_API_ID;
const apiKey = process.env.SHEETDB_API_KEY;

if (!process.env.SHEETDB_URL || !process.env.SHEETDB_API_ID || !process.env.SHEETDB_API_KEY) {
  console.error('Missing one or more required environment variables: SHEETDB_URL, SHEETDB_API_ID, SHEETDB_API_KEY');
  process.exit(1);
}

const fetchData = (url, file) => {
  fetch(`${baseUrl}${url ?? ""}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.status + " " + response.statusText);
    })
    .then((json) =>
      fs.writeFile(
        `public/cache/${file}`,
        JSON.stringify(json, null, 2),
        callback
      )
    )
    .catch(callback);
};

const callback = (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.log("Success");
};

fetchData("", "books.json");
fetchData("?sheet=Book%20Stats&cast_numbers=pages,year", "stats.json");
// fetchData("?sheet=Reader%20Stats", "readerStats.json");

fs.writeFile(
  `public/cache/config.json`,
  JSON.stringify(
    {
      last_updated: new Date().toISOString(),
    },
    null,
    2
  ),
  callback
);
