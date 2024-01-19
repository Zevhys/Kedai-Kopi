let d = document;

// Togle class active
const navbarNav = d.querySelector(".navbar-nav");

// Ketika Hamburger Menu di Klik
d.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di Luar element
const hm = d.querySelector("#hamburger-menu");
const sb = d.querySelector("#search-button");

d.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

// Toggle class active untuk search form
const searchForm = d.querySelector(".search-form");
const searchBox = d.querySelector("#search-box");

d.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault;
};

// Google spreadsheets
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwsL4_Vak9aGGs4kou6DzkWH_nFmLBPJtUozpNYzYtAiD8LdBEgVQCBVXshMo4-zbOX/exec";
const form = d.forms["kedai-kopi-form"];
const submit_btn = d.getElementById("submit-btn");
const submit_btn_load = d.getElementById("submit-btn-load");
const submit_btn_msg = d.getElementById("submit-btn-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submit_btn.setAttribute("disabled", "");

  submit_btn.classList.add("submitting");
  submit_btn_load.classList.remove("hidden");

  submit_btn_msg.textContent = "Mengirim...";

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Success!", response);
      alert("Success!", response);
      restore_submit_btn();
    })
    .catch((error) => {
      console.error("Error!", error.message);
      alert("Error!", error.message);
      restore_submit_btn();
    });
});

function restore_submit_btn() {
  submit_btn.removeAttribute("disabled");
  submit_btn_load.classList.add("hidden");
  submit_btn.classList.remove("submitting");
  submit_btn_msg.textContent = "Kirim Pesan";
}
