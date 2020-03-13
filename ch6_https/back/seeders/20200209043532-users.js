'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash("q1w2e3r41234", 12);
    const names = ["박해환", "태기동", "간장환", "박채린", "최평화", "임예람", "박강수", "어정영", "전영하", "강다심"]
    const nicknames = ["Ader", "guugle", "zero", "Brah", "naveer", "Frid", "Roastery", "Lius", "Longer", "Srah"]
    const srcs = ["bee.png", "bird.png", "cat.png", "dog.png", "elephant.png", "hamster.png", "horse.png", "lion.png", "panda.png", "penguin.png"]
    const emails = ["naver.com", "daum.net", "google.com", "nate.com"]
    let datas = [];
    for (let i = 0; i < 10; i++) {
      let temp = {
        email: nicknames[i] + emails[i % 3],
        name: names[i],
        nickname: nicknames[i],
        password: hash,
        src: srcs[i],
        isAdmin: false,
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
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