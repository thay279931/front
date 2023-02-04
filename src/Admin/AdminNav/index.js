import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import AdminMenu from './AdminMenu';
// import { Link } from 'react-router-dom';
const siteName = '35.221.208.241';

//獲得會員名
function getName(setStoreName) {
  const settedName = localStorage.getItem('AdminName');
  if (!!settedName) {
    setStoreName(settedName);
  }
}
function AdminNav() {
  //目錄開合切換
  const [toggle, setToggle] = useState(false);
  const navi = useNavigate();

  const { authAdmin, setAuthAdmin } = useAuth();
  //登入的會員名
  const [storeName, setStoreName] = useState('');
  //確認登入資訊
  function fetchLoginCheck(setfunc) {
    fetch(`http://${siteName}:3001/LoginCheck/Admin`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('Admin'),
      },
    })
      .then((r) => r.json())
      .then((res) => {
        // console.log({ res });
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
    fetchLoginCheck(setAuthAdmin);
  });

  useEffect(() => {
    getName(setStoreName);
  }, [authAdmin]);
  return (
    <>
      <nav className="adminNav">
        <div
          // 目錄按鈕(三橫線)
          onClick={() => {
            setToggle(!toggle);
          }}
          className="menubtn"
        >
          <div
            className={`menubtn_bar menubtn_bar_01 ${toggle ? 'changed' : ''}`}
          ></div>
          <div
            className={`menubtn_bar menubtn_bar_02 ${toggle ? 'changed' : ''}`}
          ></div>
          <div
            className={`menubtn_bar menubtn_bar_03 ${toggle ? 'changed' : ''}`}
          ></div>
        </div>
        {/* 名稱顯示 暫放 */}
        <p>名稱:{storeName}</p>
        <p
          className="logCheck"
          onClick={
            authAdmin
              ? () => {
                  localStorage.removeItem('Admin');
                  localStorage.removeItem('AdminName');
                  setStoreName('');
                  setAuthAdmin(!authAdmin);
                }
              : () => {
                  navi('/Store/StoreLogin');
                }
          }
        >
          {authAdmin ? '登出' : '登入'}
        </p>
      </nav>
      {toggle ? <AdminMenu setToggle={setToggle} toggle={toggle} /> : <></>}
    </>
  );
}
export default AdminNav;
