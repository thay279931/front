import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
function MemberRegister() {
  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState(null);
  // 是否有檔案被挑選
  const [isFilePicked, setIsFilePicked] = useState(false);
  // 預覽圖片
  const [preview, setPreview] = useState('');
  // server上的圖片網址
  const [imgServerUrl, setImgServerUrl] = useState('');

  const forms = useRef(null);
  const siteName = '35.221.208.241';
  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!selectedFile) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    console.log(objectUrl);
    setPreview(objectUrl);

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const changeHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      setIsFilePicked(true);
      setSelectedFile(file);
      setImgServerUrl('');
    } else {
      setIsFilePicked(false);
      setSelectedFile(null);
      setImgServerUrl('');
    }
  };

  const handleSubmission = () => {
    const formData = new FormData();

    // 對照server上的檔案名稱 req.files.avatar
    formData.append('avatar', selectedFile);

    fetch(
      `http://${siteName}:3001/upload-avatar`, //server url
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        setImgServerUrl(`http://${siteName}:3001/uploads/` + result.data.name);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const [user, setUser] = useState({
    email: '',
    password: '',
    doublepassword: '',
    name: '',
    phone: '',
  });
  // 記錄欄位有錯誤時的訊息
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    doublepassword: '',
    name: '',
    phone: '',
  });

  const navigate = useNavigate();

  // true = 呈現密碼 / false = 隱藏密碼

  const [passwordFieldType, setPasswordFieldType] = useState('password');
  const [passwordFieldType2, setPasswordFieldType2] = useState('password');

  const handleFieldChange = (e) => {
    //console.log(e.target.type, e.target.name, e.target.value)

    // computed property name
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
    const newUser = { ...user, [e.target.name]: e.target.value };
    setUser(newUser);
  };

  const handleFormSubmit = async (e) => {
    // 阻擋預設form送出的行為
    e.preventDefault();

    if (user.password === user.doublepassword) {
      // const formData = new FormData();
      const fd = new FormData(e.target);
      console.log(fd);
      console.log(e.target);
      // return
      // 對照server上的檔案名稱 req.files.avatar
      //fd.append('avatar', selectedFile);
      await axios
        .post(`http://${siteName}:3001/MemberLogin/add`, fd)
        .then((result) => {
          console.log(result);
          Swal.fire({
            icon: 'success',
            title: '註冊成功',
          });
          navigate('/MemberLogin');
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
          if (
            e.response.data.code === 'ER_DUP_ENTRY' &&
            e.response.data.message.indexOf('email') !== -1 &&
            e.response.data.message.indexOf('phone') !== -1
          ) {
            Swal.fire({
              icon: 'warning',
              title: '註冊失敗！此帳號跟手機已存在，請嘗試新的帳號跟手機！',
            });
          }
          if (
            e.response.data.code === 'ER_DUP_ENTRY' &&
            e.response.data.message.indexOf('phone') !== -1
          ) {
            Swal.fire({
              icon: 'warning',
              title: '註冊失敗！此手機已存在，請嘗試新的手機！',
            });
          } else if (
            e.response.data.code === 'ER_DUP_ENTRY' &&
            e.response.data.message.indexOf('email') !== -1
          ) {
            Swal.fire({
              icon: 'warning',
              title: '註冊失敗！此帳號已存在，請嘗試新的帳號！',
            });
          } else {
            // console.log(e.response.request.responseText);
            Swal.fire({
              icon: 'error',
              title: '註冊失敗!',
            });
          }
        });
    } else {
      Swal.fire({ icon: 'warning', title: '兩次密碼輸入不一致!' });
    }
  };
  // 得到輸入值的方式
  // 第1種，從state直接得到

  // 第2種，用FormData物件

  // 其它驗証…修改

  // 送到伺服器

  // 當表單有不合法的驗証出現時會觸發
  const handleFormInvalid = (e) => {
    // 阻擋預設行為 - 關閉泡泡訊息
    e.preventDefault();

    console.log(e.target.name, e.target.validationMessage);

    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    });
  };

  const handleFormChange = (e) => {
    //要把目前正在修改的欄位的錯誤訊息先清空
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: '',
    });
  };

  return (
    <>
      <div className="m_iner">
        <form
          className="m_form"
          name="avatar"
          onSubmit={handleFormSubmit}
          onInvalid={handleFormInvalid}
          onChange={handleFormChange}
        >
          <input
            className="m_input_img"
            type="file"
            name="avatar"
            onChange={changeHandler}
          />
          {selectedFile && (
            <div className="m_mar">
              預覽圖片:
              <img className="m_img" src={preview} alt="" />
            </div>
          )}
          <br />
          <label
            className="m_label"
            onClick={(e) => {
              e.preventDefault();
              setUser({
                email: 'abc1234@gmail.com',
                password: 'Aa123456789',
                doublepassword: 'Aa123456789',
                name: '王大明',
                phone: '0912345678',
              });
            }}
          >
            帳號(Email)
          </label>
          <div className="m_mar">
            <input
              className="m_email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleFieldChange}
              placeholder="請輸入帳號(Email)"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            <span className="m_span">{fieldErrors.email}</span>
          </div>
          <label className="m_label">密碼</label>
          <div className="m_mar">
            <input
              type={passwordFieldType}
              className="m_password"
              name="password"
              value={user.password}
              onChange={handleFieldChange}
              placeholder="請輸入密碼"
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
            />
            <button
              className="m_icon_button"
              type="button"
              onClick={() => {
                setPasswordFieldType(
                  passwordFieldType === 'text' ? 'password' : 'text'
                );
              }}
            >
              {passwordFieldType === 'text' ? (
                <FaRegEyeSlash className="m_icon" />
              ) : (
                <FaRegEye className="m_icon" />
              )}
            </button>
            <span className="m_span">{fieldErrors.password}</span>
          </div>
          <label className="m_label">再次輸入密碼</label>
          <div className="m_mar">
            <input
              type={passwordFieldType2}
              name="doublepassword"
              className="mb_doublepassword"
              value={user.doublepassword}
              placeholder="再次輸入密碼"
              onChange={handleFieldChange}
              required
              // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{9,}$"
            />
            <button
              className="m_icon_button"
              type="button"
              onClick={() => {
                setPasswordFieldType2(
                  passwordFieldType2 === 'text' ? 'password' : 'text'
                );
              }}
            >
              {passwordFieldType2 === 'text' ? (
                <FaRegEyeSlash className="m_icon2" />
              ) : (
                <FaRegEye className="m_icon2" />
              )}
            </button>
            <span className="m_span">{fieldErrors.doublepassword}</span>
          </div>
          <label className="m_label">名子</label>
          <div className="m_mar">
            <input
              type="text"
              name="name"
              className="m_name"
              value={user.name}
              placeholder="請輸入名子"
              onChange={handleFieldChange}
              required
            />
            <span className="m_span">{fieldErrors.name}</span>
          </div>
          <label className="m_label">手機</label>
          <div className="m_mar">
            <input
              type="text"
              name="phone"
              className="m_phone"
              value={user.phone}
              placeholder="請輸入手機"
              onChange={handleFieldChange}
              required
              pattern="09\d{2}\d{6}"
            />
            <span className="m_span">{fieldErrors.phone}</span>
          </div>

          <button type="submit" className="m_sb">
            註冊
          </button>
          <button
            type="button"
            className="m_clear"
            onClick={() => {
              setUser({
                email: '',
                password: '',
                doublepassword: '',
                name: '',
                phone: '',
              });
            }}
          >
            清空
          </button>
        </form>
      </div>
    </>
  );
}
export default MemberRegister;
