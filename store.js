'use client';
import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

export const CART_ADD_ITEM = 'CART_ADD_ITEM';

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [], shippingAddress: {} },
  // cart: { cartItems: [] },
};

function reducer(state, action) {
  debugger;
  switch (action.type) {
    case CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
