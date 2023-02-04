import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';

function ProductEditForm({ selectedItem, setSelectedItem }) {
  const siteName = '35.221.208.241';

  const [imgSrc, setImgSrc] = useState('');
  const [formData, setFormData] = useState({
    src: '',
    name: '',
    price: '',
    type: '',
    options_types: [],
    note: '',
    discount: '',
    available: true,
  });
  const [data, setData] = useState({
    shop: {},
    types: [],
    product: {},
    options_types: [],
    options: [],
    only_options_types: [],
  });

  const getData = async (sid) => {
    if (sid) {
      const response = await axios.get(
        `http://${siteName}:3001/store-admin/product/edit-form?sid=${sid}`
      );
      const rd = response.data;
      setData({ ...rd });
    } else {
      const shop_sid = JSON.parse(localStorage.getItem('StoreDatas')).sid;
      console.log(shop_sid);
      const response = await axios.get(
        `http://${siteName}:3001/store-admin/product/add-form/?shop_sid=${shop_sid}`
      );
      const rd = response.data;
      setData({ ...rd });
    }
  };

  useEffect(() => {
    getData(selectedItem);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      console.log('data.product !== {}', data.product !== {});
      console.log('data.product is not undefined.');
      setFormData({
        sid: data.product.sid,
        src: data.product.src,
        name: data.product.name,
        price: data.product.price,
        type: data.product.products_type_sid,
        options_types: data.options_types
          .filter((ot) => {
            return data.product.sid === ot.product_sid;
          })
          .map((ot) => {
            return ot.sid;
          }),
        note: data.product.note,
        discount: data.product.discount,
        available: data.product.available,
      });
    }
  }, [data]);

  const fillOutForm = () => {
    document.form1.name.value = '鴛鴦奶茶';
    document.form1.price.value = 70;
    document.form1.type.value = 2;
    document.form1.note.value = 'abc';
    document.form1.discount.value = 5;
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

  const submitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    const response = await axios.post(
      `http://${siteName}:3001/store-admin/product/${data.shop.sid}`,
      fd
    );
    // setReload((v) => v + 1);
    setSelectedItem('');
  };

  const delBtnHandler = async (e) => {
    // e.preventDefault();
    // const response = await axios.delete(
    //   `http://${siteName}:3001/store-admin/product/${selectedItem}`
    // );
    // // setReload((v) => v + 1);
    // setImgSrc('');
    // setSelectedItem('');

    Swal.fire({
      title: '確定要刪除這個餐點?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        e.preventDefault();
        const response = await axios.delete(
          `http://${siteName}:3001/store-admin/product/${selectedItem}`
        );
        // setReload((v) => v + 1);
        setImgSrc('');
        setSelectedItem('');
        Swal.fire('刪除成功');
      }
    });
  };

  const addBtnHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    const response = await axios.post(
      `http://${siteName}:3001/store-admin/product/${data.shop.sid}`,
      fd
    );
    console.log(response.data);
    // setReload((v) => v + 1);
    setImgSrc('');
    setSelectedItem('');
    Swal.fire({
      icon: 'success',
      title: '新增成功',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const editBtnHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(document.form1);
    console.log(fd);
    const response = await axios.put(
      `http://${siteName}:3001/store-admin/product/${data.shop.sid}`,
      fd
    );
    console.log(response.data);
    // setReload((v) => v + 1);
    setImgSrc('');
    setSelectedItem('');
    Swal.fire({
      icon: 'success',
      title: '修改成功',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <div className={`menu-container`}>
        <div className="row">
          <div className="top-edit-bar">
            <div className="left-btn-group">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedItem('');
                  setImgSrc('');
                }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            </div>
            <div className="right-btn-group">
              {selectedItem ? (
                <div onClick={delBtnHandler} className="sm-white-btn">
                  <p>刪除</p>
                </div>
              ) : (
                ''
              )}

              <div
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedItem('');
                  setImgSrc('');
                }}
                className="sm-white-btn cancel-btn"
              >
                <p>取消</p>
              </div>
              <div
                className="sm-black-btn"
                onClick={selectedItem ? editBtnHandler : addBtnHandler}
              >
                <p>儲存</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="edit-form">
            <form action="" onSubmit={submitHandler} name="form1">
              <label hidden>
                <input
                  type="number"
                  value={selectedItem ? formData.sid : ''}
                  name="sid"
                  onFocus={(e) => e.preventDefault()}
                />
              </label>

              <label>
                <input
                  type="text"
                  name="name"
                  value={!(selectedItem === '') ? formData.name : ''}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  placeholder="名稱"
                  onDoubleClick={() => {
                    setFormData({ ...formData, name: '伯爵紅茶鮮奶' });
                  }}
                />
              </label>
              <div className="previewImg">
                <div className="img">
                  <img
                    src={
                      imgSrc
                        ? imgSrc
                        : `http://${siteName}:3001/uploads/${formData.src}`
                    }
                    alt=""
                  />
                </div>
                <div className="direction">
                  <p>餐點相片可協助顧客決定訂購哪些美食，進而提升銷售量。</p>
                  <p>
                    檔案規定：JPG、PNG、GIF 或 WEBP 格式，不可超過 10 MB。
                    所需的最低像素：寬度和高度為 320 x 320 像素。
                  </p>
                  <label hidden>
                    <input
                      className="imgInput"
                      type="file"
                      name="avatar"
                      onChange={uploadImgHandler}
                    />
                  </label>
                  <div
                    onClick={() => {
                      document.form1.avatar.click();
                    }}
                  >
                    <div className="sm-black-btn">新增相片</div>
                  </div>
                </div>
              </div>

              <div className="note-box">
                <p
                  onClick={() => {
                    setFormData({
                      ...formData,
                      note: '柑橘果香(佛手柑)的伯爵紅茶，風味較大正紅茶拿鐵更濃郁、香醇｜總熱量(最高)236 Kcal·總糖量(最高)34g',
                    });
                  }}
                >
                  說明 (選填)
                </p>
                <textarea
                  name="note"
                  id=""
                  cols="30"
                  rows="3"
                  placeholder="輸入說明"
                  value={!(selectedItem === '') ? formData.note : ''}
                  onChange={(e) => {
                    setFormData({ ...formData, note: e.target.value });
                  }}
                ></textarea>
              </div>

              <div className="type-box">
                <p>類別</p>

                <select
                  name="type"
                  id=""
                  value={!(selectedItem === '') ? formData.type : ''}
                  onChange={(e) => {
                    setFormData({ ...formData, type: e.target.value });
                  }}
                >
                  {data.types.map((type) => {
                    return <option value={type.sid}>{type.name}</option>;
                  })}
                </select>
              </div>

              <div className="price-box">
                <p>價格</p>
                <div className="number-input">
                  <div>NT$</div>
                  <input
                    type="number"
                    name="price"
                    value={!(selectedItem === '') ? formData.price : ''}
                    onChange={(e) => {
                      setFormData({ ...formData, price: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div className="ot-box">
                <p className="top">選項類別</p>
                <div className="table">
                  <div className="thead">
                    <div className="tr">
                      <div className="th">名稱</div>
                      <div className="th" hidden>
                        選項數量
                      </div>
                      <div className="th">可選項目</div>
                    </div>
                  </div>
                </div>
                {data.only_options_types.map((ot) => {
                  return (
                    <label>
                      <input
                        key={ot.sid}
                        type="checkbox"
                        name="options_types"
                        value={ot.sid}
                        checked={
                          selectedItem === ''
                            ? false
                            : formData.options_types.includes(ot.sid)
                        }
                        onChange={(e) => {
                          const newData = { ...formData };
                          const index = newData.options_types.indexOf(ot.sid);
                          index === -1
                            ? newData.options_types.push(ot.sid)
                            : newData.options_types.splice(index, 1);
                          setFormData(newData);
                        }}
                      />
                      <div className="option-words">
                        <p>{ot.name}</p>
                        <p hidden>
                          {
                            data.options.filter((opt) => {
                              return opt.options_type_sid === ot.sid;
                            }).length
                          }
                        </p>
                        <p>
                          {data.options
                            .filter((opt) => {
                              return opt.options_type_sid === ot.sid;
                            })
                            .map((opt) => {
                              return opt.name;
                            })
                            .join()}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>

              <label hidden>
                折扣後價格:
                <input
                  type="number"
                  name="discount"
                  value={!(selectedItem === '') ? formData.price : ''}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      discount: e.target.value,
                    });
                  }}
                  hidden
                />
              </label>
              <div className="avail-box">
                <label>
                  是否上架<i className="fa-solid fa-question"></i>
                  <input
                    type="checkbox"
                    name="available"
                    checked={
                      !(selectedItem === '') ? !!formData.available : true
                    }
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        available: e.target.checked ? 1 : 0,
                      });
                    }}
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductEditForm;
