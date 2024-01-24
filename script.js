let d = document;
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
const regex_num = new RegExp("^$|^[0-9]{1,2}$");

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
  if (!e.target.matches(".remove-item")) {
    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
      navbarNav.classList.remove("active");
    }

    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
      searchForm.classList.remove("active");
    }

    if (!sbg.contains(e.target) && !shoppingBag.contains(e.target)) {
      shoppingBag.classList.remove("active");
    }
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

// Mata Uang
const rupiah = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// Template
function appendTemplate(elem, target) {
  elem.classList.remove("hidden");
  elem.removeAttribute("id");
  target.appendChild(elem);
}

// Daftar Menu
const menu_card_template = d.getElementById("menu-card-template");
const menu_list = d.getElementById("menu-list");
for (const menu2 in menu_kopi) {
  let menu_card = menu_card_template.cloneNode(true);
  let menu = menu_kopi[menu2];

  menu_card.getElementsByClassName("menu-card-title")[0].textContent =
    menu.nama;
  menu_card.getElementsByClassName("menu-card-price")[0].textContent =
    rupiah.format(menu.harga);
  menu_card
    .getElementsByClassName("menu-card-img")[0]
    .setAttribute("src", menu.gambar);
  menu_card
    .getElementsByClassName("menu-card-img")[0]
    .setAttribute("alt", menu.nama);

  appendTemplate(menu_card, menu_list);
}

// Daftar Produk
const product_card_template = d.getElementById("product-card-template");
const product_list = d.getElementById("product-list");
for (const kopi in daftar_kopi) {
  let product_card = product_card_template.cloneNode(true);
  let product = daftar_kopi[kopi];

  product_card
    .getElementsByClassName("item-detail-button")[0]
    .setAttribute("data-product", kopi);

  product_card
    .getElementsByClassName("shopping-bag-btn")[0]
    .setAttribute("data-product", kopi);

  product_card
    .getElementsByClassName("product-image")[0]
    .getElementsByTagName("img")[0]
    .setAttribute("src", product.gambar);

  product_card
    .getElementsByClassName("products-content")[0]
    .getElementsByTagName("h3")[0].textContent = product.nama;

  product_card.getElementsByClassName("product-price-base")[0].textContent =
    rupiah.format(product.harga);

  product_card.getElementsByClassName("product-price-discount")[0].textContent =
    rupiah.format(product.harga - product.harga * product.diskon);

  product_card
    .getElementsByClassName("product-price")[0]
    .setAttribute("data-diskon", product.diskon > 0.0);

  for (let i = 0; i < 5 - product.nilai; i++) {
    product_card.getElementsByClassName("star-full")[i].classList.add("hidden");
  }

  appendTemplate(product_card, product_list);
}

//  Modal Box
const itemDetailModal = d.querySelector("#item-detail-modal");
const itemDetailButtons = d.querySelectorAll(".item-detail-button");

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = "flex";
    e.preventDefault();
    showDetail(btn);
  };
});

// Klik Tombol Close
d.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  product_rating_reset();
  e.preventDefault();
};

// Klik diluar Modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
    product_rating_reset();
  }
};

// Details
const product_name = d.getElementById("product-name");
const product_desc = d.getElementById("product-desc");
const product_img = d.getElementById("product-img");
const product_rating = d.getElementById("product-rating");
const product_discount = d.getElementById("product-price-discount");
const product_price = d.getElementById("product-price");
const product_prices = d.getElementById("product-prices");
function product_rating_reset() {
  const stars = product_rating.children;
  for (let q = 0; q < stars.length; q++) {
    stars[q].classList.remove("hidden");
  }
}
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

  for (let i = 0; i < 5 - product.nilai; i++) {
    product_rating
      .getElementsByClassName("star-full")
      [i].classList.add("hidden");
  }
}

// Shopping Cart
const shopping_bag_count = d.getElementById("shopping-bag-count");
const shopping_bag = d.getElementsByClassName("shopping-bag-inner")[0];
const shopping_bag_total = d.getElementById("current-items-total");
const shopping_bag_empty = d.getElementsByClassName("shopping-bag-empty")[0];
const cart_item_template = d.getElementById("cart-item-template");
let current_items = {};

for (const l in daftar_kopi) {
  current_items[l] = {
    price: daftar_kopi[l].harga - daftar_kopi[l].harga * daftar_kopi[l].diskon,
    qty: 0,
  };
}

function countItems() {
  let o = 0;
  for (const v in current_items) {
    o += current_items[v].qty;
  }
  return o;
}

function updateItemsCount(save = false) {
  shopping_bag_count.textContent = countItems();
  shopping_bag_count.classList.toggle(
    "hidden",
    shopping_bag_count.textContent == "0"
  );
  shopping_bag_empty.classList.toggle(
    "hidden",
    shopping_bag_count.textContent != "0"
  );
  shopping_bag_count.classList.remove("anim-pop");
  void shopping_bag_count.offsetWidth;
  shopping_bag_count.classList.add("anim-pop");
  let total = 0;
  for (const item in current_items) {
    total += current_items[item].qty * current_items[item].price;
  }
  shopping_bag_total.textContent = rupiah.format(total);

  if (save) {
    localStorage.setItem("current_items", JSON.stringify(current_items));
  }
}
updateItemsCount(false);

d.querySelectorAll(".shopping-bag-btn").forEach((n) => {
  console.log(n.getAttribute("data-product"));

  n.addEventListener("click", () => {
    addCartItem(
      n.getAttribute("data-product"),
      current_items[n.getAttribute("data-product")].qty + 1
    );
  });
});

function addCartItem(product_id, set_qty = 0, from_storage = false) {
  const product = daftar_kopi[product_id];

  if (current_items[product_id].qty == 0) {
    let cart_item = cart_item_template.cloneNode(true);

    const qty_input = cart_item.getElementsByClassName("item-quantity")[0];
    const itm_total = cart_item.getElementsByClassName("item-price-total")[0];

    cart_item
      .getElementsByTagName("img")[0]
      .setAttribute("src", product.gambar);
    cart_item.getElementsByTagName("img")[0].setAttribute("alt", product.nama);
    cart_item.getElementsByTagName("h3")[0].textContent = product.nama;
    cart_item.getElementsByClassName("item-price")[0].textContent =
      rupiah.format(product.harga - product.harga * product.diskon);

    cart_item.setAttribute("data-product", product_id);

    cart_item
      .getElementsByClassName("remove-item")[0]
      .addEventListener("click", (e) => {
        current_items[product_id].qty = 0;
        updateItemsCount(true);
        cart_item.remove();
      });

    cart_item
      .getElementsByClassName("qty-add")[0]
      .addEventListener("click", () => {
        qty_input.value = clamp(parseInt(qty_input.value, 10) + 1, 1, 99);
        current_items[product_id].qty = parseInt(qty_input.value, 10);
        itm_total.textContent = rupiah.format(
          current_items[product_id].qty * current_items[product_id].price
        );
        updateItemsCount(true);
      });

    cart_item
      .getElementsByClassName("qty-sub")[0]
      .addEventListener("click", () => {
        qty_input.value = clamp(parseInt(qty_input.value, 10) - 1, 1, 99);
        current_items[product_id].qty = parseInt(qty_input.value, 10);
        itm_total.textContent = rupiah.format(
          current_items[product_id].qty * current_items[product_id].price
        );
        updateItemsCount(true);
      });

    current_items[product_id].qty = 1;
    itm_total.textContent = rupiah.format(
      current_items[product_id].qty * current_items[product_id].price
    );
    appendTemplate(cart_item, shopping_bag);
  } else {
    current_items[product_id].qty = set_qty;
  }

  const qty_input = shopping_bag
    .querySelectorAll(`[data-product=${product_id}]`)[0]
    .getElementsByClassName("item-quantity")[0];

  qty_input.addEventListener("input", () => {
    const itm_total_ = shopping_bag
      .querySelectorAll(`[data-product=${product_id}]`)[0]
      .getElementsByClassName("item-price-total")[0];
    // console.log("========");
    // console.log(qty_input.value);
    // console.log(qty_input.value.length);
    if (qty_input.value.length > 2) {
      qty_input.value = qty_input.value.slice(0, 2);
    }
    if (!regex_num.test(qty_input.value.toString())) {
      current_items[product_id].qty = 0;
      qty_input.value = "";
    } else {
      current_items[product_id].qty = parseInt(qty_input.value);
      qty_input.value = current_items[product_id].qty;
    }
    if (isNaN(current_items[product_id].qty)) {
      current_items[product_id].qty = 0;
    }
    itm_total_.textContent = rupiah.format(
      current_items[product_id].qty * current_items[product_id].price
    );
    // console.log(current_items[product_id].qty);
    updateItemsCount(true);
  });

  if (set_qty === 0) {
    current_items[product_id].qty = clamp(qty_input.value, 1, 99);
  } else {
    qty_input.value = set_qty;
    current_items[product_id].qty = set_qty;
  }

  qty_input.value = current_items[product_id].qty;
  updateItemsCount(!from_storage);
}

if (localStorage.getItem("current_items") != null) {
  const data = JSON.parse(localStorage.getItem("current_items"));
  for (const itm in data) {
    console.log(data[itm].qty);
    if (data[itm].qty != 0) {
      addCartItem(itm, data[itm].qty, true);
    }
  }
}

// TODO: Add/sub button hold down InputEvent
