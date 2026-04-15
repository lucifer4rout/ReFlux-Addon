console.log("login script loaded");

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.style.display = "none";
    }, 300);
});

// 🔐 LOGIN
const loginForm = document.querySelector(".sign-in form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.querySelector("input[type='email']").value;
  const password = loginForm.querySelector("input[type='password']").value;

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  console.log(data);

  if (data.success) {
    localStorage.setItem("user", JSON.stringify({
      uid: data.user._id,
      name: data.user.name,
      email: data.user.email,
      photo: data.user.photo || "default-avatar.png"
    }));

    window.location.href = "index.html";
  }
}); // ✅ THIS WAS MISSING

// 📝 SIGNUP
const signupForm = document.querySelector(".sign-up form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputs = signupForm.querySelectorAll("input");

  const name = inputs[0].value;
  const email = inputs[1].value;
  const password = inputs[2].value;

  const res = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (data.success) {
    alert("Account created! Now login.");
  } else {
    alert("Signup failed");
  }
});