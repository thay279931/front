function PartTest({ setClose }) {
  return (
    <>
      <div>
        234567
        <button
          onClick={() => {
            setClose(false);
          }}
        >
          close
        </button>
      </div>
    </>
  );
}
export default PartTest;
