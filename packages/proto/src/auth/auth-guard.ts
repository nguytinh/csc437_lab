import { LitElement, css } from "lit";
import { Observer } from "@calpoly/mustang";
import { Auth } from "@calpoly/mustang";

export class AuthGuardElement extends LitElement {
  _authObserver = new Observer<Auth.Model>(this, "gaming:auth");

  connectedCallback() {
    super.connectedCallback();
    
    // Don't redirect if we're already on login or register pages
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.includes('login.html') || currentPath.includes('newuser.html');
    
    if (isLoginPage) {
      return;
    }
    
    // Check authentication immediately and on changes
    const checkAuth = (auth: Auth.Model) => {
      const { user } = auth;
      if (!user || !user.authenticated) {
        // Redirect to login if not authenticated (protect all pages including index.html)
        const currentPath = window.location.pathname;
        const isLoginPage = currentPath.includes('login.html') || currentPath.includes('newuser.html');
        
        if (!isLoginPage) {
          window.location.href = "/login.html";
        }
      }
    };
    
    // Observe auth changes
    this._authObserver.observe(checkAuth);
    
    // Also check immediately if auth state is already available
    // This handles the case where the user navigates directly to index.html
    setTimeout(() => {
      const authElement = document.querySelector('mu-auth');
      if (authElement) {
        const authModel = (authElement as any).state;
        if (authModel) {
          checkAuth(authModel);
        }
      }
    }, 0);
  }

  override render() {
    return null;
  }

  static styles = css`
    :host {
      display: none;
    }
  `;
}


