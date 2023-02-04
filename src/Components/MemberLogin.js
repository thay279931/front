import { useState } from 'react';
import './MemberLogin.css';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import Deliverlogin from './login';
const siteName = '35.221.208.241';
//登入函式   傳入要登入哪個帳號  帳號 密碼

function MemberLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordFieldType, setPasswordFieldType] = useState('password');
  return (
    <div className="disf fd-c ai-c jc-c padV20">
      <div className="memberLoginForm">
        <div className="m_box">
          <h3
            className="mar"
            onClick={() => {
              setEmail(props.account);
              setPassword(props.password);
            }}
          >
            {props.name}
          </h3>
          <div className="ml_email">
            <label className="m_login_label">帳號</label>
            <br />
            <input
              className="m_login_email"
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
            <Deliverlogin
              account={email}
              password={password}
              kind={props.kind}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MemberLogin;
