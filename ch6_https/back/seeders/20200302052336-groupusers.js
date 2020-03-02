'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = []
    for (let i = 0; i < 12; i++) {
      let temp = {
        GroupId: i + 1,
        UserId: i == 10 ? 4 : i == 11 ? 7 : i + 1,
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }
      datas.push(temp)
    }
    return queryInterface.bulkInsert("Groupuser", datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Groupuser", null, {});
  }
};