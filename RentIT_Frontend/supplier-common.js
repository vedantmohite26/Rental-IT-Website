/**
 * RentIT Supplier Portal - Common Utilities and Session Management
 */

const API_BASE_URL = `${window.location.protocol === 'file:' ? 'http:' : window.location.protocol}//${window.location.hostname || 'localhost'}:3001`;

/**
 * Initializes supplier session check and configures common navigation elements
 * @param {string} activePage - Identifier for the active page ('dashboard', 'manage', 'add')
 * @returns {Promise<Object|null>} - Owner data object or null if redirecting
 */
async function initSupplierSession(activePage) {
  try {
    const response = await fetch(`${API_BASE_URL}/owner-session`, {
      credentials: 'include'
    });

    if (response.status === 401) {
      window.location.replace('owner_login.html');
      return null;
    }

    if (!response.ok) {
      throw new Error(`Owner session request failed: ${response.status}`);
    }

    const data = await response.json();
    const owner = data.owner;

    // Update greeting and avatar
    const greetingEl = document.getElementById('ownerGreeting');
    if (greetingEl) {
      greetingEl.textContent = owner.name;
    }

    const avatarEl = document.getElementById('ownerAvatar');
    if (avatarEl && owner.name) {
      const initials = owner.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
      avatarEl.textContent = initials || 'S';
    }

    // Set active navigation link
    if (activePage) {
      const activeLink = document.querySelector(`.sup-nav-link[data-page="${activePage}"]`);
      if (activeLink) {
        document.querySelectorAll('.sup-nav-link').forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
      }
    }

    // Setup mobile nav toggle
    const toggleBtn = document.getElementById('supMobileToggle');
    const navMenu = document.getElementById('supNav');
    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
    }

    return owner;
  } catch (error) {
    console.error('Owner session error:', error);
    showToast('Session check failed. Please check backend connection.', 'error');
    return null;
  }
}

/**
 * Supplier Logout
 */
async function supplierLogout() {
  try {
    const response = await fetch(`${API_BASE_URL}/owner/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Logout request failed: ${response.status}`);
    }

    localStorage.removeItem('rentitOwnerLoggedIn');
    localStorage.removeItem('rentitCurrentOwner');
    window.location.replace('owner_login.html');
  } catch (error) {
    console.error('Owner logout error:', error);
    showToast('Logout failed. Please check the server and try again.', 'error');
  }
}

/**
 * Modern floating Toast Notification
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 */
function showToast(message, type = 'success') {
  let container = document.getElementById('supToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'supToastContainer';
    container.className = 'sup-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `sup-toast ${type}`;

  const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${iconClass} sup-toast-icon"></i>
    <span class="sup-toast-message">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * HTML Escaping helper
 */
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Formats a number as Indian Currency (INR)
 */
function formatINR(number) {
  const num = Number(number);
  if (!Number.isFinite(num)) return '0';
  return num.toLocaleString('en-IN');
}
