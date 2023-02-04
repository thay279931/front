//購物車選擇店家頁面
import { useEffect, useState } from 'react';
import { usePay } from '../../Context/PayPageContext';
import '../Cart.css';

function ChooseCart({ setShowChooseShop, setShowCart }) {
  const {
    setChooseedPayShop,
    cartTotal,
    cartContents,

  } = usePay();
  //狀態切換
  const [cart, setCart] = useState(false);
  //店家列表 只在這頁用
  const [shoplist, setShopList] = useState({});
  //選擇店家到下一步
  const setChoosedShop = (shopSid) => {
    //設定全域狀態
    setChooseedPayShop(shopSid);
    //以下兩個是顯示頁面的切換
    setShowChooseShop(false);
    setShowCart(true);
  };
  //一開始先拿購物車總數 如果沒有就顯示購物車為空
  useEffect(() => {
    if (cartTotal > 0) {
      setCart(true);
      setShopList(cartContents.cartList);
    } else {
      setCart(false);
      // setShowChooseShop(false);
      setShopList({});
    }
  }, [cartTotal]);

  //空購物車
  const emptyCart = () => {
    return (
      <>
        <div className="cartFrame">
          <div className="chooseCart flexSetCenter ">
            <div className="w100p disf fd-rr">
              <i
                onClick={() => {
                  setShowChooseShop(false);
                }}
                className="fa-solid fa-circle-xmark pointer cartX"
              ></i>
            </div>
            <div className="append1s flexSetCenter fd-c">
              <h3 className="chooseCartH3">購物車為空</h3>
              <div>
                <i className="fa-solid fa-cart-shopping emptyCart"></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  //有購物車
  const setShops = () => {
    return (
      <div className="cartFrame">
        <div className="chooseCart">
          <div className="w100p disf fd-rr">
            <i
              onClick={() => {
                setShowChooseShop(false);
              }}
              className="fa-solid fa-circle-xmark pointer cartX"
            ></i>
          </div>
          <h3 className="chooseCartH3">請選擇店家</h3>
          {Object.keys(shoplist).map((keyName, index) => {
            return (
              <div
                onClick={() => {
                  setChoosedShop(Number(keyName));

                }}
                className="cartShopList"
                // keyName = 商店SID
                key={keyName}
              >
                {/* 商店名稱 */}
                <p className="chooseCartName">{shoplist[keyName].shopName}</p>
                {/* 商店總數 */}
                <p className="chooseCartName">
                  商品總數:{shoplist[keyName].shopTotal}
                </p>
                {/* 商店總價 */}
                <p className="chooseCartPrice">
                  {shoplist[keyName].shopPriceTotal}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return <>{cart ? setShops() : emptyCart()}</>;
}
export default ChooseCart;
