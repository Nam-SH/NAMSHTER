'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    const first = [{
      content: '시간을 지배할 줄 아는 사람은 인생을 지배할 줄 아는 사람이다. -에센 바흐-',
      UserId: 1,
      createdAt: new Date('2020-01-30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updatedAt: new Date('2020-01-30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    }]
    return queryInterface.bulkInsert("Posts", first, {});


    let datas = []
    const jan_31 = [
      '한번의 실패와 영원한 실패를 혼동하지 마라  -F.스콧 핏제랄드',
      '내일은 내일의 태양이 뜬다',
      '피할수 없으면 즐겨라 -로버트 엘리엇',
      '절대 어제를 후회하지 마라. 인생은 오늘의  내 안에 있고 내일은 스스로 만드는것이다. -L론허바드',
      '계단을 밟아야 계단 위에 올라설수 있다, -터키속담',
      '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다, -앙드레 말로',
      '좋은 성과를 얻으려면 한 걸음 한 걸음이 힘차고 충실하지 않으면 안 된다, -단테',
      '행복은 습관이다,그것을 몸에 지니라 -허버드',
      '성공의 비결은 단 한 가지, 잘할 수 있는 일에 광적으로 집중하는 것이다.- 톰 모나건',
      '자신감 있는 표정을 지으면 자신감이 생긴다 -찰스다윈',
      '평생 살 것처럼 꿈을 꾸어라.그리고 내일 죽을 것처럼 오늘을 살아라. – 제임스 딘',
      '네 믿음은 네 생각이 된다 . 네 생각은  네 말이 된다. 네말은 네 행동이 된다 네행동은 네 습관이된다 . 네 습관은 네 가치가 된다 . 네 가치는 네 운명이 된다 – 간디',
      '일하는 시간과 노는 시간을 뚜렷이 구분하라 . 시간의 중요성을 이해하고 매순간을 즐겁게 보내고 유용하게 활용하라. 그러면 젋은 날은 유쾌함으로 가득찰것이고 늙어서도 후회할 일이 적어질것이며 비록 가난할 때라도 인생을 아름답게 살아갈수있다  – 루이사 메이올콧',
      '절대 포기하지 말라. 당신이 되고 싶은 무언가가 있다면, 그에 대해 자부심을 가져라. 당신 자신에게 기회를 주어라. 스스로가 형편없다고 생각하지 말라. 그래봐야 아무 것도 얻을 것이 없다. 목표를 높이 세워라.인생은 그렇게 살아야 한다.  – 마이크 맥라렌',
      '1퍼센트의 가능성, 그것이 나의 길이다. -나폴레옹',
      '그대 자신의 영혼을 탐구하라.다른 누구에게도 의지하지 말고 오직 그대 혼자의 힘으로 하라. 그대의 여정에 다른 이들이 끼어들지 못하게 하라. 이 길은 그대만의 길이요,  그대 혼자 가야할 길임을 명심하라.  비록 다른 이들과 함께 걸을 수는 있으나 다른 그 어느 누구도 그대가 선택한 길을 대신 가줄 수 없음을 알라. -인디언 속담',
      '고통이 남기고 간 뒤를 보라! 고난이 지나면 반드시 기쁨이 스며든다. -괴테',
      '삶은 소유물이 아니라 순간 순간의 있음이다 영원한 것이 어디 있는가 모두가 한때일뿐 그러나 그 한때를 최선을 다해 최대한으로 살수 있어야 한다 삶은 놀라운 신비요 아름다움이다. 법정스님 -버리고 떠나기',
      '꿈을 계속 간직하고 있으면 반드시 실현할 때가 온다. -괴테',
      '화려한 일을 추구하지 말라. 중요한 것은 스스로의 재능이며, 자신의 행동에 쏟아 붓는 사랑의 정도이다. -머더 테레사',
      '마음만을 가지고 있어서는 안된다. 반드시 실천하여야 한다. -이소룡',
      '흔히 사람들은 기회를 기다리고 있지만 기회는 기다리는 사람에게 잡히지 않는 법이다. 우리는 기회를 기다리는 사람이 되기 전에 기회를 얻을 수 있는 실력을 갖춰야 한다. 일에 더 열중하는 사람이 되어야한다. -안창호',
      '나이가 60이다 70이다 하는 것으로 그 사람이 늙었다 젊었다 할 수 없다. 늙고 젊은 것은 그 사람의 신념이 늙었느냐 젊었느냐 하는데 있다. -맥아더',
      '만약 우리가 할 수 있는 일을 모두 한다면 우리들은 우리자신에 깜짝 놀랄 것이다. -에디슨',
      '나는 누구인가 스스로 물으라 자신의 속얼굴이 드러나 보일 때까지 묻고 묻고 물어야 한다건성으로 묻지말고 목소리 속의 목소리로 귀 속의 귀에 대고 간절하게 물어야 한다해답은 그 물음 속에 있다. 법정스님- 산에는 꽃이 피네',
      '행복은 결코 많고 큰데만 있는 것이 아니다 작은 것을 가지고도 고마워 하고 만족할 줄 안다면 그는 행복한 사람이다. 여백과 공간의 아름다움은 단순함과 간소함에 있다. 법정스님 – 홀로사는 즐거움 에서',
      '물러나서 조용하게 구하면 배울 수 있는 스승은 많다. 사람은 가는 곳마다 보는 것마다 모두 스승으로서 배울 것이 많은 법이다.  -맹자',
      '눈물과 더불어 빵을 먹어 보지 않은 자는 인생의 참다운 맛을 모른다. -괴테',
      '진짜 문제는 사람들의 마음이다. 그것은 절대로 물리학이나 윤리학의 문제가 아니다. -아인슈타인',
      '해야 할 것을 하라. 모든 것은 타인의 행복을 위해서, 동시에 특히 나의 행복을 위해서이다. -톨스토이',
      '사람이 여행을 하는 것은 도착하기 위해서가 아니라 여행하기 위해서이다. -괴테',
    ]
    for (let n = 0; n < 31; n++) {
      let temp = {
        content: jan_31[n],
        UserId: n % 11 + 1,
        createdAt: new Date(`2020-01-${n + 1} ${(n + 16) % 24}:${(n + 34) % 60}`).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date(`2020-01-${n + 1} ${(n + 16) % 24}:${(n + 34) % 60}`).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      }
      datas.push(temp)
    }

    const feb_29 = [
      '화가 날 때는 100까지 세라. 최악일 때는 욕설을 퍼부어라. -마크 트웨인',
      '재산을 잃은 사람은 많이 잃은 것이고, 친구를 잃은 사람은 더많이 잃은 것이며, 용기를 잃은 사람은 모든것을 잃은 것이다. -세르반테스',
      '이룰수 없는 꿈을 꾸고 이길수 없는 적과 싸우며, 이룰수 없는 사랑을 하고 견딜 수 없는 고통을 견디고, 잡을수 없는 저 하늘의 별도 잡자. -세르반테스',
      '고개 숙이지 마십시오. 세상을 똑바로 정면으로 바라보십시오. -헬렌 켈러',
      '고난의 시기에 동요하지 않는 것, 이것은 진정 칭찬받을 만한 뛰어난 인물의 증거다. -베토벤',
      '사막이 아름다운 것은 어딘가에 샘이 숨겨져 있기 때문이다 – 생떽쥐베리',
      '행복의 한 쪽 문이 닫히면 다른 쪽 문이 열린다. 그러나 흔히 우리는 닫혀진 문을 오랫동안 보기 때문에 우리를 위해 열려 있는 문을 보지 못한다. -헬렌 켈러',
      '만족할 줄 아는 사람은진정한 부자이고, 탐욕스러운 사람은진실로 가난한 사람이다. -솔론',
      '성공해서 만족하는 것은 아니다. 만족하고 있었기 때문에 성공한 것이다.-알랭',
      '곧 위에 비교하면 족하지 못하나,아래에 비교하면 남음이 있다. -명심보감',
      '자신을 내보여라. 그러면 재능이 드러날 것이다. – 발타사르 그라시안',
      '자신의 본성이 어떤것이든 그에 충실하라 . 자신이 가진 재능의 끈을 놓아 버리지 마라. 본성이 이끄는 대로 따르면 성공할것이다 -시드니 스미스',
      '당신이 할수 있다고 믿든 할수 없다고 믿든 믿는 대로 될것이다.- 헨리 포드',
      '단순하게 살라. 쓸데없는 절차와 일 때문에 얼마나 복잡한 삶을 살아가는가? -이드리스 샤흐',
      '당신이 인생의 주인공이기 때문이다 . 그사실을 잊지마라 . 지금까지 당신이 만들어온 의식적 그리고 무의식적 선택으로 인해 지금의 당신이 있는것이다 .  – 바바라 홀',
      '지금이야 말로 일할때다. 지금이야말로 싸울때다. 지금이야말로 나를 더 훌륭한 사람으로 만들때다 오늘 그것을 못하면 내일 그것을 할수있는가- 토마스 아켐피스',
      '모든것들에는 나름의 경이로움과 심지어 어둠과 침묵이 있고 , 내가 어떤 상태에 있더라도 나는 그속에서 만족하는 법을 배운다 -헬렌켈러',
      '작은 기회로 부터 종종 위대한 업적이 시작된다  -데모스테네스',
      '인생이란 학교에는 불행 이란 훌륭한 스승이 있다. 그 스승 때문에 우리는 더욱 단련되는 것이다. -프리체',
      '세상은 고통으로 가득하지만 그것을 극복하는 사람들로도 가득하다 – 헨렌켈러',
      '도저히 손댈 수가 없는 곤란에 부딪혔다면 과감하게 그 속으로 뛰어들라 . 그리하면 불가능하다고 생각했던 일이 가능해진다.',
      '용기있는 자로 살아라. 운이 따라주지 않는다면 용기 있는 가슴으로 불행에 맞서라. -키케로',
      '최고에 도달하려면 최저에서 시작하라. -P.시루스',
      '내 비장의 무기는 아직 손안에 있다 .그것은 희망이다 – 나폴레옹',
      '문제는 목적지에 얼마나 빨리 가느내가 아니라 그 목적지가 어디냐는 것이다. -메이벨 뉴컴버',
      '한 번 실패와 영원한 실패를 혼동하지 마라. -F.스콧 핏제랄드',
      '인간의 삶 전체는 단지 한 순간에 불과하다 . 인생을 즐기자 – 플루타르코스',
      '겨울이 오면 봄이 멀지 않으리 -셸리',
      '일하여 얻으라 . 그러면 운명의 바퀴를 붙들어 잡은것이다 -랄프 왈도 에머슨',
    ]
    for (let n = 0; n < 29; n++) {
      let temp = {
        content: feb_29[n],
        UserId: n % 11 + 1,
        createdAt: new Date(`2020-02-${n + 1} ${(n + 13) % 24}:${(n + 30) % 60}`).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date(`2020-02-${n + 1} ${(n + 13) % 24}:${(n + 30) % 60}`).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      }
      datas.push(temp)
    }

    const mar_14 = [
      '변명 중에서도 가장 어리석고 못난 변명은 "시간이 없어서" 라는 변명이다. -에디슨-',
      '사람은 금전을 시간보다 중히 여기지만, 그로 인해 잃어버린 시간은 금전으론 살 수 없다. -유태격언-',
      '시간을 최악으로 사용하는 사람들은 시간이 부족하다고 늘 불평하는데 일인자이다. -라 브뤼에르-',
      '삼십 분이란 티끌과 같은 시간이라고 말하지 말고, 그 동안이라도 티끌과 같은 일을 처리하는 것이 현명한 방법이다. -괴테-',
      '세월은 누구에게나 공평하게 주어진 자본금이다. 이 자본을 잘 이용한 사람에겐 승리가 있다. -아뷰난드-',
      '승자는 시간을 관리하며 살고, 패자는 시간에 끌려 산다. -J. 하비스-',
      '시간의 참된 가치를 알라. 그것을 붙잡아라. 억류하라. 그리고 그 순간순간을 즐겨라. 게을리 하지 말며, 해이 해지지 말며, 우물거리지 말라. 오늘 하루 이 시간은 당신의 것이다. 하루를 착한 행위로 장식하라. -루즈벨트-',
      '오늘의 식사는 내일로 미루지 않으면서 오늘 할 일은 내일로 미루는 사람이 많다. -C. 힐티-',
      '우리는 일 년 후면 다 잊어버릴 슬픔을 간직하느라고 무엇과도 바꿀 수 없는 소중한 시간을 버리고 있습니다. 소심하게 굴기에 인생은 너무나 짧습니다. -카네기-',
      '일하는 시간과 노는 시간을 뚜렷이 구분하라. 시간의 중요성을 이해하고 매 순간을 즐겁게 보내고 유용하게 활용하라. 그러면 젊은 날은 유쾌함으로 가득 찰 것이고 늙어서도 후회할 일이 적어질 것이며 비록 가난할 때라도 인생을 아름답게 살아갈 수 있다. -루이사 메이 올콧-',
      '전력을 다해서 시간에 대항하라. -톨스토이-',
      '지나가는 시간이란 잃어버린 시간이며, 게으름과 무기력한 시간이며, 몇 번이고 맹세를 해도 지키지 못하는 시간이며, 때때로 이사를 하고 끊임없이 돈을 구하는데 분주한 시간이다. -J.P. 샤르트르-',
      '하루의 가장 달콤한 순간은 새벽에 있다. -윌콕스-',
      '희망과 근심, 공포와 불안 가운데 그대 앞에 빛나고 있는 하루 하루를 마지막이라고 생각하라. 그러면 예측할 수 없는 시간은 그대에게 더 많은 시간을 줄 것이다. -호레스-',
    ]
    for (let n = 0; n < 14; n++) {
      let temp = {
        content: mar_14[n],
        UserId: n % 11 + 1,
        createdAt: new Date(`2020-03-${n + 1} ${(n + 19) % 24}:${(n + 38) % 60}`).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date(`2020-03-${n + 1} ${(n + 19) % 24}:${(n + 38) % 60}`).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      }
      datas.push(temp)
    }
    return queryInterface.bulkInsert("Posts", datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {});
  }
};