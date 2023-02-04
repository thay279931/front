//店家現在訂單最外層 只放orderSocket
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreOrder from './StoreOrder';
import Swal from 'sweetalert';
function OrderSocket() {
  const navi = useNavigate();
  const siteName = '35.221.208.241';
  const orderSocket = new WebSocket(`ws://${siteName}:3200`);
  function sendToken() {
    const tokenString = localStorage.getItem('Store');
    if (!tokenString) {
      Swal.fire('沒登入');
      navi(`/StoreLogin`);
    }
    orderSocket.send(JSON.stringify({ token: tokenString }));
  }
  orderSocket.addEventListener('open', () => {
    sendToken();
    console.log('start');
  });

  //===============================================分隔線================================================
  useEffect(() => {
    return () => {
      orderSocket.close();
      console.log('end');
    };
  }, []);
  //===============================================分隔線================================================

  return (
    <>
      <StoreOrder orderSocket={orderSocket} />
    </>
  );
}
export default OrderSocket;
