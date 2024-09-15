import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";
import { books } from './data';
import Cart from "./pages/Cart";
import React, { useEffect, useState } from "react";


function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, {...book, quantity: 1 }]);
  }

  function changeQuantity(book, quantity) {
    setCart(cart.map(item => {
      return (item.id === book.id 
      ? {
          ...item,
          quantity: +quantity,
        }
      : item
      )
    }))
  }

  function removeBooks(item) {
    setCart(cart.filter(book => book.id !== item.id));    
  }
  
  function numberOfItems() {
    let counter = 0;
    cart.forEach(item => {
      counter += item.quantity;
    })
    return counter;
  }

  useEffect(() => {
    console.log(cart);    

  },[cart]);

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
          <Routes >
            <Route path="/" exact element={<Home />} />
            <Route path='/books' exact element={<Books books={books} />} />
            <Route path='/books/:id' element={<BookInfo books={books} cart={cart} addToCart={addToCart} />} />
            <Route 
              path='/cart' 
              element={
                <Cart 
                  books={books} 
                  cart={cart} 
                  changeQuantity={changeQuantity}
                  removeBooks={removeBooks} />}               
            />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
