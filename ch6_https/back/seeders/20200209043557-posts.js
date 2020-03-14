'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const contents = [
      "사랑은 무엇보다도 자신을 위한 선물이다 - 장 아누이",
      "한글은 세계 어떤 나라의 문자에서도 볼 수 없는 가장 과학적인 표기체계이다.",
      "한글은 인류의 가장 위대한 지적 성취 가운데 하나임은 이론의 여지가 없다.",
      "A man has to have a code, a way of life to live by.",
      "한글이 그토록 중요한 것은 다른 모든 알파벳이 수백 년 동안 수많은 민족의 손을 거치면서 서서히 변형 개량되어 온 것인데 반해 한글은 발명된 글자이기 때문이다. 한글은 세계적인 발명품이다.",
      "한국인들이 1440년대에 이룬 업적은 참으로 놀라운 것이다. 그래서 한글날을 우리의 휴일로서 축하하기 위해 나의 아파트로 학생, 교수 등을 초대해 파티여는 일을 20년 이상 해오고 있다.",
      "We all have big changes in our lives that are more or less a second chance.",
      "세종의 한글 창제는 인류사의 빛나는 업적",
      "한국인들은 세계에서 가장 좋은 문자를 발명하였다",
      "Life is pleasant. Death is peaceful."
    ]

    let datas = []
    for (let n = 0; n < 10; n++) {
      for (let i = 0; i < 10; i++) {
        let temp = {
          content: contents[(n + i) % 10],
          UserId: i + 1,
          createdAt: new Date(`2020-02-${n + 1} ${n + i + 1}:${n + i + 11}`).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updatedAt: new Date(`2020-02-${n + 1} ${n + i + 1}:${n + i + 11}`).toISOString().replace(/T/, ' ').replace(/\..+/, '')
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