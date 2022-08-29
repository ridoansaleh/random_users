import {
  sortString,
  sortDate,
  formatDateToUTC,
  mapUsersData,
  isInclude,
} from "./utils";
import { users_api_response } from "./tests/mock-data";

const mock_users = [users_api_response.results[0]];

describe("Test utils.js", () => {
  it("Test sortString function", () => {
    const result = sortString("Jhon", "Antony");
    expect(result).toBe(1);
  });

  it("Test sortDate function", () => {
    const result = sortDate(
      "2018-08-29T00:40:28.562Z",
      "2012-09-29T17:20:51.460Z"
    );
    expect(result).toBe(186563977102);
  });

  it("Test formatDateToUTC function", () => {
    const result = formatDateToUTC("2018-08-29T00:40:28.562Z");
    expect(result).toBe("29-08-2018 00:40");
  });

  it("Test mapUsersData function", () => {
    const result = mapUsersData(mock_users);
    expect(result).toStrictEqual([
      {
        key: 1,
        username: "tinypanda429",
        name: "Quinn Morris",
        email: "quinn.morris@example.com",
        gender: "male",
        registered_date: "06-02-2020 03:08",
        unformat_registered_date: "2020-02-06T03:08:32.814Z"
      },
    ]);
  });

  it("Test isInclude function", () => {
    const result = isInclude("Washington DC", "hing");
    expect(result).toBe(true);
  });
});
