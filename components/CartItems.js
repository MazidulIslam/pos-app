'use client';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import MenuButtons from '/components/MenuButtons';
import ActionButton from '/components/ActionButton';
import {
  HiOutlineMenu,
  HiPlusCircle,
  HiMinusCircle,
  HiOutlinePlusCircle,
  HiUserCircle,
} from 'react-icons/hi';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { GiTrashCan, GiCancel, GiReceiveMoney } from 'react-icons/gi';
import { FaRegHandRock } from 'react-icons/fa';
import { TbDiscount } from 'react-icons/tb';
import { RiEditBoxLine } from 'react-icons/ri';
import {
  CART_RESET,
  CART_CLEAR_ITEMS,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  Store,
} from '/store';
import Cookies from 'js-cookie';

const CartItems = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const {
    cart: { cartItems },
  } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); //
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const discountPrice = round2(itemsPrice * 0.05);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const cancelHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: CART_RESET });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: item });
  };

  const handleIncreaseQuantity = async (item) => {
    const quantity = Number(item.quantity) + 1;

    if (item.countInStock < quantity) {
      debugger;
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: CART_ADD_ITEM, payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };
  const handleDecreaseQuantity = async (item) => {
    const quantity = Number(item.quantity) - 1;

    if (quantity < 1) {
      return toast.error('Sorry. Minimum quantity is 1');
    }
    dispatch({ type: CART_ADD_ITEM, payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };

  return (
    <div className="h-full  lg:w-full xl:w-full bg-white">
      <div className=" px-5 md:px-4 lg:px-0">
        <div
          id="menubar"
          className=" flex justify-between py-1 lg:py-2  px-2 md:px-3 lg:px-5"
        >
          <button className="bg-transparent py-1 px-0 border-none">
            <HiOutlineMenu className="h-4 w-4 lg:h-8 lg:w-8" />
          </button>

          <MenuButtons
            icon={
              <RiEditBoxLine className="text-sm lg:text-base xl:text-2xl" />
            }
            text={
              <span className="text-sm lg:text-base xl:text-2xl p-0 lg:px-2">
                Note
              </span>
            }
          ></MenuButtons>
          <MenuButtons
            icon={
              <MdOutlineLocalShipping className="text-sm lg:text-base xl:text-2xl" />
            }
            text={
              <span className="text-sm lg:text-base xl:text-2xl p-0 lg:px-2">
                Shipping
              </span>
            }
          ></MenuButtons>
          <MenuButtons
            icon={<BiTime className="text-sm lg:text-base xl:text-2xl" />}
            text={
              <span className="text-sm lg:text-base xl:text-2xl p-0 lg:px-2">
                Hold Orders
              </span>
            }
          ></MenuButtons>
          <MenuButtons
            icon={<HiPlusCircle className="text-sm lg:text-base xl:text-2xl" />}
            text={
              <span className="text-sm lg:text-base xl:text-2xl p-0 lg:px-2">
                New Items
              </span>
            }
          ></MenuButtons>
        </div>
        <div
          id="profilebar"
          className="flex justify-between  py-1 lg:py-2  px-1 lg:px-5 bg-indigo-100"
        >
          <button className="flex text-center items-center bg-transparent  py-1 px-2  font-semibold text-indigo-500">
            <HiUserCircle className="h-6 w-6 " />
            <span className="px-2"> Steve Jobs</span>
          </button>

          <button className="flex text-center items-center bg-transparent  py-1 px-2  font-semibold text-indigo-500">
            <HiOutlinePlusCircle className="h-6 w-6 " />
          </button>
        </div>
        {cartItems.length === 0 ? (
          ''
        ) : (
          <div className="overflow-x-hidden overflow-y-hidden">
            {cartItems?.map((item) => (
              <div
                id="table"
                className=" mt-2  px-1 lg:px-5 w-full"
                key={item.slug}
              >
                <div className="flex flex-row items-center">
                  <button className="flex text-center items-center bg-transparent">
                    <FiEdit className=" text-sm lg:text-xl xl:text-4xl text-slate-500 active:text-slate-400" />
                  </button>

                  <div className="w-full px-2 text-slate-500">
                    <table className="w-full">
                      <tbody>
                        <tr className="border border-slate-400 text-sm lg:text-2xl font-normal lg:font-semibold ">
                          <td
                            className="
                         text-sm lg:text-xl xl:text-2xl p-1 lg:p-4 w-3/12"
                          >
                            {item.name}
                          </td>
                          <td className="text-sm lg:text-xl xl:text-2xl p-1 lg:p-4 w-2/12">
                            ${item.price}
                          </td>
                          <td className="p-1 lg:p-4 text-sm lg:text-xl xl:text-2xl  text-center w-1/12">
                            <button
                              className="active:text-slate-400"
                              onClick={() => {
                                handleDecreaseQuantity(item);
                              }}
                            >
                              <HiMinusCircle />
                            </button>
                          </td>
                          <td className="text-sm lg:text-xl xl:text-2xl p-1 lg:p-4 text-center w-2/12">
                            {item.quantity}
                          </td>
                          <td className="p-1 lg:p-4 text-sm lg:text-xl xl:text-2xl text-center w-1/12">
                            <button
                              className="active:text-slate-400"
                              onClick={() => {
                                handleIncreaseQuantity(item);
                              }}
                            >
                              <HiPlusCircle className="" />
                            </button>
                          </td>
                          <td className="p-1 lg:p-4 text-sm lg:text-xl xl:text-2xl w-3/12 text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <button
                    className="flex text-center items-center bg-transparent"
                    onClick={() => {
                      removeItemHandler(item);
                    }}
                  >
                    <GiTrashCan className=" text-sm lg:text-xl xl:text-4xl text-red-600 active:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          id="subtotal"
          className="w-full flex justify-end mt-10  px-2 lg:px-5 "
        >
          <div className="w-full lg:w-2/5 m-2">
            <hr />
            <div className="flex justify-between my-2">
              <p>Sub Total</p>

              <p>
                $
                {cartItems
                  .reduce((a, c) => a + c.quantity * c.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <hr />
            <div className="flex justify-between my-2">
              <p>TAX</p>
              <p>${taxPrice}</p>
            </div>
            <hr />
            <div className="flex justify-between my-2">
              <p>Shipping</p>
              <p>${cartItems.length > 0 ? shippingPrice : 0}</p>
            </div>
            <hr />
            <div className="flex justify-between my-2 ">
              <p className="text-blue-600">Discount on Cart</p>
              <p>${discountPrice}</p>
            </div>
          </div>
        </div>
        <div
          id="Total"
          className="flex justify-between  py-1 lg:py-2  px-1 lg:px-5  bg-blue-100 items-center"
        >
          <div className="w-3/5 ">
            {' '}
            <button className="flex text-center items-center bg-transparent  py-1 px-2  font-normal lg:font-semibold text-blue-400">
              <span className=" px-1 lg:px-2">
                {' '}
                Products Count ({cartItems.reduce((a, c) => a + c.quantity, 0)})
              </span>
            </button>
          </div>
          <div className="w-2/5">
            <div className="flex justify-between my-2 font-medium text-blue-500  text-xl lg:text-2xl">
              <p>Total</p>
              <p>${cartItems.length > 0 ? totalPrice : 0}</p>
            </div>
          </div>
        </div>
        <div
          id="actionbar"
          className="flex justify-between  py-2  px-1 lg:py-2 lg:px-5 m-2"
        >
          <ActionButton
            commonClass={'actionBtn'}
            specificClass={'actionBtn-red'}
            icon={<GiCancel />}
            text={<span className=" px-1 lg:px-2">Cancel</span>}
            cancelHandler={cancelHandler}
          ></ActionButton>

          <ActionButton
            commonClass={'actionBtn'}
            specificClass={'actionBtn-indigo'}
            icon={<FaRegHandRock />}
            text={<span className="px-2">Hold</span>}
          ></ActionButton>
          <ActionButton
            commonClass={'actionBtn'}
            specificClass={'actionBtn-indigo'}
            icon={<TbDiscount className="text-blue-500" />}
            text={<span className="px-2">Discount</span>}
          ></ActionButton>
          <ActionButton
            commonClass={'actionBtn'}
            specificClass={'actionBtn-blue'}
            icon={<GiReceiveMoney />}
            text={<span className="px-2">Pay Now</span>}
          ></ActionButton>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
