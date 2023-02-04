import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import './StoreLogin.css';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
const siteName = '35.221.208.241';
//登入函式   傳入要登入哪個帳號  帳號 密碼

function StoreLogin() {
  const { authStore, setAuthStore, setAuthAdmin } = useAuth();
  const navi = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordFieldType, setPasswordFieldType] = useState('password');
  function login(email, password) {
    //如果其中一樣是空的
    if (!email.trim() || !password.trim()) {
      Swal.fire('輸入欄不可為空');
      return;
    } else {
      //傳送資料
      let postData = JSON.stringify({
        email: email,
        password: password,
      });

      fetch(`http://${siteName}:3001/Login/Store`, {
        method: 'POST',
        //跨域請求
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: postData,
      })
        .then((r) => r.json())
        .then((res) => {
          if (res.success) {
            Swal.fire({
              icon: 'success',
              title: '登入成功',
            });
            //有回傳成功則存到本機儲存空間
            localStorage.setItem('Store', res.token);
            localStorage.setItem(`StoreName`, res.name);
            localStorage.setItem(`StoreDatas`, JSON.stringify(res.showedData));
            navi('/Store');
            if (res.adminToken) {
              //登入管理者導向不同
              localStorage.setItem('Admin', res.adminToken);
              localStorage.setItem(`AdminName`, '管理者');
              setAuthStore(true);
              setAuthAdmin(true);
              navi('/Admin');
              return;
            }
            // navi(-1, { replace: true });
            setAuthStore(true);
          } else {
            Swal.fire(res.errorType);
          }
        });
    }
  }
  // useEffect(() => {
  //   if (authStore) {
  //     navi('/store/');
  //   }
  // }, [authStore]);

  return (
    <div className="disf ai-c jc-c padV20">
      <div className="storeLoginForm">
        <div className="sl_box">
          <h3
            className="sl_mar"
            onClick={() => {
              setEmail('S89account');
              setPassword('S89password');
            }}
          >
            店家登入
          </h3>
          <div className="sl_email">
            <label
              onClick={() => {
                setEmail('S41account@test.com');
                setPassword('S41password');
              }}
              className="sl_login_label"
            >
              帳號
            </label>
            <br />
            <input
              className="sl_login_email"
              value={email}
              placeholder="請輸入信箱"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <br />
          <div>
            <label className="sl_login_label">密碼</label>
            <br />
            <input
              className="sl_login_password"
              value={password}
              type={passwordFieldType}
              placeholder="請輸入密碼"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="sl_icon_button"
              type="button"
              onClick={() => {
                setPasswordFieldType(
                  passwordFieldType === 'text' ? 'password' : 'text'
                );
              }}
            >
              {passwordFieldType === 'text' ? (
                <FaRegEyeSlash className="sl_icon" />
              ) : (
                <FaRegEye className="sl_icon" />
              )}
            </button>
          </div>

          <div className="sl_buttonbox">
            <button
              className="sl_login_button"
              onClick={() => {
                login(email, password);
              }}
            >
              登入
            </button>
          </div>

          {/* <div>
          <button
            onClick={() => {
              setEmail('S89account');
              setPassword('S89password');
            }}
          >
            店家快速登入
          </button>
        </div> */}
        </div>
      </div>
    </div>
  );
}
export default StoreLogin;
