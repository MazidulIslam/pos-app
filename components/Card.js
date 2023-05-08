import React from 'react';
import Image from 'next/image';
const Card = ({ product, addToCartHandler }) => {
  return (
    <div className="card" onClick={() => addToCartHandler(product)}>
      <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={product.image}
            alt="Pant 1 Black"
            style={{ width: '100%', height: 'auto' }} // optional
          />
        </a>
        <div className="p-2 bg-slate-100">
          <h1 className="text-center text-lg">${product.price}</h1>
        </div>
        <hr></hr>
        <div className="p-2">
          <h1 className="text-center">{product.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
