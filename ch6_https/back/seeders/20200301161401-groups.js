'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const names = [
      '니들이 한국사아냐?', 'Python 뿌시기', '농구왕 조던',
      ' 영어를 먹자', '바이올린은 필수죠', 'Django는 요기요!!',
      '축구좀 하나', '첼로 같이 켜요', '캐나다 선생의 하키',
      'JAVA 좀 잡자!', '컴활 1급은 필수에여 요즘', '사물놀이 같이 추실?'
    ]
    const intros = [
      '매일매일 한국사 공부한 내용을 자유롭게 인증하는 스터디입니다! 한국사 인강/깜지/필노 빵노 스터디/기출문제 풀이 등 한국사 공부 관련 내용을 매일 공부하고 날짜 시간 나오는 카메라로 촬영하여 인증해주세요!',
      '프로그래밍이 필수인 시대가 도래하고 있습니다. 컨셉은 초보도 따라할 수 있는 재밌는 파이썬 이란 컨셉으로 기초부터 할려고 하고 차주부터 ~ 12월 중순까지 1달 반 정도 진행코자 합니다.',
      '매주 월화수 평일 3회 산삼 동구 홍길동에서 9시부터 12시까지 3시간동안 농구하면서 땀흘릴 분들은 들어오세요^^',
      '매주 일요일 오후 4시부터 7시까지 진행하며 다양한 인맥을 비롯한 친구 그리고 멘토와 함께하는 영어활동으로 알차고 뜻깊은 영어생활을 만들어 갑니다',
      '우리 동호회는 매주 일요일 마다 모임을 가지고 있으며, 레슨은 매주 일요일 모임과 병행하여 진행되고 있습니다',
      '파이썬 웹 프레임워크, Django 스터디원을 모집합니다. 진행 방식: 책 배프의 오지랖 파이썬 웹프로그래밍(https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=183934436) 을 정한 분량만큼(2~3장) 각자 공부하고 오프라인에서 리뷰를 합니다.',
      '풋살과 큰 경기장을 돌아가며 게임을 진행하고있고 있으며 화기애애한 분위기로 운영중에 있습니다. 많은 관심과 참여 부탁드리겠습니다.',
      '아마추어 오케스트라 에서는 전무후무한 팝스오케스트라 로서 흔하지 않는 목관,금관,타악기,콘바스 까지 편성이 잘되있는 오케스트라 입니다. 나 유독 첼로단원만 부족하여 현재 4명으로 연주 하고 있는데 좀더 풍부한 화음을 만들어 가기위하여 새로운 단원을 모집하고 있습니다.',
      '아이스하키팀에서 새로운 인재를 찾고 있습니다. 하키에 대한 열정과 함께하는 즐거움을 조이플스에서 느껴보세요.',
      '자바카페에서는 매년 정기적으로 스터디를 진행하고있습니다. 2019년 상반기에도 다양한 스터디를 통해 지식을 함께 공유하는 시간을 가지고자 합니다.',
      '필기 준비 중이며 따로 교재와 강의 없이 기출 문제 푸는 스터디입니다. 모르는 내용은 질문도 하고 스터디하는 날 외에도 컴활 공부할 수 있게 같이 체크도 해주는 거라 혼자 준비하시는 분 누구나 환영합니다.',
      '사물놀이에 관심이 있으신 분들과 함께 놀아보자는 취지로 시작합니다. 장소, 악기에 따른 비용이 전혀 없습니다. 사물놀이 전공자가 교육도 도와드리겠습니다.'
    ]
    const limits = [7, 6, 7, 8, 6, 9, 12, 8, 9, 10, 6, 10]
    const states = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2]

    let datas = []
    for (let i = 0; i < 12; i++) {
      let temp = {
        name: names[i],
        intro: intros[i],
        limit: limits[i],
        state: states[i],
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),

        MasterId: i == 10 ? 4 : i == 11 ? 7 : i + 1
      }
      datas.push(temp)
    }
    return queryInterface.bulkInsert('Groups', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', null, {});

  }
};