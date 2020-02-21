'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const subjectname = [
      ["Python", "JAVA", "C", "go", "Django", "Vue", "HTML", "CSS", "JS", "ML", "DL"],
      ["한국사", "영어", "컴활", "자소서", "면접"],
      ["축구", "농구", "야구", "농구", "배구", "하키", "헬스", "복싱", "레슬링"],
      ["성악", "바이올린", "기타", "첼로", "사물놀이", "드럼", "댄스"],
      ['기타']
    ]
    let datas = []
    for (let i = 0; i < 5; i++) {
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