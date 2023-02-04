import './favorite.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
const siteName = '35.221.208.241';
export default function StoreDatas() {
  const [user, setUser] = useState([]);
  const [user2, setUser2] = useState([]);
  const [myIndex, setMyIndex] = useState({});
  const [index, setIndex] = useState();

  const input = useRef(null);

  const get2 = async () => {
    const sid = localStorage.getItem('MemberSid');
    try {
      const response = await axios.get(
        `http://${siteName}:3001/MemberLogin/api4` //店家列表
      );

      // console.log(localStorage.getItem('MemberSid'));
      console.log(response.data);
      // setMyIndex(Array(response.data.length).fill(0));
      // setUser2(response.data);
      try {
        const response_favorite = await axios.get(
          `http://${siteName}:3001/MemberLogin/api3/${sid}` //最愛店家
        );

        console.log(response_favorite.data);
        setUser(response_favorite.data);
        // const arr = { ...response_favorite.data };
        const obj = {};
        response_favorite.data.forEach((el) => {
          obj[el.shop_sid] = true;
        });
        console.log(obj);
        //myIndex, setMyIndex
        let newIndex = { ...myIndex };
        response.data.forEach((element) => {
          if (obj[element.sid]) {
            newIndex = { ...newIndex, [element.sid]: true };
            element.favor = true;
            return;
          }
          newIndex = { ...newIndex, [element.sid]: false };
          element.favor = false;
        });
        setMyIndex(newIndex);
        setUser2(response.data);
        console.log(response.data);
      } catch (e) {
        console.error(e.message);
        return e.message;
      }
    } catch (e) {
      console.error(e.message);
    }
  };

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

  useEffect(() => {
    get2();
  }, []);

  const submit = async (shopSid) => {
    // e.preventDefault();
    // const fd = new FormData({ input });
    // console.log(fd);
    // const nextStatusIndex = myIndex[shopSid] === 0 ? 1 : 0;
    const nextIndex = !myIndex[shopSid] ? add(shopSid) : del(shopSid);
    // setMyIndex(nextStatusIndex);
    setIndex(nextIndex);
  };

  const display2 = user2.map((v, i) => {
    return (
      // <form className="col" key={v.sid} ref={input}>
      <div className="col" key={v.sid}>
        <img
          src={`http://${siteName}:3001/uploads/7d4c1912-ce4d-45af-b970-ccbbe57c4bac.jpg`}
        />
        <p className="font1">店名:{v.name}</p>
        <p className="font2">地址:{v.address}</p>
        <p className="font3">電話:{v.phone}</p>
        <button
          onClick={() => {
            submit(v.sid);
            const oldState = myIndex[v.sid];
            setMyIndex({ ...myIndex, [v.sid]: !oldState });
          }}
          className="icon"
        >
          {!myIndex[v.sid] ? <AiOutlineHeart /> : <AiFillHeart />}
        </button>

        <input name="shop_sid" value={v.sid} id="shop_sid" type="hidden" />
      </div>

      // </form>
    );
  });
  return (
    <>
      <div className="con">{display2}</div>
    </>
  );
}
