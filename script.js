let d = document;

// Togle class active
const navbarNav = d.querySelector(".navbar-nav");

// Ketika Hamburger Menu di Klik
d.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle Class Active Shopping Bag
const shoppingBag = d.querySelector(".shopping-bag");
d.querySelector("#shopping-bag-button").onclick = (e) => {
  shoppingBag.classList.toggle("active");
  e.preventDefault();
};

// Klik di Luar element
const hm = d.querySelector("#hamburger-menu");
const sb = d.querySelector("#search-button");
const sbg = d.querySelector("#shopping-bag-button");

d.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sbg.contains(e.target) && !shoppingBag.contains(e.target)) {
    shoppingBag.classList.remove("active");
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
      showPopup(false);
      form.reset();
    })
    .catch((error) => {
      showPopup(true, error);
    });
});

function restore_submit_btn() {
  submit_btn.removeAttribute("disabled");
  submit_btn_load.classList.add("hidden");
  submit_btn.classList.remove("submitting");
  submit_btn_msg.textContent = "Kirim Pesan";
}

function showPopup(failed, error) {
  restore_submit_btn();
  Swal.fire({
    position: "center",
    showConfirmButton: true,

    title: failed ? "An error occured" : "Form submitted",
    html: failed
      ? `Pesan Gagal Dikirim, <br> ${error}`
      : `Pesan Sudah Terkirim`,
    icon: failed ? "error" : "success",
  });
}

//  Modal Box
const itemDetailModal = d.querySelector("#item-detail-modal");
const itemDetailButtons = d.querySelectorAll(".item-detail-button");

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = "flex";
    e.preventDefault();
    showDetail(btn);
    console.log(daftar_kopi[btn.getAttribute("data-product")]);
  };
});

// Klik Tombol Close
d.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

// Klik diluar Modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};

// Mata Uang
const rupiah = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// Daftar Produk
const product_card_template = d.getElementById("product-card-template");
const product_list = d.getElementById("product-list");
for (const n in daftar_kopi) {
  let product_card = product_card_template.cloneNode(true);

  console.log(daftar_kopi[n]);
}

// Details
const product_name = d.getElementById("product-name");
const product_desc = d.getElementById("product-desc");
const product_img = d.getElementById("product-img");
const product_rating = d.getElementById("product-rating");
const product_discount = d.getElementById("product-price-discount");
const product_price = d.getElementById("product-price");
const product_prices = d.getElementById("product-prices");
function showDetail(btn) {
  let product = daftar_kopi[btn.getAttribute("data-product")];
  product_name.textContent = product.nama;
  product_desc.innerHTML = product.deskripsi;
  product_img.setAttribute("src", product.gambar);

  product_price.textContent = rupiah.format(product.harga);
  product_discount.textContent = rupiah.format(
    product.harga - product.harga * product.diskon
  );

  product_prices.setAttribute("data-diskon", product.diskon > 0.0);
}
