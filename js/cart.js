// Cart persistence via localStorage. Shape: { [productId__variantId]: quantity }
const CART_KEY = "alltrip_cart";

function cartItemKey(productId, variantId) {
  return `${productId}__${variantId}`;
}

function getDefaultVariant(product) {
  const variants = product.variants && product.variants.length ? product.variants : [{ id: "default", label: product.name, price: product.price }];
  return variants.find((v) => v.default) || variants[0];
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, variantId, qty = 1) {
  const cart = getCart();
  const key = cartItemKey(productId, variantId);
  cart[key] = (cart[key] || 0) + qty;
  saveCart(cart);
}

function setQuantity(key, qty) {
  const cart = getCart();
  if (qty <= 0) {
    delete cart[key];
  } else {
    cart[key] = qty;
  }
  saveCart(cart);
}

function removeFromCart(key) {
  const cart = getCart();
  delete cart[key];
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function getCartItems() {
  const cart = getCart();
  return Object.entries(cart)
    .map(([key, qty]) => {
      const [productId, variantId] = key.split("__");
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return null;
      const variant = (product.variants || []).find((v) => v.id === variantId) || null;
      return {
        ...product,
        key,
        qty,
        variantId: variant ? variant.id : null,
        variantLabel: variant ? variant.label : null,
        price: variant ? variant.price : product.price,
        name: variant ? `${product.name} — ${variant.label}` : product.name,
      };
    })
    .filter(Boolean);
}

function getCartCount() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function getCartTotal() {
  return getCartItems().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  badge.textContent = getCartCount();
  badge.classList.add("bump");
  setTimeout(() => badge.classList.remove("bump"), 200);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
