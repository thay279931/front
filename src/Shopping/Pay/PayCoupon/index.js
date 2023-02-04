import { useEffect, useState } from 'react';
import { usePay } from '../../../Context/PayPageContext';
import { useFunc } from '../../../Context/FunctionProvider';
import PayDailyCoupon from './PayDailyCoupon';
//第三段 優惠券
import PayTitleBlock from '../PayTitleBlock';
function PayCoupon() {
  const { loginCheckGetFetch } = useFunc();
  const {
    setCouponCutAmount,
    couponSid,
    setCouponSid,
    cartContents,
    chooseedPayShop,
  } = usePay();
  const totalPrice = cartContents.cartList[chooseedPayShop].shopPriceTotal;
  //選擇的優惠券(顯示紅框用)
  const [clickedCoupon, setClickedCoupon] = useState(0);
  //優惠券內容
  const [couponData, setCouponData] = useState([]);
  //不能用的優惠券內容
  const [notUseCouponData, setNotUseCouponData] = useState([]);
  //{couponData.length===0 && notUseCouponData.length ===0 ? <></>:<></>}
  //獲得優惠券資訊
  const getCouponDetail = async () => {
    const res = await loginCheckGetFetch('Pay/PayGetCouponDetail', 'Member');
    // console.log(res);
    //足額
    const canUseArray = res.filter((v, i) => {
      const check = totalPrice - v.use_range >= 0 ? true : false;
      return check;
    });
    //不足額
    const notUseArray = res.filter((v, i) => {
      const check = totalPrice - v.use_range >= 0 ? true : false;
      if (!check && clickedCoupon === v.sid) {
        setClickedCoupon(0);
      }
      return !check;
    });
    setCouponData(canUseArray);
    setNotUseCouponData(notUseArray);
  };
  //點選事件 傳入優惠券SID 優惠金額
  const clickEvent = (couponSid, cutAmount) => {
    setClickedCoupon(couponSid);
    setCouponSid(couponSid);
    setCouponCutAmount(cutAmount);
  };
  useEffect(() => {
    getCouponDetail();
  }, [cartContents]);
  return (
    <>
      <div className="payDetailBox">
        <PayTitleBlock number={3} titleString={'優惠券'} />
        <PayDailyCoupon />
        <p className="dailyCouponOnPayTitle ta-c ">一般優惠券</p>
        {/* {
          "sid": 1,
          "coupon_sid": 2,
          "member_sid": 1,
          "order_sid": null,
          "expire": "2022-12-10 00:00:00",
          "is_used": 0,
          "used_time": null,
          "get_time": "2022-11-19 17:57:37",
          "coupon_name": "折50",
          "shop_sid": 89,
          "sale_detail": 50,
          "use_range": 2000
          } */}

        {couponData.length === 0 && notUseCouponData.length === 0 ? (
          <div className="flexSetCenter w100p fs24 fw6 marb20">
            <p>無可使用的優惠券</p>
          </div>
        ) : (
          <>
            <div
              className=" disf fw-w"
              // style={{ backgroundColor: '#eee9' }}
            >
              <div key={0} className="payCouponFrame padV10 padH10">
                <div
                  onClick={(e) => {
                    clickEvent(Number(0), 0);
                  }}
                  className={`payCoupons fontW none ${
                    clickedCoupon === Number(0) ? 'active' : ''
                  }`}
                >
                  <div className="as-s fw6 fs18 h20"></div>
                  <div className="as-c fw6 fs18  ta-c">不使用優惠券</div>
                  <div className="as-e h20"></div>
                </div>
              </div>
              {/* 足額優惠券 */}
              {couponData.map((v, i) => {
                //判定是否足額
                return (
                  <div key={v.sid} className="payCouponFrame padV10 padH10">
                    <div
                      onClick={(e) => {
                        //不足額的不給點
                        clickEvent(Number(v.sid), v.sale_detail);
                      }}
                      className={`payCoupons fontW ${
                        clickedCoupon === Number(v.sid) ? 'active' : ''
                      }`}
                    >
                      <div className="as-s fw6 fs18  h20">
                        折{v.sale_detail}元
                      </div>
                      <div className="as-c fw6 fs18  ta-c">{v.coupon_name}</div>
                      <div className="as-e h20">使用期限:{v.expire}</div>
                    </div>
                  </div>
                );
              })}
              {/* 不足額優惠券 */}
              {notUseCouponData.map((v, i) => {
                return (
                  <div key={v.sid} className="payCouponFrame padV10 padH10">
                    <div className={'payCoupons fontW insufficient'}>
                      {/* <div className="as-s fw6 fs18">折{v.sale_detail}元</div> */}
                      <div className="as-s fw6 fs18 fontRed  h20">條件不符</div>
                      <div className="as-c fw6 fs18  ta-c">{v.coupon_name}</div>
                      <div className="as-e h20">使用期限:{v.expire}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default PayCoupon;
