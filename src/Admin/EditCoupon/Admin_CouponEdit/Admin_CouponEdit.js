import { useEffect, useState } from 'react';
import './Admin_CouponEdit.css';
import Swal from 'sweetalert';
const siteName = '35.221.208.241';

function Admin_CouponEdit({ editData, setEdit, setEditEnd }) {
  const [editDatas, setEditDatas] = useState(editData);
  function changeData(evt, keyName) {
    const values = evt.target.value;
    const newDatas = { ...editDatas, [keyName]: values };
    setEditDatas(newDatas);
  }
  function changeDataState(evt, keyName) {
    //這邊偵測到的是改過的狀態
    const check = evt.target.checked;
    console.log(check);
    const newDatas = { ...editDatas, [keyName]: check };
    setEditDatas(newDatas);
  }

  function submitEdit(editDatas) {
    // console.log(editDatas)
    const {
      sid,
      coupon_name,
      sale_detail,
      use_range,
      need_point,
      get_limit_time,
      expire,
      coupon_available,
      coupon_complete,
    } = editDatas;
    const sendData = {
      sid: sid,
      Cname: coupon_name,
      state: 0,
      coupon_name: coupon_name,
      cutamount: Number(sale_detail),
      limitCost: Number(use_range),
      needPoint: Number(need_point),
      getLimit: get_limit_time,
      useLimit: expire,
      couponAvail: coupon_available,
      couponComp: coupon_complete,
    };
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
          window.alert('修改成功');
        } else {
          window.alert('修改失敗');
        }
      });
  }
  return (
    <div key={editDatas.sid}>
      <div id="couponEditForm" className="pad10 borderR1 couponForm">
        <h2 className="txtACenter fs30 mb20">優惠券修改</h2>
        <form name="setCoupon_E" className="txtACenter" action="">
          <p className="CouponEditSid mb5" id="sid_E"></p>

          <div className="disf aic mb5">
            <label className="w40p">優惠券名稱</label>
            <input
              className="w60p"
              name="coupon_name"
              type="text"
              value={editDatas.coupon_name || ''}
              onChange={(e) => {
                changeData(e, 'coupon_name');
              }}
            />
          </div>

          <div className="disf aic mb5">
            <label className="w40p">折扣金額，最低10元</label>
            <input
              className="w60p"
              name="cutamount"
              min={10}
              type="number"
              value={editDatas.sale_detail || 10}
              onChange={(e) => {
                changeData(e, 'sale_detail');
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
              value={editDatas.use_range || 0}
              onChange={(e) => {
                changeData(e, 'use_range');
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
              value={editDatas.need_point || 0}
              onChange={(e) => {
                changeData(e, 'need_point');
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
              value={editDatas.get_limit_time.slice(0, 10)}
              onChange={(e) => {
                changeData(e, 'get_limit_time');
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
              value={editDatas.expire.slice(0, 10)}
              onChange={(e) => {
                changeData(e, 'expire');
              }}
            />
          </div>

          <div className="disf aic mb5">
            <label className="w40p">上架狀態</label>
            <input
              className="w60p"
              name="couponAvail"
              type="checkbox"
              checked={!!editDatas.coupon_available}
              onChange={(e) => {
                changeDataState(e, 'coupon_available');
              }}
            />
          </div>

          <div className="disf aic mb5">
            <label className="w40p">是否已下架</label>
            <input
              className="w60p"
              name="couponComp"
              type="checkbox"
              checked={!!editDatas.coupon_complete}
              onChange={(e) => {
                changeDataState(e, 'coupon_complete');
              }}
            />
          </div>
        </form>
        <div className="disf f-jcC">
          <button
            onClick={() => {
              submitEdit(editDatas);
              setEditEnd((v) => v + 1);
              setEdit((v) => !v);
              setEditDatas({});
            }}
            className=" disb txtACenter setCenter"
          >
            確定
          </button>
          <button
            onClick={() => {
              setEdit((v) => !v);
              setEditDatas({});
            }}
            className=" disb txtACenter setCenter"
          >
            取消
          </button>
        </div>
      </div>
      <div
        onClick={() => {
          setEdit((v) => !v);
          setEditDatas({});
        }}
        className="grayBack"
      ></div>
    </div>
  );
}
export default Admin_CouponEdit;
