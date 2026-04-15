console.log("script loaded");

// ================= DOTS BACKGROUND =================
const dots = document.getElementById("dots");

setInterval(() => {
  const d = document.createElement("div");
  d.className = "dot";

  d.style.left = Math.random() * window.innerWidth + "px";
  d.style.animationDuration = (Math.random() * 3 + 2) + "s";

  dots.appendChild(d);

  setTimeout(() => d.remove(), 5000);
}, 100);


// ================= TYPING EFFECT =================
const words = ["e","eliable.", "apid.", "endering."];
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


// ================= NAV TOGGLE =================
function toggleMenu(btn) {
  const nav = document.getElementById("nav");
  nav.classList.toggle("active");
  btn.classList.toggle("active");
}


// ================= SCROLL REVEAL =================
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// ================= CURRENCY SWITCH =================
const toggleBtn = document.getElementById("currencyToggle");
const prices = document.querySelectorAll(".price");

let inUSD = false;
const rate = 83;

if (toggleBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) toggleBtn.classList.add("show-toggle");
    else toggleBtn.classList.remove("show-toggle");
  });

  toggleBtn.addEventListener("click", () => {
    inUSD = !inUSD;

    prices.forEach(p => {
      const inr = parseFloat(p.dataset.inr);

      if (inUSD) {
        const usd = (inr / rate).toFixed(2);
        p.innerHTML = `$${usd} <span>/month</span>`;
        toggleBtn.textContent = "INR";
      } else {
        p.innerHTML = `₹${inr} <span>/month</span>`;
        toggleBtn.textContent = "USD";
      }
    });
  });
}


// ================= HEART ANIMATION =================
document.querySelectorAll('.card button').forEach(btn => {

  let heartInterval;

  btn.addEventListener('mouseenter', () => {
    heartInterval = setInterval(() => {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = '❤️';

      heart.style.left = Math.random() * btn.offsetWidth + 'px';

      btn.appendChild(heart);

      setTimeout(() => heart.remove(), 1600);
    }, 120);
  });

  btn.addEventListener('mouseleave', () => {
    clearInterval(heartInterval);
  });

});


// ================= PAYMENT REDIRECT (FIXED) =================
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".card button").forEach(btn => {

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const card = btn.closest(".card");
      const amount = card.querySelector(".price").dataset.inr;

      window.location.href = `payment.html?amount=${amount}`;
    });

  });

});