import { useEffect, useState } from 'react';
import { useCart } from '../Context/CartProvider';
import { useFunc } from '../Context/FunctionProvider';

function CartTemp() {
  const { notLoginGetFetch } = useFunc();
  const [datas, setDatas] = useState([]);
  const [shopName, setShopName] = useState('Pasta');
  const [shopSid, setShopSid] = useState(89);
  const getTempData = async () => {
    const res = await notLoginGetFetch('getTempProductList');
    setDatas(res)
    console.log(res);
  };
  //  addCart(1, 2, '一號店', '二號產品', 80, 70, '', {});
  //  addCart(shopSid, value.sid, shopName, value.name,price, (price - discount), '', {});
  //  reduceCart(shopSid, value.sid);
  /*{
    "sid": 1102,
    "name": "義式肉醬麵",
    "shop_sid": 89,
    "price": 120,
    "products_type_sid": 1,
    "available": 1,
    "type": "1",
    "product_order": 0,
    "discount": 0,
    "note": ""
  }*/
  //Function
  const { addCart, reduceCart } = useCart();
  useEffect(() => {
    getTempData();
  }, []);
  return (
    <div className="disf padV20 padH20 fw-w jc-c ai-c gap10">
      {datas.map((value) => {
        return (
          <>
            <div className="w25p" key={value.sid}>
              <button
                onClick={() => {
                  addCart(
                    shopSid,
                    value.sid,
                    shopName,
                    value.name,
                    Number(value.price),
                    Number(value.price - value.discount),
                    '',
                    {}
                  );
                }}
              >
                ＋
              </button>
              {value.name}
              <button
                onClick={() => {
                  reduceCart(shopSid, value.sid);
                }}
              >
                －
              </button>
            </div>
          </>
        );
      })}

      {/* <div>
        <button
          onClick={() => {
            addCart(1, 2, '一號店', '二號產品', 80, 70, '', {});
          }}
        >
          (1,2)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 2);
          }}
        >
          (1,2)-
        </button>
      </div> */}

      {/* <div>
        <button
          onClick={() => {
            addCart(1, 2, '一號店', '二號產品', 80, 70, '', {});
          }}
        >
          (1,2)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 2);
          }}
        >
          (1,2)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(2, 3, '二號店', '三號產品', 50, 50, '', {});
          }}
        >
          (2,3)+
        </button>
        <button
          onClick={() => {
            reduceCart(2, 3);
          }}
        >
          (2,3)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 1, '一號店', '一號產品', 40, 40, '', {});
          }}
        >
          (1,1)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 1);
          }}
        >
          (1,1)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(3, 4, '三號店', '四號產品', 20, 10, '', {});
          }}
        >
          (3,4)+
        </button>
        <button
          onClick={() => {
            reduceCart(3, 4);
          }}
        >
          (3,4)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 5, '一號店', '五號產品', 100, 100, '', {});
          }}
        >
          (1,5)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 5);
          }}
        >
          (1,5)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 6, '一號店', '六號產品', 120, 120, '', {});
          }}
        >
          (1,6)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 6);
          }}
        >
          (1,6)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 7, '一號店', '七號產品', 10, 10, '', {});
          }}
        >
          (1,7)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 7);
          }}
        >
          (1,7)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 8, '一號店', '八號產品', 50, 50, '', {});
          }}
        >
          (1,8)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 8);
          }}
        >
          (1,8)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 9, '一號店', '九號產品', 90, 80, '', {});
          }}
        >
          (1,9)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 9);
          }}
        >
          (1,9)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 10, '一號店', '十號產品一', 40, 40, '', {});
          }}
        >
          (1,10)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 10);
          }}
        >
          (1,10)-
        </button>
      </div>

      <div>
        {' '}
        <button
          onClick={() => {
            addCart(1, 11, '一號店', '十一號產品', 40, 40, '', {});
          }}
        >
          (1,11)+
        </button>
        <button
          onClick={() => {
            reduceCart(1, 11);
          }}
        >
          (1,11)-
        </button>
      </div>*/}
    </div>
  );
}
export default CartTemp;
