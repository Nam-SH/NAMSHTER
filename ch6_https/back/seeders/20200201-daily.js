'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let thisYear = new Date().getFullYear()
    let month = new Array(13).fill(0)

    for (let i = 1; i < 13; i++) {
      let lastDay = (new Date(thisYear, i, 0)).getDate()
      month[i] = lastDay
    }
    let datas = []

    for (let m = 1; m < month.length; m++) {
      for (let j = 1; j <= month[m]; j++) {
        let temp = {
          createdAt: new Date().getFullYear() + '-' + (m < 10 ? "0" + m : m) + '-' + (j < 10 ? "0" + j : j),
          updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        }
        datas.push(temp)
      }
    }
    // return queryInterface.bulkInsert('dailytzs', datas, {});
    return queryInterface.bulkInsert("DailyTzs", datas, {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkInsert('dailytzs', null, {});
    return queryInterface.bulkInsert("DailyTzs", null, {});
  }
};