import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './memberdatas.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function MemberDatas() {
  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState(null);
  // 是否有檔案被挑選
  const [isFilePicked, setIsFilePicked] = useState(false);
  // 預覽圖片
  const [preview, setPreview] = useState('');
  // server上的圖片網址
  const [imgServerUrl, setImgServerUrl] = useState('');

  const siteName = '35.221.208.241';
  const [user, setUser] = useState({
    email: '',
    password: '',
    doublepassword: '',
    name: '',
    phone: '',
    image: '',
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

  const [passwordFieldType, setPasswordFieldType] = useState('password');
  const [passwordFieldType2, setPasswordFieldType2] = useState('password');
  const [change, setChange] = useState(0);

  const handleFieldChange = (e) => {
    //console.log(e.target.type, e.target.name, e.target.value)

    // computed property name
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
    const newUser = { ...user, [e.target.name]: e.target.value };
    setUser(newUser);
  };
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
  const getform = async () => {
    const sid = localStorage.getItem('MemberSid');
    if (!sid) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入會員',
      });
      navigate('/MemberLogin');
    }
    try {
      const response = await axios.get(`
        http://${siteName}:3001/MemberLogin/api2/${sid}
        `);

      console.log(localStorage.getItem('MemberSid'));
      console.log(response.data[0]);
      setUser(response.data[0]);
      const image = response.data[0].image;
      console.log(image);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getform();
  }, [change]);

  useEffect(() => {
    // getform();
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
  const handleFormSubmit = async (e) => {
    // 阻擋預設form送出的行為
    e.preventDefault();
    // if (user.password === user.doublepassword) {
    const sid = localStorage.getItem('MemberSid');
    // if (user.password === user.doublepassword) {
    // const formData = new FormData();
    const fd = new FormData(e.target);
    console.log(fd);
    // return
    // 對照server上的檔案名稱 req.files.avatar
    //fd.append('avatar', selectedFile);
    await axios
      .put(`http://${siteName}:3001/MemberLogin/edit/${sid}`, fd)
      .then((result) => {
        console.log(result);
        e.preventDefault();

        Swal.fire({
          icon: 'success',
          title: '修改成功',
        });
        setChange((v) => v + 1);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
        // navigate('/');
      })
      .catch((e) => {
        if (
          e.response.data.code === 'ER_DUP_ENTRY' &&
          e.response.data.message.indexOf('phone') !== -1
        ) {
          Swal.fire({
            icon: 'warning',
            title: '修改失敗！此手機已存在，請嘗試新的手機！',
          });
        }
        console.log(e);
        console.log(e.response);
        e.preventDefault();
        // console.log(e.response.request.responseText);
        Swal.fire('修改失敗!');
      });
    // } else if (user.password !== user.doublepassword) {
    //   e.preventDefault();
    //   Swal.fire({ icon: 'warning', title: '兩次密碼輸入不一致!' });
    // }
  };

  const display = (
    <div className="mb_container">
      <form
        className="mb_form"
        name="avatar"
        onSubmit={handleFormSubmit}
        onInvalid={handleFormInvalid}
        onChange={handleFormChange}
      >
        {/* <div className="mb_imgbox">
          大頭貼:
          <img
            className="mb_img"
            src={` http://${siteName}:3001/uploads/${user.image}`}
            alt=""
          />
        </div> */}
        <div className="mb_mar">
          <input
            hidden
            id="mb_in"
            className="mb_input_img"
            type="file"
            name="avatar"
            onChange={changeHandler}
          />
          {selectedFile !== null ? (
            <div className="mb_imgbox">
              大頭貼:
              <label for="mb_in">
                <img className="mb_img" src={preview} alt="" />
              </label>
            </div>
          ) : (
            <div className="mb_imgbox">
              大頭貼:
              <label for="mb_in">
                <img
                  className="mb_img"
                  src={` http://${siteName}:3001/uploads/${user.image}`}
                  alt=""
                />
              </label>
            </div>
          )}
        </div>

        <div className="mb_mar">
          <label className="mb_label">帳號:{user.email}</label>
        </div>
        {/* <label className="mb_label">密碼</label>
        <div className="mb_mar">
          <input
            className="mb_password"
            type={passwordFieldType}
            name="password"
            value={user.password}
            onChange={handleFieldChange}
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
          />

          <button
            className="mb_icon_button"
            type="button"
            onClick={() => {
              setPasswordFieldType(
                passwordFieldType === 'text' ? 'password' : 'text'
              );
            }}
          >
            {passwordFieldType === 'text' ? (
              <FaRegEyeSlash className="mb_icon" />
            ) : (
              <FaRegEye className="mb_icon" />
            )}
          </button>
          <span className="mb_span">{fieldErrors.password}</span>
        </div>
        <label className="mb_label">再次輸入密碼</label>
        <div className="mb_mar">
          <input
            className="m_doublepassword"
            type={passwordFieldType2}
            name="doublepassword"
            value={user.doublepassword}
            onChange={handleFieldChange}
            required
            // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
          />

          <button
            className="mb_icon_button"
            type="button"
            onClick={() => {
              setPasswordFieldType2(
                passwordFieldType2 === 'text' ? 'password' : 'text'
              );
            }}
          >
            {passwordFieldType2 === 'text' ? (
              <FaRegEyeSlash className="mb_icon2" />
            ) : (
              <FaRegEye className="mb_icon2" />
            )}
          </button>
          <span className="mb_span">{fieldErrors.doublepassword}</span>
        </div> */}
        <label className="mb_label">名子</label>
        <div className="mb_mar">
          <input
            className="mb_input"
            type="text"
            name="name"
            value={user.name}
            onChange={handleFieldChange}
            required
          />
          <span className="mb_span">{fieldErrors.name}</span>
        </div>
        <label className="mb_label">手機</label>
        <div className="mb_mar">
          <input
            className="mb_input"
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleFieldChange}
            required
            pattern="09\d{2}\d{6}"
          />
          <span className="mb_span">{fieldErrors.phone}</span>
        </div>
        <button className="mb_button" type="submit">
          送出
        </button>
        <Link to={'/Member/MemberLocation'}>
          <button
            type="button"
            className="mb_clear"
            // onClick={() => {
            //   setUser({
            //     email: '',
            //     password: '',
            //     doublepassword: '',
            //     name: '',
            //     phone: '',
            //   });
            // }}
          >
            修改密碼
          </button>
        </Link>
      </form>
      {/* <button
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
          修改密碼
        </button> */}
    </div>
  );
  return (
    <>
      {/* <button onClick={getform}>按鈕</button> */}
      {display}
    </>
  );
}
export default MemberDatas;
