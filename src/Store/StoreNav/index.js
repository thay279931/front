import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';
import StoreMenu from './StoreMenu';
import { useSVG } from '../../Context/SVGProvider';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
// import { Link } from 'react-router-dom';
const siteName = '35.221.208.241';

//獲得會員名
function getName(setStoreName) {
  const settedName = localStorage.getItem('StoreName');
  if (!!settedName) {
    setStoreName(settedName);
  }
}
function StoreNav() {
  const location = useLocation();
  const { logoSVG } = useSVG();
  //目錄開合切換
  const [toggle, setToggle] = useState(false);
  const navi = useNavigate();

  const { authStore, setAuthStore } = useAuth();
  //登入的會員名
  const [storeName, setStoreName] = useState('');
  //確認登入資訊
  function fetchLoginCheck(setfunc) {
    fetch(`http://${siteName}:3001/LoginCheck/Store`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('Store'),
      },
    })
      .then((r) => r.json())
      .then((res) => {
        console.log({ res });
        if (res === 1) {
          setfunc(true);
        } else {
          setfunc(false);
        }
        //收到1代表有登入
        //收到0代表沒登入
      });
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    fetchLoginCheck(setAuthStore);
  }, []);

  useEffect(() => {
    getName(setStoreName);
  }, [authStore]);
  return (
    <>
      <nav className="storeNav">
        <div className="disf ai-c jc-sb">
          {/* <div
            // 目錄按鈕(三橫線)
            onClick={() => {
              setToggle(!toggle);
            }}
            className="menubtn"
          >
            <div
              className={`menubtn_bar menubtn_bar_01 ${
                toggle ? 'changed' : ''
              }`}
            ></div>
            <div
              className={`menubtn_bar menubtn_bar_02 ${
                toggle ? 'changed' : ''
              }`}
            ></div>
            <div
              className={`menubtn_bar menubtn_bar_03 ${
                toggle ? 'changed' : ''
              }`}
            ></div>
          </div> */}
          <span
            onClick={() => {
              navi('/');
            }}
          >
            {logoSVG('fillMainColor h100p pointer')}
          </span>
        </div>

        {/* 名稱顯示*/}
        <p className="fw6 fs24 ">{storeName}</p>
        <p
          className="logCheck store"
          onClick={
            authStore
              ? () => {
                  localStorage.removeItem('Store');
                  localStorage.removeItem('StoreName');
                  localStorage.removeItem('StoreDatas');
                  setStoreName('');
                  setAuthStore(!authStore);
                  Swal.fire('已登出');
                  navi('/Store/StoreLogin');
                }
              : () => {
                  navi('/Store/StoreLogin');
                }
          }
        >
          {authStore ? '登出' : '登入'}
        </p>
      </nav>
      {toggle ? <StoreMenu setToggle={setToggle} toggle={toggle} /> : <></>}
    </>
  );
}
export default StoreNav;
