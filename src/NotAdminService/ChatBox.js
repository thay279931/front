//會員 WS 第二層 有輸入框的頁面 只對管理者發言
import { useEffect, useState } from 'react';
import ChatContent from './ChatContent';
const siteName = '35.221.208.241';
function ChatBox({ socket, sideName }) {
  const [inputContent, setInputContent] = useState('');
  const [newContent, setNewContent] = useState({ newMsg: false, content: {} });
  const sid = 101,
    side = 4;
  function receiveMessage(e) {
    // const datas = JSON.parse(e.data);
    setNewContent({ newMsg: true, content: e.data });
    // console.log(datas);
  }

  useEffect(() => {
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
    if (sendString.msg === '') {
      return;
    }
    socket.send(JSON.stringify(sendString));
  }
  return (
    <div
      className="w100p po-r"
      style={{
        background: `url(http://${siteName}:3001/images/chatroomBackground.jpg) center center / cover`,
        boxShadow: '0 4px 12px  rgba(0,0,0,0.08)',
        minHeight: '400px',
      }}
    >
      <div className="notAdminChattingBox">
        <ChatContent
          newContent={newContent}
          setNewContent={setNewContent}
          sideName={sideName}
        />
      </div>
      <div className=" padV15 notAdminChatInputFrame">
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
  );
}
export default ChatBox;
