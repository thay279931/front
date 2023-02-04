//購物車頁面
import { useEffect, useState } from 'react';
import { usePay } from '../../../Context/PayPageContext';
import { useCart } from '../../../Context/CartProvider';
import OptionForm from '../../../Store/StoreProductEdit/components/OptionForm';
function PayPageCart() {
  const { editCartBySelect } = useCart();
  const selectOptions = new Array(31).fill(1);
  //===============================================分隔線================================================
  //產品資料
  const [prouducts, setProducts] = useState({});
  //購物車內容
  const { cartContents, chooseedPayShop } = usePay();
  const [selectedSid, setSelectedSid] = useState('');
  useEffect(() => {
    //一開始先抓全域狀態資料出來顯示
    setProducts(cartContents.cartList[chooseedPayShop].list);
  }, [cartContents]);
  return (
    <div className="lh24 w100p">
      <h3 className="chooseCartH3 lh36">
        {cartContents.cartList[chooseedPayShop].shopName}
      </h3>
      <div>
        {/* //===============================================分隔線================================================ */}
        {Object.keys(prouducts).map((key, index) => {
          const cutBefore = prouducts[key].price * prouducts[key].amount;
          const cutAfter = prouducts[key].cuttedPrice * prouducts[key].amount;
          return (
            <>
              <div
                onClick={(e) => {
                  console.log(e.target.name);
                  if (!e.target.name) {
                    setSelectedSid(key);
                  }
                }}
                key={key}
                className="disf jc-sb gap5 ai-c padV10 padH5 pointer"
                style={{ backgroundColor: '#eeeeff' }}
              >
                <div className="">
                  {/* prouducts[key].amount數量 */}
                  {/* prouducts[key].name */}
                  {/* prouducts[key].cuttedPrice */}

                  <select
                    name="selects"
                    value={prouducts[key].amount}
                    onChange={(e) => {
                      //下拉式選單函式
                      editCartBySelect(chooseedPayShop, key, e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    {selectOptions.map((v, i) => {
                      return (
                        <option key={i} value={i}>
                          {i === 0 ? '清除' : i}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <p className="ta-c">{prouducts[key].name}</p>
                {/* 價格 */}
                <div>
                  <p className="chooseCartPrice">
                    {prouducts[key].cuttedPrice} x{prouducts[key].amount}
                  </p>
                  {/* 折價前後是否相等 */}
                  {cutBefore === cutAfter ? (
                    <></>
                  ) : (
                    <p className="chooseCartPrice cuttedPrice">
                      {prouducts[key].price * prouducts[key].amount}
                    </p>
                  )}
                </div>
                {/* prouducts[key].details */}
                {/* {
                  "name": "加料",
                  "sid": 1,
                  "list": [
                      {
                          "sid": 2,
                          "name": "珍珠",
                          "price": 15
                      },
                      {
                          "sid": 3,
                          "name": "耶果",
                          "price": 10
                      }
                  ]
              } */}
              </div>
              {prouducts[key].details.length > 0 ? (
                <div
                  style={{ backgroundColor: '#ffeeee88' }}
                  className="disf ai-c jc-se padH5 padV5 borderBotGray3 fw-w"
                >
                  {prouducts[key].details.map((value) => {
                    return (
                      <>
                        <div className="ta-c">
                          <p className="marV5">【{value.name}】</p>
                          <p className="marV5 marr5">
                            {value.price !== 0 ? (
                              <>
                                ${value.price}{' '}
                                <span className="fontRed">
                                  x{prouducts[key].amount}
                                </span>
                              </>
                            ) : (
                              <sapn className="fontTransparnt">0</sapn>
                            )}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
              ) : null}
            </>
          );
        })}
        {/* //===============================================分隔線================================================ */}
      </div>
      {selectedSid !== '' ? (
        <OptionForm selectedSid={selectedSid} setSelectedSid={setSelectedSid} />
      ) : null}
    </div>
  );
}
export default PayPageCart;
