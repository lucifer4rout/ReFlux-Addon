window.addEventListener("DOMContentLoaded", () => {
  // auto download
  const a = document.createElement("a");
  a.href = "assets/ReFlux Addon.zip";
  a.download = "ReFlux Addon.zip";
  document.body.appendChild(a);
  a.click();
  a.remove();
});

function launchConfetti() {
  const container = document.getElementById("confetti-container");

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "0px";

    const xMove = (Math.random() - 0.5) * 500 + "px";
    const yMove = (Math.random() * 800 + 200) + "px";

    confetti.style.setProperty("--x", xMove);
    confetti.style.setProperty("--y", yMove);

    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 2000);
  }
}
// loop confetti
let confettiInterval = setInterval(launchConfetti, 300);

// stop after 3 seconds
setTimeout(() => {
  clearInterval(confettiInterval);
}, 3000);