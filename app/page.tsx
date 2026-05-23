"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // 🟢 FETCH PRODUCTS
  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from("Products").select("*");
      setProducts(data || []);
    }

    fetchProducts();
  }, []);

  // 🟢 CART
  function addToCart(product: any) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  }

  function increaseQty(id: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }

  function decreaseQty(id: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  // 🟢 WHATSAPP (OPTIONAL)
  function handleWhatsApp() {
    const phone = "+923345642332";

    let msg = `🛒 Order\n\nName: ${customer.name}\nPhone: ${customer.phone}\nAddress: ${customer.address}\n\n`;

    cart.forEach((item) => {
      msg += `${item.Name} x ${item.qty} = Rs ${item.Price * item.qty}\n`;
    });

    const total = cart.reduce(
      (sum, item) => sum + item.Price * item.qty,
      0
    );

    msg += `\nTotal: Rs ${total}`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
    );
  }

  // 🟢 SAVE ORDER IN SUPABASE (MAIN FEATURE)
  async function placeOrder() {
    const total = cart.reduce(
      (sum, item) => sum + item.Price * item.qty,
      0
    );

    const { error } = await supabase.from("Orders").insert([
      {
        name: customer.name || "Guest",
        phone: customer.phone || "N/A",
        address: customer.address || "N/A",
        items: cart,
        total_price: total,
        status: "pending",
      },
    ]);

    if (!error) {
      alert("✔ Order saved successfully!");
      setCart([]);
      setCustomer({ name: "", phone: "", address: "" });
    } else {
      alert("❌ Order failed");
      console.log(error);
    }
  }

  return (
    <div style={{ padding: "30px", background: "#E8DED2", minHeight: "100vh" }}>

      <h1 style={{ textAlign: "center" }}>🔥 LilCrafter Store</h1>

      {/* 🟡 CUSTOMER FORM */}
      <div style={{ background: "#fff", padding: 15, borderRadius: 10, marginBottom: 20 }}>
        <h3>Customer Details</h3>

        <input
          placeholder="Name"
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({ ...customer, phone: e.target.value })
          }
        />

        <input
          placeholder="Address"
          value={customer.address}
          onChange={(e) =>
            setCustomer({ ...customer, address: e.target.value })
          }
        />
      </div>

      {/* 🛒 CART */}
      {cart.length > 0 && (
        <div style={{ background: "#fff", padding: 15, borderRadius: 10 }}>

          <h2>Cart</h2>

          {cart.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{item.Name}</span>
              <span>Rs {item.Price} × {item.qty}</span>

              <div>
                <button onClick={() => increaseQty(item.id)}>+</button>
                <button onClick={() => decreaseQty(item.id)}>-</button>
              </div>
            </div>
          ))}

          <h3>
            Total: Rs{" "}
            {cart.reduce((s, i) => s + i.Price * i.qty, 0)}
          </h3>

          <button onClick={handleWhatsApp} style={{ background: "green", color: "white", width: "100%" }}>
            WhatsApp Checkout
          </button>

          <button
            onClick={placeOrder}
            style={{ background: "black", color: "white", width: "100%", marginTop: 10 }}
          >
            Save Order (Database)
          </button>

        </div>
      )}

      {/* 🟢 PRODUCTS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, 250px)", gap: 20, marginTop: 30 }}>

        {products.map((item) => (
          <div key={item.id} style={{ background: "#fff", padding: 15, borderRadius: 10 }}>

            <img src={item.Image} style={{ width: "100%", height: 200, objectFit: "cover" }} />

            <h3>{item.Name}</h3>
            <p>Rs {item.Price}</p>

            <button
              onClick={() => addToCart(item)}
              style={{ background: "#A68A64", color: "white", width: "100%" }}
            >
              Add to Cart
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}