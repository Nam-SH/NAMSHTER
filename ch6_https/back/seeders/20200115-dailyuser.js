"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // 더미데이터 부분

    const jan = {
      id: [2, 4, 6, 8, 9, 10, 15, 19, 21, 25, 26],
      date: [
        "2020-01-02",
        "2020-01-04",
        "2020-01-06",
        "2020-01-08",
        "2020-01-09",
        "2020-01-10",
        "2020-01-15",
        "2020-01-19",
        "2020-01-21",
        "2020-01-25",
        "2020-01-26"
      ]
    };
    const feb = {
      id: [32, 35, 38, 39, 42, 43, 44, 45, 49, 50, 52, 55, 58, 59],
      date: [
        "2020-02-01",
        "2020-02-04",
        "2020-02-07",
        "2020-02-08",
        "2020-02-12",
        "2020-02-13",
        "2020-02-14",
        "2020-02-15",
        "2020-02-19",
        "2020-02-20",
        "2020-02-22",
        "2020-02-25",
        "2020-02-28",
        "2020-02-29"
      ]
    };
    const mar = {
      id: [61, 63, 64, 65, 68, 69, 70, 71, 72, 73, 75, 79, 80],
      date: [
        "2020-03-01",
        "2020-03-03",
        "2020-03-04",
        "2020-03-05",
        "2020-03-08",
        "2020-03-09",
        "2020-03-10",
        "2020-03-11",
        "2020-03-12",
        "2020-03-13",
        "2020-03-15",
        "2020-03-19",
        "2020-03-20",
      ]
    };
    let datas = [];
    for (let month of [jan, feb, mar]) {
      for (let idx = 0; idx < month.id.length; idx++) {
        for (let person = 2; person < 12; person++) {
          let temp = {
            createdAt: new Date(`${month.date[idx]}
                ${person + 2}:${(person + 35) % 60}`)
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, ""),
            updatedAt: new Date(`${month.date[idx]}
            ${person + 2}:${(person + 35) % 60}`)
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, ""),
            UserId: person,
            DailyTzId: month.id[idx]
          };
          datas.push(temp);
        }
      }
    }
    return queryInterface.bulkInsert("DailyUser", datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DailyUser", null, {});
  }
};