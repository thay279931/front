//聊天框 含輸入框  只跟會員通訊  店家不做
import { useEffect, useState } from 'react';
import { useFunc } from '../../../../Context/FunctionProvider';
import DeliverChatContentBox from './DeliverChatContentBox';
const siteName = '35.221.208.241';
function DeliverChatBox({
  //開關聊天窗
  setOpenChat,
  //收到訊息的處理
  acceptedMessage,
  //選擇的訂單編號
  selectedOrder = 1,
  //聊天伺服器
  orderSocket,
}) {
  const { loginCheckGetFetch } = useFunc();
  //input內容
  const [inputValue, setInputValue] = useState('');
  //對方SID
  const [targetSid, setTargetSid] = useState(0);
  //傳送訊息
  const sendMessage = () => {
    const sendString = {
      deliveMsg: inputValue.trim(),
      receive_sid: targetSid,
      receive_side: 1,
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
    const res = await loginCheckGetFetch(
      `deliving/GetOrderStep?orderSid=${selectedOrder}`,
      'Deliver'
    );
    console.log(res);
    setTargetSid(res.member_sid);
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
            <button
              onClick={() => {
                sendMessage();
                setInputValue('');
              }}
            >
              send
            </button>
          </div>
          {/* 內容 */}
          <div className="orderOnMapChattingBoxContent">
            <DeliverChatContentBox
              acceptedMessage={acceptedMessage}
              selectedOrder={selectedOrder}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default DeliverChatBox;
