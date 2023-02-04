import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import OptionForm from '../components/OptionForm/index';
const siteName = '35.221.208.241';
function ProductList() {
  const navi = useNavigate();
  const location = useLocation();
  const usp = new URLSearchParams(location.search);
  const [data, setData] = useState({
    shop: {},
    types: [],
    products: [],
    options_types: [],
    options: [],
  });
  // selectedSid
  const [selectedSid, setSelectedSid] = useState('');
  // 目前滾到第幾個Type
  const [nowType, setNowType] = useState('');

  const getData = async (shop_sid) => {
    const response = await axios.get(
      `http://${siteName}:3001/store/?shop_sid=${shop_sid}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    // const myUser = JSON.parse(localStorage.getItem('StoreDatas'));
    const shop_sid = usp.get('shop_sid');
    // 取得店家菜單資料
    getData(shop_sid);
    // console.log(data);
    window.addEventListener('scroll', detactPosition);
  }, []);

  const detactPosition = (e) => {
    let myTypes = document.querySelectorAll('.connect-id');
    let typeHeights = [];
    myTypes.forEach((v, i) => {
      // 75%筆電時
      // typeHeights.push(v.offsetTop + window.innerHeight - 450);
      typeHeights.push(v.offsetTop + window.innerHeight * 0.4);
      // 125%筆電時
      // typeHeights.push(v.offsetTop + window.innerHeight - 40);
    });
    // console.log(typeHeights);
    // console.log(window.scrollY);
    for (let i = 0; i < typeHeights.length; i++) {
      // console.log(window.scrollY - typeHeights[typeHeights.length]);
      if (window.scrollY - typeHeights[0] < 0) {
        setNowType(0);
      } else if (
        window.scrollY - typeHeights[typeHeights.length - 1] <=
          window.innerWidth &&
        window.scrollY - typeHeights[typeHeights.length - 2] > window.innerWidth
      ) {
        setNowType(typeHeights.length - 1);
      } else if (
        window.scrollY - typeHeights[i] >= 0 &&
        window.scrollY - typeHeights[i + 1] < 0
      ) {
        setNowType(i);
      }
    }
    // console.log(window.scrollY);
  };

  return (
    <>
      <div className="product-list">
        <div className="product-container">
          <div className="row">
            <div className="shop-img">
              <img
                src={`http://${siteName}:3001/images/shop/${data.shop.src}`}
                alt="店家圖片"
              />
            </div>
          </div>
          <div className="row">
            <div className="shop-info">
              <div className="top">
                <h1>{data.shop.name}</h1>
              </div>

              <div className="bottom">
                <div className="rating">
                  <i className="fa-solid fa-star"></i>
                  <p>{data.shop.average_evaluation}</p>
                  <p
                    onClick={() => {
                      const shopSid = usp.get('shop_sid');
                      navi(`/StoreEvaluation?shopSid=${shopSid}`);
                    }}
                    className="pointer "
                  >
                    查看店家評價
                  </p>
                </div>
                <p>等待時間 : {data.shop.wait_time}分鐘</p>
                <p>點選即可查看營業時間、資訊和更多內容</p>
              </div>
              {/* <h1>{data.shop.address}</h1> */}
            </div>
          </div>
          <div className="row">
            <div className="product-info">
              <aside>
                <div className="type-nav">
                  <ul>
                    {data.types.length !== 0 ? (
                      data.types
                        .filter((type) => {
                          return (
                            data.products.filter((p) => {
                              return p.products_type_sid === type.sid;
                            }).length !== 0
                          );
                        })
                        .map((type, i) => {
                          return (
                            <li
                            // className={
                            //   !data.products.find((p) => {
                            //     return type.sid === p.products_type_sid;
                            //   })
                            //     ? 'noDisplay'
                            //     : ''
                            // }
                            >
                              <a
                                className={nowType === i ? 'underline' : ''}
                                href={`#${type.sid}`}
                              >
                                {type.name}
                              </a>
                            </li>
                          );
                        })
                    ) : (
                      <>
                        <li>
                          <a href="#">全部商品</a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </aside>
              <main>
                {data.types.length === 0 ? (
                  <>
                    {/* <h3>123</h3> */}
                    <div className="product-type">
                      <div className="product-group">
                        {data.products.map((product) => {
                          return (
                            <div className="product-box">
                              <div
                                className="product"
                                onClick={() => {
                                  // selectedSid
                                  setSelectedSid(product.sid);
                                }}
                              >
                                <div className="left">
                                  <p className="product-name">
                                    {[product.name]}
                                  </p>
                                  <p className="product-note">
                                    {[product.note]}
                                  </p>

                                  <p className="product-price">
                                    $ {[product.price]}
                                  </p>
                                </div>
                                <div className="right">
                                  <img
                                    src={`http://${siteName}:3001/uploads/${[
                                      product.src,
                                    ]}`}
                                    alt="商品圖片"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  data.types
                    .filter((type) => {
                      return (
                        data.products.filter((p) => {
                          return p.products_type_sid === type.sid;
                        }).length !== 0
                      );
                    })
                    .map((type) => {
                      return (
                        <>
                          <div
                            className={`product-type ${
                              !data.products.find(
                                (product) =>
                                  product.products_type_sid === type.sid
                              )
                                ? 'noDisplay'
                                : ''
                            }
                        `}
                          >
                            <div className="connect-id" id={type.sid}></div>
                            <h5 key={type.sid}>{type.name}</h5>
                            <div className="product-group">
                              {data.products
                                .filter((product) => {
                                  return product.products_type_sid === type.sid;
                                })
                                .map((product) => {
                                  return (
                                    <div className="product-box">
                                      <div
                                        className="product"
                                        onClick={() => {
                                          // selectedSid
                                          setSelectedSid(product.sid);
                                        }}
                                      >
                                        <div className="left">
                                          <p className="product-name">
                                            {[product.name]}
                                          </p>
                                          <p className="product-note">
                                            {[product.note]}
                                          </p>

                                          <p className="product-price">
                                            $ {[product.price]}
                                          </p>
                                        </div>
                                        <div className="right">
                                          <img
                                            src={`http://${siteName}:3001/uploads/${[
                                              product.src,
                                            ]}`}
                                            alt="商品圖片"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </>
                      );
                    })
                )}
              </main>
            </div>
          </div>
        </div>
        {selectedSid ? (
          <>
            <OptionForm
              selectedSid={selectedSid}
              setSelectedSid={setSelectedSid}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ProductList;
