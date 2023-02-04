//地圖上聊天按鈕  訂單SOCKET監聽器在這裡
import { useEffect, useState } from 'react';
import { useSVG } from '../../../Context/SVGProvider';
import Swal from 'sweetalert2';
import OrderChat from '../../../OrderChat';
import { useNavigate } from 'react-router-dom';
const alertMessages = [
  '',
  '',
  '店家已接單',
  '店家已完成',
  '外送員已取餐',
  '外送員已送達',
];
function ChatOnOrderMap({ setStep, selectedOrder, step, orderSocket }) {
  const navi = useNavigate();
  const { chatSVG } = useSVG();
  //開啟聊天室
  const [openChat, setOpenChat] = useState(false);
  //聊天傳遞
  const [acceptedMessage, setAcceptedMessage] = useState({});
  //接單傳遞
  const [acceptedStepMessage, setAcceptedStepMessage] = useState({});
  //接到新訊息時要讓按鈕亮起來
  const [newMSG, setNewMSG] = useState(false);

  useEffect(() => {
    if (
      acceptedStepMessage.step &&
      selectedOrder === acceptedStepMessage.orderSid &&
      acceptedStepMessage.step !== 5
    ) {
      // console.log(123);
      Swal.fire(alertMessages[acceptedStepMessage.step]);
      setStep(acceptedStepMessage.step);
    } else if (
      acceptedStepMessage.step === 5 &&
      selectedOrder === acceptedStepMessage.orderSid
    ) {
      Swal.fire(alertMessages[acceptedStepMessage.step]).then(() => {
        navi('/Member/MemberOldOrder');
      });
    }
  }, [acceptedStepMessage, selectedOrder]);
  useEffect(() => {
    setAcceptedStepMessage({});
  }, [selectedOrder]);

  useEffect(() => {
    function receiveMessage(e) {
      const datas = JSON.parse(e.data);
      // console.log('訊息');
      console.log(datas);
      /**{
        "receiveSide": 1,
        "receiveSid": 1,
        "step": 3,
        "orderSid": 172
    } */
      //確認店家、外送員 是否有動作
      // 2製作中 3已完成 4運送中
      if (datas.step) {
        console.log('step');
        setAcceptedStepMessage(datas);
      } else if (!datas.self && !openChat && !datas.position) {
        //新訊息提醒
        setNewMSG(true);
        // setAcceptedMessage(datas);
      }
      /*    const input = JSON.parse(newContent.content);
      if (!input.position) {
        console.log(newContent.content);
        setContents([input, ...contents]);
        setNewContent({ newMsg: false, content: {} });
      } */
    }

    orderSocket.addEventListener('message', receiveMessage);
    console.log('openListener');
    return () => {
      orderSocket.removeEventListener('message', receiveMessage);
      console.log('closeListener');
    };
  }, []);
  useEffect(() => {
    if (openChat) {
      setNewMSG(false);
    }
  }, [openChat, newMSG]);
  return (
    <>
      {/* TODO: 要改內容  階段4以前沒有聊天按鈕 或是直接放著不管?*/}
      <div
        onClick={() => {
          setOpenChat((v) => !v);
        }}
        className={`orderChatButton`}
      >
        <div className={`orderChatButtonSVGFrame ${newMSG ? 'active' : ''}`}>
          {chatSVG('strokeMainColor h30 w100p')}
        </div>
      </div>
      {openChat ? (
        <div className="orderOnMapChattingBox">
          <OrderChat
            // TODO 這裡暫時先這樣 之後有時間再改成正式版本
            socket={orderSocket}
            // selectedOrder
            orderSid={1}
            // orderSid={selectedOrder}
            mySide={1}
            //targetSid
            targetSid={1}
            sideName={'Member'}
            targetSide={3}
            setStyle={{ height: '400px' }}
          />
        </div>
      ) : null}
      {/* // <OrderChattingBox
      //   setOpenChat={setOpenChat}
      //   acceptedMessage={acceptedMessage}
      //   selectedOrder={selectedOrder}
      //   orderSocket={orderSocket}
      //   step={step}
      // /> */}
    </>
  );
}
export default ChatOnOrderMap;
