import { useEffect, useState } from 'react';
import { usePay } from '../../../Context/PayPageContext';
import { useFunc } from '../../../Context/FunctionProvider';
import moment from 'moment/moment';
function PayDailyCoupon() {
  const {
    setDailyCouponAmount,
    dailyCouponSid,
    setDailyCouponSid,
    chooseedPayShop,
  } = usePay();
  const { loginCheckGetFetch } = useFunc();
  const [hasDailyCoupon, setHasDailyCoupon] = useState(false);
  const [showDailyCoupon, setShowDailyCoupon] = useState({
    count: 0,
    shop_sid: 0,
    name: '',
    member_sid: 0,
    expire: '2000-01-01T00:00:00.000Z',
    cut_amount: 0,
    is_used: 0,
  });
  //這裡要改成對應店家SID
  const checkDailyCouponNotUse = async () => {
    const res = await loginCheckGetFetch(
      `DailyCoupon/CheckDailyCouponWithShopSid/?shopSid=${chooseedPayShop}`,
      'Member'
    );
    console.log({ res });
    if (!res.count) {
      return;
    }
    /*{
    "count": 1,
    "shop_sid": 89,
    "name": "I’m PASTA 和平店",
    "member_sid": 1,
    "expire": "2022-12-02T05:10:22.000Z",
    "cut_amount": 30,
    "is_used": 0
    }*/
    //設定店家資訊
    setDailyCouponAmount(res.cut_amount);
    setShowDailyCoupon(res);
    setHasDailyCoupon(true);
    setDailyCouponSid(res.sid);
  };
  useEffect(() => {
    checkDailyCouponNotUse();
  }, [chooseedPayShop]);
  return (
    <>
      {hasDailyCoupon ? (
        <div className="w100p padH20 marb20">
          <p className="dailyCouponOnPayTitle ta-c ">每日優惠券</p>
          <div className="payDailyCouponShowCard">
            <p>${showDailyCoupon.cut_amount} 折扣</p>
            <p className="fs24">{showDailyCoupon.shopName}</p>
            <p>
              使用期限：
              {moment(showDailyCoupon.expire).utcOffset(8).format('HH:mm:ss')}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default PayDailyCoupon;

/* <div className="disf fd-c ai-c jc-c">
          <p className="dailyCouponOnPayTitle ">每日優惠券</p>
          <div className="disf jc-se ai-c w100p ta-c marb20 fs18 fontBlue">
            <p className="w50p">
              <span>折扣金額：</span>
              <span>{showDailyCoupon.cut_amount}</span>
            </p>
            <p className="w50p">
              使用期限:
              <span>
                {moment(showDailyCoupon.expire).utcOffset(8).format('HH:mm:ss')}
              </span>
            </p>
          </div>
        </div> */
