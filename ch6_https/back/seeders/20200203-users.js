'use strict';
const Chance = require('chance');
let chance = new Chance()

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const srcs = ["bee.png", "bird.png", "cat.png", "dog.png", "elephant.png", "hamster.png", "horse.png", "lion.png", "panda.png", "penguin.png"]
    let datas = [];
    for (let i = 0; i < 10; i++) {
      let temp = {
        email: chance.email(),
        name: chance.name({
          middle: true
        }),
        nickname: chance.name(),
        password: chance.hash({
          length: 60
        }),
        src: srcs[i],
        isAdmin: false,
        createdAt: new Date('2020-01-02 01:01').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date('2020-01-02 01:01').toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }
      datas.push(temp)
    }
    // return queryInterface.bulkInsert("users", datas, {});
    return queryInterface.bulkInsert("Users", datas, {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete("users", null, {});
    return queryInterface.bulkDelete("Users", null, {});
  }
};