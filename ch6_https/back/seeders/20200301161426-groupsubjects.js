'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    const subjects = [12, 1, 18, 13, 27, 5, 17, 29, 22, 2, 14, 30]

    let datas = []
    for (let i=0; i<12; i++) {
      let temp = {
        GroupId: i + 1,
        SubjectId: subjects[i], 
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }
      datas.push(temp)
    }
    return queryInterface.bulkInsert("GroupSubject", datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("GroupSubject", null, {});
  }
};
