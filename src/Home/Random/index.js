//隨機  最外層
import RandomButton from './RandomButton';
import TypeChecks from './TypeChecks';
import ShowBox from './ShowBox';
import FlashingBox from './FlashingBox';
import { useState } from 'react';
import { useFunc } from '../../Context/FunctionProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import './Random.css';
const siteName = '35.221.208.241';
function Random({ setFakeCounter }) {
  /*
  點開隨機=>選取分類=>隨機=>顯示第一次=>倒數時間、顯示獲得的內容 店家名稱、優惠額度=>不要=>第二次=>
  同意=>前往購物
  第三次.....
  50/30/10  2HR       ?
  折價額度 使用期限 使用店家 
  做一個元件 可以放在店家搜尋列的
  */
  const { authMember } = useAuth();
  const { loginCheckGetFetch, notLoginGetFetch } = useFunc();
  //不要的種類 checkBox用
  const [rejectedTypes, setRejectedTypes] = useState(Array(6).fill(true));
  //得到的商店名稱 只有第一間
  const [gettedShopName, setGettedShopName] = useState('');
  //商店列表
  const [radomArrays, setRadomArrays] = useState([]);
  //開始閃爍
  const [startFlashing, setStartFlashing] = useState(false);
  //判斷今天是否超過三次
  const [todayOver, setTodayOver] = useState(false);
  //開啟燈窗
  const [openWindow, setOpenWindow] = useState(false);
  //閃爍結束
  const [flashingEnd, setFlashingEnd] = useState(true);
  //按了幾次
  const [pressedTimes, setPressedTimes] = useState(0);
  //拿到的sid
  const [gettedSid, setGettedSid] = useState(0);
  //今天拿了幾次
  const [todayTimes, setTodayTimes] = useState(0);
  //折扣的額度
  const [cutAmount, setCutAmount] = useState(0);

  const navi = useNavigate();

  const checkTimes = async () => {
    const countToday = await loginCheckGetFetch(
      'DailyCoupon/GetDailyTimes',
      'Member'
    );
    console.log(countToday);
    setTodayTimes(countToday);
  };
  useEffect(() => {
    if (authMember) {
      checkTimes();
    }
  }, [authMember]);

  return (
    <div
    // style={{
    //   background: `url(http://${siteName}:3001/images/randomBar.jpg) center center / cover no-repeat`,
    // }}
    >
      {/* deleteAllDailyCoupon */}
      {/* TODO: 這裡要刪掉 開發時要刪除假資料用 */}
      <p
        // onClick={async () => {
        //   Swal.fire('刪除全部每日資料').then(async () => {
        //     await notLoginGetFetch('deleteAllDailyCoupon');
        //   });
        // }}
        className="homePageLogos"
        // style={{ color: 'var(--subColor)' }}
      >
        推薦
      </p>
      {/* {pressedTimes > 0 && flashingEnd ? <DailyTimeCounter /> : null} */}

      <div className="ta-c fs32 fw6 disf jc-c ai-c randomFrameHome">
        <div className="flexSetCenter">
          <p className="ta-c w70p lh48">
            想來想去還是不知道要吃什麼？試試隨饗！
          </p>
        </div>
        <div className="flexSetCenter">
          <p
            onClick={() => {
              setOpenWindow((v) => !v);
            }}
            className="randomButtonOnHome flexSetCenter"
          >
            {/* 開啟隨機按鈕 */}
            <img
              className="w40p"
              src={`http://${siteName}:3001/images/logo_V.svg`}
              alt="eatFreedom"
            />
          </p>
        </div>
      </div>
      {openWindow ? (
        <>
          <div
            onClick={(e) => {
              // console.log(e.target.id)
              if (e.target.id === 'forCheckIdForRandomBack' && flashingEnd) {
                setCutAmount(0);
                setOpenWindow((v) => !v);
              }
            }}
            className="grayBack padV10 "
            id="forCheckIdForRandomBack"
          >
            {/* Random lightBox start  */}
            <div className="randomBoxOnGrayBack padV20 padH10 of-h">
              <p className="ta-c fs24 fw6 marb20">
                {authMember ? (
                  <>今日剩餘次數：{3 - todayTimes}</>
                ) : (
                  <>尚未登入，僅可推薦店家</>
                )}
              </p>

              {/* checkBox */}
              <TypeChecks
                rejectedTypes={rejectedTypes}
                setRejectedTypes={setRejectedTypes}
              />

              {startFlashing ? (
                <FlashingBox
                  radomArrays={radomArrays}
                  setStartFlashing={setStartFlashing}
                  startFlashing={startFlashing}
                  setFlashingEnd={setFlashingEnd}
                  flashingEnd={flashingEnd}
                  pressedTimes={pressedTimes}
                  gettedShopName={gettedShopName}
                />
              ) : null}
              <ShowBox
                radomArrays={radomArrays}
                flashingEnd={flashingEnd}
                cutAmount={cutAmount}
                startFlashing={startFlashing}
              />
              <div className="disf jc-se">
                {pressedTimes > 0 && flashingEnd ? (
                  <p
                    className="homeStartRandomButton ta-c pointer bgcMain "
                    onClick={() => {
                      if (flashingEnd && pressedTimes !== 0) {
                        navi(`/productList/?shop_sid=${gettedSid}`);
                      }
                    }}
                  >
                    前往店家
                  </p>
                ) : null}
                {/* 確認按鈕 */}
                <RandomButton
                  rejectedTypes={rejectedTypes}
                  setGettedShopName={setGettedShopName}
                  setRadomArrays={setRadomArrays}
                  setStartFlashing={setStartFlashing}
                  todayOver={todayOver}
                  setTodayOver={setTodayOver}
                  startFlashing={startFlashing}
                  flashingEnd={flashingEnd}
                  setFlashingEnd={setFlashingEnd}
                  pressedTimes={pressedTimes}
                  setPressedTimes={setPressedTimes}
                  setGettedSid={setGettedSid}
                  todayTimes={todayTimes}
                  setTodayTimes={setTodayTimes}
                  setCutAmount={setCutAmount}
                  setFakeCounter={setFakeCounter}
                />
              </div>
            </div>
            {/* Random lightBox end */}
          </div>
        </>
      ) : null}
    </div>
  );
}
export default Random;
