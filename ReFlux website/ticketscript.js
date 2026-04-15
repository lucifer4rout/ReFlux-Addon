import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// 🔥 EmailJS init
(function () {
  emailjs.init("GalYmxhKEgEvYsaA-"); // <-- replace
})();

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDXV7NvAwwKcZioIKfQMZLSRzAFGsDpO-s",
  authDomain: "reflux-4e31c.firebaseapp.com",
  projectId: "reflux-4e31c",
  databaseURL: "https://reflux-4e31c-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById("ticketForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  const ticket = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    priority: document.getElementById("priority").value,
    category: document.getElementById("category").value,
    userName: user?.name || "Unknown",
    userEmail: user?.email || "No email",
    createdAt: new Date().toLocaleString()
  };

  try {
    // ✅ 1. Save to Firebase
    await push(ref(db, "tickets"), ticket);

    // ✅ 2. Send Email via EmailJS
    await emailjs.send("reflux_0pxm73d", "template_roaokdw", {
      from_name: ticket.userName,
      from_email: ticket.userEmail,
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      category: ticket.category
    });

    alert("✅ Ticket submitted & email sent!");
    form.reset();

  } catch (err) {
    console.error(err);
    alert("❌ Error submitting ticket");
  }
});