//訂單 WS 第一層 有輸入框的頁面 不跟店家對話.
import { useEffect, useState } from 'react';
import ChatContent from './ChatContent';
const siteName = '35.221.208.241';
function OrderChat({
  socket, //WS
  orderSid, //訂單SID
  mySide, //自己是哪邊 1 / 3
  targetSid, //對方SID
  sideName, //自己是哪邊 Member   Deliver
  targetSide, //對方是哪邊 1 / 3
  setStyle,
}) {
  //輸入對話的內容
  const [inputContent, setInputContent] = useState('');
  //收到的新內容
  const [newContent, setNewContent] = useState({ newMsg: false, content: {} });
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
  function sendData() {
    console.log(targetSid);
    const sendString = {
      deliveMsg: inputContent.trim(),
      receive_sid: targetSid,
      receive_side: targetSide,
      orderSid: orderSid,
    };
    if (sendString.deliveMsg === '') {
      return;
    }
    socket.send(JSON.stringify(sendString));
  }
  return (
    <div
      className="w100p disf fd-c jc-sb"
      style={{
        background: `url(http://${siteName}:3001/images/chatroomBackground.jpg) center center / cover`,
        boxShadow:
          '0 0 0  currentColor, 0 6px 15px 1px rgba(29, 82, 106, 0.51)',
        border: '5px solid var(--mainColor)',
        borderRadius: '10px',
        ...setStyle,
      }}
    >
      <div className="orderChattingBox">
        <ChatContent
          newContent={newContent}
          setNewContent={setNewContent}
          targetSide={targetSide}
          orderSid={orderSid}
          mySide={mySide}
          targetSid={targetSid}
          sideName={sideName}
        />
      </div>
      <div>
        <div className=" padV15 padH5 notAdminChatInputFrame">
          <div className="flexSetCenter padH5 w80p">
            <input
              className="chattingRoomInput w100p"
              autoFocus
              value={inputContent}
              onChange={(e) => {
                setInputContent(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputContent !== '') {
                  // console.log('enter');
                  sendData();
                  setInputContent('');
                }
              }}
            />
          </div>

          <div
            className="chattingRoomButton w20p ta-c"
            onClick={() => {
              sendData();
              setInputContent('');
            }}
          >
            傳送
          </div>
        </div>
        {mySide === 3 ? (
          <div className="disf jc-se ta-c ai-c">
            <div className="w25p padH5 padV5 flexSetCenter">
              <p
                onClick={() => {
                  setInputContent('我已到達');
                }}
                className="chatQuickBtn"
              >
                已到達
              </p>
            </div>
            <div className="w25p padH5 padV5 flexSetCenter">
              <p
                onClick={() => {
                  setInputContent('請問詳細的位置在哪裡?');
                }}
                className="chatQuickBtn"
              >
                詢問位置
              </p>
            </div>
            <div className="w25p padH5 padV5 flexSetCenter">
              <p
                onClick={() => {
                  setInputContent('我已放在櫃檯');
                }}
                className="chatQuickBtn"
              >
                已放在櫃檯
              </p>
            </div>
            <div className="w25p padH5 padV5 flexSetCenter">
              <p
                onClick={() => {
                  setInputContent('我已送達');
                }}
                className="chatQuickBtn"
              >
                已送達
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {/* mySide */}
      {/* <div className="disf jc-se">
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </div> */}
    </div>
  );
}
export default OrderChat;
