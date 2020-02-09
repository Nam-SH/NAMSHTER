'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const subjectname = [
      ['python', 'JAVA', 'C', 'GO', 'MachinLearning', 'DeepLearning', '한국사', '컴활', '취업'],
      ['축구', '농구', '야구', '배구', '하키', '헬스', '복싱', '레슬링'],
      ['성악', '바이올린', '기타', '오페라', '첼로', '드럼'],
      ['기타']
    ]
    let datas = []
    for (let i = 0; i < 4; i++) {
      for (let subject of subjectname[i]) {
        let temp = {
          name: subject,
          CategoryId: i + 1,
          createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        }
        datas.push(temp)
      }
    }
    return queryInterface.bulkInsert('subjects', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subjects', null, {});
  }
};