//歷史訂單 評價
import { useState } from 'react';
import { useFunc } from '../../Context/FunctionProvider';

function OrderCommand({
  side,
  setOpenShopCommand,
  setOpenDeliverCommand,
  orderSid,
  targetSid,
  setReloading,
}) {
  const { loginCheckPostFetch } = useFunc();
  const sideList = ['', '', '店家', '外送員'];
  const fetchList = ['', '', 'store', 'deliver'];
  const [command, setCommand] = useState('');
  const [stars, setStars] = useState(1);
  const SolidStar = () => {
    return <i className="fa-solid fa-star fs36 fontMainColor pointer"></i>;
  };
  const EmptyStar = () => {
    return <i className="fa-regular fa-star fs36 fontMainColor pointer"></i>;
  };
  const confirmCommand = async () => {
    const postData = JSON.stringify({
      command,
      stars,
      orderSid,
      targetSid,
    });
    const result = await loginCheckPostFetch(
      `OrderCommand/${fetchList[side]}`,
      'Member',
      postData
    );
    console.log(result);
  };
  return (
    <>
      <div className="grayBack">
        <div className=" bgcW padV20 padH20 orderCommandBox">
          <p className="ta-c borderBotGray3 padV20 padH20 fw6 fs32">
            {sideList[side]}評價
          </p>
          {/* <i className="fa-regular fa-star"></i> */}
          {/* <i className="fa-solid fa-star"></i> */}
          <div className="borderBotGray3 padV20 padH20 ta-c">
            {Array(5)
              .fill(1)
              .map((v, i) => {
                const starNow = i + 1;
                return (
                  <span
                    onClick={() => {
                      setStars(starNow);
                    }}
                    key={i}
                  >
                    {starNow <= stars ? <SolidStar /> : <EmptyStar />}
                    {/* <SolidStar /> */}
                  </span>
                );
              })}
            {/* <SolidStar />
            <EmptyStar /> */}
          </div>
          <p
            onClick={() => {
              //快速填入
              const commandMsg = side === 2 ? '飲料是水做的嗎?' : '都漏出來了';
              const getStar = side === 2 ? 3 : 2;
              setStars(getStar);
              setCommand(commandMsg);
            }}
            className="ta-c padV20 padH20 fw6 fs32"
          >
            給予評價
          </p>
          <div className="flexSetCenter">
            <textarea
              autoFocus={true}
              style={{ resize: 'none',paddingInlineStart:'5px' }}
              className="w250 h200 fs24 fw6"
              value={command}
              onChange={(e) => {
                setCommand(e.target.value);
              }}
            />
          </div>
          <div className="disf jc-sb padV20 padH20">
            <p
              onClick={() => {
                confirmCommand();
                setReloading((v) => v + 1);
                if (side === 2) {
                  setOpenShopCommand(false);
                } else if (side === 3) {
                  setOpenDeliverCommand(false);
                }
              }}
              className="pointer fs18 fw7 fontW padV10 padH10 bgcMain"
            >
              確定
            </p>
            <p
              className="pointer fs18 fw7 fontW padV10 padH10 bgcMain"
              onClick={() => {
                if (side === 2) {
                  setOpenShopCommand(false);
                } else if (side === 3) {
                  setOpenDeliverCommand(false);
                }
              }}
            >
              取消
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderCommand;
