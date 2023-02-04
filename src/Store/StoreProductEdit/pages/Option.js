import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2/dist/sweetalert2.js';

function Option() {
  const siteName = '35.221.208.241';

  const [data, setData] = useState({
    options_types: [],
    options: [],
  });
  const [myUserSid, setMyUserSid] = useState();
  const [formData, setFormData] = useState({
    sid: '',
    name: '',
    min: '',
    max: '',
  });
  const [optionData, setOptionData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [inputText, setInputText] = useState('');
  const [reload, setReload] = useState(0);

  const getData = async (shop_sid) => {
    console.log(shop_sid);
    const response = await axios.get(
      `http://${siteName}:3001/store-admin/option/${shop_sid}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    setMyUserSid(JSON.parse(localStorage.getItem('StoreDatas')).sid);
    // 取得店家菜單資料
    getData(JSON.parse(localStorage.getItem('StoreDatas')).sid);
  }, [reload]);

  const insertBtnHandler = (e) => {
    e.preventDefault();
    if (inputText && inputText.trim()) {
      const newOptionData = [...optionData];
      newOptionData.push({
        sid: 0,
        name: inputText,
        price: 0,
      });
      setOptionData(newOptionData);
      setInputText('');
    }
  };

  const addBtnHandler = async (e) => {
    e.preventDefault();
    console.log({ ...formData, optionData });
    const response = await axios.post(
      `http://${siteName}:3001/store-admin/option/${myUserSid}`,
      { ...formData, optionData }
    );
    console.log(response.data);
    setReload((v) => v + 1);
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
    console.log({ ...formData, optionData });
    const response = await axios.put(
      `http://${siteName}:3001/store-admin/option/${myUserSid}`,
      { ...formData, optionData }
    );
    console.log(response.data);
    setReload((v) => v + 1);
    setSelectedItem('');
    Swal.fire({
      icon: 'success',
      title: '修改成功',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const delBtnHandler = async (e) => {
    // e.preventDefault();
    // const response = await axios.delete(
    //   `http://${siteName}:3001/store-admin/option/${selectedItem}`
    // );
    // setReload((v) => v + 1);
    // setSelectedItem('');
    Swal.fire({
      title: '確定要刪除這個選項群組?',
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
          `http://${siteName}:3001/store-admin/option/${selectedItem}`
        );
        setReload((v) => v + 1);
        setSelectedItem('');
        Swal.fire('刪除成功');
      }
    });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const newOptionData = [...optionData];
    const [spliceOptionData] = newOptionData.splice(source.index, 1);
    console.log(spliceOptionData);
    newOptionData.splice(destination.index, 0, spliceOptionData);
    setOptionData(newOptionData);
  };

  const addDemoOption = async () => {
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
          `http://${siteName}:3001/store-admin/option/demo-data`
        );
        setReload((v) => v + 1);
        setSelectedItem('');
        Swal.fire({
          icon: 'success',
          title: '成功快速填入資料',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.isDenied) {
        const response = await axios.delete(
          `http://${siteName}:3001/store-admin/option/demo-data`
        );
        setReload((v) => v + 1);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="store-admin">
          {!(selectedItem === '') ? (
            <></>
          ) : (
            <>
              <div className={`menu-container`}>
                <div className="row">
                  <div className="menu-title">
                    <h4 onClick={addDemoOption}>客製化選項</h4>
                    <div
                      className="bg-black-btn"
                      onClick={() => {
                        setSelectedItem(0);
                        setFormData({
                          sid: '',
                          name: '',
                          min: '',
                          max: '',
                        });
                        setOptionData([]);
                      }}
                    >
                      <i class="fa-solid fa-plus btn-icon"></i>
                      <p>新增選項類別群組</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="table">
                    <div className="thead">
                      <div className="tr">
                        <div className="th th-3">名稱</div>
                        <div className="th th-3">包含選項</div>
                        <div className="th th-3">說明</div>
                      </div>
                    </div>
                    <div className="tbody">
                      {data.options_types.map((ot) => {
                        return (
                          <div
                            className="tr"
                            onClick={() => {
                              setSelectedItem(ot.sid);
                              setFormData({
                                sid: ot.sid,
                                name: ot.name,
                                min: ot.min,
                                max: ot.max,
                              });
                              const newOptionData = data.options
                                .filter((opt) => {
                                  return opt.options_type_sid === ot.sid;
                                })
                                .map((opt) => {
                                  return {
                                    sid: opt.sid,
                                    name: opt.name,
                                    price: opt.price,
                                  };
                                });
                              console.log(newOptionData);
                              setOptionData(newOptionData);
                              window.scrollTo(0, 0);
                            }}
                          >
                            <div className="td td-3">{ot.name}</div>
                            <div className="td td-3">
                              {data.options
                                .filter((opt) => {
                                  return opt.options_type_sid === ot.sid;
                                })
                                .map((opt) => {
                                  return opt.name;
                                })
                                .join()}
                            </div>
                            <div className="td td-3">
                              至少選{ot.min}項，至多選{ot.max}項
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
              <div className={`menu-container`}>
                <div className="row top-edit-area">
                  <div className="top-edit-bar">
                    <div className="left-btn-group">
                      <div
                        onClick={(e) => {
                          setSelectedItem('');
                        }}
                      >
                        <i className="fa-solid fa-arrow-left"></i>
                      </div>
                    </div>
                    <div className="right-btn-group">
                      {selectedItem ? (
                        <div className="sm-white-btn" onClick={delBtnHandler}>
                          刪除
                        </div>
                      ) : (
                        ''
                      )}
                      <div
                        className="sm-white-btn cancel-btn"
                        onClick={(e) => {
                          setSelectedItem('');
                        }}
                      >
                        取消
                      </div>
                      <div
                        className="sm-black-btn"
                        onClick={selectedItem ? editBtnHandler : addBtnHandler}
                      >
                        儲存
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="edit-form">
                    <form action="" name="form1">
                      <div className="option-box">
                        <label hidden>
                          <input
                            type="number"
                            name="sid"
                            value={selectedItem ? formData.sid : ''}
                          />
                        </label>

                        <label>
                          <input
                            type="text"
                            name="name"
                            value={!(selectedItem === '') ? formData.name : ''}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              });
                            }}
                            onDoubleClick={() => {
                              setFormData({
                                ...formData,
                                name: '配料選擇',
                              });
                            }}
                            placeholder="名稱"
                          />
                        </label>
                        <div className="amount-area">
                          <div className="amount-box">
                            <p>顧客最少必須選擇幾個客製化項目?</p>
                            <input
                              type="number"
                              name="min"
                              value={!(selectedItem === '') ? formData.min : ''}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  min: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="amount-box">
                            <p>顧客最多可以選擇幾個客製化項目?</p>

                            <input
                              type="number"
                              name="max"
                              value={!(selectedItem === '') ? formData.max : ''}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  max: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div className="option-group-area">
                          <h6>客製化選項</h6>
                          <div className="option-enter-box">
                            <input
                              type="text"
                              value={inputText}
                              onChange={(e) => {
                                setInputText(e.target.value);
                              }}
                            />
                            <button
                              className="sm-black-btn"
                              onClick={insertBtnHandler}
                            >
                              新增
                            </button>
                          </div>

                          <div className="table">
                            <div className="thead">
                              <div className="tr">
                                <div
                                  className="th"
                                  onClick={() => {
                                    const newOptionData = [...optionData];

                                    newOptionData.push({
                                      sid: 0,
                                      name: '布丁',
                                      price: 15,
                                    });
                                    newOptionData.push({
                                      sid: 0,
                                      name: '粉條',
                                      price: 10,
                                    });
                                    newOptionData.push({
                                      sid: 0,
                                      name: '椰果',
                                      price: 5,
                                    });
                                    setOptionData(newOptionData);
                                  }}
                                >
                                  選項名稱
                                </div>
                                <div className="th">價格</div>
                              </div>
                            </div>
                            <Droppable droppableId="drop-id">
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                >
                                  <div className="tbody">
                                    {optionData.map((opt, index) => {
                                      return (
                                        <Draggable
                                          draggableId={`opt${index}`}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <tr
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              ref={provided.innerRef}
                                            >
                                              <td hidden>
                                                <label>
                                                  sid:
                                                  <input
                                                    type="number"
                                                    name="option_sid"
                                                    value={opt.sid}
                                                  />
                                                </label>
                                              </td>

                                              <td>
                                                <i className="fa-solid fa-equals"></i>
                                              </td>

                                              <td>
                                                <label>
                                                  <input
                                                    type="text"
                                                    name="name"
                                                    value={opt.name}
                                                    onChange={(e) => {
                                                      const newOptionData = [
                                                        ...optionData,
                                                      ];
                                                      newOptionData[
                                                        index
                                                      ].name = e.target.value;
                                                      setOptionData(
                                                        newOptionData
                                                      );
                                                    }}
                                                  />
                                                </label>
                                              </td>
                                              <td>
                                                <div className="price-box">
                                                  <label className="number-input">
                                                    <div>+ NT$</div>
                                                    <input
                                                      type="number"
                                                      name="price"
                                                      value={opt.price}
                                                      onChange={(e) => {
                                                        const newOptionData = [
                                                          ...optionData,
                                                        ];
                                                        newOptionData[
                                                          index
                                                        ].price =
                                                          e.target.value;
                                                        setOptionData(
                                                          newOptionData
                                                        );
                                                      }}
                                                    />
                                                  </label>
                                                </div>
                                              </td>
                                              <td>
                                                <i
                                                  className="fa-solid fa-trash"
                                                  onClick={() => {
                                                    const newOptionData = [
                                                      ...optionData,
                                                    ];
                                                    newOptionData.splice(
                                                      index,
                                                      1
                                                    );
                                                    setOptionData(
                                                      newOptionData
                                                    );
                                                  }}
                                                ></i>
                                              </td>
                                            </tr>
                                          )}
                                        </Draggable>
                                      );
                                    })}
                                  </div>
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DragDropContext>
    </>
  );
}

export default Option;
