// ===== AMOUNT =====
const params = new URLSearchParams(window.location.search);
const amount = parseInt(params.get("amount"), 10) || 50;

document.getElementById("showAmount").innerText = "₹" + amount;


// ===== PAYMENT (Razorpay with backend order) =====
document.getElementById("payBtn").addEventListener("click", async function () {

  try {
    // 1️⃣ Call backend to create order
    const res = await fetch(`http://localhost:5000/create-order?amount=${amount}`);
    const order = await res.json();

    // 2️⃣ Razorpay options
    const options = {
      key: "rzp_test_ScQjG4f7tX6IlW",
      amount: order.amount,
      currency: "INR",
      name: "ReFlux Donation",
      description: "Monthly Support",
      order_id: order.id,   // ⭐ REQUIRED

      handler: function (response) {
        alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
        console.log("SUCCESS:", response);
      },

      modal: {
        ondismiss: function () {
          console.log("Payment popup closed");
        }
      },

      theme: {
        color: "#ff69b4"
      }
    };

    // 3️⃣ Open Razorpay
    const rzp = new Razorpay(options);

    // 4️⃣ Failure handler
    rzp.on("payment.failed", function (response) {
      alert("❌ Payment Failed\n" + response.error.description);
      console.error("FAILED:", response.error);
    });

    rzp.open();

  } catch (err) {
    console.error("Error:", err);
    alert("Server error. Make sure backend is running.");
  }
});


// ===== HEART SYSTEM =====
const heartBg = document.getElementById("heart-bg");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  const types = ["slow", "medium", "fast"];
  heart.classList.add(types[Math.floor(Math.random() * 3)]);

  heart.innerText = "❤️";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.animation = "floatUp 8s linear forwards";

  heartBg.appendChild(heart);

  setTimeout(() => heart.remove(), 9000);
}

setInterval(createHeart, 180);


// ===== MOUSE PARALLAX =====
document.addEventListener("mousemove", (e) => {

  const hearts = document.querySelectorAll(".heart");

  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);

  hearts.forEach((heart, i) => {

    const depth = (i % 3 + 1) * 15;

    const moveX = x * depth;
    const moveY = y * depth;

    heart.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });
});