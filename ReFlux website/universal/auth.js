function loadUserUI() {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const nav = document.getElementById("nav");

  if (user && nav) {
    const signinLink = [...nav.querySelectorAll("a")].find(a =>
      a.textContent.trim().toLowerCase().includes("signin")
    );

    if (signinLink) {
      signinLink.outerHTML = `
        <div class="profile-menu">
          <div class="profile-btn">
            <img src="${user.photo}" 
                 style="width:25px;height:25px;border-radius:50%;vertical-align:middle;margin-right:5px;">
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
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html"; // cleaner than reload
}

// run automatically
window.addEventListener("DOMContentLoaded", loadUserUI);