import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ContextProviders from './Context/ContextProvider';
import './reset.css';
import './CssTemplate.css';
//===============================================分隔線================================================
//一般首頁
import IndexPage from './IndexPage';
//404
import NoFound from './NoFound';
//首頁內容
import Home from './Home';
//===============================================分隔線================================================
//可通用元件
//客服
import NotAdminService from './NotAdminService';
//===============================================分隔線================================================
//會員登入
import MemberLogin from './Member/MemberLogin';
//會員中心
import MemberLayout from './Member/MemberLayout';
//會員中心內容 會員資料
import MemberDatas from './Member/MemberDatas';
//會員中心 紅利點數
import MemberPoint from './Member/MemberPoint';
//會員中心 現在訂單
import MemberOrder from './Member/MemberOrder';
//會員中心 優惠券
import MemberCoupon from './Member/MemberCoupon';
//會員註冊
import MemberRegister from './Member/MemberRegister';
//會員最愛列表
import FavoriteStore from './Member/FavoriteStore';
//會員位置記錄管理
import MemberLocation from './Member/MemberLocation';
//會員歷史訂單
import MemberOldOrder from './Member/MemberOldOrder';
import ResetPass from './Member/ResetPass';

//===============================================分隔線================================================
//店家首頁
import Store from './Store';
//店家首頁內容
import StoreHome from './Store/StoreHome';
//店家現在訂單
import StoreOrder from './Store/StoreOrder';
//店家登入
import StoreLogin from './Store/StoreLogin';
//店家資料
import StoreDatas from './Store/StoreDatas';
//店家商品管理
// import StoreProductEdit from './Store/StoreProductEdit';
import Menubar from './Store/StoreProductEdit/components/Menubar';
import Overview from './Store/StoreProductEdit/pages/Overview';
import Type from './Store/StoreProductEdit/pages/Type';
import Product from './Store/StoreProductEdit/pages/Product';
import Option from './Store/StoreProductEdit/pages/Option';
import ShopList from './Store/StoreProductEdit/pages/ShopList';
//店家分類管理
import StoreTypeEdit from './Store/StoreTypeEdit';
//店家註冊
import StoreRegister from './Store/StoreRegister';
//店家歷史訂單
import StoreOldOrder from './Store/StoreOldOrder';
//店家銷售分析
import StoreSellAnalyze from './Store/StoreSellAnalyze';
//===============================================分隔線================================================
//外送員
import DeliverLayout from './Deliver';
//外送員登入頁
import DeliverLogin from './Deliver/DeliverLogin';
//外送員註冊
import DeliverRegister from './Deliver/DeliverRegister';
//外送員確認訂單
import DeliverConfirmOrder from './Deliver/DeliverConfirmOrder';
//外送員訂單
import DeliverOrder from './Deliver/DeliverOrder';
//外送員資料頁
import DeliverDatas from './Deliver/DeliverDatas';
//外送員即時通訊
import DeliverMessager from './Deliver/DeliverMessager';
//外送員地圖頁
import DeliverMap from './Deliver/DeliverMap';
//===============================================分隔線================================================
//管理者首頁
import Admin from './Admin';
//管理者首頁內容
import AdminHome from './Admin/AdminHome';
//優惠券管理
import EditCoupon from './Admin/EditCoupon';
//管理者會員資料管理
import EditMemberData from './Admin/EditMemberData';
//管理者店家資料管理
import EditStoreData from './Admin/EditStoreData';
//管理者外送員資料管理
import EditDeliverData from './Admin/EditDeliverData';
//管理者客服
import AdminService from './Admin/AdminService';
//===============================================分隔線================================================
//購物流程--店家列表
import Shopping from './Shopping/Shopping';
//購物車加減 臨時頁
import CartTemp from './Temp/CartTemp';
//優惠券
import Coupon from './Shopping/Coupon';
//店家內商品列表
import StoreDetail from './Shopping/StoreDetail';
import ProductList from './Store/StoreProductEdit/pages/ProductList';
//結帳頁
import Pay from './Shopping/Pay';
//台北市預留頁
import Taipei from './Shopping/Taipei';
//LinePay
import LinePay from './Shopping/LinePay';
//LinePay 結帳完成頁
import PayConfirmed from './Shopping/LinePay/PayConfirmed';
//店家評價
import StoreEvaluation from './Store/StoreEvaluation';
import ShowNearShop from './Shopping/ShowNearShop';
//===============================================分隔線================================================
function App() {
  return (
    //登入檢查狀態 全域狀態
    <ContextProviders>
      {/* 路由設定 */}
      <BrowserRouter>
        <Routes>
          {/* 店家  */}
          {/* 店家首頁 放店家Navbar  */}
          <Route path="/Store" element={<Store />}>
            {/* 店家基礎頁 */}
            {/* 店家登入 */}
            {/* ~/Store/StoreLogin */}
            <Route path="StoreLogin" element={<StoreLogin />} />
            {/* 店家現在訂單 */}
            {/* ~/Store */}
            <Route index element={<StoreOrder />} />
            {/* 店家資料頁/編輯 */}
            {/* ~/Store/StoreDatas */}
            <Route path="StoreDatas" element={<StoreDatas />} />
            {/* 店家商品分類管理 */}
            {/* ~/Store/StoreTypeEdit */}
            <Route path="StoreTypeEdit" element={<Menubar />}>
              {/* 店家商品管理 */}
              {/* ~/Store/StoreProductEdit */}
              {/* <Route path="StoreProductEdit" element={<StoreProductEdit />} /> */}
              {/* <Route index element={<ShopList />} /> */}
              <Route index element={<Overview />} />
              <Route path="type" element={<Type />} />
              <Route path="product" element={<Product />} />
              <Route path="option" element={<Option />} />
            </Route>

            {/* 店家註冊 */}
            {/* ~/Store/StoreRegister */}
            <Route path="StoreRegister" element={<StoreRegister />} />
            {/* 店家歷史訂單 */}
            {/* ~/Store/StoreOldOrder */}
            <Route path="StoreOldOrder" element={<StoreOldOrder />} />
            {/* 店家銷售分析 */}
            {/* ~/Store/StoreSellAnalyze */}
            <Route path="StoreSellAnalyze" element={<StoreSellAnalyze />} />
            {/* 店家客服 */}
            {/* ~/Store/StoreService */}
            <Route
              path="StoreService"
              element={<NotAdminService sideName={'Store'} />}
            />
          </Route>

          {/* 外送員  */}
          <Route path="/Deliver" element={<DeliverLayout />}>
            {/* 外送員登入 */}
            {/* ~/Deliver/DeliverLogin */}
            <Route path="DeliverLogin" element={<DeliverLogin />} />
            {/* 外送員註冊 */}
            {/* ~/Deliver/DeliverRegister */}
            <Route path="DeliverRegister" element={<DeliverRegister />} />
            {/* 外送員資料頁/編輯 */}
            {/* ~/Deliver/DeliverDatas */}
            <Route path="DeliverDatas" element={<DeliverDatas />} />
            {/* 外送員接單 */}
            {/* ~/Deliver/DeliverConfirmOrder */}
            <Route
              path="DeliverConfirmOrder"
              element={<DeliverConfirmOrder />}
            />
            {/* 外送員訂單 */}
            {/* ~/Deliver/DeliverOrder */}
            <Route path="DeliverOrder" element={<DeliverOrder />} />
            {/* 外送員地圖 */}
            {/* ~/Deliver/DeliverMap */}
            <Route path="DeliverMap" element={<DeliverMap />} />
            {/* 外送員即時通訊 */}
            {/* ~/Deliver/DeliverMessager */}
            <Route path="DeliverMessager" element={<DeliverMessager />} />
            {/* 外送員客服 */}
            {/* ~/Deliver/DeliverService */}
            <Route
              path="DeliverService"
              element={<NotAdminService sideName={'Deliver'} />}
            />
          </Route>

          {/* 管理者  */}
          <Route path="/Admin" element={<Admin />}>
            {/* 管理者基礎頁 */}
            {/* ~/Admin */}
            <Route index element={<AdminHome />} />
            {/* 會員管理 */}
            {/* ~/Admin/EditMemberData */}
            <Route path="EditMemberData" element={<EditMemberData />} />
            {/* 店家管理 */}
            {/* ~/Admin/EditStoreData */}
            <Route path="EditStoreData" element={<EditStoreData />} />
            {/* 外送管理 */}
            {/* ~/Admin/EditDeliverData */}
            <Route path="EditDeliverData" element={<EditDeliverData />} />
            {/* 優惠券管理 */}
            {/* ~/Admin/EditCoupon */}
            <Route path="EditCoupon" element={<EditCoupon />} />
            {/* 客服 */}
            {/* ~/Admin/AdminService */}
            <Route path="AdminService" element={<AdminService />} />
          </Route>

          {/* 會員/購物首頁 要放會員Navbar */}
          <Route path="/" element={<IndexPage />}>
            {/* 首頁 */}
            {/* ~ */}
            <Route index element={<Home />} />
            {/* ===============================================分隔線================================================ */}
            {/* 購物流程 */}
            {/* 附近店家 */}
            <Route path="ShowNearShop" element={<ShowNearShop />} />
            {/* 店家列表 QueryString用於篩選 */}
            {/* ~/Shopping */}
            <Route path="Shopping" element={<Shopping />} />
            {/* 店家內商品列表 商品選取用卡片式 不用連結 */}
            {/* ~/StoreDetail */}
            <Route path="StoreDetail" element={<StoreDetail />} />
            <Route path="productList" element={<ProductList />} />
            {/* 結帳頁 */}
            {/* ~/Pay */}
            <Route path="Pay" element={<Pay />} />
            {/* 優惠券 */}
            {/* ~/Coupon */}
            <Route path="Coupon" element={<Coupon />} />
            {/* 台北市 展示用 其他城市不用做 */}
            {/* ~/City/Taipei */}
            <Route path="/City/Taipei" element={<Taipei />} />
            {/* 測試用購物車頁 */}
            {/* ~/CartTemp */}
            <Route path="CartTemp" element={<CartTemp />} />
            {/* LinePay 測試頁 */}
            {/* ~/LinePay */}
            <Route path="LinePay" element={<LinePay />} />
            {/* LinePay 結帳完成頁 */}
            {/* ~/PayConfirmed */}
            <Route path="PayConfirmed" element={<PayConfirmed />} />
            {/* 店家評價 */}
            <Route path="StoreEvaluation" element={<StoreEvaluation />} />
            {/* ===============================================分隔線================================================ */}
            {/* 會員註冊 */}
            {/* ~/MemberRegister */}
            <Route path="MemberRegister" element={<MemberRegister />} />
            {/* 會員登入 */}
            {/* ~/MemberLogin */}
            <Route path="MemberLogin" element={<MemberLogin />} />
            {/* 會員中心 */}
            <Route path="Member" element={<MemberLayout />}>
              {/* 會員資料頁/編輯 */}
              {/* ~/Member */}
              <Route index element={<MemberDatas />} />
              {/* 會員現在訂單 */}
              {/* ~/Member/MemberOrder */}
              <Route path="MemberOrder" element={<MemberOrder />} />
              {/* 會員優惠券 */}
              {/* ~/Member/MemberCoupon */}
              <Route path="MemberCoupon" element={<MemberCoupon />} />
              {/* 會員紅利明細 */}
              {/* ~/Member/MemberPoint */}
              <Route path="MemberPoint" element={<MemberPoint />} />
              {/* 會員最愛列表 */}
              {/* ~/Member/FavoriteStore */}
              <Route path="FavoriteStore" element={<FavoriteStore />} />
              {/* 會員最愛列表 */}
              {/* ~/Member/MemberLocation */}
              <Route path="MemberLocation" element={<MemberLocation />} />
              {/* 會員歷史訂單 */}
              {/* ~/Member/MemberOldOrder */}
              <Route path="MemberOldOrder" element={<MemberOldOrder />} />
              {/* 會員客服 */}
              {/* ~/Member/MemberService */}
              <Route path="resetPass" element={<ResetPass />} />
              <Route
                path="MemberService"
                element={<NotAdminService sideName={'Member'} />}
              />
            </Route>
          </Route>

          {/* 404未找到的頁面路由，需放在最下方 */}
          <Route path="*" element={<NoFound />} />
        </Routes>
      </BrowserRouter>
    </ContextProviders>
  );
}

export default App;
