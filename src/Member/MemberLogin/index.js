import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import './MemberLogin.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import axios from 'axios';
const siteName = '35.221.208.241';
//登入函式   傳入要登入哪個帳號  帳號 密碼

function MemberLogin() {
  const { setAuthMember } = useAuth();
  const navi = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordFieldType, setPasswordFieldType] = useState('password');
  const loginForm = useRef(null);

  const login2 = async () => {
    try {
      const response = await axios.get(
        `http://${siteName}:3001/MemberLogin/api6`
      );
      setEmail(response.data[0].email);
      setPassword(response.data[0].password);
    } catch (e) {
      console.error(e.message);
    }
  };

  function login(email, password) {
    //如果其中一樣是空的
    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: 'warning',
        title: '輸入欄不可為空白',
      });
      return;
    } else {
      //傳送資料
      let postData = JSON.stringify({
        email: email,
        password: password,
      });

      fetch(`http://${siteName}:3001/Login/Member`, {
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
            //有回傳成功則存到本機儲存空間
            localStorage.setItem('Member', res.token);
            localStorage.setItem(`MemberName`, res.name);
            localStorage.setItem('MemberSid', res.sid);
            // navi(-1, { replace: false });
            setAuthMember(true);
            Swal.fire({
              icon: 'success',
              title: '登入成功',
            });
            navi('/');
          } else {
            Swal.fire({
              icon: 'error',
              title: res.errorType,
            });
          }
        });
    }
  }

  const forgotPass = async function () {
    const formData = new FormData(loginForm.current);
    console.log(formData);
    if (!formData.get('email')) {
      return Swal.fire({
        icon: 'error',
        title: '請輸入電子信箱',
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      });
    }

    const result = await axios.post(
      'http://localhost:3001/MemberLogin/forgotPass/api',
      formData
    );

    if (result) {
      if (result.data.message === '密碼重置信已寄出') {
        return Swal.fire({
          icon: 'success',
          title: result.data.message,
          confirmButtonColor: '#216326',
          scrollbarPadding: false,
        });
      }
      return Swal.fire({
        icon: 'error',
        title: result.data.message,
        confirmButtonColor: '#216326',
        scrollbarPadding: false,
      });
    }

    // alert(result.data)
    // alert(formData.get('email'))
  };

  return (
    <div className="disf fd-c ai-c jc-c padV20">
      <div className="memberLoginForm">
        <div className="m_box">
          <form
            ref={loginForm}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h3
              className="mar"
              onClick={() => {
                setEmail('abc1234000@gmail.com');
                setPassword('Aa123456781');
              }}
            >
              會員登入
            </h3>
            <div className="ml_email">
              <label
                className="m_login_label"
                onClick={() => {
                  setEmail('abc1234@gmail.com');
                  setPassword('Aa123456789');
                }}
              >
                帳號
              </label>
              <br />

              <input
                className="m_login_email"
                name="email"
                value={email}
                placeholder="請輸入信箱"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <br />
            <div>
              <label className="m_login_label">密碼</label>
              <br />
              <input
                className="m_login_password"
                value={password}
                name="password"
                type={passwordFieldType}
                placeholder="請輸入密碼"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className="ml_icon_button"
                type="button"
                onClick={() => {
                  setPasswordFieldType(
                    passwordFieldType === 'text' ? 'password' : 'text'
                  );
                }}
              >
                {passwordFieldType === 'text' ? (
                  <FaRegEyeSlash className="ml_icon" />
                ) : (
                  <FaRegEye className="ml_icon" />
                )}
              </button>
            </div>
            <div className="ml_buttonbox">
              <p
                className="ml_forget"
                onClick={(e) => {
                  e.preventDefault();
                  forgotPass();
                }}
              >
                忘記密碼
              </p>

              <button
                className="m_login_button"
                onClick={() => {
                  login(email, password);
                }}
              >
                登入
              </button>
              {/* <button
            onClick={() => {
              //登出直接刪除本機空間
              localStorage.removeItem('MemberSid');
              localStorage.removeItem('Member');
              localStorage.removeItem('MemberName');
            }}
          >
            登出
          </button> */}
              {/* <button
            onClick={() => {
              setEmail('');
              setPassword('');
            }}
          >
            清空
          </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default MemberLogin;
