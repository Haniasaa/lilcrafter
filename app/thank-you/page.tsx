export default function ThankYou() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Thank you for shopping with LilCrafter 💖</p>

      <a href="/">
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#A68A64",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Back to Store
        </button>
      </a>
    </div>
  );
}