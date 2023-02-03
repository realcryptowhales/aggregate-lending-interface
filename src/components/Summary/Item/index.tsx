import * as React from 'react';

interface ItemProps {
  title: any;
  text: any;
}

const Item: React.FC<ItemProps> = ({ title, text }) => {
  return (
    <div className="flex-col items-start ml-16">
      <div className="color-#929292 text-3.5 leading-5.5 font-400">{title}</div>
      <div className="color-#000000 leading-6 mt-2.5 font-500 text-4.5">
        {text}
      </div>
    </div>
  );
};

export default Item;
