'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const allContent = [{
        date: '2020-01-01',
        content: 'sns따라하기 프로젝트 시작'
      },
      {
        date: '2020-01-31',
        content: '로그인, 회원가입, 마이룸, 팔로우, 팔로워, 포스트작성, 수정, 삭제, 댓글 완성'
      },
      {
        date: '2020-02-01',
        content: '그룹 서비스 추가 시작'
      },
      {
        date: '2020-02-06',
        content: '그룹페이지에 내가 가입한 그룹 보여주기 추가'
      },
      {
        date: '2020-02-09',
        content: '소셜로그인(네이버, 카카오 추가)'
      },
      {
        date: '2020-02-11',
        content: '그룹 생성 버튼과 카테고리, 주제 추가'
      },
      {
        date: '2020-02-16',
        content: '팔로우, 팔로워 목록 불러오기 lastId방식의 불러오기 적용'
      },
      {
        date: '2020-02-20',
        content: 'https 적용'
      },
      {
        date: '2020-02-21',
        content: '데일리 출첵 추가, 마이룸에서 1년동안의 출첵 그래프 적용'
      },
      {
        date: '2020-02-22',
        content: '메인 네브바에 튤팁 적용 및 배경 수정'
      },
      {
        date: '2020-02-25',
        content: '마이룸 UI/UX 수정'
      },
      {
        date: '2020-12-28',
        content: '그룹 가입탈퇴 적용(가입 후 3일 후 탈퇴 가능)'
      },
      {
        date: '2020-03-01',
        content: '로그인 전 페이지(main)과 로그인 후 (index)페이지 구분'
      },
      {
        date: '2020-03-03',
        content: 'user, post seed데이터 생성'
      },
      {
        date: '2020-03-05',
        content: '그룹 포스트 추가'
      },
      {
        date: '2020-03-06',
        content: '그룹 포스트 댓글 추가, toast 알림 추가, 포스트에디터 적용'
      },
      {
        date: '2020-03-10',
        content: '그룹 상태 변경 버튼 추가 (db에 날짜 칼럼 추가)'
      },
      {
        date: '2020-03-12',
        content: '반응형 web 적용'
      },
      {
        date: '2020-03-15',
        content: '그룹좋아요 적용'
      },
      {
        date: '2020-03-17',
        content: '메인페이지 로그인 UI/UX 수정'
      },
      {
        date: '2020-03-19',
        content: '새로고침시 toast 알림 에러 수정'
      },
      {
        date: '2020-03-21',
        content: 'chance를 적용해서 seed 데이터 수정'
      },
      {
        date: '2020-03-22',
        content: '공지사항 관련 db, route 생성'
      },
      {
        date: '2020-03-23',
        content: '공지사항 댓글 관련 db, route 생성'
      },
      {
        date: '2020-03-25',
        content: '일상글, 블로그 구분'
      }
    ]
    let datas = []
    for (let one of allContent) {
      let temp = {
        content: one.content,
        UserId: 1,
        createdAt: new Date(one.date).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date(one.date).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      }
      datas.push(temp)
    }
    return queryInterface.bulkInsert('Notices', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notices', null, {});
  }
};