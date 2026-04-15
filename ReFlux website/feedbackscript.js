import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 YOUR FIREBASE CONFIG
  const firebaseConfig = {
    apiKey: "AIzaSyDXV7NvAwwKcZioIKfQMZLSRzAFGsDpO-s",
    authDomain: "reflux-4e31c.firebaseapp.com",
    projectId: "reflux-4e31c",
    storageBucket: "reflux-4e31c.firebasestorage.app",
    messagingSenderId: "1068794188425",
    appId: "1:1068794188425:web:5b5f300589c2a3f99bac58"
  };


// INIT FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ⭐ STAR SYSTEM
let selectedRating = 0;

const stars = document.querySelectorAll(".stars span");

stars.forEach(star => {
  star.addEventListener("click", () => {
    selectedRating = Number(star.dataset.value);

    stars.forEach(s => s.classList.remove("active"));

    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add("active");
    }
  });
});

// 🚀 SUBMIT BUTTON
document.getElementById("submitBtn").addEventListener("click", async () => {

  const text = document.getElementById("feedbackText").value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (!selectedRating) {
    alert("Please select rating!");
    return;
  }

  if (!text.trim()) {
    alert("Write feedback!");
    return;
  }

  try {
    await addDoc(collection(db, "feedbacks"), {
      name: user?.name || "Guest",
      email: user?.email || "unknown",
      rating: selectedRating,
      message: text,
      createdAt: new Date()
    });

    document.getElementById("result").innerText =
      "Feedback submitted 🚀";

  } catch (err) {
    console.log("ERROR:", err);
    alert("Firebase error - check console");
  }
});