function money(n) {
  return `${STORE_CONFIG.currencySymbol}${n.toFixed(2)}`;
}

function productCardHtml(p) {
  return `
    <div class="product-card" data-category="${p.category}">
      <div class="product-image" style="background:${p.color}" data-open-variants="${p.id}" role="button" tabindex="0" aria-label="View options for ${p.name}">
        <span class="rating-badge">★ ${p.rating.value.toFixed(1)} (${p.rating.count})</span>
        ${productImageInnerHtml(p)}
      </div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description}</div>
        <div class="product-price">
          ${p.compareAt ? `<span class="compare-price">${money(p.compareAt)}</span>` : ""}
          From ${money(p.price)}
        </div>
        <button class="btn-primary" data-open-variants="${p.id}">Select options</button>
      </div>
    </div>`;
}

function renderProductGrid(container, products) {
  if (products.length === 0) {
    container.innerHTML = `<p class="note" style="padding:24px 0;">No products match your filters.</p>`;
    return;
  }
  container.innerHTML = products.map(productCardHtml).join("");
  container.querySelectorAll("[data-open-variants]").forEach((el) => {
    el.addEventListener("click", () => openVariantModal(el.dataset.openVariants));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openVariantModal(el.dataset.openVariants);
      }
    });
  });
}

// ---- Product options popup (opened by clicking a product image) ----

const variantModalState = { productId: null, qty: 1 };

function ensureVariantModal() {
  if (document.getElementById("product-modal-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "product-modal-overlay";
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-product-name">
      <button type="button" class="modal-close" id="modal-close" aria-label="Close">&times;</button>
      <div class="modal-product">
        <div class="modal-product-image" id="modal-product-image"></div>
        <div class="modal-product-info">
          <div class="modal-product-name" id="modal-product-name"></div>
          <div class="modal-product-desc" id="modal-product-desc"></div>
        </div>
      </div>
      <div class="modal-variants">
        <h4>Choose up to 2 options</h4>
        <div class="variant-list" id="modal-variant-list"></div>
      </div>
      <div class="modal-footer">
        <div class="qty-control" id="modal-qty-control">
          <button type="button" id="modal-qty-decrease" aria-label="Decrease quantity">−</button>
          <span id="modal-qty-value">1</span>
          <button type="button" id="modal-qty-increase" aria-label="Increase quantity">+</button>
        </div>
        <button type="button" class="btn-primary" id="modal-add-to-cart">Add to cart</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeVariantModal();
  });
  document.getElementById("modal-close").addEventListener("click", closeVariantModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVariantModal();
  });

  document.getElementById("modal-qty-decrease").addEventListener("click", () => {
    variantModalState.qty = Math.max(1, variantModalState.qty - 1);
    updateVariantModalFooter();
  });
  document.getElementById("modal-qty-increase").addEventListener("click", () => {
    variantModalState.qty += 1;
    updateVariantModalFooter();
  });

  document.getElementById("modal-add-to-cart").addEventListener("click", () => {
    const selected = [...overlay.querySelectorAll('input[name="variant"]:checked')];
    if (!selected.length || !variantModalState.productId) return;
    selected.forEach((input) => addToCart(variantModalState.productId, input.value, variantModalState.qty));
    const btn = document.getElementById("modal-add-to-cart");
    btn.textContent = "Added ✓";
    setTimeout(closeVariantModal, 500);
  });
}

const MAX_VARIANT_SELECTION = 2;

function variantsFor(product) {
  return product.variants && product.variants.length
    ? product.variants
    : [{ id: "default", label: product.name, price: product.price, default: true }];
}

function updateVariantModalFooter() {
  const overlay = document.getElementById("product-modal-overlay");
  const product = PRODUCTS.find((p) => p.id === variantModalState.productId);
  if (!product) return;

  const checkboxes = [...overlay.querySelectorAll('input[name="variant"]')];
  const checked = checkboxes.filter((input) => input.checked);
  const variants = variantsFor(product);

  overlay.querySelectorAll(".variant-option").forEach((label) => {
    const input = label.querySelector("input");
    label.classList.toggle("selected", input.checked);
    input.disabled = !input.checked && checked.length >= MAX_VARIANT_SELECTION;
    label.classList.toggle("disabled", input.disabled);
  });

  document.getElementById("modal-qty-value").textContent = variantModalState.qty;

  const addBtn = document.getElementById("modal-add-to-cart");
  if (checked.length === 0) {
    addBtn.textContent = "Select an option";
    addBtn.disabled = true;
    return;
  }
  addBtn.disabled = false;
  const total = checked.reduce((sum, input) => {
    const variant = variants.find((v) => v.id === input.value);
    return sum + (variant ? variant.price : 0) * variantModalState.qty;
  }, 0);
  addBtn.textContent = `Add to cart — ${money(total)}`;
}

function openVariantModal(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  ensureVariantModal();
  variantModalState.productId = productId;
  variantModalState.qty = 1;

  const imageEl = document.getElementById("modal-product-image");
  imageEl.style.background = product.color;
  imageEl.innerHTML = productImageInnerHtml(product);
  document.getElementById("modal-product-name").textContent = product.name;
  document.getElementById("modal-product-desc").textContent = product.description;

  const variants = variantsFor(product);
  const defaultVariant = getDefaultVariant(product);

  document.getElementById("modal-variant-list").innerHTML = variants
    .map(
      (v) => `
      <label class="variant-option${v.id === defaultVariant.id ? " selected" : ""}">
        <input type="checkbox" name="variant" value="${v.id}" ${v.id === defaultVariant.id ? "checked" : ""} />
        <span class="variant-option-label">${v.label}</span>
        <span class="variant-option-price">${money(v.price)}</span>
      </label>`
    )
    .join("");

  document.getElementById("modal-variant-list").querySelectorAll('input[name="variant"]').forEach((input) => {
    input.addEventListener("change", updateVariantModalFooter);
  });

  updateVariantModalFooter();

  document.getElementById("product-modal-overlay").classList.add("open");
  document.body.classList.add("modal-open");
}

function closeVariantModal() {
  const overlay = document.getElementById("product-modal-overlay");
  if (overlay) overlay.classList.remove("open");
  document.body.classList.remove("modal-open");
}
