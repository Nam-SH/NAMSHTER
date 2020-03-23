'use strict';
const Chance = require('chance');
let chance = new Chance()

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = []
    for (let [idx, num] of [2, 3, 5, 6, 8, 9, 11, 12].entries()) {
      for (let j = 0; j < 10; j++) {
        let temp = {
          title: chance.word(),
          content: chance.paragraph(),
          createdAt: new Date(`2020-03-${idx + 1} ${idx + j}:${idx + j + 22}`).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updatedAt: new Date(`2020-03-${idx + 1} ${idx + j}:${idx + j + 22}`).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          UserId: num === 11 ? 4 : num == 12 ? 7 : num,
          GroupId: num
        }
        datas.push(temp)
      }
    }
    return queryInterface.bulkInsert('GroupPosts', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GroupPosts', null, {});
  }
};