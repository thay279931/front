//外送員地圖上聊天按鈕
import { useEffect, useState } from 'react';
import { useSVG } from '../../../Context/SVGProvider';
// import DeliverChatBox from './DeliverChatBox';
import OrderChat from '../../../OrderChat';
function DeliverChat({ selectedOrder = 1, step, orderSocket }) {
  const { chatSVG } = useSVG();
  const [openChat, setOpenChat] = useState(false);
  //接到新訊息時要讓按鈕亮起來
  const [newMSG, setNewMSG] = useState(false);

  useEffect(() => {
    function receiveMessage(e) {
      const datas = JSON.parse(e.data);
      // console.log('聊天室訊息');
      // console.log(datas);
      if (!datas.self && !openChat) {
        console.log('有訊息');
        setNewMSG(true);
      }
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
      <div
        onClick={() => {
          setOpenChat((v) => !v);
        }}
        className="orderChatButton"
      >
        <div className={`orderChatButtonSVGFrame ${newMSG ? 'active' : ''}`}>
          {chatSVG('strokeMainColor h30 w100p')}
        </div>
      </div>
      {openChat ? (
        <div className="orderOnMapChattingBox">
          <OrderChat
            socket={orderSocket}
            // selectedOrder
            orderSid={1}
            mySide={3}
            targetSid={1}
            sideName={'Deliver'}
            targetSide={1}
            setStyle={{ height: '500px' }}
          />
        </div>
      ) : null}
    </>
  );
}
export default DeliverChat;
/*        <DeliverChatBox
          setOpenChat={setOpenChat}
          acceptedMessage={acceptedMessage}
          selectedOrder={selectedOrder}
          orderSocket={orderSocket}
          step={step}
        />*/
