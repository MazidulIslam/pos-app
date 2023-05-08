'use client';
import React, { useContext } from 'react';

import Image from 'next/image';
import { HiDotsVertical } from 'react-icons/hi';
import CategoryButton from '/components/CategoryButton';
import Card from './Card';
import { CART_ADD_ITEM, Store } from '/store';
import { toast } from 'react-toastify';
const myProducts = [
  {
    name: 'Free Shirt 1',
    slug: 'free-shirt-1',
    category: 'Shirts',
    image: '/images/shirt1.jpg',
    // image: '/public/images/shirt1.jpg',
    price: 50.2,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: 'A popular shirt',
    isFeatured: true,
    banner: '/images/banner1',
  },
  {
    name: 'Fit Shirt 1',
    slug: 'fit-shirt-1',
    category: 'Shirts',
    image: '/images/shirt2.jpg',
    price: 40.6,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: 'A popular shirt',
    isFeatured: true,
    banner: '/images/banner2.jpg',
  },
  {
    name: 'Slim Shirt',
    slug: 'slim-shirt',
    category: 'Shirts',
    image: '/images/shirt3.jpg',
    price: 55.5,
    brand: 'Raymond',
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: 'A popular shirt',
  },
  {
    name: 'Golf Pants',
    slug: 'golf-pants',
    category: 'Pants',
    image: '/images/pants1.jpg',
    price: 25.5,
    brand: 'Oliver',
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: 'Smart looking pants',
  },
  {
    name: 'Fit Pants',
    slug: 'fit-pants',
    category: 'Pants',
    image: '/images/pants2.jpg',
    price: 90.0,
    brand: 'Zara',
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: 'Smart looking pants',
  },
  {
    name: 'Classic Pants',
    slug: 'classic-pants',
    category: 'Pants',
    image: '/images/pants3.jpg',
    price: 50.0,
    brand: 'Casely',
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: 'A Polular pants',
  },
  {
    name: 'Classic Pants2',
    slug: 'classic-pants2',
    category: 'Pants',
    image: '/images/pants3.jpg',
    price: 50.0,
    brand: 'Casely',
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: 'A Polular pants',
  },
  {
    name: 'Classic Pants3',
    slug: 'classic-pants3',
    category: 'Pants',
    image: '/images/pants3.jpg',
    price: 50.0,
    brand: 'Casely',
    rating: 4.5,
    numReviews: 8,
    countInStock: 20,
    description: 'A Polular pants',
  },
];

const Products = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    debugger;
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const newProduct = product;

    if (newProduct.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: CART_ADD_ITEM, payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="w-full">
        <form>
          <div className="flex w-full">
            <label for="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-white  text-gray-900  text-xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-20 p-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                placeholder="Search Products..."
                required
              />
              <button
                className="absolute z-[2]  inset-y-0 right-0 flex items-center pr-3  transition duration-150 ease-in-out hover:bg-slate-500 hover:bg-opacity-5 focus:outline-none focus:ring-0"
                type="button"
                id="button-addon3"
                data-te-ripple-init
              >
                <Image
                  src="/images/barcode-scanner.png"
                  width={50}
                  height={50}
                  alt="barcode-scan"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="h-full  ">
        <div className="w-full px-5">
          <div id="Categories" className="w-full flex justify-between py-2 ">
            <CategoryButton categoryName={'All Categories'}></CategoryButton>
            <CategoryButton categoryName={'Electronics '}></CategoryButton>
            <CategoryButton categoryName={'Home & Lifestyle '}></CategoryButton>
            <CategoryButton categoryName={'Men Fashion '}></CategoryButton>
            <CategoryButton categoryName={'Women Fashion '}></CategoryButton>

            <button className="bg-transparent  font-semibold  py-1 text-xl">
              <HiDotsVertical />
            </button>
          </div>
          <div id=" products" className="h-screen w-full ">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                {myProducts.map((product) => (
                  <Card
                    key={product.slug}
                    product={product}
                    addToCartHandler={addToCartHandler}
                  ></Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
