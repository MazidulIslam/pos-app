import React from 'react';
import CartItems from '/components/CartItems';
import Products from '/components/Products';

const Layout = () => {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-1 h-full bg-white ">
      <CartItems />
      <Products />
    </div>
  );
};

export default Layout;
