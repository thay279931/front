import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function InputHash() {
  const [input, setInput] = useState('');
  return (
    <div>
      <h3>Hashtag:</h3>
      <input
        className="inputHash"
        innerText={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          const key = e.code;
          if (key === 'Enter') {
            e.preventDefault();
          }
        }}
      />
      <div onClick={() => {}}>新增</div>
    </div>
  );
}

export default InputHash;
