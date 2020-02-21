'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = []
    const names = ['컴퓨터공부', '취업', '운동', '음악', '기타']
    for (let i = 0; i < 5; i++) {
      let temp = {
        name: names[i],
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }
      datas.push(temp)
    }
    return queryInterface.bulkInsert('categories', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};