"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);

    const { data, error } = await supabase
      .from("Orders")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setOrders(data || []);

    setLoading(false);
  }

  async function updateStatus(id: number, status: string) {
    const { error } = await supabase
      .from("Orders")
      .update({ status })
      .eq("id", id);

    if (!error) fetchOrders();
  }

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>📦 Orders Dashboard</h1>
        <p style={styles.subtitle}>Manage all customer orders easily</p>
      </div>

      {/* LOADING */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* EMPTY */}
      {orders.length === 0 && !loading && (
        <p style={{ textAlign: "center", color: "#888" }}>
          No orders found
        </p>
      )}

      {/* ORDERS GRID */}
      <div style={styles.grid}>
        {orders.map((order) => (
          <div key={order.id} style={styles.card}>

            {/* TOP */}
            <div style={styles.topRow}>
              <h3 style={{ margin: 0 }}>👤 {order.name}</h3>

              <span
                style={{
                  ...styles.badge,
                  background:
                    order.status === "pending" ? "#ffb020" : "#22c55e",
                }}
              >
                {order.status || "pending"}
              </span>
            </div>

            {/* INFO */}
            <div style={styles.info}>
              <p>📍 {order.address}</p>
              <p>📞 {order.phone}</p>
            </div>

            {/* ITEMS */}
            <div style={styles.itemsBox}>
              <strong>🛒 Items</strong>

              {order.items?.map((item: any, i: number) => (
                <div key={i} style={styles.itemRow}>
                  <span>{item.Name}</span>
                  <span>
                    {item.qty} x Rs {item.Price}
                  </span>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <h3 style={styles.total}>
              💰 Total: Rs {order.total_price}
            </h3>

            {/* BUTTONS */}
            <div style={styles.btnRow}>
              <button
                onClick={() => updateStatus(order.id, "pending")}
                style={{ ...styles.btn, background: "#ffb020" }}
              >
                Pending
              </button>

              <button
                onClick={() => updateStatus(order.id, "completed")}
                style={{ ...styles.btn, background: "#22c55e" }}
              >
                Completed
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

/* 💎 STYLES */
const styles: any = {
  page: {
    padding: "30px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FAF7F2, #F3E9DD)",
    fontFamily: "sans-serif",
  },

  header: {
    textAlign: "center",
    marginBottom: "25px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#666",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  badge: {
    color: "white",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  info: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },

  itemsBox: {
    background: "#f9f6f1",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    marginTop: "5px",
  },

  total: {
    marginTop: "10px",
    fontSize: "18px",
  },

  btnRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  btn: {
    flex: 1,
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};