import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

function Menubar() {
  const [pageNow, setPageNow] = useState('總覽');
  return (
    <>
      <div className="store-admin">
        <ul className="menubar">
          <li>
            <Link
              onClick={() => {
                setPageNow('總覽');
              }}
              className={pageNow === '總覽' ? 'active' : ''}
              to="/Store/StoreTypeEdit"
            >
              總覽
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                setPageNow('類別');
              }}
              className={pageNow === '類別' ? 'active' : ''}
              to="/Store/StoreTypeEdit/type"
            >
              類別
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                setPageNow('餐點');
              }}
              className={pageNow === '餐點' ? 'active' : ''}
              to="/Store/StoreTypeEdit/product"
            >
              餐點
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                setPageNow('客製化選項');
              }}
              className={pageNow === '客製化選項' ? 'active' : ''}
              to="/Store/StoreTypeEdit/option"
            >
              客製化選項
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </>
  );
}

export default Menubar;
