'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {
    let datas = []
    for (let i of [2, 3, 5, 6, 8, 9, 11, 12]) {
      let temp = {
        title: '행운의 편지',
        content: '이 편지는 영국에서 최초로 시작되어 일년에 한바퀴 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.',
        createdAt: new Date("2020-03-10 19:40").toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date("2020-03-10 19:40").toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        UserId: i === 11 ? 4 : i == 12 ? 7 : i,
        GroupId: i
      }
      let temp2 = {
        title: 'WHO, 사상 세번째 ‘팬데믹’ 선언',
        content: '세계보건기구(WHO)는 11일 신종 코로나바이러스 감염증(코로나19)에 대해 세계적 대유행, 즉 팬데믹을 선언했다. 테워드로스 아드하놈 거브러여수스 WHO 사무총장은 이날 스위스 제네바 WHO 본부에서 열린 언론 브리핑에서 "코로나19가 팬데믹으로 특징지어질 수 있다는 평가를 내렸다"면서 이같이 말했다. 그는 "팬데믹은 가볍게 혹은 무심하게 쓰는 단어가 아니다"라며 "그것은 잘못 사용하면 비이성적인 공포를 불러일으키거나 전쟁이 끝났다는 정당하지 못한 인정을 통해 불필요한 고통과 죽음을 초래할 수 있다"고 지적했다.',
        createdAt: new Date("2020-03-11 22:45").toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date("2020-03-11 22:49").toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        UserId: i === 11 ? 4 : i == 12 ? 7 : i,
        GroupId: i
      }
      datas.push(temp)
      datas.push(temp2)
    }
    return queryInterface.bulkInsert('GroupPosts', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GroupPosts', null, {});
  }
};