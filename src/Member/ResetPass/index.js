import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
export default function ResetPass() {
  const [passwordFieldType2, setPasswordFieldType2] = useState('password');
  const [passwordFieldType3, setPasswordFieldType3] = useState('password');
  const resetForm = useRef(null);
  const navigate = useNavigate();
  const siteName = '35.221.208.241';
  const [user, setUser] = useState({
    original: '',
    password: '',
    doublepassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    original: '',
    password: '',
    doublepassword: '',
  });
  const handleFieldChange = (e) => {
    //console.log(e.target.type, e.target.name, e.target.value)

    // computed property name
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
    const newUser = { ...user, [e.target.name]: e.target.value };
    setUser(newUser);
  };
  // const handleFormSubmit = async (e) => {
  //   // 阻擋預設form送出的行為
  //   e.preventDefault();
  //   if (user.password === user.doublepassword) {
  //     // if (user.password === user.doublepassword) {
  //     // const formData = new FormData();
  //     const fd = new FormData(e.target);
  //     console.log(fd);
  //     // return
  //     // 對照server上的檔案名稱 req.files.avatar
  //     //fd.append('avatar', selectedFile);

  //     const response = await axios.put(
  //       `http://${siteName}:3001/MemberLogin/edit2/${sid}`,
  //       fd
  //     );
  //     console.log(response.data);
  //     if (response.data === 1) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: '修改成功',
  //       });
  //       navigate('/Member');
  //     } else {
  //       Swal.fire('修改失敗');
  //     }
  //   } else if (user.password !== user.doublepassword) {
  //     e.preventDefault();
  //     Swal.fire({ icon: 'warning', title: '兩次密碼輸入不一致!' });
  //   }
  // };
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

  const updateNewPass = async (e) => {
    e.preventDefault();
    if (user.password === user.doublepassword) {
      const formData = new FormData(resetForm.current);
      const usp = new URLSearchParams(window.location.search);

      const token = usp.get('token');
      const mid = usp.get('mid');

      // return alert(
      //   `token: ${token} | mid: ${mid} | new password: ${formData.get('newPass')}`
      // )

      const result = await axios.post(
        `http://localhost:3001/MemberLogin/resetPass/api?token=${token}&mid=${mid}`,
        formData
      );
      if (
        result.data &&
        result.data.message === '密碼重置成功' &&
        result.data.token
      ) {
        Swal.fire({
          icon: 'success',
          title: result.data.message,
          confirmButtonColor: '#216326',
          scrollbarPadding: false,
        });
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: result.data.message,
          confirmButtonColor: '#216326',
          scrollbarPadding: false,
        });
      }
    } else {
      Swal.fire({ icon: 'warning', title: '兩次密碼輸入不一致!' });
    }
  };

  return (
    <>
      <div className="mp_container">
        <h2 className="mp_h2">重設密碼</h2>
        <br />
        <form
          className="mp_form"
          ref={resetForm}
          onSubmit={updateNewPass}
          onInvalid={handleFormInvalid}
          onChange={handleFormChange}
        >
          <label className="mp_label">重設密碼</label>
          <div className="mp_mar">
            <input
              type={passwordFieldType2}
              className="mp_password"
              name="password"
              value={user.password}
              onChange={handleFieldChange}
              placeholder="請輸入重設密碼"
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
            />
            <button
              className="mp_icon_button"
              type="button"
              onClick={() => {
                setPasswordFieldType2(
                  passwordFieldType2 === 'text' ? 'password' : 'text'
                );
              }}
            >
              {passwordFieldType2 === 'text' ? (
                <FaRegEyeSlash className="mp_icon" />
              ) : (
                <FaRegEye className="mp_icon" />
              )}
            </button>
            <span className="mp_span">{fieldErrors.password}</span>
          </div>
          <label className="mp_label">再次輸入重設密碼</label>
          <div className="mp_mar">
            <input
              type={passwordFieldType3}
              className="mp_password"
              name="doublepassword"
              value={user.doublepassword}
              onChange={handleFieldChange}
              placeholder="請再次輸入重設密碼"
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
            />
            <button
              className="mp_icon_button"
              type="button"
              onClick={() => {
                setPasswordFieldType3(
                  passwordFieldType3 === 'text' ? 'password' : 'text'
                );
              }}
            >
              {passwordFieldType3 === 'text' ? (
                <FaRegEyeSlash className="mp_icon" />
              ) : (
                <FaRegEye className="mp_icon" />
              )}
            </button>
            <span className="mp_span">{fieldErrors.doublepassword}</span>
          </div>
          <button type="submit" className="mp_button">
            送出
          </button>
          <button
            type="button"
            className="mp_clear"
            onClick={(e) => {
              e.preventDefault();
              setUser({
                original: '',
                password: '',
                doublepassword: '',
              });
            }}
          >
            清除
          </button>
        </form>
      </div>
    </>
  );
}
