import Layout from "../components/Layout";
import css from "../styles/Cart.module.css";
import { useStore } from "../store/store";
import { urlFor } from "../lib/client";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import OrderModal from "../components/OrderModal";
import { useRouter } from "next/router";
import Tables from "../components/Tables";


export default function Cart() {
  const CartData = useStore((state) => state.cart);
  const selectedTable = CartData?.tables;
  const removePizza = useStore((state) => state.removePizza);
  const [PaymentMethod, setPaymentMethod] = useState(null);
  const [Order, setOrder] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOrder = localStorage.getItem("order");
    //   if (storedOrder && storedOrder !== "null") {
        setOrder(storedOrder);
    //   }
    }
  }, []);

  const handleRemove = (i) => {
    removePizza(i);
    toast.error("Item Removed");
  };

  const total = () =>
    CartData?.pizzas?.reduce((a, b) => a + b.quantity * b.price, 0) || 0;

  const handleOnDelivery = () => {
    setPaymentMethod(0);
    if (typeof window !== "undefined") {
      localStorage.setItem("total", total());
    }
  };

  const handleCheckout = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("total", total());
    }
    setPaymentMethod(1);
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CartData.pizzas),
    });

    if (response.status === 500) return;
    const data = await response.json();
    toast.loading("Redirecting...");
    router.push(data.url);
  };

  return (
    <Layout>
      <Tables />
      <div className={css.container}>
        {/* Details */}
        <div className={css.details}>
          <table className={css.table}>
            <thead>
              <tr>
                <th>Pizza</th>
                <th>Name</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody className={css.tbody}>
              {CartData.pizzas?.length > 0 &&
                CartData.pizzas.map((pizza, i) => {
                  const src = pizza?.image ? urlFor(pizza.image).url() : "";

                  return (
                    <tr key={i}>
                      <td className={css.imageTd}>
                        {src && (
                          <Image
                            loader={() => src}
                            src={src}
                            alt=""
                            objectFit="cover"
                            width={85}
                            height={85}
                          />
                        )}
                      </td>
                      <td>{pizza.name}</td>
                      <td>
                        {pizza.size === 0
                          ? "Small"
                          : pizza.size === 1
                          ? "Medium"
                          : "Large"}
                      </td>
                      <td>{pizza.price}</td>
                      <td>{pizza.quantity}</td>
                      <td>{pizza.price * pizza.quantity}</td>
                      <td
                        style={{ color: "var(--themeRed)", cursor: "pointer" }}
                        onClick={() => handleRemove(i)}
                      >
                        ❌
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className={css.cart}>
          <span>Cart</span>
          <div className={css.cartDetail}>
            <div>
              <span>Items</span>
              <span>{CartData.pizzas?.length}</span>
            </div>
            <div>
              <span>Total</span>
              <span>
                <span style={{ color: "var(--themeRed)" }}>₹ </span>
                {total()}
              </span>
            </div>
          </div>

          {selectedTable && (
            <div className={css.selectedTableInfo}>
              <strong>Selected Table:</strong> Table {selectedTable}
            </div>
          )}

          {!Order && CartData.pizzas?.length > 0 ? (
            <div className={css.buttons}>
              <button className={css.btn} onClick={handleOnDelivery}>
                Pay on Delivery
              </button>
              <button className={css.btn} onClick={handleCheckout}>
                Pay Now
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Toaster />
      {/* modal */}
      <OrderModal
        opened={PaymentMethod === 0}
        setOpened={setPaymentMethod}
        PaymentMethod={PaymentMethod}
      />
    </Layout>
  );
}
