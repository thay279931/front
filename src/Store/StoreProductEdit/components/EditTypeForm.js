import React from "react";

function EditTypeForm({ editState, setEditState, typeSid }) {
  return (
    <>
      {editState === 'insert' ? (
        <form action="">
          <label>
            類別名稱
            <input type="text" />
          </label>
          <button>儲存</button>
          <button>取消</button>
        </form>
      ) : (
        <form action="">
        
          <label>
            類別名稱
            <input type="text"/>
          </label>
          <button>儲存</button>
          <button>刪除</button>
          <button>取消</button>
        </form>
      )}
    </>
  );
}

export default EditTypeForm;
