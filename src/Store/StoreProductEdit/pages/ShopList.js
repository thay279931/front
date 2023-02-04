import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import Overview from './Overview';
const siteName = '35.221.208.241';
function ShopList() {
  const [shopList, setShopList] = useState([]);
  const navigate = useNavigate();
  const getShopList = async () => {
    const response = await axios.get(`http://${siteName}:3001/store-list`);
    const rd = response.data;
    setShopList([...rd]);
  };

  useEffect(() => {
    getShopList();
  }, []);

  return (
    <>
      <ul>
        {shopList.map((shop) => {
          return (
            <li
              key={shop.sid}
              onClick={(e) => {
                const user = {
                  sid: shop.sid,
                  shop_name: shop.name,
                };
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/overview');
              }}
            >
              {shop.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ShopList;
