import StoreNav from './StoreNav';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './StoreLayout.css';
import Footer from '../Footer';
import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthProvider';
import Swal from 'sweetalert2';
import { useFunc } from '../Context/FunctionProvider';
import { useSVG } from '../Context/SVGProvider';
//這邊要放NAVBAR
function Store() {
  const {
    memberDataSVG,
    orderNowSVG,
    oldOrderSVG,
    serviceSVG,
    storeSellAnalyzeSVG,
    editProductSVG,
  } = useSVG();
  const { authStore } = useAuth();
  const { loginCheckPostFetch } = useFunc();
  const [localAuth, setLocalAuth] = useState(false);
  const location = useLocation().pathname;
  const navi = useNavigate();
  const menuList = [
    { text: '現在訂單', link: '/Store', index: 0, svg: orderNowSVG },
    {
      text: '歷史訂單',
      link: '/Store/StoreOldOrder',
      index: 1,
      svg: oldOrderSVG,
    },
    {
      text: '店家資料',
      link: '/Store/StoreDatas',
      index: 2,
      svg: memberDataSVG,
    },
    {
      text: '菜單管理',
      link: '/Store/StoreTypeEdit',
      index: 3,
      svg: editProductSVG,
    },
    {
      text: '消費分析',
      link: '/Store/StoreSellAnalyze',
      index: 4,
      svg: storeSellAnalyzeSVG,
    },
    {
      text: '客服中心',
      link: '/Store/StoreService',
      index: 5,
      svg: serviceSVG,
    },
  ];
  const loginCheck = async () => {
    const res = await loginCheckPostFetch('LoginCheck/Store', 'Store');
    console.log(location);
    return res;
  };
  ///LoginCheck/Store
  useEffect(() => {
    const checkFirst = loginCheck();
    if (checkFirst) {
      setLocalAuth(true);
    } else {
      Swal.fire({
        icon: 'warning',
        title: '請先登入',
      });
      navi('/Store/StoreLogin');
    }
  }, []);
  useEffect(() => {
    if (localAuth && !authStore && location !== '/Store/StoreLogin') {
      Swal.fire({
        icon: 'warning',
        title: '請先登入',
      });
      navi('/Store/StoreLogin');
    }
  }, [location]);
  return (
    <>
      <StoreNav />
      <div className="shopContainer">
        <div className="storeCenter">
          <div className="storeCenterList">
            {menuList.map((value, index) => {
              return (
                <div
                  className={`pointer padH5  disf fd-c jc-sb  storeCenterButton fw6  ${
                    location.includes(value.link) && value.index !== 0
                      ? 'active'
                      : ''
                  }     ${
                    value.index === 0 && location === value.link ? 'active' : ''
                  } `}
                  key={index}
                  onClick={() => {
                    navi(value.link);
                  }}
                >
                  <p className="bigHidden flexSetCenter w100p marb10">
                    {value.svg(
                      `${
                        location.includes(value.link) && value.index !== 0
                          ? 'fillMemberCenterColor'
                          : 'fillMainColor'
                      }     ${
                        value.index === 0 && location === value.link
                          ? 'fillMemberCenterColor'
                          : 'fillMainColor'
                      }`
                    )}
                  </p>
                  <p
                  >
                    {value.text}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="storeContent">{<Outlet />}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Store;
