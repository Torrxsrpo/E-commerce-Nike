const API = '';
let cartId = localStorage.getItem('cartId');
let categories = [];

const $ = (selector) => document.querySelector(selector);

async function api(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.message || `Request failed: ${res.status}`);
  }

  return body;
}

function setCartId(id) {
  cartId = id;
  localStorage.setItem('cartId', id);
  $('#cart-id').textContent = id;
}

async function ensureCart() {
  if (cartId) {
    try {
      await api(`/carts/${cartId}`);
      return;
    } catch {
      cartId = null;
    }
  }

  const cart = await api('/carts', { method: 'POST' });
  setCartId(cart.id);
}

async function loadCategories() {
  categories = await api('/categories');
  const select = $('#category-select');
  select.innerHTML = '<option value="">Todas las categorías</option>';
  for (const category of categories) {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  }
}

async function loadProducts() {
  const categoryId = $('#category-select').value;
  const query = categoryId ? `?categoryId=${categoryId}` : '';
  const products = await api(`/products${query}`);
  const list = $('#product-list');
  list.innerHTML = '';

  for (const product of products) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const variantsHtml = product.variants
      .map(
        (variant) => `
        <div class="variant-row">
          <span>${variant.size} / ${variant.color} — stock: ${variant.stock} — sku: ${variant.sku}</span>
          <button data-variant="${variant.id}" class="add-to-cart-btn">Agregar al carrito</button>
        </div>`,
      )
      .join('');

    card.innerHTML = `
      <strong>${product.name}</strong> — $${Number(product.basePrice).toFixed(2)}
      <p>${product.description}</p>
      ${variantsHtml || '<em>Sin variantes todavía</em>'}
      <div class="variant-row">
        <input type="text" class="new-size" placeholder="talla" style="width:60px" />
        <input type="text" class="new-color" placeholder="color" style="width:80px" />
        <input type="text" class="new-sku" placeholder="sku" style="width:100px" />
        <input type="number" class="new-stock" placeholder="stock" style="width:70px" />
        <button class="add-variant-btn" data-product="${product.id}">Agregar variante</button>
      </div>
    `;

    card.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
      btn.addEventListener('click', () => addToCart(btn.dataset.variant));
    });

    card.querySelector('.add-variant-btn').addEventListener('click', () =>
      addVariant(product.id, card),
    );

    list.appendChild(card);
  }
}

async function addVariant(productId, card) {
  const size = card.querySelector('.new-size').value;
  const color = card.querySelector('.new-color').value;
  const sku = card.querySelector('.new-sku').value;
  const stock = Number(card.querySelector('.new-stock').value || 0);

  await api(`/products/${productId}/variants`, {
    method: 'POST',
    body: JSON.stringify({ size, color, sku, stock }),
  });
  await loadProducts();
}

async function addToCart(variantId) {
  await ensureCart();
  await api(`/carts/${cartId}/items`, {
    method: 'POST',
    body: JSON.stringify({ variantId, quantity: 1 }),
  });
  await renderCart();
}

async function renderCart() {
  if (!cartId) return;

  const cart = await api(`/carts/${cartId}`);
  const list = $('#cart-items');
  list.innerHTML = '';

  for (const item of cart.items) {
    const li = document.createElement('li');
    li.textContent = `Variante ${item.variantId} — cantidad ${item.quantity}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Quitar';
    removeBtn.addEventListener('click', async () => {
      await api(`/carts/${cartId}/items/${item.id}`, { method: 'DELETE' });
      await renderCart();
    });

    li.appendChild(removeBtn);
    list.appendChild(li);
  }
}

async function loadOrders() {
  const orders = await api('/orders');
  const list = $('#order-list');
  list.innerHTML = '';

  for (const order of orders) {
    const card = document.createElement('div');
    card.className = 'order-card';
    card.innerHTML = `
      <strong>#${order.id}</strong> — ${order.contactName} (${order.contactEmail})<br/>
      Estado: <strong>${order.status}</strong> — Total: $${Number(order.total).toFixed(2)}
      <div>
        <button class="confirm-order-btn" data-id="${order.id}" ${order.status !== 'PENDING' ? 'disabled' : ''}>Confirmar</button>
        <button class="cancel-order-btn" data-id="${order.id}" ${order.status !== 'PENDING' ? 'disabled' : ''}>Cancelar</button>
      </div>
    `;

    card.querySelector('.confirm-order-btn').addEventListener('click', async (e) => {
      await api(`/orders/${e.target.dataset.id}/confirm`, { method: 'PATCH' });
      await loadOrders();
    });

    card.querySelector('.cancel-order-btn').addEventListener('click', async (e) => {
      await api(`/orders/${e.target.dataset.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'CANCELLED' }),
      });
      await loadOrders();
    });

    list.appendChild(card);
  }
}

$('#new-cart-btn').addEventListener('click', async () => {
  const cart = await api('/carts', { method: 'POST' });
  setCartId(cart.id);
  await renderCart();
});

$('#refresh-products-btn').addEventListener('click', loadProducts);
$('#category-select').addEventListener('change', loadProducts);
$('#refresh-orders-btn').addEventListener('click', loadOrders);

$('#create-category-btn').addEventListener('click', async () => {
  const name = $('#category-name').value;
  const slug = $('#category-slug').value;
  await api('/categories', { method: 'POST', body: JSON.stringify({ name, slug }) });
  await loadCategories();
});

$('#create-product-btn').addEventListener('click', async () => {
  const categoryId = $('#category-select').value || categories[0]?.id;
  if (!categoryId) {
    alert('Crea una categoría primero');
    return;
  }

  await api('/products', {
    method: 'POST',
    body: JSON.stringify({
      categoryId,
      name: $('#product-name').value,
      description: $('#product-description').value,
      basePrice: Number($('#product-price').value || 0),
    }),
  });
  await loadProducts();
});

$('#checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const resultEl = $('#checkout-result');

  try {
    const order = await api('/orders/checkout', {
      method: 'POST',
      body: JSON.stringify({
        cartId,
        contactName: $('#contact-name').value,
        contactEmail: $('#contact-email').value,
      }),
    });
    resultEl.textContent = `Pedido creado: ${order.id} (${order.status})`;
    resultEl.classList.remove('error');

    const newCart = await api('/carts', { method: 'POST' });
    setCartId(newCart.id);
    await renderCart();
    await loadOrders();
  } catch (err) {
    resultEl.textContent = err.message;
    resultEl.classList.add('error');
  }
});

(async function init() {
  await ensureCart();
  await loadCategories();
  await loadProducts();
  await renderCart();
  await loadOrders();
})();
