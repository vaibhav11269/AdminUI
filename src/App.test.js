// import { getUserData } from "./App.js";
// require("jest-fetch-mock").enableMocks();
// const fs = require("fs");
// const path = require("path");
// const mockData = require("./conf/userData.json");

// const html = fs.readFileSync(
//   path.resolve(__dirname, "../../index.html"),
//   "utf8"
// );
// jest.dontMock("fs");

// describe("API Call Test", function () {
//   beforeEach(() => {
//     document.documentElement.innerHTML = html.toString();
//   });

//   afterEach(() => {
//     // restore the original func after test
//     jest.resetModules();
//     fetch.resetMocks();
//   });

//   test("getUserData() - Makes a fetch call for /cities API endpoint and returns an array with the user data", async () => {
//     fetch.mockResponseOnce(JSON.stringify(mockCitiesData));

//     let data = await getUserData();

//     expect(fetch).toHaveBeenCalledTimes(1);
//     // expect(fetch).not.toHaveBeenCalledWith(expect.stringContaining("//cities"));
//     // expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/cities"));
//     expect(data).toBeInstanceOf(Array);
//     expect(data).toEqual(mockData);

//   });
// });
