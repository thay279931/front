import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
//這頁沒用到
import './StoreLayout.css';
function StoreLayout() {
  const location = useLocation().pathname;
  const navi = useNavigate();
  const menuList = [
    { text: '現在訂單', link: '/Store', index: 0 },
    { text: '歷史訂單', link: '/Store/StoreOldOrder', index: 1 },
    { text: '店家資料', link: '/Store/StoreDatas', index: 2 },
    { text: '餐點管理', link: '/Store/StoreTypeEdit', index: 3 },
    { text: '消費分析', link: '/Store/StoreSellAnalyze', index: 4 },
    { text: '客服中心', link: '/Store/StoreService', index: 5 },
  ];
  //authStore
  useEffect(() => {}, []);
  return (
    <>
      {/* 會員中心 外層 */}
      <div className="storeCenter">
        <div className="storeCenterList">
          {menuList.map((value, index) => {
            return (
              <p
                className={`pointer  ${
                  value.link === location ? 'active' : ''
                }`}
                key={index}
                onClick={() => {
                  navi(value.link);
                }}
              >
                {value.text}
              </p>
            );
          })}
        </div>
        <div className="storeContent">{<Outlet />}</div>
      </div>
    </>
  );
}
export default StoreLayout;
