const user = JSON.parse(localStorage.getItem("user")) || null;

window.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");

  if (user && nav) {
    const signinLink = [...nav.querySelectorAll("a")].find(a =>
      a.textContent.trim().toLowerCase().includes("signin")
    );

    if (signinLink) {
      signinLink.outerHTML = `
        <div class="profile-menu">
          <div class="profile-btn">
            <img src="${user.photo}" style="width:25px;height:25px;border-radius:50%;vertical-align:middle;margin-right:5px;">
            ${user.name}
          </div>

          <div class="dropdown">
            <a href="#">Profile</a>
            <a href="#" onclick="logout()">Logout</a>
          </div>
        </div>
      `;
    }
  }
});

// ONLY ONE logout function (fixed duplicate issue)
function logout() {
  localStorage.removeItem("user");
  location.reload();
}

console.log("scroll script loaded");

const dots = document.getElementById("dots");

setInterval(() => {
  const d = document.createElement("div");
  d.className = "dot";

  d.style.left = Math.random() * window.innerWidth + "px";
  d.style.animationDuration = (Math.random() * 3 + 2) + "s";

  dots.appendChild(d);

  setTimeout(() => d.remove(), 5000);
}, 100);

// FIXED typing effect
const words = ["eliable.", "apid.", "endering.", "e"];
let i = 0;
let j = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[i];

  j = isDeleting ? j - 1 : j + 1;

  document.getElementById("logo-text").textContent =
    currentWord.substring(0, j);

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && j === currentWord.length) {
    speed = 1200;
    isDeleting = true;
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// navbar toggle
function toggleMenu(btn) {
  const nav = document.getElementById("nav");

  nav.classList.toggle("active");
  btn.classList.toggle("active");
}

// scroll reveal
function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");

  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);