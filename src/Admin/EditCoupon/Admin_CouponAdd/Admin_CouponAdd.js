import { useState } from 'react';
import moment from 'moment/moment';
import Swal from 'sweetalert';
function Admin_CouponAdd({ setAddEnd, setAdd }) {
  const timeNow = moment(new Date()).format('YYYY-MM-DD');
  const defObject = {
    coupon_name: '',
    newCouponShopSid: 101,
    cutamount: 10,
    limitCost: 10,
    needPoint: 0,
    getLimit: timeNow,
    useLimit: timeNow,
  };
  const [newDatas, setNewDatas] = useState(defObject);

  function changeData(evt, keyName) {
    const values = evt.target.value;
    const newDataChanged = { ...newDatas, [keyName]: values };
    setNewDatas(newDataChanged);
  }
  const siteName = '35.221.208.241';

  function submitAdd(newDatas) {
    // console.log(newDatas)
    const {
      newCouponShopSid,
      coupon_name,
      cutamount,
      limitCost,
      needPoint,
      getLimit,
      useLimit,
    } = newDatas;
    const sendData = {
      newCouponShopSid: newCouponShopSid,
      state: 2,
      coupon_name: coupon_name,
      cutamount: Number(cutamount),
      limitCost: Number(limitCost),
      needPoint: Number(needPoint),
      getLimit: getLimit + ' 23:59:59',
      useLimit: useLimit + ' 23:59:59',
    };
    //這裡之後要加入判斷
    console.log(sendData);

    fetch(`http://${siteName}:3001/AdminCouponEditApi`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('Admin'),
      },
      body: JSON.stringify(sendData),
    })
      .then((r) => r.json())
      .then((res) => {
        // console.log(res)
        if (res === 1) {
          window.alert('新增成功');
        } else {
          window.alert('新增失敗');
        }
      });
  }
  return (
    <div>
      <div id="couponEditForm" className="pad10 borderR1 couponForm">
        <h2 className="txtACenter fs30 mb20">優惠券新增</h2>
        <form name="setCoupon_E" className="txtACenter" action="">
          <p className="CouponEditSid mb5" id="sid_E"></p>

          <div className="disf aic mb5">
            <label className="w40p">優惠券名稱</label>
            <input
              className="w60p"
              name="coupon_name"
              type="text"
              value={newDatas.coupon_name || ''}
              onChange={(e) => {
                changeData(e, 'coupon_name');
              }}
            />
          </div>

          <div className="disf aic mb5">
            <label className="w40p">店家SID</label>
            <input
              onChange={(e) => {
                changeData(e, 'newCouponShopSid');
              }}
              className="w60p"
              name="newCouponShopSid"
              type="number"
              value={newDatas.newCouponShopSid || 101}
            />
          </div>

          <div className="disf aic mb5">
            <label className="w40p">折扣金額，最低10元</label>
            <input
              className="w60p"
              name="cutamount"
              min={10}
              type="number"
              value={newDatas.cutamount}
              onChange={(e) => {
                changeData(e, 'cutamount');
              }}
            />
          </div>

          <div className="disf aic mb5">
            <label className="w40p">最低消費金額</label>
            <input
              className="w60p"
              name="limitCost"
              min={0}
              type="number"
              value={newDatas.limitCost}
              onChange={(e) => {
                changeData(e, 'limitCost');
              }}
            />
          </div>

          <div className="disf aic mb5">
            <label className="w40p">兌換所需紅利</label>
            <input
              className="w60p"
              name="needPoint"
              min={0}
              type="number"
              value={newDatas.needPoint}
              onChange={(e) => {
                changeData(e, 'needPoint');
              }}
            />
          </div>

          <div className="disf aic mb5">
            <label className="w40p">獲得期限</label>
            <input
              className="w60p"
              required
              name="getLimit"
              type="date"
              min={timeNow}
              value={newDatas.getLimit || timeNow}
              onChange={(e) => {
                changeData(e, 'getLimit');
              }}
            />
          </div>

          <div className="disf aic mb5">
            <label className="w40p">使用期限</label>
            <input
              className="w60p"
              required
              name="useLimit"
              type="date"
              min={timeNow}
              value={newDatas.useLimit || timeNow}
              onChange={(e) => {
                changeData(e, 'useLimit');
              }}
            />
          </div>
        </form>

        <div className="disf f-jcC">
          <button
            onClick={() => {
              submitAdd(newDatas);
              setAddEnd(1);
              setAdd((v) => !v);
              setNewDatas(defObject);
            }}
            className=" disb txtACenter setCenter"
          >
            確定
          </button>
          <button
            onClick={() => {
              setAdd((v) => !v);
              setNewDatas(defObject);
            }}
            className=" disb txtACenter setCenter"
          >
            取消
          </button>
        </div>
      </div>
      <div
        onClick={() => {
          setAdd((v) => !v);
          setNewDatas(defObject);
        }}
        className="grayBack"
      ></div>
    </div>
  );
}
export default Admin_CouponAdd;
