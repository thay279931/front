//WS第二層 處理對話對象列表
import { useEffect, useMemo, useState } from 'react';
import './AdminService.css';
import AdminChooseChat from './AdminChooseChat';
import ChattingBox from './ChattingBox';
const siteName = '35.221.208.241';

function WScontent({ socket }) {
  const tokenString = localStorage.getItem('Admin');
  //姓名與時間資料
  const [nameList, setNameList] = useState([{}, {}, {}, {}, {}]);
  //是否已經開啟對話視窗
  const [chatting, setChatting] = useState(false);
  //對話對象是誰
  const [chattingPerson, setChattingPerson] = useState({
    side: 0,
    sid: 0,
  });

  function getData() {
    fetch(`http://${siteName}:3001/AdminService`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokenString,
      },
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
        setNameList(res);
      });
  }

  // useMemo(() => {
  //   getData();
  // }, []);
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {/*   setChattingPerson setChatting */}
      <div className="chooseChattingPersonPlate">
        {Object.keys(nameList[1]).length ? (
          <AdminChooseChat
            datas={nameList[1]}
            sideName={'會員'}
            side={1}
            setChatting={setChatting}
            setChattingPerson={setChattingPerson}
          />
        ) : (
          <></>
        )}
        {Object.keys(nameList[2]).length ? (
          <AdminChooseChat
            datas={nameList[2]}
            sideName={'店家'}
            side={2}
            setChatting={setChatting}
            setChattingPerson={setChattingPerson}
          />
        ) : (
          <></>
        )}
        {Object.keys(nameList[3]).length ? (
          <AdminChooseChat
            datas={nameList[3]}
            sideName={'外送員'}
            side={3}
            setChatting={setChatting}
            setChattingPerson={setChattingPerson}
          />
        ) : (
          <></>
        )}
      </div>
      {chatting ? (
        <ChattingBox
          setChattingPerson={setChattingPerson}
          setChatting={setChatting}
          chattingPerson={chattingPerson}
          socket={socket}
        />
      ) : (
        <></>
      )}
    </>
  );
}
export default WScontent;
