import { useEffect, useState } from 'react';
import AdminCouponEdit from './Admin_CouponEdit/Admin_CouponEdit';
import AdminCouponAdd from './Admin_CouponAdd/Admin_CouponAdd';
// import './Admin_Coupon.css'
const siteName = '35.221.208.241';
function fetchLoginCheck(setCouponData) {
  fetch(`http://${siteName}:3001/LoginCheck/Admin`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      //從本機儲存空間拿出資料掛在HEADER傳到後端
      Authorization: 'Bearer ' + localStorage.getItem('Admin'),
    },
  })
    .then((r) => r.json())
    .then((res) => {
      if (res === 1) {
        // console.log('已登入')
        getCouponData(setCouponData);
      } else {
        // console.log('未登入')
      }
    });
}

function getCouponData(setCouponData) {
  fetch(`http://${siteName}:3001/AdminCouponRenderApi`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
      //從本機儲存空間拿出資料掛在HEADER傳到後端
      Authorization: 'Bearer ' + localStorage.getItem('Admin'),
    },
  })
    .then((r) => r.json())
    .then((res) => {
      console.log(res);
      setCouponData(res);
    });
}

function EditCoupon() {
  const [couponData, setCouponData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editEnd, setEditEnd] = useState(0);
  const [editData, setEditData] = useState([]);
  const [add, setAdd] = useState(false);
  const [addEnd, setAddEnd] = useState(0);

  useEffect(() => {
    fetchLoginCheck(setCouponData);
  }, [editEnd, addEnd]);
  return (
    <div className="flexSetCenter fd-c">
      <div>
        <button
          onClick={() => {
            setAdd(true);
          }}
        >
          新增
        </button>
      </div>

      <table className="setCenter">
        <thead>
          <tr>
            <th>SID</th>
            <th>優惠券名稱</th>
            <th>店家SID</th>
            <th>店家名稱</th>
            <th>折扣金額</th>
            <th>使用條件</th>
            <th>兌換紅利</th>
            <th>取得期限</th>
            <th>使用期限</th>
            <th>上架狀態</th>
            <th>是否已下架</th>
            <th>編輯</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          {couponData.map((value, index) => {
            return (
              <tr key={value.sid}>
                <th>{value.sid}</th>
                <th>{value.coupon_name}</th>
                <th>{value.shop_sid}</th>
                <th>{value.shop_name}</th>
                <th>{value.sale_detail}</th>
                <th>{value.use_range}</th>
                <th>{value.need_point}</th>
                <th>{value.get_limit_time.slice(0, 10)}</th>
                <th>{value.expire.slice(0, 10)}</th>
                <th
                  className={
                    !!value.coupon_available ? 'setTextRed' : 'setTextGreen'
                  }
                >
                  {!!value.coupon_available ? '是' : '否'}
                </th>
                <th
                  className={
                    !!value.coupon_complete ? 'setTextRed' : 'setTextGreen'
                  }
                >
                  {!!value.coupon_complete ? '是' : '否'}
                </th>
                <th>
                  <button
                    onClick={() => {
                      setEditData(value);
                      setEdit(!edit);
                    }}
                  >
                    編輯
                  </button>
                </th>
                <th>
                  <button>刪除</button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>

      {edit ? (
        <AdminCouponEdit
          editData={() => {
            const newData = editData;
            newData.coupon_available = !!newData.coupon_available;
            newData.coupon_complete = !!newData.coupon_complete;
            return newData;
          }}
          setEdit={setEdit}
          setEditEnd={setEditEnd}
        />
      ) : (
        <></>
      )}
      {add ? <AdminCouponAdd setAddEnd={setAddEnd} setAdd={setAdd} /> : <></>}
    </div>
  );
}
export default EditCoupon;
