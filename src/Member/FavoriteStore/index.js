import './favorite.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
// import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Link } from 'react-router-dom';
export default function FavoriteStore() {
  const [user, setUser] = useState([]);
  const [user2, setUser2] = useState([]);
  const [myIndex, setMyIndex] = useState({});
  // const [index, setIndex] = useState();
  const [errormsg, setErrorMsg] = useState('');
  const [change, setChange] = useState(1);
  const [user3, setUser3] = useState([]);
  const siteName = '35.221.208.241';
  const navigate = useNavigate();
  const forms = useRef(null);
  // 輸入用(可控表單元件用)
  const [inputKeyword, setInputKeyword] = useState('');
  // 按下搜尋按鈕用，真正搜尋用

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
      const response = await axios.get(
        `http://${siteName}:3001/MemberLogin/api3/${sid}`
      );

      // console.log(localStorage.getItem('MemberSid'));
      // console.log(response.data);
      // console.log(response.data[0].name);
      // setUser(response.data[0]);
      // const image = response.data[0].image;
      // console.log(image);
      setUser(response.data);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e.message);
      return e.message;
    }
  };

  // const get = async () => {
  //   const sid = localStorage.getItem('MemberSid');
  //   try {
  //     const response = await axios.get(
  //       `http://${siteName}:3001/MemberLogin/api2/${sid}`
  //     );

  //     console.log(localStorage.getItem('MemberSid'));
  //     console.log(response.data[0]);
  //     // setUser2(response.data[0]);
  //     // const image = response.data[0].image;
  //     // console.log(image);
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // };

  // const get2 = async () => {
  //   const sid = localStorage.getItem('MemberSid');
  //   try {
  //     const response = await axios.get(
  //       `http://${siteName}:3001/MemberLogin/api4` //店家列表
  //     );

  //     // console.log(localStorage.getItem('MemberSid'));
  //     console.log(response.data);
  //     // setMyIndex(Array(response.data.length).fill(0));
  //     // setUser2(response.data);
  //     try {
  //       const response_favorite = await axios.get(
  //         `http://${siteName}:3001/MemberLogin/api3/${sid}` //最愛店家
  //       );

  //       console.log(response_favorite.data);
  //       setUser(response_favorite.data);
  //       // const arr = { ...response_favorite.data };
  //       const obj = {};
  //       response_favorite.data.forEach((el) => {
  //         obj[el.shop_sid] = true;
  //       });
  //       console.log(obj);
  //       //myIndex, setMyIndex
  //       let newIndex = { ...myIndex };
  //       response.data.forEach((element) => {
  //         if (obj[element.sid]) {
  //           newIndex = { ...newIndex, [element.sid]: true };
  //           // element.favor = true;
  //           return;
  //         }
  //         newIndex = { ...newIndex, [element.sid]: false };
  //         // element.favor = false;
  //       });
  //       setMyIndex(newIndex);
  //       setUser2(response.data);
  //       console.log(response.data);
  //     } catch (e) {
  //       console.error(e.message);
  //       return e.message;
  //     }
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // };

  const add = async (shopSid) => {
    const sid = localStorage.getItem('MemberSid');
    // const fd = new FormData({ input });

    try {
      const response = await axios.post(
        `http://${siteName}:3001/MemberLogin/addshop/${sid}/${shopSid}`
      );
      console.log(response.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  const del = async (shopSid) => {
    const sid = localStorage.getItem('MemberSid');

    try {
      const response = await axios.delete(
        `http://${siteName}:3001/MemberLogin/del/${sid}/${shopSid}`
      );
      console.log(response.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  const del2 = async (a, shopSid) => {
    a.preventDefault();
    // console.log(forms.current.value);
    const sid = localStorage.getItem('MemberSid');
    let FD = JSON.stringify({
      shop: shopSid,
    });
    try {
      await fetch(`http://${siteName}:3001/MemberLogin/del2/${sid}`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: FD,
      })
        .then((r) => r.json())
        .then((res) => {
          // e.preventDefault();

          console.log(res);
          setChange((v) => v + 1);
          // Swal.fire('刪除成功');
        });
    } catch (e) {
      Swal.fire('刪除失敗');
      console.error(e.message);
    }
  };

  useEffect(() => {
    getform();
    // setChange((v) => v + 2);
  }, [inputKeyword, change]);

  useEffect(() => {
    let b = user.filter((v, i) => v.name.includes(inputKeyword));
    setUser3(b);
  }, [user]);

  const submit = async (shopSid) => {
    // e.preventDefault();
    // const fd = new FormData({ input });
    // console.log(fd);
    // const nextStatusIndex = myIndex[shopSid] === 0 ? 1 : 0;
    const nextIndex = !myIndex[shopSid] ? add(shopSid) : del(shopSid);
    // setMyIndex(nextStatusIndex);
    // setIndex(nextIndex);
  };

  // const myClick = () => {
  //   const nextStatusIndex = myIndex === 0 ? 1 : 0;
  //   // const nextIndex = myIndex === 0 ? add() : del();
  //   setMyIndex(nextStatusIndex);
  //   // setIndex(nextIndex);
  // };
  const display = user3.map((v, i) => {
    return (
      <div className="mf_col" key={v.sid}>
        <div className="mf_card">
          <form
            key={v.sid}
            onSubmit={(e) => {
              del2(e, v.shop_sid);
            }}
          >
            <Link to={'/productList/?shop_sid=' + v.shop_sid}>
              <div className="mf_imgbox">
                <img
                  className="mf_img"
                  src={`http://${siteName}:3001/images/shop/${v.src}`}
                />
              </div>
            </Link>
            <h3 className="mf_font1">{v.name}</h3>
            <p className="mf_font2">地址:{v.address}</p>
            <p className="mf_font3">電話:{v.phone}</p>
            <input
              name="shop_sid"
              value={v.shop_sid}
              type="hidden"
              ref={forms}
            />
            <button type="submit">
              <TiDelete className="mf_icon" />
            </button>
          </form>
        </div>
      </div>
    );
  });

  // const display2 = user2.map((v, i) => {
  //   return (
  //     // <form className="col" key={v.sid} ref={input}>
  //     <div className="col" key={v.sid}>
  //       <img
  //         src={
  //           'http://${siteName}:3001/uploads/d4801ba2-34a5-4709-a128-d2002ec355c6.jpg'
  //         }
  //       />
  //       <p className="font1">店名:{v.name}</p>
  //       <p className="font2">地址:{v.address}</p>
  //       <p className="font3">電話:{v.phone}</p>
  //       <button
  //         // onClick={() => {
  //         //   submit(i);
  //         //   const a = [...myIndex];
  //         //   if (a[i] === 0) {
  //         //     a[i] = 1;
  //         //     setMyIndex(a);
  //         //   } else {
  //         //     a[i] = 0;
  //         //     setMyIndex(a);
  //         //   }
  //         // }}
  //         onClick={() => {
  //           submit(v.sid);
  //           const oldState = myIndex[v.sid];
  //           setMyIndex({ ...myIndex, [v.sid]: !oldState });
  //         }}
  //         className="icon"
  //       >
  //         {/* {myIndex[i] === 0 ? <AiOutlineHeart /> : <AiFillHeart />} */}
  //         {!myIndex[v.sid] ? <AiOutlineHeart /> : <AiFillHeart />}
  //       </button>

  //       <input name="shop_sid" value={v.sid} id="shop_sid" type="hidden" />
  //     </div>

  //     // </form>
  //   );
  // });
  return (
    <>
      {/* <button
        onClick={() => {
          const nextStatusIndex = myIndex === 0 ? 1 : 0;
          const nextIndex = myIndex === 0 ? add() : del();
          setMyIndex(nextStatusIndex);
          setIndex(nextIndex);
        }}
      >
        {myIndex === 0 ? <AiOutlineHeart /> : <AiFillHeart />}
      </button> */}
      {/* <div className="con">{display2}</div> */}
      {/* <h2 className="mf_h2">最愛店家</h2> */}

      <div className="mf_search">
        <input
          className="mf_search_input"
          type="text"
          value={inputKeyword}
          onChange={(e) => {
            setInputKeyword(e.target.value);
          }}
          // onKeyPress={() => {
          //   if (!inputKeyword) {
          //     const a = user;
          //     console.log(a);
          //     getform();
          //   } else {
          //     const b = user.filter((v, i) => v.name.includes(inputKeyword));
          //     setUser(b);
          //     console.log(123, user);
          //   }
          // }}
        />
        <button
          className="mf_search_button"
          // onClick={async () => {
          //   // setSearchKeyWord(inputKeyword);
          //   if (!inputKeyword) {
          //     const a = user;
          //     console.log(a);
          //     getform();
          //   } else {
          //     const b = user.filter((v, i) => v.name.includes(inputKeyword));
          //     console.log(b);
          //     setUser(b);
          //   }
          // }}
        >
          <AiOutlineSearch className="mf_search_icon" />
        </button>
      </div>
      <br />
      <div className="mf_wrap">{display}</div>
      <div className="mf_errorfont">
        {user3.length > 0 ? errormsg : '沒有此店家'}
      </div>
    </>
  );
}
