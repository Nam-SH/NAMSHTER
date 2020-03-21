'use strict';
const Chance = require('chance');
let chance = new Chance()

module.exports = {
  up: (queryInterface, Sequelize) => {

    const first = [{
      content: '시간을 지배할 줄 아는 사람은 인생을 지배할 줄 아는 사람이다. -에센 바흐-',
      UserId: 1,
      createdAt: new Date('2020-01-30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updatedAt: new Date('2020-01-30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    }]
    return queryInterface.bulkInsert("Posts", first, {});


    let datas = []
    for (let [idx, num] of [31, 29, 20].entries()) {
      for (let n = 0; n < num; n++) {
        let temp = {
          content: chance.paragraph(),
          UserId: num % 11 + 1,
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