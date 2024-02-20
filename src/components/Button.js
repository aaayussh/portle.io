import React from 'react';
import "./index.css";

const Button = ({ handleSave }) => {
  return <div classname='button-container'>
    <button  classname="button" onClick={handleSave}>Save</button>
    </div>
};

export default Button;