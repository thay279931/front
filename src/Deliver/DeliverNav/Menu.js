import './Menu.css';
import { useNavigate, useLocation } from 'react-router-dom';
function Menu({ setToggle, toggle }) {
  const location = useLocation().pathname;

  const navi = useNavigate();

  const menuList = [
    { text: '外送員首頁', link: '/Deliver' },
    { text: '過往紀錄', link: '/Deliver/DeliverDatas' },
    { text: '外送員登入', link: '/Deliver/DeliverLogin' },
    { text: '外送員接單', link: '/Deliver/DeliverConfirmOrder' },
    { text: '外送員訂單', link: '/Deliver/DeliverOrder' },
    { text: '外送員即時通訊 ', link: '/Deliver/DeliverMessager' },
    { text: '外送員統計 ', link: '/Deliver/DeliverStatistics' },
    { text: '外送員客服', link: '/Deliver/DeliverService' },
    { text: '一般首頁', link: '/' },
    { text: '店家首頁', link: '/Store/StoreLogin' },
    { text: '管理者首頁', link: '/Admin' },
  ];
  return (
    <>
      <div className="deliverMenu">
        {menuList.map((value, index) => {
          return (
            <p
              className={
                '/' + location.split('/')[1] === value.link ? 'active' : ''
              }
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
