//購物車頁面
import { useEffect, useState } from 'react';
import '../Cart.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePay } from '../../Context/PayPageContext';
import { useCart } from '../../Context/CartProvider';
import { useAuth } from '../../Context/AuthProvider';
import Swal from 'sweetalert2';
import OptionForm from '../../Store/StoreProductEdit/components/OptionForm';
function Cart({ setShowCart, setShowChooseShop, styles, secondStyles }) {
  const location = useLocation();
  const { editCartBySelect } = useCart();
  const { authMember } = useAuth();
  const navi = useNavigate();
  const selectOptions = new Array(31).fill(1);
  //===============================================分隔線================================================
  //產品資料
  const [prouducts, setProducts] = useState({});
  //購物車內容
  const { cartContents, chooseedPayShop } = usePay();
  //調整商品細節
  const [openProductSid, setOpenProductSid] = useState('');
  useEffect(() => {
    //一開始先抓全域狀態資料出來顯示
    setProducts(cartContents.cartList[chooseedPayShop].list);
  }, [cartContents]);
  return (
    <>
      <div className="cartFrame " style={styles}>
        <div className="chooseCart" style={secondStyles}>
          {location.pathname !== '/Pay' ? (
            <div className="w100p disf jc-sb ">
              <i
                onClick={() => {
                  setShowCart(false);
                  setShowChooseShop(true);
                }}
                className="fa-solid fa-circle-chevron-left cartX pointer"
              ></i>
              <i
                onClick={() => {
                  setShowCart(false);
                  setShowChooseShop(false);
                }}
                className="fa-solid fa-circle-xmark pointer cartX"
              ></i>
            </div>
          ) : null}

          <h3 className="chooseCartH3">
            {cartContents.cartList[chooseedPayShop].shopName}
          </h3>
          <div>
            {/* //===============================================分隔線================================================ */}
            {Object.keys(prouducts).map((key, index) => {
              const cutBefore = prouducts[key].price * prouducts[key].amount;
              const cutAfter =
                prouducts[key].cuttedPrice * prouducts[key].amount;
              return (
                <>
                  <div
                    onClick={(e) => {
                      console.log(e.target.name);
                      if (!e.target.name) {
                        setOpenProductSid(key);
                        // console.log(123);
                      }
                      // setOpenProductSid(key)
                    }}
                    key={key}
                    className="cartShopList"
                  >
                    <div>
                      {/* prouducts[key].amount數量 */}
                      {/* prouducts[key].name */}
                      {/* prouducts[key].cuttedPrice */}

                      <select
                        name="selects"
                        value={prouducts[key].amount}
                        onChange={(e) => {
                          //下拉式選單函式
                          editCartBySelect(
                            chooseedPayShop,
                            key,
                            e.target.value,
                            setShowCart,
                            setShowChooseShop
                          );
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

                    <p>{prouducts[key].name}</p>
                    {/* 價格 */}
                    <div>
                      <p className="chooseCartPrice">
                        {prouducts[key].cuttedPrice * prouducts[key].amount}
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
                    <div className="disf ai-c fw-w  padH5 padV5 productDetails">
                      {prouducts[key].details.map((value) => {
                        return (
                          <>
                            <div className="ta-c  marb10">
                              <p className="marb5">【{value.name}】</p>
                              <p>
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
          {/* <div
          onClick={() => {}}
          className="bgcGray pointer ai-c disf jc-sb padH20 padV20"
        >
          <p>
            <span className="fw7 fs24">新增訂單備註</span>
            <br />
            <span className="lh36"> 餐具、特殊指示等</span>
          </p>
          <p>
            <i className="fs36 fa-solid fa-plus"></i>
          </p>
        </div> */}
          {location.pathname !== '/Pay' ? (
            <>
              <div
                className="goPayButoon"
                onClick={() => {
                  if (!authMember) {
                    Swal.fire({
                      icon: 'warning',
                      title: '請先登入會員',
                    });
                    navi('/MemberLogin');
                  } else {
                    navi('/Pay');
                  }
                  setShowCart(false);
                  setShowChooseShop(false);
                }}
              >
                前往結帳．$
                {cartContents.cartList[chooseedPayShop].shopPriceTotal}
              </div>
              <div className="w100p h200 bigHidden"></div>
            </>
          ) : (
            <div className="borderBotGray3"></div>
          )}
        </div>
      </div>
      {/* 商品細節調整 */}
      {openProductSid === '' ? null : (
        <OptionForm
          selectedSid={openProductSid}
          setSelectedSid={setOpenProductSid}
        />
      )}
      {/*openProductSid, setOpenProductSid OptionForm */}
    </>
  );
}
export default Cart;
