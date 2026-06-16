/**
 * <contrast-checker> — a framework-agnostic WCAG color contrast checker Web Component.
 *
 * Zero dependencies. Works in any HTML page, React, Vue, Svelte, Astro — anywhere custom
 * elements run. Drop in the script and use <contrast-checker></contrast-checker>.
 *
 * Computes the WCAG 2.2 contrast ratio between a foreground and background colour and
 * reports AA / AAA pass/fail for normal and large text.
 *
 * Built and maintained by SGBP — Singapore Build Partners (https://sgbp.tech). MIT licensed.
 *
 * @example
 *   <contrast-checker foreground="#1a1a1a" background="#ffffff"></contrast-checker>
 */
class ContrastChecker extends HTMLElement {
  static get observedAttributes() { return ["foreground", "background"]; }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._fg = "#1a1a1a";
    this._bg = "#ffffff";
  }

  connectedCallback() {
    this._fg = this._normalize(this.getAttribute("foreground")) || this._fg;
    this._bg = this._normalize(this.getAttribute("background")) || this._bg;
    this._render();
  }

  attributeChangedCallback(name, _old, value) {
    if (!this.shadowRoot.childElementCount) return;
    const v = this._normalize(value);
    if (!v) return;
    if (name === "foreground") this._fg = v;
    if (name === "background") this._bg = v;
    this._syncInputs();
    this._update();
  }

  /** Current contrast ratio as a number (e.g. 4.54). */
  get ratio() { return ContrastChecker.ratio(this._fg, this._bg); }

  // ---- colour math (WCAG 2.x) ----
  static _hexToRgb(hex) {
    let h = hex.replace("#", "").trim();
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  static _luminance([r, g, b]) {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  /** Contrast ratio between two hex colours, rounded to 2dp. */
  static ratio(fg, bg) {
    const l1 = ContrastChecker._luminance(ContrastChecker._hexToRgb(fg));
    const l2 = ContrastChecker._luminance(ContrastChecker._hexToRgb(bg));
    const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
    return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
  }

  _normalize(v) {
    if (!v) return null;
    v = v.trim();
    if (!v.startsWith("#")) v = "#" + v;
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v) ? v.toLowerCase() : null;
  }

  _badge(pass) {
    return pass
      ? `<span class="b pass">PASS</span>`
      : `<span class="b fail">FAIL</span>`;
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        *, *::before, *::after { box-sizing: border-box; }
        :host { display:block; width:100%; max-width:480px; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
                border:1px solid #e2e2e2; border-radius:12px; overflow:hidden;
                box-shadow:0 1px 3px rgba(0,0,0,.06); }
        .preview { padding:28px 20px; text-align:center; font-size:clamp(16px,4.5vw,20px); font-weight:600; word-break:break-word; }
        .controls { display:flex; gap:14px; padding:16px; background:#fafafa; border-top:1px solid #eee; }
        .field { flex:1 1 0; min-width:0; }
        label { display:block; font-size:12px; font-weight:600; color:#555; margin-bottom:6px; }
        .row { display:flex; gap:8px; align-items:center; }
        input[type=color] { width:38px; height:34px; flex:0 0 auto; border:1px solid #ccc; border-radius:6px; padding:0; background:none; cursor:pointer; }
        input[type=color]::-webkit-color-swatch-wrapper { padding:0; }
        input[type=color]::-webkit-color-swatch { border:none; border-radius:5px; }
        input[type=color]::-moz-color-swatch { border:none; border-radius:5px; }
        input[type=text] { flex:1 1 auto; min-width:0; width:100%; padding:7px 8px; border:1px solid #ccc; border-radius:6px;
                font:inherit; font-size:16px; text-transform:lowercase; }
        .result { padding:16px; border-top:1px solid #eee; }
        .ratio { font-size:clamp(26px,7vw,30px); font-weight:800; letter-spacing:-.5px; }
        .ratio small { font-size:14px; font-weight:600; color:#777; }
        table { width:100%; border-collapse:collapse; margin-top:12px; font-size:13px; }
        td { padding:6px 4px; border-top:1px solid #f0f0f0; color:#444; word-break:break-word; }
        td:last-child { text-align:right; white-space:nowrap; padding-left:8px; }
        .b { font-size:11px; font-weight:700; padding:2px 8px; border-radius:99px; white-space:nowrap; }
        .pass { background:#e6f4ea; color:#137333; }
        .fail { background:#fce8e6; color:#c5221f; }
        @media (max-width:360px){ .controls { flex-direction:column; gap:12px; } }
      </style>
      <div class="preview" part="preview">Almost before we knew it, we had left the ground.</div>
      <div class="controls">
        <div class="field">
          <label>Foreground (text)</label>
          <div class="row"><input type="color" id="fgc"><input type="text" id="fgt" maxlength="7"></div>
        </div>
        <div class="field">
          <label>Background</label>
          <div class="row"><input type="color" id="bgc"><input type="text" id="bgt" maxlength="7"></div>
        </div>
      </div>
      <div class="result" id="result"></div>
    `;
    const $ = (s) => this.shadowRoot.querySelector(s);
    const bind = (color, text, key) => {
      const apply = (v) => {
        const n = this._normalize(v);
        if (!n) return;
        this[key] = n; this._syncInputs(); this._update();
      };
      color.addEventListener("input", (e) => apply(e.target.value));
      text.addEventListener("input", (e) => apply(e.target.value));
    };
    bind($("#fgc"), $("#fgt"), "_fg");
    bind($("#bgc"), $("#bgt"), "_bg");
    this._syncInputs();
    this._update();
  }

  _syncInputs() {
    const $ = (s) => this.shadowRoot.querySelector(s);
    if (!$("#fgc")) return;
    $("#fgc").value = this._fg; $("#fgt").value = this._fg;
    $("#bgc").value = this._bg; $("#bgt").value = this._bg;
  }

  _update() {
    const $ = (s) => this.shadowRoot.querySelector(s);
    const r = this.ratio;
    $(".preview").style.color = this._fg;
    $(".preview").style.background = this._bg;
    $("#result").innerHTML = `
      <div class="ratio">${r.toFixed(2)}<small> : 1</small></div>
      <table>
        <tr><td>AA — Normal text (≥ 4.5:1)</td><td>${this._badge(r >= 4.5)}</td></tr>
        <tr><td>AA — Large text (≥ 3:1)</td><td>${this._badge(r >= 3)}</td></tr>
        <tr><td>AAA — Normal text (≥ 7:1)</td><td>${this._badge(r >= 7)}</td></tr>
        <tr><td>AAA — Large text (≥ 4.5:1)</td><td>${this._badge(r >= 4.5)}</td></tr>
      </table>`;
    this.dispatchEvent(new CustomEvent("change", { detail: { ratio: r, foreground: this._fg, background: this._bg } }));
  }
}

if (!customElements.get("contrast-checker")) {
  customElements.define("contrast-checker", ContrastChecker);
}
if (typeof module !== "undefined" && module.exports) module.exports = ContrastChecker;
