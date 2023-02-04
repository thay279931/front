import { useEffect, useState, useRef } from 'react';
const siteName = '35.221.208.241';
//取得屬性 傳入節點,屬姓名
function getStyle(DOM, style) {
  let prop = window.getComputedStyle(DOM).getPropertyValue(style);
  return prop;
}
const selectsFirst = [
  { name: '台灣小吃', src: 'taiwan.jpg', index: 1 },
  { name: '日式料理', src: 'japan.jpg', index: 2 },
  { name: '美式料理', src: 'america.jpg', index: 3 },
  { name: '韓式料理', src: 'korea.jpg', index: 4 },
];
const selectsSecond = [
  { name: '義式料理', src: 'italy.jpg', index: 5 },
  { name: '早午餐', src: 'branch.jpg', index: 6 },
  { name: '飲料', src: 'drink.jpg', index: 7 },
  { name: '甜點', src: 'sweets.jpg', index: 8 },
];

function FoodTypes() {
  const typesFrame = useRef(null);
  const movingFrame = useRef(null);
  const scrollEvent = () => {
    const typesOutFrame = typesFrame.current;
    //區域位置
    let secY = typesOutFrame.offsetTop;
    //滾輪位置
    let scroolYnow = window.scrollY;
    //廣告圖
    let nodes = document.querySelectorAll('.clips');
    //區域高
    let frameHeight = parseInt(getStyle(typesOutFrame, 'height'));
    //前四張圖
    if (scroolYnow >= secY - 200 && scroolYnow < secY + frameHeight / 3) {
      movingFrame.current.style.transform = 'translateX(0)';
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          nodes[i].classList.add('movein');
        }, i * 200);
      }
    }
    //向右移動 後四張圖
    if (scroolYnow >= secY + frameHeight / 3) {
      movingFrame.current.style.transform = 'translateX(-50%)';
      // console.log(1);
      for (let i = 4; i < 8; i++) {
        setTimeout(() => {
          nodes[i].classList.add('movein');
        }, i * 200);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  });

  return (
    <div>
      <p className="homePageLogos">熱門分類</p>

      <section ref={typesFrame} className="typesOutFrame h200vh po-r  w100p ">
        <div ref={movingFrame} className="movingFrame h50p po-s disf of-h ai-c">
          <div className="w100p disf po-r h80p top0 of-h">
            <div className="w50p po-r lh0">
              {selectsFirst.map((v, i) => {
                return (
                  <div
                    key={v.index}
                    className={`clips clip${v.index} po-a w100p h100p}`}
                  >
                    <img
                      src={`http://${siteName}:3001/images/types/${v.src}`}
                      alt={v.name}
                    />
                  </div>
                );
              })}
            </div>
            <div className="w50p po-r">
              {selectsSecond.map((v, i) => {
                return (
                  <div
                    key={v.index}
                    className={`clips clip${v.index} po-a w100p h100p`}
                  >
                    <img
                      src={`http://${siteName}:3001/images/types/${v.src}`}
                      alt={v.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default FoodTypes;
