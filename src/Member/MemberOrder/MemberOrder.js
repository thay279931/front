//會員中心 現在訂單 第一層
import { useEffect, useState } from 'react';
import { useFunc } from '../../Context/FunctionProvider';
import OrderContents from './OrderContents';
import OrderSelect from './OrderSelect';
import './MemberOrder.css';

function MemberOrder({ orderSocket }) {
  const { loginCheckGetFetch } = useFunc();
  //訂單概覽列表
  const [orderList, setOrderList] = useState([]);
  //選到的訂單編號
  const [selectedOrder, setSelectedOrder] = useState(0);
  const getOrderList = async () => {
    const res = await loginCheckGetFetch(
      'MemberOrderCheck/GetSelectDetails',
      'Member'
    );
    setOrderList(res);
    // console.log(res);
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <>
      {orderList.length === 0 ? (
        <div className="flexSetCenter w100p">
        <p className="flexSetCenter w100p h500 fw7 fs36">無現在訂單</p>
        </div>
      ) : (
        <div>
          <OrderSelect
            orderList={orderList}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
          />
          <div className="w100p">
            <p className="fs32 fw6 marb20">你的訂單狀態</p>
            <OrderContents
              selectedOrder={selectedOrder}
              orderSocket={orderSocket}
              setSelectedOrder={setSelectedOrder}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default MemberOrder;
