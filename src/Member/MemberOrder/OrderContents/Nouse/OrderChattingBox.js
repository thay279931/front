//聊天框 含輸入框
import { useEffect, useState } from 'react';
import ChatContentBox from './ChatContentBox';
import { useFunc } from '../../../Context/FunctionProvider';
const siteName = '35.221.208.241';
function OrderChattingBox({
  //開關聊天窗
  setOpenChat,
  //收到訊息的處理
  acceptedMessage,
  //選擇的訂單編號
  selectedOrder,
  //聊天伺服器
  orderSocket,
  //訂單現在階段
  step,
}) {
  const { loginCheckGetFetch } = useFunc();
  const sideList = [0, 2, 2, 3, 3];
  //input內容
  const [inputValue, setInputValue] = useState('');
  //外送員SID
  const [targetSid, setTargetSid] = useState(0);
  //傳送訊息
  const sendMessage = () => {
    const sendString = {
      deliveMsg: inputValue.trim(),
      receive_sid: targetSid,
      receive_side: sideList[step],
      orderSid: selectedOrder,
    };
    if (sendString.msg === '') {
      return;
    }
    orderSocket.send(JSON.stringify(sendString));
  };
  const getTargetSid = async () => {
    if (!selectedOrder) {
      return;
    }
    //依照送餐階段獲得不同目標SID
    if (step >= 3) {
      const res = await loginCheckGetFetch(
        `MemberMapDetails/GetDeliverSid?orderSid=${selectedOrder}`,
        'Member'
      );
      // console.log(res);
      setTargetSid(res);
    } else {
      const res = await loginCheckGetFetch(
        `MemberMapDetails/GetShopSid?orderSid=${selectedOrder}`,
        'Member'
      );
      // console.log(res);
      setTargetSid(res);
    }
  };
  useEffect(() => {
    getTargetSid();
  }, []);
  return (
    <>
      <div
        style={{
          background: `url(http://${siteName}:3001/images/chatroomBackground.jpg) center center / cover`,
          boxShadow: '0 4px 12px  rgba(0,0,0,0.08)',
        }}
        className="orderOnMapChattingBox"
      >
        <div className="disf fd-cr h100p ">
          {/* input */}
          <div className="h10p disf jc-se ai-c po-r ">
            <p
              className="pointer"
              onClick={() => {
                setOpenChat(false);
              }}
            >
              <i className="fa-solid fa-circle-xmark fs24"></i>
            </p>
            <input
              className="chattingRoomInput"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputValue !== '') {
                  sendMessage();
                  setInputValue('');
                }
              }}
            />
            <div
              className="chattingRoomButton"
              onClick={() => {
                sendMessage();
                setInputValue('');
              }}
            >
              傳送
            </div>
          </div>
          {/* 內容 */}
          <div className="orderOnMapChattingBoxContent">
            <ChatContentBox
              acceptedMessage={acceptedMessage}
              selectedOrder={selectedOrder}
              step={step}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderChattingBox;
