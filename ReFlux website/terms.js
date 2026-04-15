// Smooth scroll inside box (optional enhancement)
const box = document.querySelector(".scroll-box");

if (box) {
  box.addEventListener("wheel", (e) => {
    e.preventDefault();
    box.scrollTop += e.deltaY;
  });
}

