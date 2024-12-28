import React from 'react';

const ButtonOutline = ({children,onClick}) => {
  return (
    <button onClick={onClick} type="button" className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-blue-400 hover:bg-blue-400 text-blue-400 hover:text-white font-normal py-2 px-4 rounded">{children}</button>
  );
}

export default ButtonOutline;
