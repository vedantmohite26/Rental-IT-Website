const storefrontApiBaseUrl = `${window.location.protocol === 'file:' ? 'http:' : window.location.protocol}//${window.location.hostname || 'localhost'}:3001`;

window.addEventListener('load', async () => {
  const cartCount = document.querySelector('.store-cart-count');
  if (!cartCount) return;

  try {
    const response = await fetch(`${storefrontApiBaseUrl}/user-session`, {
      credentials: 'include'
    });

    if (response.status === 401) {
      cartCount.textContent = '0';
      return;
    }
    if (!response.ok) {
      throw new Error(`Could not verify user session: ${response.status}`);
    }

    const { user } = await response.json();
    const cart = JSON.parse(localStorage.getItem(`rentitCart_${user.user_id}`) || '[]');
    cartCount.textContent = Array.isArray(cart) ? String(cart.length) : '0';
  } catch (error) {
    console.error('Could not update cart count:', error);
    cartCount.textContent = '0';
  }
});
