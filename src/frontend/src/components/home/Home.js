import React, { useState, useContext, useEffect } from "react";

import classes from "./Home.module.css";

import Card from "../../shared/Card";
import Button from "../../shared/Button";
import AuthContext from "../../context/auth-context";

import { addNewTicket } from "../../services/ticketService";
import { getAllProducts, getSuggestion } from "../../services/productService";

const Home = () => {
  const context = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const buyHandler = (product) => {
    addNewTicket(context.storedUserId, product.id).then(() => {
      onReload();
    });
  };

  const onReload = () => {
    getAllProducts().then((data) => {
      setProducts(
        data.map((product) => {
          return (
            <div key={product.id} className={classes.product}>
              <img
                className={classes.productImage}
                src={product.picture}
                alt="product"
              />
              <div className={classes.productInfo}>
                <p className={classes.productName}>{product.name}</p>
                <p className={classes.productPrice}>${product.price}</p>
                <Button
                  className={classes.btn}
                  onClick={() => {
                    buyHandler(product);
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          );
        })
      );
    });
    getSuggestion(context.storedUserId).then((data) => {
      setSuggestedProducts(
        data.map((product) => {
          return (
            <div key={product.id} className={classes.product}>
              <img
                className={classes.productImage}
                src={product.picture}
                alt="product"
              />
              <div className={classes.productInfo}>
                <p className={classes.productName}>{product.name}</p>
                <p className={classes.productPrice}>${product.price}</p>
                <Button
                  className={classes.btn}
                  onClick={() => {
                    buyHandler(product);
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          );
        })
      );
    });
  };

  useEffect(() => {
    onReload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={classes.home}>
      <h2>Suggestion</h2>
      {suggestedProducts.length === 0 && (
        <p className={classes.badge}>no suggested products</p>
      )}
      {suggestedProducts}
      <h2>Our Products</h2>
      {products}
    </Card>
  );
};

export default Home;
