import React from 'react';

const ActionButton = ({
  icon,
  text,
  commonClass,
  specificClass,
  cancelHandler,
}) => {
  return (
    <button
      className={`${commonClass} ${specificClass}`}
      onClick={() => {
        debugger;
        cancelHandler();
      }}
    >
      {icon}
      {text}
    </button>
  );
};

export default ActionButton;
