//這個元件作好之後 放在店家那一頁
import { useEffect, useState } from 'react';
import { useFunc } from '../../Context/FunctionProvider';
import { useAuth } from '../../Context/AuthProvider';
import moment from 'moment/moment';
import { useLocation, useNavigate } from 'react-router-dom';

function DailyTimeCounter({ fakeCounter }) {
  const location = useLocation();
  const navi = useNavigate();
  //會員登入狀態
  const { authMember } = useAuth();
  const { loginCheckGetFetch } = useFunc();
  //優惠店家資訊
  const [shopDatas, setShopDatas] = useState([]);
  //倒期時間
  const [expireTime, setExpireTime] = useState([]);
  //有沒有今日優惠券
  const [hasDailyCoupon, setHasDailyCoupon] = useState(false);
  //設定倒數時間
  const [showExpires, setShowExpires] = useState('');
  //檢查現在頁面位置(店家內是否要顯示)
  const [checkLocation, setCheckLocation] = useState(false);
  //確認今日優惠券
  const checkDailyCouponNotUse = async () => {
    const res = await loginCheckGetFetch(
      'DailyCoupon/CheckTodayNotUse',
      'Member'
    );
    console.log(res);
    /*[
    {
        "sid": 29,
        "shop_sid": 52,
        "name": "CAFE!N 硬咖啡 板橋中山店",
        "member_sid": 1,
        "expire": "2022-12-06T04:28:46.000Z",
        "cut_amount": 30,
        "is_used": 0
    },
    {
        "sid": 30,
        "shop_sid": 100,
        "name": "純發魯肉飯",
        "member_sid": 1,
        "expire": "2022-12-06T04:29:14.000Z",
        "cut_amount": 20,
        "is_used": 0
    }
] */
    if (res.length === 0) {
      return;
    }
    //設定店家資訊   ;
    const expires = res.map((v) => v.expire);
    setExpireTime(expires);
    setShopDatas(res);
    setHasDailyCoupon(true);
  };
  useEffect(() => {
    const disCountInterval = setInterval(() => {
      const newTimer = expireTime.map((v, i) => {
        const timeNow = new Date();
        const expTime = new Date(v);
        let newTimes = expTime - timeNow;
        // console.log(expTime);
        // console.log(newTimes);
        return moment(newTimes).utcOffset(0).format('H小時mm分ss秒');
      });
      setShowExpires(newTimer);
      // newTimer = moment(newTimer).zone(0).format('HH小時mm分ss秒');
    }, 1000);
    return () => {
      clearInterval(disCountInterval);
    };
  }, [expireTime]);
  useEffect(() => {
    if (authMember) {
      checkDailyCouponNotUse();
    }
  }, [authMember, location, fakeCounter]);
  return (
    <>
      {hasDailyCoupon ? (
        <div className="padV20 padH20">
          <div className="marV20 padV5">
            <p className="fs32 fw6 ta-c fontMainColor">每日限時優惠</p>
          </div>
          <div className="disf jc-se ai-c fd-sc-br">
            {shopDatas.map((v, i) => {
              return (
                <div
                  onClick={() => {
                    navi(`/productList/?shop_sid=${v.shop_sid}`);
                  }}
                  className="b33s100 padH20 marb20"
                  key={v.sid}
                >
                  <div className=" dailyCouponShowCard">
                    <p>${v.cut_amount}折扣</p>
                    <p>{v.name}</p>
                    <p>
                      剩餘時間<br></br>
                      {showExpires[i]}
                    </p>
                  </div>
                </div>
              );
            })}
            {/* <div className=" dailyCouponShowCard">
            <p>$30折扣</p>
            <p>店家名稱在這裡</p>
            <p>使用期限：11:00:00</p>
          </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
}
export default DailyTimeCounter;
