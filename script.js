/* SportGear demo store: all data is stored in JavaScript and browser localStorage. */
const products = [
 {id:1,name:"Velocity Pro Running Shoes",brand:"StrideX",category:"footwear",sport:"Running",price:3499,oldPrice:4299,rating:4.9,tag:"BESTSELLER",sizes:["6","7","8","9","10","11"],image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",description:"Lightweight running shoes with responsive cushioning, breathable mesh and a durable grip sole. Designed for everyday miles and personal bests."},
 {id:2,name:"Court Control Basketball Shoes",brand:"AeroFit",category:"footwear",sport:"Basketball",price:4299,oldPrice:4999,rating:4.8,tag:"NEW",sizes:["7","8","9","10","11"],image:"https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=85",description:"Supportive court shoes with a stable base and grippy outsole for quick cuts, jumps and confident play."},
 {id:3,name:"Match Day Football Jersey",brand:"FieldPro",category:"apparel",sport:"Football",price:1499,oldPrice:1899,rating:4.7,tag:"POPULAR",sizes:["S","M","L","XL","XXL"],image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",description:"A lightweight, breathable jersey with moisture-managing fabric to keep you comfortable through every match."},
 {id:4,name:"Performance Training Tee",brand:"StrideX",category:"apparel",sport:"Training",price:899,oldPrice:1199,rating:4.6,tag:"",sizes:["S","M","L","XL"],image:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85",description:"An easy-moving training top with a soft feel and athletic fit for gym sessions and active days."},
 {id:5,name:"Adjustable Dumbbell Set",brand:"IronCore",category:"gym",sport:"Training",price:5999,oldPrice:6999,rating:4.9,tag:"TOP RATED",sizes:["One size"],image:"https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=85",description:"A versatile strength-training set for home workouts. Compact design helps you build a practical training space."},
 {id:6,name:"Everyday Yoga Mat",brand:"ZenMotion",category:"gym",sport:"Yoga",price:1299,oldPrice:1599,rating:4.8,tag:"",sizes:["One size"],image:"https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=85",description:"A comfortable non-slip exercise mat for yoga, stretching, mobility and floor workouts."},
 {id:7,name:"Pro Match Football",brand:"FieldPro",category:"team",sport:"Football",price:1799,oldPrice:2199,rating:4.7,tag:"",sizes:["5"],image:"https://images.unsplash.com/photo-1614632537423-1e6c2e7e0e8b?auto=format&fit=crop&w=800&q=85",description:"A durable match-style football designed for consistent shape, touch and control on the pitch."},
 {id:8,name:"Cricket Training Bat",brand:"Boundary",category:"team",sport:"Cricket",price:2499,oldPrice:2999,rating:4.5,tag:"",sizes:["SH","H"],image:"https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=85",description:"A practice bat with a comfortable handle and balanced feel for training sessions and friendly games."},
 {id:9,name:"Flex Resistance Bands",brand:"IronCore",category:"gym",sport:"Training",price:699,oldPrice:899,rating:4.6,tag:"VALUE PICK",sizes:["Set"],image:"https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=85",description:"A handy resistance band set for warm-ups, strength work, stretching and travel-friendly workouts."},
 {id:10,name:"Court Pro Tennis Racket",brand:"AeroFit",category:"team",sport:"Tennis",price:3199,oldPrice:3799,rating:4.7,tag:"",sizes:["One size"],image:"https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=85",description:"A balanced racket for recreational players looking for comfortable handling and dependable control."},
 {id:11,name:"Sport Utility Backpack",brand:"StrideX",category:"accessories",sport:"Training",price:1899,oldPrice:2299,rating:4.5,tag:"",sizes:["One size"],image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",description:"A practical sports backpack with room for training essentials, accessories and everyday carry."},
 {id:12,name:"Lightweight Track Jacket",brand:"FieldPro",category:"apparel",sport:"Running",price:2299,oldPrice:2799,rating:4.6,tag:"",sizes:["S","M","L","XL"],image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85",description:"A lightweight outer layer for warm-ups, cool-weather runs and active everyday wear."}
];

const load = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
let cart = load("sportgear_cart", []);
let wishlist = load("sportgear_wishlist", []);
let orders = load("sportgear_orders", []);
let currentUser = load("sportgear_user", null);
let selectedProduct = null;
let toastTimer;
const money = value => "₹" + Number(value).toLocaleString("en-IN", {maximumFractionDigits:0});
const save = () => {
  localStorage.setItem("sportgear_cart", JSON.stringify(cart));
  localStorage.setItem("sportgear_wishlist", JSON.stringify(wishlist));
  localStorage.setItem("sportgear_orders", JSON.stringify(orders));
  localStorage.setItem("sportgear_user", JSON.stringify(currentUser));
};
const toast = message => {
  const el = document.getElementById("toast"); el.textContent = message; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
};
const productById = id => products.find(p => p.id === Number(id));
const cartQuantity = () => cart.reduce((sum, item) => sum + item.qty, 0);

function renderProducts() {
  const search = document.getElementById("searchInput").value.trim().toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const sport = document.getElementById("sportFilter").value;
  const sort = document.getElementById("sortFilter").value;
  let list = products.filter(p => (category === "all" || p.category === category) &&
    (sport === "all" || p.sport === sport) &&
    (!search || `${p.name} ${p.brand} ${p.category} ${p.sport}`.toLowerCase().includes(search)));
  if (sort === "low") list.sort((a,b)=>a.price-b.price);
  if (sort === "high") list.sort((a,b)=>b.price-a.price);
  if (sort === "rating") list.sort((a,b)=>b.rating-a.rating);
  document.getElementById("emptyProducts").classList.toggle("hidden", list.length !== 0);
  document.getElementById("productGrid").innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-image" data-view="${p.id}"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/600x500/e9eee9/1a7a4a?text=SportGear'">
      ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
      <button class="wish-btn ${wishlist.includes(p.id)?"active":""}" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist">${wishlist.includes(p.id)?"♥":"♡"}</button></div>
      <div class="product-info"><div class="product-meta"><span>${p.brand}</span><span>${p.category}</span></div>
      <h3 data-view="${p.id}">${p.name}</h3><div class="rating">★★★★★ <span>${p.rating.toFixed(1)}</span></div>
      <div class="product-bottom"><div class="price">${money(p.price)} <span class="old-price">${money(p.oldPrice)}</span></div><button class="quick-add" data-add="${p.id}" aria-label="Quick add ${p.name}">+</button></div></div>
    </article>`).join("");
}
function addToCart(id, size) {
  const p = productById(id); if (!p) return;
  const chosenSize = size || p.sizes[0];
  const found = cart.find(item => item.id === p.id && item.size === chosenSize);
  if (found) found.qty++; else cart.push({id:p.id, size:chosenSize, qty:1});
  save(); renderCart(); toast(`${p.name} added to cart`);
}
function toggleWishlist(id) {
  id = Number(id);
  wishlist = wishlist.includes(id) ? wishlist.filter(x=>x!==id) : [...wishlist,id];
  save(); renderProducts(); toast(wishlist.includes(id) ? "Added to wishlist" : "Removed from wishlist");
}
function totals() {
  const subtotal = cart.reduce((sum,item)=>sum+productById(item.id).price*item.qty,0);
  const shipping = subtotal === 0 || subtotal >= 2999 ? 0 : 99;
  const tax = Math.round(subtotal * .05);
  return {subtotal,shipping,tax,total:subtotal+shipping+tax};
}
function renderCart() {
  document.getElementById("cartCount").textContent = cartQuantity();
  const target = document.getElementById("cartItems");
  if (!cart.length) target.innerHTML = `<div class="empty-cart"><strong>Your cart is waiting for action.</strong>Looks like you haven't added any gear yet.<br><a class="btn btn-green" style="margin-top:16px" href="#shop">EXPLORE PRODUCTS →</a></div>`;
  else target.innerHTML = cart.map(item => { const p=productById(item.id); return `<div class="cart-row">
    <img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><small>${p.brand} · Size: ${item.size}</small>
    <div class="quantity"><button data-qty="${p.id}|${item.size}|-1" aria-label="Decrease quantity">−</button><strong>${item.qty}</strong><button data-qty="${p.id}|${item.size}|1" aria-label="Increase quantity">+</button><button class="remove-btn" data-remove="${p.id}|${item.size}">Remove</button></div></div>
    <div class="cart-price">${money(p.price*item.qty)}</div></div>`; }).join("");
  const t=totals(); document.getElementById("subtotal").textContent=money(t.subtotal);
  document.getElementById("shipping").textContent=t.shipping?money(t.shipping):"FREE";
  document.getElementById("tax").textContent=money(t.tax); document.getElementById("cartTotal").textContent=money(t.total);
  document.getElementById("checkoutReview").innerHTML = cart.length ? cart.map(i=>`<div class="summary-line"><span>${productById(i.id).name} × ${i.qty}</span><strong>${money(productById(i.id).price*i.qty)}</strong></div>`).join("") : `<p class="form-hint">Your cart is empty.</p>`;
  document.getElementById("checkoutTotal").textContent=money(t.total);
}
function openProduct(id) {
  const p=productById(id); if(!p)return; selectedProduct=p;
  document.getElementById("productDialogContent").innerHTML=`<div class="dialog-product"><img src="${p.image}" alt="${p.name}"><div class="dialog-info"><p class="eyebrow">${p.brand} / ${p.sport}</p><h2>${p.name}</h2><div class="rating">★★★★★ <span>${p.rating.toFixed(1)} / 5</span></div><h3>${money(p.price)} <span class="old-price">${money(p.oldPrice)}</span></h3><p>${p.description}</p><label for="productSize">SELECT SIZE</label><select id="productSize">${p.sizes.map(s=>`<option>${s}</option>`).join("")}</select><button class="btn btn-green full-btn" id="dialogAdd">ADD TO CART →</button><p class="form-hint">Easy 7-day returns · Secure demo checkout</p></div></div>`;
  document.getElementById("productDialog").showModal();
}
function renderAccount() {
  const panel=document.getElementById("accountPanel");
  if(!currentUser) {
    panel.innerHTML=`<div id="authContent"><h3>WELCOME BACK</h3><form id="loginForm"><label>Email address<input name="email" type="email" required placeholder="you@example.com"></label><label>Password<input name="password" type="password" required minlength="4" placeholder="At least 4 characters"></label><button class="btn btn-green full-btn" type="submit">SIGN IN (DEMO) →</button></form><p class="form-hint">New to SportGear? <button class="account-switch" id="showRegister">Create an account</button></p></div>`;
  } else {
    panel.innerHTML=`<h3>HEY, ${escapeHtml(currentUser.name).toUpperCase()}!</h3><p class="muted">Signed in as ${escapeHtml(currentUser.email)}</p><h3 style="margin-top:25px">YOUR ORDERS (${orders.length})</h3>${orders.length?orders.slice().reverse().map(o=>`<div class="order-entry"><strong>Order ${o.id} · ${money(o.total)}</strong><span>${o.date} · ${escapeHtml(o.status)}</span><br><span>${o.items.length} item(s) · ${escapeHtml(o.payment)}</span></div>`).join(""):`<p class="form-hint">No orders yet. Your purchases will appear here.</p>`}<h3 style="margin-top:20px">WISHLIST (${wishlist.length})</h3><p class="form-hint">${wishlist.length?wishlist.map(id=>productById(id)?.name).filter(Boolean).join(", "):"No saved products yet."}</p><button class="btn btn-green" id="logoutBtn">SIGN OUT</button>`;
  }
}
function escapeHtml(str){return String(str).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

document.addEventListener("click", e=>{
  const add=e.target.closest("[data-add]"); if(add){const p=productById(add.dataset.add);addToCart(p.id);return;}
  const wish=e.target.closest("[data-wish]"); if(wish){e.stopPropagation();toggleWishlist(wish.dataset.wish);return;}
  const view=e.target.closest("[data-view]"); if(view){openProduct(view.dataset.view);return;}
  const qty=e.target.closest("[data-qty]"); if(qty){const [id,size,delta]=qty.dataset.qty.split("|");const item=cart.find(i=>i.id===Number(id)&&i.size===size);if(item){item.qty+=Number(delta);if(item.qty<=0)cart=cart.filter(i=>i!==item);save();renderCart();}return;}
  const remove=e.target.closest("[data-remove]"); if(remove){const [id,size]=remove.dataset.remove.split("|");cart=cart.filter(i=>!(i.id===Number(id)&&i.size===size));save();renderCart();toast("Item removed");return;}
  const cat=e.target.closest("[data-category]");if(cat){document.getElementById("categoryFilter").value=cat.dataset.category;renderProducts();document.getElementById("shop").scrollIntoView();}
});
document.getElementById("productGrid").addEventListener("click",()=>{});
["searchInput","categoryFilter","sportFilter","sortFilter"].forEach(id=>document.getElementById(id).addEventListener(id==="searchInput"?"input":"change",renderProducts));
document.getElementById("searchFocus").addEventListener("click",()=>{document.getElementById("shop").scrollIntoView();document.getElementById("searchInput").focus();});
document.getElementById("menuToggle").addEventListener("click",()=>{const nav=document.getElementById("mainNav");const open=nav.classList.toggle("open");document.getElementById("menuToggle").setAttribute("aria-expanded",String(open));});
document.getElementById("mainNav").addEventListener("click",e=>{if(e.target.closest("a")){document.getElementById("mainNav").classList.remove("open");document.getElementById("menuToggle").setAttribute("aria-expanded","false");}});
document.getElementById("closeDialog").addEventListener("click",()=>document.getElementById("productDialog").close());
document.getElementById("productDialog").addEventListener("click",e=>{if(e.target.id==="productDialog")e.currentTarget.close();});
document.getElementById("productDialogContent").addEventListener("click",e=>{if(e.target.id==="dialogAdd"&&selectedProduct){addToCart(selectedProduct.id,document.getElementById("productSize").value);document.getElementById("productDialog").close();}});
document.getElementById("checkoutBtn").addEventListener("click",()=>{if(!cart.length){toast("Add a product before checkout");return;}document.getElementById("checkout").scrollIntoView({behavior:"smooth"});});
document.getElementById("checkoutForm").addEventListener("submit",e=>{
  e.preventDefault();if(!cart.length){toast("Your cart is empty");return;}
  const data=Object.fromEntries(new FormData(e.currentTarget).entries());const t=totals();
  const order={id:"SG"+Date.now().toString().slice(-7),date:new Date().toLocaleDateString("en-IN"),status:"Order placed (demo)",payment:data.payment,total:t.total,items:cart.map(i=>({...i})),customer:{name:data.name,email:data.email,address:data.address,city:data.city,state:data.state,pincode:data.pincode,phone:data.phone}};
  orders.push(order);if(!currentUser)currentUser={name:data.name,email:data.email};save();cart=[];save();renderCart();renderAccount();e.currentTarget.reset();toast(`Order ${order.id} placed successfully!`);document.getElementById("account").scrollIntoView({behavior:"smooth"});
});
document.getElementById("accountPanel").addEventListener("click",e=>{
  if(e.target.id==="showRegister"){document.getElementById("authContent").innerHTML=`<h3>CREATE ACCOUNT</h3><form id="registerForm"><label>Full name<input name="name" required placeholder="Your name"></label><label>Email address<input name="email" type="email" required placeholder="you@example.com"></label><label>Password<input name="password" type="password" required minlength="4" placeholder="At least 4 characters"></label><button class="btn btn-green full-btn" type="submit">CREATE DEMO ACCOUNT →</button></form><p class="form-hint">Already registered? <button class="account-switch" id="showLogin">Sign in</button></p>`;}
  if(e.target.id==="showLogin")renderAccount();
  if(e.target.id==="logoutBtn"){currentUser=null;save();renderAccount();toast("Signed out");}
});
document.getElementById("accountPanel").addEventListener("submit",e=>{
  e.preventDefault();const data=Object.fromEntries(new FormData(e.target).entries());
  if(e.target.id==="registerForm"){currentUser={name:data.name,email:data.email};toast("Demo account created");}
  else if(e.target.id==="loginForm"){currentUser={name:data.email.split("@")[0],email:data.email};toast("Signed in (demo)");}
  save();renderAccount();
});
document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("contactFeedback").textContent="Thanks! Your demo message has been received locally.";e.target.reset();});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();renderAccount();
