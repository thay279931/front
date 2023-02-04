//外送員地圖外層 第一層  開SOCKET
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliverMapContent from './DeliverMapContent';
import DeliverChat from './DeliverChat';
import Swal from 'sweetalert2';
const siteName = '35.221.208.241';
function DeliverMap() {
  const navi = useNavigate();
  const [socketOpened, setSocketOpened] = useState(false);
  const settedState = true;
  // const navi = useNavigate();
  const orderSocket = useMemo(
    () => new WebSocket(`ws://${siteName}:3200`),
    [settedState]
  );
  function sendToken(sever) {
    const tokenString = localStorage.getItem('Deliver');
    if (!tokenString) {
      Swal.fire('請先登入').then(() => {
        navi('/Deliver/DeliverLogin');
        return;
      });
    }
    sever.send(JSON.stringify({ token: tokenString }));
    // orderChatSocket.send(JSON.stringify({ token: tokenString }))
  }
  orderSocket.addEventListener('open', () => {
    sendToken(orderSocket);
    setSocketOpened(true);
    console.log('訂單系統伺服器連線');
  });

  useEffect(() => {
    return () => {
      orderSocket.close();
      console.log('訂單系統伺服器離線');
    };
  }, []);
  return (
    <div
      className="po-r"
      style={{
        width: '100%',
        minHeight: '500px',
        height: 'calc(100vh - 160px)',
      }}
    >
      <DeliverMapContent
        orderSocket={orderSocket}
        socketOpened={socketOpened}
      />
      <DeliverChat orderSocket={orderSocket} />
    </div>
  );
}
export default DeliverMap;
