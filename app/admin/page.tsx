
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    checkUser();
    fetchProducts();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
    }
  }

  async function fetchProducts() {
    const { data } = await supabase.from("Products").select("*");
    setProducts(data || []);
  }

  async function deleteProduct(id: number) {
    await supabase.from("Products").delete().eq("id", id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
  }

  function startEdit(item: any) {
    setEditId(item.id);
    setName(item.Name);
    setPrice(item.Price);
    setCategory(item.category);
  }

  async function addProduct() {
    setLoading(true);
    setSuccess("");
    setError("");

    let imageUrl = "";

    try {
      if (imageFile) {
        const fileName = Date.now() + imageFile.name;

        await supabase.storage
          .from("products")
          .upload(fileName, imageFile);

        imageUrl = supabase.storage
          .from("products")
          .getPublicUrl(fileName).data.publicUrl;
      }

      const { error } = await supabase.from("Products").insert([
        {
          Name: name,
          Price: Number(price),
          Image: imageUrl,
          category: category,
        },
      ]);

      if (error) {
        setError("❌ Product not added");
      } else {
        setSuccess("✔ Product added!");
        resetForm();
        fetchProducts();
      }
    } catch {
      setError("❌ Something went wrong");
    }

    setLoading(false);
  }

  async function updateProduct() {
    setLoading(true);

    const { error } = await supabase
      .from("Products")
      .update({
        Name: name,
        Price: Number(price),
        category: category,
      })
      .eq("id", editId);

    setLoading(false);

    if (error) {
      setError("❌ Update failed");
    } else {
      setSuccess("✔ Updated successfully!");
      resetForm();
      setEditId(null);
      fetchProducts();
    }
  }

  function resetForm() {
    setName("");
    setPrice("");
    setImageFile(null);
    setCategory("");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4e7d7",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "#fffdf9",
          borderRadius: "25px",
          padding: "30px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              color: "#6d4c41",
              fontSize: "34px",
              margin: 0,
            }}
          >
            🧑‍💼 Admin Dashboard
          </h1>

          <button
            onClick={logout}
            style={{
              background: "#6d4c41",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>

        {/* FORM */}
        <div
          style={{
            background: "#f9f3eb",
            padding: "25px",
            borderRadius: "20px",
            marginBottom: "35px",
          }}
        >
          <input
            placeholder="Product Name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Price"
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />

          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            style={{
              marginBottom: "15px",
            }}
          />

          <input
            placeholder="Category"
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={editId ? updateProduct : addProduct}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#6d4c41",
              color: "white",
              border: "none",
              borderRadius: "14px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {loading
              ? "Processing..."
              : editId
              ? "Update Product"
              : "Add Product"}
          </button>

          {success && (
            <p style={{ color: "green", marginTop: "12px" }}>
              {success}
            </p>
          )}

          {error && (
            <p style={{ color: "red", marginTop: "12px" }}>
              {error}
            </p>
          )}
        </div>

        {/* PRODUCTS */}
        <h2
          style={{
            color: "#6d4c41",
            marginBottom: "20px",
          }}
        >
          📦 Products
        </h2>

        {products.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fffaf5",
              borderRadius: "18px",
              padding: "18px",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  color: "#5d4037",
                }}
              >
                {item.Name}
              </h3>

              <p
                style={{
                  margin: "5px 0 0 0",
                  color: "#8d6e63",
                }}
              >
                Rs {item.Price}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() => startEdit(item)}
                style={{
                  background: "#c8a27a",
                  color: "white",
                  border: "none",
                  padding: "9px 15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(item.id)}
                style={{
                  background: "#b85c5c",
                  color: "white",
                  border: "none",
                  padding: "9px 15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  background: "white",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box" as const,
};
