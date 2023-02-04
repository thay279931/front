import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import OptionGroup from '../components/OptionForm/OptionGroup';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import $ from 'jquery';
import ProductEditForm from '../components/ProductEditForm';

function Overview() {
  const siteName = '35.221.208.241';
  // 啟動jQuery
  $(document).ready(function () {
    // Do something when .ready() called.
  });

  const [amount, setAmount] = useState(1);
  const [data, setData] = useState({
    types: [],
    products: [],
    options_types: [],
    options: [],
  });
  const [selectedItem, setSelectedItem] = useState('');
  const [isCollapsed, setIsCollapsed] = useState([]);
  const getData = async (shop_sid) => {
    const response = await axios.get(
      `http://${siteName}:3001/store-admin/overview/${shop_sid}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    const myUser = JSON.parse(localStorage.getItem('StoreDatas'));

    // 取得店家菜單資料
    getData(myUser.sid);
    console.log(data);
  }, []);

  useEffect(() => {
    const newIsCollapsed = data.types.map((v) => false);
    setIsCollapsed(newIsCollapsed);
  }, [data]);

  return (
    <DragDropContext>
      <div className="store-admin">
        {selectedItem === '' ? (
          <div className="menu-container">
            <div className="row">
              <div className="menu-title">
                <h4>總覽</h4>
              </div>
            </div>
            {data.types.map((type, i) => {
              return (
                <div
                  className={`product-area ${
                    isCollapsed[i] ? 'collapsed' : ''
                  } `}
                >
                  <div
                    className="top"
                    onClick={(e) => {
                      $(e.currentTarget)
                        .siblings('.collapsed-area')
                        .slideToggle();
                      $(e.currentTarget).find('.right').toggleClass('rot90');
                    }}
                  >
                    <div className="left">
                      {/* <i className="fa-solid fa-equals"></i> */}
                      <p>{type.name}</p>
                      <p>
                        共
                        <span>
                          {
                            data.products.filter((product) => {
                              return product.products_type_sid === type.sid;
                            }).length
                          }
                        </span>
                        項餐點
                      </p>
                    </div>
                    <div className="right">
                      <i class="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                  <di className="collapsed-area">
                    <div className="middle">
                      {data.products
                        .filter((product) => {
                          return product.products_type_sid === type.sid;
                        })
                        .map((product) => {
                          return (
                            <div
                              className="product-box"
                              onClick={() => {
                                setSelectedItem(product.sid);
                              }}
                            >
                              <div className="left">
                                {/* <i class="fa-solid fa-equals"></i> */}
                                <img
                                  src={`http://${siteName}:3001/uploads/${product.src}`}
                                  alt=""
                                />
                                <p
                                  onClick={() => {
                                    setSelectedItem(product.sid);
                                  }}
                                >
                                  {[product.name]}
                                </p>
                              </div>
                              <div className="right">
                                <div className="number-input">
                                  <div>NT$</div>
                                  <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="bottom">
                      <div className="sm-white-btn">
                        <i></i>
                        <p></p>
                      </div>
                    </div>
                  </di>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}

        {selectedItem === '' ? (
          <></>
        ) : (
          <>
            <ProductEditForm
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </>
        )}
      </div>
    </DragDropContext>
  );
}

export default Overview;
