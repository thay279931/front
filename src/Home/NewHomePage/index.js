//首頁 最外層
import RandomPart from './RandomPart';
import SearchPart from './SearchPart';
import './newHomePage.css';
import { useState } from 'react';
import { useSVG } from '../../Context/SVGProvider';
// const siteName = '35.221.208.241';
function NewHomePage() {
  const { logoSVG } = useSVG();
  //開門效果
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="newHomPageOutFrame">
        <div
          className={`newHomePageLeft flexSetCenter newHomePageContent  ${
            open ? 'open' : ''
          }`}
        >
          <SearchPart setOpen={setOpen} />
        </div>
        <div
          className={`newHomePageRight flexSetCenter newHomePageContent ${
            open ? 'open' : ''
          }`}
        >
          <RandomPart setOpen={setOpen} />
        </div>
        {open ? (
          <div className="newHomePageBackTexts">
            {logoSVG('w300 h200 fillMainColor')}
          </div>
        ) : null}
      </div>
    </>
  );
}
export default NewHomePage;
