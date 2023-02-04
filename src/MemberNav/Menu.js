import './Menu.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../Context/AuthProvider';
function Menu({ setToggle, toggle }) {
  const { authMember } = useAuth();

  const navi = useNavigate();
  const menuList = [
    // { text: 'LinePay', link: '/LinePay' },
    { text: '找店家', link: '/Shopping', needLogin: false },
    // { text: '店家內商品列表', link: '/StoreDetail' },
    // { text: '結帳頁', link: '/Pay' },
    // { text: '台北市', link: '/City/Taipei' },
    { text: '附近美食', link: '/ShowNearShop', needLogin: false },
    // { text: '找餐點', link: '/' },
    { text: '優惠券', link: '/Coupon', needLogin: false },
    { text: '會員中心', link: '/Member', needLogin: true },
    { text: '現在訂單', link: '/Member/MemberOrder', needLogin: true },
    { text: '歷史訂單', link: '/Member/MemberOldOrder', needLogin: true },
    { text: '紅利明細', link: '/Member/MemberPoint', needLogin: true },
    { text: '客服中心', link: '/Member/MemberService', needLogin: true },
    // { text: '', link: '/Member' },

    // { text: '會員登入', link: '/MemberLogin' },
    // { text: '會員註冊', link: '/MemberRegister' },
    // { text: '測試購物車頁', link: '/CartTemp' },
    // { text: '店家首頁', link: '/Store/StoreLogin' },
    // { text: '外送員首頁', link: '/Deliver/DeliverConfirmOrder' },
    // { text: '管理者首頁', link: '/Admin' },
  ];

  const checkClose = (e) => {
    if (e.target.id !== 'idForCheck01') {
      setToggle(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('click', checkClose);
    }, 1);

    return () => {
      window.removeEventListener('click', checkClose);
    };
  }, []);
  return (
    <>
      <div className="menu" id="idForCheck01">
        {menuList.map((value, index) => {
          if (value.needLogin && !authMember) {
            return null;
          }
          return (
            <p
              key={index}
              onClick={() => {
                navi(value.link);
                setToggle(!toggle);
              }}
            >
              {value.text}
            </p>
          );
        })}
      </div>
    </>
    // onBlur={setToggle(!toggle)}
  );
}
export default Menu;
