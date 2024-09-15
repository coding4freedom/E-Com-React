import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Price from '../Price';

export default function Book({ book }) {
  const [img, setImg] = useState(null);

  const mountedRef = useRef(true);
  
  useEffect(() => {
    const image = new Image();
    image.src = book.url;
    image.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setImg(image);
          console.log('set time is working')
        }
      }, 300);
    };
    return () => {
      mountedRef.current = false;
    }
  },[book.url]);

  return (
    <div className="book">
      {!img ? (
        <>
          <div className="book__img--skeleton"></div>
          <div className="skeleton book__title--skeleton"></div>
          <div className="skeleton book__rating--skeleton"></div>
          <div className="skeleton book__price--skeleton"></div>
        </>
      ) : (
        <>
          <Link to={`/books/${book.id}`}>
            <figure className="book__img--wrapper">
              <img src={img.src} alt="" className="book__img" />
            </figure>
          </Link>
          <div className="book__title">
            <Link to={`/books/${book.id}`} className="book__title--link">
              {book.title}
            </Link>
          </div>
          <Rating rating={book.rating} />
          <Price sale={book.salePrice} original={book.originalPrice} />
        </>
      )}
    </div>
  );
}
