import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import './NavBar.css';
import Menu from './Menu';
import { useSVG } from '../../Context/SVGProvider';
const siteName = '35.221.208.241';
//確認登入資訊
function fetchLoginCheck(setfunc) {
  fetch(`http://${siteName}:3001/LoginCheck/Deliver`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Deliver'),
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
//獲得會員名
function getName(setMemberName) {
  const settedName = localStorage.getItem('DeliverName');
  if (!!settedName) {
    setMemberName(settedName);
  }
}
function DeliverNav() {
  const { logoSVG } = useSVG();
  const navi = useNavigate();
  //目錄開合切換
  const [toggle, setToggle] = useState(false);

  const { authDeliver, setAuthDeliver } = useAuth();
  //登入的會員名
  const [memberName, setMemberName] = useState('');

  useEffect(() => {
    fetchLoginCheck(setAuthDeliver);
  }, []);

  useEffect(() => {
    getName(setMemberName);
  }, [authDeliver]);
  return (
    <>
      <nav className="deliverNav">
        <div
          className="h40"
          onClick={() => {
            setToggle(false);
          }}
        >
          <Link to="/">{logoSVG('h100p navLogo')}</Link>
        </div>
        {/* <div
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
        </div> */}

        {/* 名稱顯示 暫放(原memberName) */}
        <p className="fs24 fw6">{localStorage.getItem('deliver_name')}</p>
        <p
          className="logCheck member flexSetCenter bgcSubColor"
          onClick={
            authDeliver
              ? () => {
                  localStorage.removeItem('Deliver');
                  localStorage.removeItem('DeliverName');
                  localStorage.removeItem('deliver_name');
                  localStorage.removeItem('onlie_state');
                  localStorage.removeItem('delivertake');
                  localStorage.removeItem('deliver_sid');
                  setMemberName('');
                  setAuthDeliver(!authDeliver);
                }
              : () => {
                  navi('/Deliver/DeliverLogin ');
                  // setDisplayIndex(0);
                }
          }
        >
          {authDeliver ? '登出' : '登入'}
        </p>
      </nav>
      {toggle ? <Menu setToggle={setToggle} toggle={toggle} /> : <></>}
    </>
  );
}
export default DeliverNav;
