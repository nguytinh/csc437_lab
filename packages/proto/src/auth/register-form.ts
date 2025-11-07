import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css.ts";

interface RegisterFormData {
  username?: string;
  password?: string;
}

export class RegisterFormElement extends LitElement {

  @state()
  formData: RegisterFormData = {};

  @property()
  api?: string;

  @property()
  redirect: string = "/";

  @state()
  error?: string;

  get canSubmit(): boolean {
    return Boolean(this.api && this.formData.username &&
      this.formData.password);
  }

  override render() {
    return html`
      <form
        @change=${(e: InputEvent) => this.handleChange(e)}
        @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
      >
        <slot></slot>
        <button
          ?disabled=${!this.canSubmit}
          type="submit"
          id="register-button"
          aria-label="Register new account">
          Register
        </button>
        ${this.error ? html`<p class="error">${this.error}</p>` : ''}
      </form>
    `;
  }

  static styles = [
    reset.styles,
    css`
      .error:not(:empty) {
        color: var(--color-error, #ff4444);
        border: 1px solid var(--color-error, #ff4444);
        padding: var(--size-spacing-medium, 1rem);
        margin-top: var(--space-md, 1rem);
      }
      form {
        display: flex;
        flex-direction: column;
        gap: var(--gap-md, 1rem);
        width: 100%;
      }
      :host {
        display: block;
        width: 100%;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: var(--gap-sm, 0.75rem);
        margin-bottom: var(--space-md);
      }
      label span {
        font-weight: 600;
        color: var(--color-text);
        font-size: 0.95rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      input {
        padding: var(--space-md, 0.75rem);
        border: 2px solid var(--color-border);
        border-radius: 8px;
        background-color: var(--color-background-content);
        color: var(--color-text);
        font-size: 1rem;
        transition: border-color 0.2s, box-shadow 0.2s;
        width: 100%;
        box-sizing: border-box;
      }
      
      input:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px rgba(248, 234, 156, 0.1);
      }
      
      input::placeholder {
        color: var(--color-text-muted);
        opacity: 0.6;
      }
      button {
        padding: var(--space-md, 0.75rem) var(--space-lg, 1.5rem);
        background-color: var(--color-accent, #f8ea9c);
        color: var(--color-background-page, #1a1a2e);
        border: 2px solid var(--color-accent, #f8ea9c);
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        font-size: 1.1rem;
        min-height: 48px;
        width: 100%;
        margin-top: var(--space-md);
        display: block;
        visibility: visible !important;
        opacity: 1 !important;
        transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
      }
      button:disabled {
        opacity: 0.7 !important;
        cursor: not-allowed;
        background-color: var(--color-accent, #f8ea9c);
        visibility: visible !important;
        display: block !important;
      }
      button:hover:not(:disabled) {
        background-color: var(--color-accent-hover, #faf8ec);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
      button:active:not(:disabled) {
        transform: translateY(0);
      }
      
      button:disabled:hover {
        opacity: 0.7 !important;
        transform: none;
      }
  `];

  handleChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const name = target?.name;
    const value = target?.value;
    const prevData = this.formData;

    switch (name) {
      case "username":
        this.formData = { ...prevData, username: value };
        break;
      case "password":
        this.formData = { ...prevData, password: value };
        break;
    }
  }

  handleSubmit(submitEvent: SubmitEvent) {
    submitEvent.preventDefault();

    if (this.canSubmit) {
      fetch(
        this?.api || "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.formData)
        }
      )
      .then((res) => {
        if (res.status !== 201)
          throw "Registration failed";
        else return res.json();
      })
      .then((json: object) => {
          const { token } = json as { token: string };
          const customEvent = new CustomEvent(
          'auth:message', {
          bubbles: true,
          composed: true,
          detail: [
              'auth/signin',
              { token, redirect: this.redirect }
          ]
          });
          console.log("dispatching message", customEvent);
          this.dispatchEvent(customEvent);
      })
      .catch((error: Error) => {
          console.log(error);
          this.error = error.toString();
      });
    }
  }
}

