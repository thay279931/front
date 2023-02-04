//WS 第四層 有輸入框的頁面
import { useEffect, useState } from 'react';
import ChatContent from './ChatContent';
const siteName = '35.221.208.241';
function ChattingBox({
  setChattingPerson,
  setChatting,
  chattingPerson,
  socket,
}) {
  const [inputContent, setInputContent] = useState('');
  const [newContent, setNewContent] = useState({ newMsg: false, content: {} });
  const { sid, side } = chattingPerson;

  //回傳的資料
  //let sendData = { "msg": content, "name": map.get(ws).name, "post_side": postSide, "post_sid": postSid, "receive_side": receiveSide, "receive_sid": receiveSid, "time": timeNow /*[,"read",true已讀]*/};

  /*{
    "msg": "1",
    "name": "管理者",
    "post_side": 4,
    "post_sid": 101,
    "receive_side": 1,
    "receive_sid": 5,
    "time": "2022-11-09 22:00:50",
    "self": true
  }*/

  function receiveMessage(e) {
    const datas = JSON.parse(e.data);
    setNewContent({ newMsg: true, content: e.data });
    console.log(datas);
  }

  useEffect(() => {
    // this.scrollIntoView({ behavior: 'auto' });
    socket.addEventListener('message', receiveMessage);
    console.log('openListener');
    return () => {
      socket.removeEventListener('message', receiveMessage);
      console.log('closeListener');
    };
  }, []);

  function sendData(text, side, sid) {
    const sendString = {
      msg: text.trim(),
      receive_sid: sid,
      receive_side: side,
    };
    socket.send(JSON.stringify(sendString));
  }
  return (
    <>
      <div
        className="chattingBox"
        style={{
          background: `url(http://${siteName}:3001/images/chatroomBackground.jpg) center center / cover`,
          boxShadow: '0 4px 12px  rgba(0,0,0,0.08)',
        }}
      >
        <ChatContent
          chattingPerson={chattingPerson}
          newContent={newContent}
          setNewContent={setNewContent}
        />
        <div className="chatInputFrame ai-c">
          <div
            className="pointer"
            onClick={() => {
              setChatting(false);
            }}
          >
            <i className="fa-solid fa-circle-xmark fs24"></i>
          </div>
          <input
            className="chattingRoomInput"
            autoFocus
            value={inputContent}
            onChange={(e) => {
              setInputContent(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputContent !== '') {
                // console.log('enter');
                sendData(inputContent, side, sid);
                setInputContent('');
              }
            }}
          />
          <div
            className="chattingRoomButton"
            onClick={() => {
              sendData(inputContent, side, sid);
              setInputContent('');
            }}
          >
            傳送
          </div>
        </div>
      </div>
      <div
        className="grayBack"
        onClick={() => {
          setChatting(false);
        }}
      ></div>
    </>
  );
}
export default ChattingBox;
