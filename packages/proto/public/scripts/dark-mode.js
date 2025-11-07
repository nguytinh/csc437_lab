// Dark mode toggle functionality using custom events

const STORAGE_KEY = 'dark-mode-preference';

function relayEvent(event, customType, detail) {
  const customEvent = new CustomEvent(customType, {
    bubbles: true,
    detail: detail
  });
  
  event.currentTarget.dispatchEvent(customEvent);
  event.stopPropagation();
}

// Event handler for the label that relays the change event as a custom event
function handleToggleChange(event) {
  // Handle both direct clicks and events from web components
  const target = event.target;
  const checkbox = target.type === 'checkbox' ? target : target.closest('.dark-mode-switch')?.querySelector('input[type="checkbox"]');
  
  if (checkbox) {
    relayEvent(event, 'darkmode:toggle', { checked: checkbox.checked });
  }
}

// Event handler for the body that listens for the custom event
function handleDarkModeToggle(event) {
  const body = event.currentTarget;
  const isLightMode = event.detail.checked;
  
  if (isLightMode) {
    body.classList.add('light-mode');
    localStorage.setItem(STORAGE_KEY, 'light');
  } else {
    body.classList.remove('light-mode');
    localStorage.setItem(STORAGE_KEY, 'dark');
  }
}

// Restore saved preference from localStorage
function restoreSavedPreference() {
  const savedMode = localStorage.getItem(STORAGE_KEY);
  const checkbox = document.querySelector('.dark-mode-switch input[type="checkbox"]');
  
  if (savedMode === 'light') {
    document.body.classList.add('light-mode');
    if (checkbox) {
      checkbox.checked = true;
    }
  } else {
    document.body.classList.remove('light-mode');
    if (checkbox) {
      checkbox.checked = false;
    }
  }
}

// Initialize dark mode functionality
function initDarkMode() {
  // Restore saved preference first
  restoreSavedPreference();
  
  // Add event listener to body for custom darkmode:toggle event
  document.body.addEventListener('darkmode:toggle', handleDarkModeToggle);
  
  // Use event delegation on document to handle dynamically rendered components
  // This works even if the dark mode switch is inside a web component
  document.addEventListener('change', (event) => {
    const target = event.target;
    if (target.type === 'checkbox' && target.closest('.dark-mode-switch')) {
      handleToggleChange(event);
    }
  });
  
  // Also attach directly to existing switches (for pages without web components)
  function attachDarkModeHandler() {
    const darkModeSwitch = document.querySelector('.dark-mode-switch');
    if (darkModeSwitch && !darkModeSwitch.onchange) {
      darkModeSwitch.onchange = handleToggleChange;
    }
  }
  
  // Try to attach immediately, then retry for web components
  attachDarkModeHandler();
  
  // Retry mechanism for web components that render asynchronously
  let attempts = 0;
  const maxAttempts = 10;
  const tryAttach = () => {
    attempts++;
    attachDarkModeHandler();
    if (attempts < maxAttempts) {
      setTimeout(tryAttach, 100);
    }
  };
  setTimeout(tryAttach, 100);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Small delay to allow web components to initialize
    setTimeout(initDarkMode, 50);
  });
} else {
  // Small delay to allow web components to initialize
  setTimeout(initDarkMode, 50);
}

export { initDarkMode };

