//結帳頁 標題文字在這裡設定
function PayTitleBlock({ number, titleString }) {
  return (
    <>
      <div className="disf fs24 ai-c marb20">
        <p className="flexSetCenter marr20 payDetailBoxNumber bgcMain as1">
          {number}
        </p>
        <p className="fw7">{titleString}</p>
      </div>
    </>
  );
}
export default PayTitleBlock;
