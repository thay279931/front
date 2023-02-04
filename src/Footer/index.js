import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSVG } from '../Context/SVGProvider';
import { useAuth } from '../Context/AuthProvider';
function Footer({ styles }) {
  const loaction = useLocation();
  const navi = useNavigate();
  const { authStore } = useAuth();
  const { logoSVG, fbSVG, igSVG } = useSVG();
  return (
    <>
      <footer className="w100p footerBox" style={styles}>
        {/* <div className="footerDivideLine w90p"></div> */}
        <div className="disf jc-sb ai-c fd-sc-br">
          <p
            className="padH20 pointer"
            onClick={() => {
              navi('/');
            }}
          >
            {logoSVG('fillMainColor')}
          </p>
          <div className="disf ai-c jc-sb ">
            <p>{fbSVG('w50 h50 strokeBlueColor pointer marr20')}</p>
            <p>{igSVG('w50 h50 strokeRedColor pointer marr20')}</p>
            <p>
              <i className="fs48 fontBlue fa-brands  pointer fa-twitter"></i>
            </p>
          </div>
        </div>
        <div className="footerDivideLine w90p"></div>
        <div className="disf jc-sb ai-c fd-sc-br">
          <p className="fs18  ta-c marb20">
            <i className="marr10 fa-regular fa-copyright"></i>2022 Eatfreedom
            Inc.
          </p>
          <div className="footerLinks">
            <p
              onClick={() => {
                navi('/Admin');
              }}
            >
              取得協助
            </p>
            <p
              onClick={() => {
                navi(authStore ? '/Store' : '/Store/StoreLogin');
              }}
            >
              店家合作
            </p>
            <p
              onClick={() => {
                navi('/Deliver/DeliverLogin');
              }}
            >
              外送夥伴
            </p>
            <p>附近餐廳</p>
            <p>關於隨饗</p>
            <p>退款條款</p>
          </div>
        </div>
        {loaction.pathname === '/' ? null : (
          <div className="h100 bigHidden w100p"></div>
        )}
      </footer>
    </>
  );
}
export default Footer;
