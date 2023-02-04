import './Menu.css';
import { useNavigate } from 'react-router-dom';
function StoreMenu({ setToggle, toggle }) {
  const navi = useNavigate();
  const menuList = [
    { text: '現在訂單', link: '/Store' },
    { text: '店家登入', link: '/Store/StoreLogin' },
    { text: '會員首頁', link: '/' },
    { text: '外送員首頁', link: '/Deliver/DeliverConfirmOrder' },
    { text: '管理者首頁', link: '/Admin' },
  ];
  return (
    <>
      <div className="storeMenu">
        {menuList.map((value, index) => {
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
  );
}
export default StoreMenu;
