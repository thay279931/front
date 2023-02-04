import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import EditTypeForm from '../components/EditTypeForm';
import '../styles/style.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2/dist/sweetalert2.js';

function Type() {
  const siteName = '35.221.208.241';

  const [data, setData] = useState({
    types: [],
    products: [],
  });

  // 如果sid===''，則隱藏editBox；如果sid===0，則跳出新增的editBox；如果有sid則跳出可修改該type的editBox
  const [editType, setEditType] = useState({
    type_sid: '',
    type_name: '',
  });

  const [reload, setReload] = useState(0);

  const getData = async (myUser) => {
    const response = await axios.get(
      `http://${siteName}:3001/store-admin/type/${myUser}`
    );
    const rd = response.data;
    setData({ ...rd });
  };

  useEffect(() => {
    // 取出localStorage中的店家資料
    const myUser = JSON.parse(localStorage.getItem('StoreDatas'));

    // 取得店家菜單資料
    getData(myUser.sid);
    // console.log(data);
  }, [reload]);

  // 點擊儲存按鈕
  const addBtnHandler = async () => {
    // 因為insert一筆新的資料需要shop_sid，所以先找到localStorage的sid
    const myUserId = JSON.parse(localStorage.getItem('StoreDatas')).sid;
    const response = await axios.post(
      `http://${siteName}:3001/store-admin/type/${myUserId}`,
      editType
    );
    console.log(response.data.error);
    setReload((v) => v + 1);
    setEditType({
      type_sid: '',
      type_name: '',
    });

    Swal.fire({
      icon: 'success',
      title: '新增成功',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const editBtnHandler = async (sid) => {
    Swal.fire({
      icon: 'success',
      title: '修改成功',
      showConfirmButton: false,
      timer: 1500,
    });
    const response = await axios.put(
      `http://${siteName}:3001/store-admin/type/${sid}`,
      editType
    );
    setReload((v) => v + 1);
    setEditType({
      type_sid: '',
      type_name: '',
    });
    Swal.fire({
      icon: 'success',
      title: '修改成功',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const delBtnHandler = async (sid) => {
    // const response = await axios.delete(
    //   `http://${siteName}:3001/store-admin/type/${sid}`
    // );
    // setReload((v) => v + 1);
    // setEditType({
    //   type_sid: '',
    //   type_name: '',
    // });
    Swal.fire({
      title: '確定要刪除這個類別?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://${siteName}:3001/store-admin/type/${sid}`
        );
        setReload((v) => v + 1);
        setEditType({
          type_sid: '',
          type_name: '',
        });
        Swal.fire('刪除成功');
      }
    });
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    // 先處理要傳後端的資料
    const body = [];
    body.push(data.types[source.index]);
    body.push(data.types[destination.index]);
    // 前端State變化
    const newData = { ...data };
    const [spliceData] = newData.types.splice(source.index, 1);
    console.log(spliceData);
    newData.types.splice(destination.index, 0, spliceData);
    setData(newData);
    // 把後端資料傳出去
    const response = await axios.put(
      `http://${siteName}:3001/store-admin/type/order`,
      newData.types
    );
  };

  // 快速填入類別
  const addDemoTypes = async () => {
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
          `http://${siteName}:3001/store-admin/type/demo-data`
        );
        setReload((v) => v + 1);
        setEditType({
          type_sid: '',
          type_name: '',
        });
        Swal.fire({
          icon: 'success',
          title: '成功快速填入資料',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.isDenied) {
        const response = await axios.delete(
          `http://${siteName}:3001/store-admin/type/demo-data`
        );
        setReload((v) => v + 1);
        setEditType({
          type_sid: '',
          type_name: '',
        });
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
          {editType.type_sid === '' ? (
            <>
              <div className={`menu-container`}>
                <div className="row top-edit-area">
                  <div className="menu-title">
                    <h4 onClick={addDemoTypes}>類別</h4>
                    <div
                      className="bg-black-btn"
                      onClick={() => {
                        setEditType({
                          ...editType,
                          type_name: '',
                          type_sid: 0,
                        });
                      }}
                    >
                      <i class="fa-solid fa-plus btn-icon"></i>
                      <p>新增類別</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="table">
                    <div className="thead">
                      <div className="tr-type">
                        <div className="th">名稱</div>
                        <div className="th">項目數量</div>
                        <div className="th">項目內容</div>
                      </div>
                    </div>
                    <Droppable droppableId="drop-id">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <div className="tbody">
                            {data.types.map((type, index) => {
                              return (
                                <Draggable
                                  draggableId={`type${index}`}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      className="tr-type"
                                      key={type.sid}
                                      // 點到誰就把editType變成誰
                                      onClick={() => {
                                        setEditType({
                                          ...editType,
                                          type_sid: type.sid,
                                          type_name: type.name,
                                        });
                                        window.scrollTo(0, 0);
                                      }}
                                    >
                                      <div className="td">
                                        <i className="fa-solid fa-equals"></i>
                                        {type.name}
                                      </div>
                                      <div className="td">
                                        共
                                        {
                                          data.products.filter((p) => {
                                            return (
                                              p.products_type_sid === type.sid
                                            );
                                          }).length
                                        }
                                        項餐點
                                      </div>
                                      <div className="td">
                                        {data.products
                                          .filter((p) => {
                                            return (
                                              p.products_type_sid === type.sid
                                            );
                                          })
                                          .map((p) => {
                                            return p.name;
                                          })
                                          .join()}
                                      </div>
                                    </div>
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
            </>
          ) : (
            <></>
          )}

          {!(editType.type_sid === '') ? (
            <>
              <div className={`menu-container`}>
                <div className="row">
                  <div className="top-edit-bar">
                    <div className="left-btn-group">
                      <div
                        onClick={() => {
                          setEditType({ type_name: '', type_sid: '' });
                        }}
                      >
                        <i className="fa-solid fa-arrow-left"></i>
                      </div>
                    </div>

                    <div className="right-btn-group">
                      {editType.type_sid === 0 ? (
                        ''
                      ) : (
                        <div
                          className="sm-white-btn"
                          onClick={() => {
                            delBtnHandler(editType.type_sid);
                          }}
                        >
                          <p>刪除</p>
                        </div>
                      )}
                      <div
                        className="sm-white-btn cancel-btn"
                        onClick={() => {
                          setEditType({ type_name: '', type_sid: '' });
                        }}
                      >
                        <p>取消</p>
                      </div>
                      <div
                        className="sm-black-btn"
                        onClick={
                          editType.type_sid === 0
                            ? addBtnHandler
                            : () => {
                                editBtnHandler(editType.type_sid);
                              }
                        }
                      >
                        <p>儲存</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="edit-form">
                    <form action="" name="editForm">
                      <label hidden>
                        <input
                          type="number"
                          name="type_sid"
                          value={editType.type_sid}
                        />
                      </label>

                      <label>
                        <input
                          type="text"
                          name="type_name"
                          value={editType.type_name}
                          onChange={(e) => {
                            setEditType({
                              ...editType,
                              type_name: e.target.value,
                            });
                          }}
                          placeholder="名稱"
                          onDoubleClick={() => {
                            setEditType({
                              ...editType,
                              type_name: '人氣精選',
                            });
                          }}
                        />
                      </label>
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </DragDropContext>
    </>
  );
}

export default Type;
