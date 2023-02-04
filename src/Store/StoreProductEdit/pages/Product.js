import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import ProductEditForm from '../components/ProductEditForm';
import $ from 'jquery';
import { useRef } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';

function Product() {
  const siteName = '35.221.208.241';
  const cRef = useRef();
  const [data, setData] = useState({
    types: [],
    products: [],
    options_types: [],
    only_options_types: [],
  });
  // 找到目前使用者的shop_sid
  const [myUserSid, setMyUserSid] = useState();

  // 預覽圖片的state
  const [imgSrc, setImgSrc] = useState('');

  // 目前正在編輯的商品的sid，sid=0就是新增商品。
  const [selectedItem, setSelectedItem] = useState('');
  const [formData, setFormData] = useState({
    src: '',
    name: '',
    price: '',
    type: '',
    options_types: [],
    note: '',
    discount: '',
    available: '',
  });

  const [reload, setReload] = useState(0);
  // 展示用的資料
  const [displayData, setDisplayData] = useState({
    types: [],
    products: [],
    options_types: [],
    only_options_types: [],
  });
  const [selectedType, setSelectedType] = useState({ sid: '', name: '' });
  const [searchInput, setSearchInput] = useState('');

  const getData = async (shop_sid) => {
    console.log(shop_sid);
    const response = await axios.get(
      `http://${siteName}:3001/store-admin/product/${shop_sid}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    setMyUserSid(JSON.parse(localStorage.getItem('StoreDatas')).sid);
    // 取得店家菜單資料
    getData(JSON.parse(localStorage.getItem('StoreDatas')).sid);
  }, [selectedItem, reload]);

  useEffect(() => {
    // 更新展示的資料
    setDisplayData(data);
    if (selectedType.sid) {
      const newDisplayData = { ...data };
      const newProducts = newDisplayData.products.filter((product) => {
        return (
          product.products_type_sid === selectedType.sid &&
          product.name.includes(searchInput)
        );
      });
      setDisplayData({ ...newDisplayData, products: newProducts });
    } else {
      const newDisplayData = { ...data };
      const newProducts = newDisplayData.products.filter((v) => {
        return v.name.includes(searchInput);
      });
      setDisplayData({ ...newDisplayData, products: newProducts });
    }
  }, [data]);

  useEffect(() => {
    if (selectedType.sid) {
      const newDisplayData = { ...data };
      const newProducts = newDisplayData.products.filter((product) => {
        return (
          product.products_type_sid === selectedType.sid &&
          product.name.includes(searchInput)
        );
      });
      setDisplayData({ ...newDisplayData, products: newProducts });
    } else {
      const newDisplayData = { ...data };
      const newProducts = newDisplayData.products.filter((v) => {
        return v.name.includes(searchInput);
      });
      setDisplayData({ ...newDisplayData, products: newProducts });
    }
  }, [selectedType, searchInput]);

  // 新贓商品的儲存按鈕被按下時
  const submitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    const response = await axios.post(
      `http://${siteName}:3001/store-admin/product/${myUserSid}`,
      fd
    );
    setReload((v) => v + 1);
    setSelectedItem('');
  };

  // 快速填入
  const fillOutForm = () => {
    document.form1.name.value = '鴛鴦奶茶';
    document.form1.price.value = 70;
    document.form1.type.value = 2;
    document.form1.note.value = 'abc';
    document.form1.discount.value = 5;
  };

  // 上傳圖片時
  const uploadHandler = () => {};

  const addBtnHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    const response = await axios.post(
      `http://${siteName}:3001/store-admin/product/${myUserSid}`,
      fd
    );
    console.log(response.data);
    setReload((v) => v + 1);
    setImgSrc('');
    setSelectedItem('');
  };

  const editBtnHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    const response = await axios.put(
      `http://${siteName}:3001/store-admin/product/${myUserSid}`,
      fd
    );
    console.log(response.data);
    setReload((v) => v + 1);
    setImgSrc('');
    setSelectedItem('');
  };

  const delBtnHandler = async (e) => {
    e.preventDefault();
    const response = await axios.delete(
      `http://${siteName}:3001/store-admin/product/${selectedItem}`
    );
    setReload((v) => v + 1);
    setImgSrc('');
    setSelectedItem('');
  };

  const uploadImgHandler = (e) => {
    console.log(e.target.files);
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        // convert image file to base64 string
        setImgSrc(reader.result);
        // preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addDemoProducts = async () => {
    Swal.fire({
      title: '使用快速填入?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: '快速填入',
      denyButtonText: `刪除快速填入`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await axios.post(
          `http://${siteName}:3001/store-admin/product/demo-data`
        );

        setReload((v) => v + 1);
        setImgSrc('');
        setSelectedItem('');
        Swal.fire({
          icon: 'success',
          title: '成功快速填入資料',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.isDenied) {
        const response = await axios.delete(
          `http://${siteName}:3001/store-admin/product/demo-data`
        );

        setReload((v) => v + 1);
        setImgSrc('');
        setSelectedItem('');
        Swal.fire({
          icon: 'success',
          title: '成功刪除快速填入資料',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <div
        className="store-admin"
        ref={cRef}
        onClick={(e) => {
          // console.log({ event: e });
          $(cRef.current).find('li').slideUp();
        }}
      >
        {!(selectedItem === '') ? (
          <></>
        ) : (
          <>
            <div className={`menu-container`}>
              <div className="row top-edit-area">
                <div className="menu-title">
                  <h4 onClick={addDemoProducts}>餐點</h4>
                  <div
                    className="bg-black-btn"
                    onClick={() => {
                      setSelectedItem(0);
                      setFormData({
                        src: '',
                        name: '',
                        price: '',
                        type: '',
                        options_types: [],
                        note: '',
                        discount: '',
                        available: '',
                      });
                    }}
                  >
                    <i class="fa-solid fa-plus btn-icon"></i>
                    <p>新增餐點</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="search-area">
                  <div className="search-box">
                    <div>
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={searchInput}
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                      }}
                    />
                  </div>
                  <div className="select-box">
                    <div
                      className="select"
                      onClick={(e) => {
                        $(e.currentTarget)
                          .siblings('ul')
                          .find('li')
                          .slideToggle();
                        e.stopPropagation();
                        console.log({ abcde1: e });
                      }}
                    >
                      <p>{selectedType.sid ? selectedType.name : '全部'}</p>
                      <div className="arrow">
                        <i className="fa-solid fa-caret-down"></i>
                      </div>
                    </div>
                    <ul className="ul">
                      <li className="li" key={-1}>
                        <p
                          className="li"
                          onClick={(e) => {
                            setSelectedType({
                              sid: '',
                              name: '',
                            });
                            $(e.currentTarget)
                              .closest('ul')
                              .find('li')
                              .slideToggle();
                            e.stopPropagation();
                            console.log({ abcde2: e });
                          }}
                        >
                          全部
                        </p>
                      </li>
                      {data.types.map((type, i) => {
                        return (
                          <li key={i}>
                            <p
                              onClick={(e) => {
                                setSelectedType({
                                  sid: type.sid,
                                  name: type.name,
                                });
                                $(e.currentTarget)
                                  .closest('ul')
                                  .find('li')
                                  .slideToggle();
                                e.stopPropagation();
                                console.log({ abcde3: e });
                              }}
                            >
                              {type.name}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="table">
                  <div className="thead">
                    <div className="tr-product">
                      <div className="th">圖片</div>
                      <div className="th">名稱</div>
                      <div className="th">價格</div>
                      <div className="th">類別</div>
                      <div className="th">使用客製化選項</div>
                      <div className="th">說明</div>
                      <div className="th">是否上架</div>
                    </div>
                  </div>
                  <div className="tbody">
                    {displayData.products.map((product) => {
                      return (
                        <div
                          className="tr-product"
                          onClick={() => {
                            setSelectedItem(product.sid);
                            setFormData({
                              sid: product.sid,
                              src: product.src,
                              name: product.name,
                              price: product.price,
                              type: product.products_type_sid,
                              options_types: data.options_types
                                .filter((ot) => {
                                  return product.sid === ot.product_sid;
                                })
                                .map((ot) => {
                                  return ot.sid;
                                }),
                              note: product.note,
                              discount: product.discount,
                              available: product.available,
                            });
                            window.scrollTo(0, 0);
                          }}
                        >
                          <div className="td w10">
                            <img
                              src={`http://${siteName}:3001/uploads/${product.src}`}
                              alt=""
                            />
                          </div>
                          <div className="td line-1">{product.name}</div>
                          <div className="td">NT${product.price}.00</div>
                          <div className="td">{product.type_name}</div>
                          <div className="td line-2">
                            {displayData.options_types
                              .filter((ot) => {
                                return ot.product_sid === product.sid;
                              })
                              .map((ot) => {
                                return ot.name;
                              })
                              .join()}
                          </div>
                          <div className="td line-2">{product.note}</div>
                          <div className="td">
                            {product.available ? '上架中' : '未上架'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
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
    </>
  );
}

export default Product;
