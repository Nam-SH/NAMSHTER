'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash("q1w2e3r41234", 12);
    let datas = [];
    for (let i = 1; i < 10; i++) {
      let temp = {
        email: "tiger" + i + "@tiger.com",
        name: "호랑이" + i,
        nickname: "tiger" + i,
        password: hash,
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }
      datas.push(temp)
    }
    return queryInterface.bulkInsert('users', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};