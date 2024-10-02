import { LitElement, html, css } from 'lit';

export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: #f5f5f5;
    }
  `;

  static properties = {
    message: { type: String },
		count: { state: true },
  };

  constructor() {
    super();
    this.message = 'Hello, Lit SSR!';
		this.count = 0;
  }

  render() {
    return html`
      <div>
        <h1>${this.message}</h1>
				<button @click=${() => this.count++}>Click Me ${this.count}</button>
      </div>
    `;
  }
}

customElements.define('my-element', MyElement);