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
  if (event.target.type === 'checkbox') {
    relayEvent(event, 'darkmode:toggle', { checked: event.target.checked });
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
  
  // Find the dark mode switch label and add change handler
  const darkModeSwitch = document.querySelector('.dark-mode-switch');
  if (darkModeSwitch) {
    darkModeSwitch.onchange = handleToggleChange;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
  initDarkMode();
}

export { initDarkMode };

