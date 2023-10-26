'use-strict';


//隠れ課題 その１
//#menu-btnをクリックした時、#gnaviにクラス名の「open」がついていなければ追加、すでにあれば削除
//#menu-btnをクリックした時、#gnaviにクラス名の「close」がついていなければ追加、すでにあれば削除 

const menuBtn = document.querySelector('#menu-btn'); //まずボタンとナビを設定
const gnavi = document.querySelector('#gnavi');

menuBtn.addEventListener('click', (event) => {     //ボタンをclickしたときeventを発生させる
    gnavi.classList.toggle( 'open' ); //最初のclickの時はopen
    event.currentTarget.classList.toggle( 'close' ) //2回目の時はcloseあとは繰り返す

});


//隠れ課題 その2
//上から300以上スクロールしたら#page-topに.openを追加し、300未満の時はopenを外す。
const getScrollY = () => {
    const scrolled = window.scrollY;
    const pageTop = document.querySelector('#page-top');
    //console.log( scrolled );
    if  (scrolled >= 300) {
        pageTop.classList.add('open');
    } else {
        pageTop.classList.remove('open');
    }
};

window.addEventListener('scroll', getScrollY);


//課題1 西暦曜日の取得

const whatDay = document.querySelector('#what-day');
whatDay.addEventListener('submit', (event) =>{
    //初期動作のキャンセル
    event.preventDefault();
    //console.log('送信した');

    //入力内容の取得
    const year = whatDay.year.value;
    const month = whatDay.month.value;
    const date = whatDay.date.value;

    //日時
    const now =new Date(year, month-1, date,);

    //曜日の取得
    const dayList = ['日','月','火','水','木','金','土',];
    const day = now.getDay();

    //#A-1に「〇年〇月〇日」と表示
    document.querySelector('#A-01').textContent = `${year}年${month}月${date}日`;
    //#A-2に「○曜日」と表示
    document.querySelector('#A-02').textContent = `${dayList[day]}曜日`;
});


//課題2 BMI

const whatBmi = document.querySelector('#what-bmi');
whatBmi.addEventListener('submit', (evt) => {
    //初期動作のキャンセル
    evt.preventDefault();

    //入力内容の取得
    const kg = whatBmi.kg.value;
    const m = (whatBmi.cm.value) / 100;

    //計算   Mathは、小数点に関するメソッドfoolは切り捨て
    const bmi = Math.floor( (kg / (m * m)) * 10 ) / 10;

    // 計算結果からメッセージを作成
    // 25以上 肥満気味・18.5~24.9 標準 18.5未満 痩せすぎ
    let message = ''; //メッセージ用の入れ物

    if (bmi >= 25) {
        message = '肥満';
    } else if ( bmi >= 18.5 ) {
        message = '標準';
    } else {
        message = '痩せすぎ';
    }

    //結果表示
    document.querySelector('#A-03').textContent = bmi;
    document.querySelector('#A-04').textContent = message;

    //console.log(bmi);
})

//課題3
/*
//vanilla jsの場合
const tabs = document.querySelectorAll('.tab-link');
const sections = document.querySelectorAll('.tab-sec');

//↓クリックイベントの準備
tabs.forEach( (tab) => {
    tab.addEventListener('click', (e) => {
        //console.log('click');

        //まず全て外して、そのあとクリックしたところを表示

        //全てのsectionから.openを外す
        sections.forEach( (sec) => {
            sec.classList.remove('open');
        });

        //全てのtabから.openを外す
        tabs.forEach( (tab2) => {
            tab2.classList.remove('open');
        });

        //sectionに.openをつけて表示する
        const tabData = e.target.dataset.tab;
        document.querySelector(`#${tabData}`).classList.add('open');

        //クリックした要素に.openをつける
        e.target.classList.add('open');

        //console.log(tabData);
    });
});   */


//-------------------ここからjQueryの場合
$('.tab-link').on('click', (e) => {
    $('.tab-link, .tab-sec').removeClass('open');

    const tabTarget = $(e.target); //クリックした要素
    tabTarget.addClass('open');
    $( `#${tabTarget.data('tab')}` ).addClass('open');

});


//swiper.jsでスライドショーを作成する
const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    slidesPerView: 5,//画面上で表示するスライド枚数
    spaceBetween: 30, //隙間の余白
      centeredSlides: true, //写真を真ん中に持ってくる設定
      autoplay: {
        delay: 2000, //再生時間の設定
        disableOnInteraction: false,
      },
  });