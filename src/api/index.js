const sheetBestUrl = "https://sheet.best/api/sheets/aa1f111c-28d5-4803-bf7f-64a3f2295352";

export const getBooks = () => {
  return fetch(sheetBestUrl)
    .then((response) => {
      return response.json();
    });
};
