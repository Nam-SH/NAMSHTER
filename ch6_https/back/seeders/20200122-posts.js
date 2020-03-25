'use strict';
const Chance = require('chance');
let chance = new Chance()

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = []
    for (let [idx, num] of [31, 29, 24].entries()) {
      for (let n = 0; n < num; n++) {
        let temp = {
          content: chance.paragraph(5),
          UserId: n % 11 + 1,
          createdAt: new Date(`2020-0${idx + 1}-${n + 1} ${(n + 16) % 24}:${(n + 34) % 60}`).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updatedAt: new Date(`2020-0${idx + 1}-${n + 1} ${(n + 16) % 24}:${(n + 34) % 60}`).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        }
        datas.push(temp)
      }
    }
    return queryInterface.bulkInsert("Posts", datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {});
  }
};