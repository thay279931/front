import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OptionGroup from './OptionGroup';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../../../../Context/CartProvider';
import Swal from 'sweetalert2/dist/sweetalert2.js';

function OptionForm({ selectedSid, setSelectedSid }) {
  const siteName = '35.221.208.241';

  const { setCartWithAmount } = useCart();
  const [amount, setAmount] = useState(1);
  const [details, setDetails] = useState([]);
  // test
  const [testDetails, setTestDetails] = useState([]);
  const [data, setData] = useState({
    shop: {},
    product: {},
    options_types: [],
    options: [],
  });
  const [optionBoolean, setOptionBoolean] = useState([]);
  const [cartOptions, setCartOptions] = useState([]);

  const getData = async (sid) => {
    const response = await axios.get(
      `http://${siteName}:3001/option-form?sid=${sid}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    getData(selectedSid);
    document.querySelector('body').style.overflow = 'hidden';
    return () => {
      document.querySelector('body').style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    setDetails(
      data.options_types.map((ot) => {
        return { sid: ot.sid, name: ot.name, list: [] };
      })
    );

    // 點購物車的商品近來要取得該商品當前的資料
    const localCart = JSON.parse(localStorage.getItem('cart'));
    if (
      localCart &&
      localCart.cartList &&
      localCart.cartList[data.shop.sid] &&
      localCart.cartList[data.shop.sid].list &&
      localCart.cartList[data.shop.sid].list[data.product.sid]
    ) {
      setCartOptions(
        localCart.cartList[data.shop.sid].list[data.product.sid].details
      );
      setAmount(
        Number(localCart.cartList[data.shop.sid].list[data.product.sid].amount)
      );
      setOptionBoolean(
        data.options_types.map((ot) => {
          // if (ot.min === 0) {
          //   return true;
          // }
          return true;
        })
      );
    } else {
      console.log('Cannot find cartOptions');
      setCartOptions([]);
      setOptionBoolean(
        data.options_types.map((ot) => {
          if (ot.min === 0) {
            return true;
          }
          return false;
        })
      );
    }
  }, [data]);

  // test
  useEffect(() => {
    const newTestDetails = data.options_types.map((ot) => {
      return {
        sid: ot.sid,
        name: ot.name,
        list: data.options
          .filter((opt) => opt.options_type_sid === ot.sid)
          .map((opt) => {
            return cartOptions.findIndex((co) => {
              return co.sid === opt.sid;
            }) === -1
              ? false
              : { sid: opt.sid, name: opt.name, price: opt.price };
          }),
      };
    });
    setTestDetails(newTestDetails);
  }, [cartOptions]);

  const intoCart = (e) => {
    // e.preventDefault();

    // // test
    // console.log(testDetails);
    // let testNewDetails = [];
    // testDetails.forEach((d) => {
    //   const arr = d.list.filter((l) => {
    //     return !!l === true;
    //   });
    //   testNewDetails = [...testNewDetails, ...arr];
    // });
    // console.log(testNewDetails);

    // setCartWithAmount(
    //   data.shop.sid,
    //   selectedSid,
    //   data.shop.name,
    //   data.product.name,
    //   data.product.price,
    //   data.product.price,
    //   data.product.src,
    //   testNewDetails,
    //   amount
    // );
    // console.log([
    //   data.shop.sid,
    //   selectedSid,
    //   data.shop.name,
    //   data.product.name,
    //   data.product.price,
    //   data.product.price,
    //   data.product.src,
    //   testNewDetails,
    //   amount,
    // ]);

    // // 重置State
    // setSelectedSid('');
    // setAmount(1);

    // alert
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    e.preventDefault();

    // test
    console.log(testDetails);
    let testNewDetails = [];
    testDetails.forEach((d) => {
      const arr = d.list.filter((l) => {
        return !!l === true;
      });
      testNewDetails = [...testNewDetails, ...arr];
    });
    console.log(testNewDetails);

    setCartWithAmount(
      data.shop.sid,
      selectedSid,
      data.shop.name,
      data.product.name,
      data.product.price,
      data.product.price,
      data.product.src,
      testNewDetails,
      amount
    );
    console.log([
      data.shop.sid,
      selectedSid,
      data.shop.name,
      data.product.name,
      data.product.price,
      data.product.price,
      data.product.src,
      testNewDetails,
      amount,
    ]);

    // 重置State
    setSelectedSid('');
    setAmount(1);
    // Swal.fire({
    //   icon: 'success',
    //   title: '成功將商品加入購物車',
    //   showConfirmButton: false,
    //   timer: 1500,
    // });

    //   Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    // }
    // });
  };

  return (
    <div
      className={`option-form-area ${
        data.options_types.length === 0 ? 'toBottom' : ''
      }`}
      onClick={(e) => {
        // 應該後來要改成setSelectedSid
        console.log(e.target === e.currentTarget);
        if (e.target === e.currentTarget) {
          setSelectedSid('');
          setAmount(0);
        }
      }}
    >
      <div className="option-form-section">
        <div className={`option-form`}>
          <div className="row">
            <div className="product-img">
              <div
                className="back-btn"
                onClick={() => {
                  // 應該後來要改成setSelectedSid
                  setSelectedSid('');
                  setAmount(0);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
              <img
                src={`http://${siteName}:3001/uploads/${data.product.src}`}
                alt="餐點圖片"
              />
            </div>
          </div>
          <div className="row">
            <div className="product-info">
              <div className="top">
                <h5>{data.product.name}</h5>
                <p>$ {data.product.price}</p>
              </div>
              <div className="bottom">
                <p>{data.product.note}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="option-section">
              <div className="option-box">
                {data.options_types.map((ot, otIndex) => {
                  return (
                    <div className="option-box">
                      <div className="option-type">
                        <div className="top">
                          <h6>{ot.name}</h6>
                          <p>{!ot.min ? '' : `${ot.min}必填`}</p>
                        </div>
                        <div className="bottom">
                          <p>
                            {ot.min === 1 && ot.max === 1
                              ? '選擇1項'
                              : ot.max > 1 && ot.min > 0
                              ? `最多可選擇${ot.max}項(最少選擇${ot.min}項)`
                              : ot.max >= 1 && ot.min === 0
                              ? `最多可選擇${ot.max}項(可不選擇)`
                              : null}
                          </p>
                        </div>
                      </div>
                      <div className="option-list">
                        <OptionGroup
                          ot={ot}
                          data={data}
                          optionBoolean={optionBoolean}
                          setOptionBoolean={setOptionBoolean}
                          otIndex={otIndex}
                          // test
                          testDetails={testDetails}
                          setTestDetails={setTestDetails}
                          // 選項格式是否正確
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="amount-section">
              <div className="left">
                <i
                  className={`fa-solid fa-minus ${
                    amount <= 1 ? 'inActive' : ''
                  }`}
                  onClick={() => {
                    if (amount > 1) setAmount(amount - 1);
                  }}
                ></i>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
                <i
                  className="fa-solid fa-plus"
                  onClick={() => {
                    if (amount > 0) setAmount(amount + 1);
                  }}
                ></i>
              </div>
              <div className="right">
                <div
                  className={
                    optionBoolean.findIndex((v) => {
                      return !!v === false;
                    }) === -1
                      ? ''
                      : 'inActive'
                  }
                  onClick={
                    optionBoolean.findIndex((v) => {
                      return !!v === false;
                    }) === -1
                      ? intoCart
                      : ''
                  }
                >
                  <p>放入購物車</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionForm;
