//訂單進度條
import { useEffect, useState } from 'react';

function ProgessStep({ step }) {
  const [stepClassName, setStepClassName] = useState(['active', '', '', '']);
  const setStepName = (stepNow) => {
    switch (stepNow) {
      case 1:
        setStepClassName(['active', '', '', '']);
        break;
      case 2:
        setStepClassName(['active', 'active', '', '']);
        break;
      case 3:
        setStepClassName(['active', 'active', 'active', '']);
        break;
      case 4:
        setStepClassName(['active', 'active', 'active', 'active']);
        break;
      default:
        break;
    }
  };
  //  階段:{step}
  useEffect(() => {
    setStepName(step);
  }, [step]);
  return (
    <div className="padH20 padV20 po-r">
      <div className="ProgessStep">
        {/* 字+圓 */}
        <div className="stepText">
          <p className={`${stepClassName[0]}`}>未接單</p>
          <div className="stepCircleFrame">
            <div></div>
            <div>
              <div className={`step circle w100p ${stepClassName[0]}`}></div>
            </div>
            <div className={`step line ${stepClassName[1]}`}></div>
          </div>
        </div>

        {/* 線 */}
        <div className="stepLine ">
          <div className=""></div>
          <div className="flexSetCenter">
            <div className={`step line w100p ${stepClassName[1]}`}></div>
          </div>
        </div>

        <div className="stepText active">
          <p className={stepClassName[1]}>製作中</p>
          <div className="stepCircleFrame">
            <div className={`step line  ${stepClassName[1]} `}></div>
            <div>
              <div className={`step circle w100p ${stepClassName[1]}`}></div>
            </div>
            <div className={`step line ${stepClassName[2]}`}></div>
          </div>
        </div>

        <div className="stepLine">
          <div className=""></div>
          <div className="flexSetCenter">
            <div className={`step line w100p ${stepClassName[2]}`}></div>
          </div>
        </div>

        <div className="stepText">
          <p className={stepClassName[2]}>已完成</p>
          <div className="stepCircleFrame">
            <div className={`step line ${stepClassName[2]}`}></div>
            <div>
              <div className={`step circle w100p ${stepClassName[2]}`}></div>
            </div>
            <div className={`step line ${stepClassName[3]}`}></div>
          </div>
        </div>

        <div className="stepLine">
          <div className=""></div>
          <div className="flexSetCenter">
            <div className={`step line w100p ${stepClassName[3]}`}></div>
          </div>
        </div>

        <div className="stepText">
          <p className={stepClassName[3]}>送達中</p>
          <div className="stepCircleFrame">
            <div className={`step line ${stepClassName[3]}`}></div>
            <div>
              <div className={`step circle w100p  ${stepClassName[3]}`}></div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProgessStep;
