import { useEffect } from 'react';
//顯示折價金額
function ShowBox({ radomArrays, cutAmount, flashingEnd, startFlashing }) {
  //radomArrays[0]
  useEffect(() => {});
  return (
    <div>
      <p className="fs36 fw5 ta-c">
        {cutAmount !== 0 && flashingEnd ? <>您獲得{cutAmount}元優惠</> : null}
      </p>
    </div>
  );
}
export default ShowBox;
