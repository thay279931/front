import { useState, useEffect } from 'react';
import axios from 'axios';
import './card.css';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
function MemberCoupon() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const siteName = '35.221.208.241';
  const getform = async () => {
    const sid = localStorage.getItem('MemberSid');
    if (!sid) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入會員',
      });
      navigate('/MemberLogin');
    }
    try {
      const response = await axios.get(
        `http://${siteName}:3001/MemberLogin/api5/${sid}`
      );

      console.log(localStorage.getItem('MemberSid'));
      console.log(response.data);
      // console.log(response.data[0].name);
      // setUser(response.data[0]);
      // const image = response.data[0].image;
      // console.log(image);
      setUser(response.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getform();
  }, []);

  const display = user.map((v, i) => {
    return (
      <div className="mc_col" key={v.sid}>
        <div className="mc_card">
          <div className="mc_sale_detail">{v.sale_detail}元</div>
          <div className="mc_coupon">
            <p>優惠券名稱:{v.coupon_name}</p>
            <p>
              使用期限:<Moment format="YYYY/MM/DD">{v.expire}</Moment>
            </p>
            <p>{v.name === '管理者' ? '全站通用' : v.name}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {/* <button onClick={getform}>按鈕</button> */}
      <div className="mc_wrap"> {display}</div>
    </>
  );
}
export default MemberCoupon;
