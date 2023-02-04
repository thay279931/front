import { useEffect, useState } from 'react';
import axios from 'axios';
import './Member_Point.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
const reasons = ['兌換優惠券', '消費獲得', '會員註冊獲得'];
const siteName = '35.221.208.241';

function MemberPoint() {
  const navigate = useNavigate();
  const [productData, setproductData] = useState([
    {
      coupon_sid: 0,
      point: 0,
      point_amount: 0,
      point_change_time: null,
      point_change_method: 0,
      coupon_name: '',
    },
  ]);
  const [user, setUser] = useState([]);
  function getData() {
    const sid = localStorage.getItem('MemberSid');
    if (!sid) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入會員',
      });
      navigate('/MemberLogin');
    }
    fetch(`http://${siteName}:3001/MemberPointApi`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        //從本機儲存空間拿出資料掛在HEADER傳到後端
        Authorization: 'Bearer ' + localStorage.getItem('Member'),
      },
    })
      .then((r) => r.json())
      .then((res) => {
        // console.log(res);
        setproductData(res);
        console.log(productData);
      });
  }

  const getMember = async () => {
    const sid = localStorage.getItem('MemberSid');
    try {
      const response = await axios.get(
        `http://${siteName}:3001/MemberLogin/api2/${sid}`
      );
      console.log(response.data);
      setUser(response.data);
      console.log(user);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getData();
    getMember();
    // LoginCheck(1, '/', null, getData);
  }, []);
  // getData()
  return (
    <>
      {user.map((v, i) => {
        return <h2 className="mt_h2">當前紅利點數:{v.point}</h2>;
      })}
      <br />
      <div className="mt_wrap">
        <table className="mt_table">
          <thead>
            <tr className="mt_tr" key={0}>
              <th className="mt_th">異動點數</th>
              <th className="mt_th">異動時間</th>
              <th className="mt_th">異動原因</th>
              <th className="mt_th">優惠券名稱</th>
            </tr>
          </thead>
          <tbody className="mt_body">
            {productData.map((value, i) => {
              const {
                sid,
                coupon_sid,
                point,
                point_amount,
                point_change_time,
                point_change_method,
                coupon_name,
              } = value;
              return (
                <tr className="mt_tr" key={sid}>
                  <td className="mt_td">{point_amount}</td>
                  <td className="mt_td">{point_change_time}</td>
                  <td className="mt_td">{reasons[point_change_method]}</td>
                  <td className="mt_td">{coupon_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default MemberPoint;
