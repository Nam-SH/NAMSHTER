'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    // 더미데이터 부분
    const jan = {
      'id': [2, 4, 6, 8, 9, 10, 15, 19, 21, 25, 26],
      'date': ['2020-01-02', '2020-01-04', '2020-01-06', '2020-01-08', '2020-01-09', '2020-01-10', '2020-01-15', '2020-01-19', '2020-01-21', '2020-01-25', '2020-01-26']
    }
    const feb = {
      'id': [32, 35, 38, 39, 42, 43, 44, 45, 49, 50, 52, 55, 58, 59],
      'date': ['2020-02-01', '2020-02-04', '2020-02-07', '2020-02-08', '2020-02-12', '2020-02-13', '2020-02-14', '2020-02-15', '2020-02-19', '2020-02-20', '2020-02-22', '2020-02-25', '2020-02-28', '2020-02-29']
    }
    const mar = {
      'id': [61, 63, 64, 65, 68, 69, 70, 71],
      'date': ['2020-03-01', '2020-03-03', '2020-03-04', '2020-03-05', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11']
    }
    let datas = []
    for (let i = 1; i < 11; i++) {
      for (let one of [jan, feb, mar]) {
        for (let j = 0; j < one.id.length; j++) {
          let temp = {
            createdAt: new Date(one.date[j]).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: new Date(one.date[j]).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            UserId: i,
            DailyTzId: one.id[j]
          }
          datas.push(temp)
        }
      }
    }
    return queryInterface.bulkInsert('DailyUser', datas, {});


    // 내 데이터
    const jan = {
      'id': [2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 25, 26, 27, 28, 29, 31],
      'date': ['2020-01-02', '2020-01-04', '2020-01-06', '2020-01-08', '2020-01-09', '2020-01-10', '2020-01-11', '2020-01-12',
        '2020-01-13', '2020-01-14', '2020-01-15', '2020-01-16', '2020-01-17', '2020-01-18', '2020-01-19', '2020-01-21', '2020-01-25', '2020-01-26', '2020-01-27', '2020-01-28', '2020-01-29', '2020-01-31'
      ]
    }
    const feb = {
      'id': [32, 35, 38, 39, 42, 43, 44, 45, 49, 50, 52, 55, 58, 59],
      'date': ['2020-02-01', '2020-02-04', '2020-02-07', '2020-02-08', '2020-02-12', '2020-02-13', '2020-02-14', '2020-02-15', '2020-02-19', '2020-02-20', '2020-02-22', '2020-02-25', '2020-02-28', '2020-02-29']
    }
    const mar = {
      'id': [61, 63, 64, 65, 68, 69, 70, 71],
      'date': ['2020-03-01', '2020-03-03', '2020-03-04', '2020-03-05', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11']
    }
    let datas = []
    for (let one of [jan, feb, mar]) {
      for (let j = 0; j < one.id.length; j++) {
        let temp = {
          createdAt: new Date(one.date[j]).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updatedAt: new Date(one.date[j]).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          UserId: 11,
          DailyTzId: one.id[j]
        }
        datas.push(temp)
      }
    }
    return queryInterface.bulkInsert('DailyUser', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DailyUser', null, {});
  }
};