import { LitElement, html, css } from 'https://unpkg.com/lit-element?module';

import * as formLogic from './js/form-logic.js';
import * as drugsList from './js/drugs-list.js';

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1)
};

class PreopView extends LitElement {
  static get styles() {
    return [
      css`
        :host {
        }
        form {
          display: flex;
          flex-wrap: wrap;
        }
        form .col {
          max-width: 300px;
          padding: 15px;
        }
        form div:last-child {
          max-width: 400px
        }
        h2,
        .frailty h3,
        .group:first-child {
          display: block;
          text-transform: capitalize;
          font-size: 1rem;
          font-weight: 500;
          line-height: 2rem;
        }
        h3 {
          text-transform: capitalize;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1rem;
          display: inline-block;
          padding: 0;
          margin: 0;
          min-width: 50px;
        }
        .grid div,
        .mallampati div,
        .teeth div,
        .tmd div,
        .covid div,
        .calder div {
          display: inline-block;
        }
        textarea {
          box-sizing: border-box;
          width: 100%;
        }
        .grid {
          display: grid;
          grid-template-rows: repeat(7, auto);
          grid-auto-flow: column;
          font-size: 0.8rem;
        }
        .grid div {
          border-top: 1px solid #000;
          border-right: 1px solid #000;
          box-sizing: border-box;
          padding: 5px;
        }
        button[name="clipboard"] {
          padding: 20px;
        }
      `
    ];
  }
  constructor() {
    super();
  }
  firstUpdated() {
    this.drugsPicker = this.shadowRoot.querySelector('[name="picker"]');
    this.drugsTextarea = this.shadowRoot.querySelector('[name="dh"]');
  }
  _addDrugToList(drug) {
    this.drugsTextarea.value = this.drugsTextarea.value + drug + '\n';
    this.drugsPicker.value = '';
  }
  _onClickDatalist(e) {
    const drug = this.drugsPicker.value;
    if (drugsList.drugs.includes(drug)) this._addDrugToList(drug);
  }
  _onClickDrugButton(e) {
    this._addDrugToList(this.drugsPicker.value);
  }
  _parseFormResults(formData) {
    const results = {};
    for (let [key, val] of formData.entries()) {
      const appendKey = ['presentation', 'allergies', 'airway'];
      if (appendKey.includes(key)) val = `${capitalize(key)}: ${val}`;

      const airwayGroup = ['mallampati', 'calder', 'tmd', 'teeth'];
      if (airwayGroup.includes(key)) {
        results.airwayGroup += `${capitalize(key)} ${val}; `;
      }

      results[key] = val;
      console.log(key, val);

    }
    return results;
  }
  async _copyToClipboard(e) {
    const form = this.shadowRoot.querySelector('form');
    const formData = new FormData(form);
    const results = this._parseFormResults(formData);
    let text = `
____________
covid: test
____________
${results.presentation}
____________
Drugs:
${results.dh}
____________
${results.allergies}
____________
Airway:
${results.airwayGroup}
${results['airway comments']}
____________
`.trim();

    const permission = await navigator.permissions.query({ name: 'clipboard-write' });
    if (permission.state === 'granted') {
        const data = new ClipboardItem({ 'text/plain': new Blob([text], {type: 'text/plain'}) });
        await navigator.clipboard.write([data]).catch(err => console.error(err));
        alert('Copied to clipboard!');
    } else {
        console.error('permission denied', permission);
    }
  }

  renderTextarea(opts) {
    const { name, label, placeholder, datalist } = opts;
    return html`
      <div>
        <h2>${label || name}</h2>
        ${datalist
        ? html`
            <label for="picker">Choose your browser from the list:</label>
            <input list="items" name="picker" @input="${this._onClickDatalist}">
            <button type="button" @click="${this._onClickDrugButton}">Add</button>
            <datalist id="items">${drugsList.drugs.map(drug => html`<option value="${drug}">`)}</datalist>
          `
        : ''}
        <textarea name="${name}" cols="50" rows="5" placeholder="${placeholder || ''}"></textarea>
      </div>`;
  }
  renderText(opts) {
    const { name, label, placeholder } = opts;
    return html`
      <div class="${name}">
        <h3>${label || name}</h3>
        <input type="text" name="${name}" cols="50" rows="5" placeholder="${placeholder || ''}">
      </div>`;
  }
  renderRadio(opts) {
    const { name, label, options } = opts;
    return html`
      <section class="${name}">
        <h3>${label || name}</h3>
        ${options.map(li => html`
          <div>
            <input type="radio" id="${name}" name="${name}" value="${li}">
            <label>${li}</label>
          </div>
        `)}
      </section>`;
  }
  renderCheck(opts) {
    const { name, label, header, options } = opts;
    return html`
      <div class="${name}">
        ${header ? html`<h3>${label || name || ''}</h3>` : ''}
        ${options.map(li => html`
          <input type="checkbox" id="${name}" name="${name}" value="${li}" ?checked="${formLogic.selectedByDefault.includes(li)}">
          <label>${li}</label>
        `)}
      </div>`;
  }
  renderDate(opts) {
    const { name, label } = opts;
    return html`
      <div class="${name}">
        <label>${label || name}</label>
        <input type="date" name="${name}">
      </div>`;
  }
  renderGroup(opts) {
    const { name, label } = opts;
    return html`
      <div class="group">
        <h2>${label || name}</h2>
        ${formLogic.groups[name].map(li => html`${this.renderForm(li)}`)}
      </div>`;
  }
  renderChecklists(opts) {
    const { name, label } = opts;
    return html`
      <div>
        <h2>${label || name}</h2>
        <div class="grid">
          ${formLogic.groups[name].map((col, index) => {
            if (index == 0) return html`${col.map(row => html`<div>${row}</div>`)}`;
            const gpName = index == 1 ? 'GA' : index == 2 ? 'RA' : 'Lines';

            return col.map(row => this.renderForm({ type: 'check', name: gpName, header: null, options: row || [] }));
          })}
        </div>
      </div>`;
  }
  renderForm(opts) {
    switch (opts.type) {
      case 'textarea': return this.renderTextarea(opts);
      case 'text': return this.renderText(opts);
      case 'radio': return this.renderRadio(opts);
      case 'check': return this.renderCheck(opts);
      case 'date': return this.renderDate(opts);
      case 'group': return this.renderGroup(opts);
      case 'checklists': return this.renderChecklists(opts);
    }
  }
  render() {
    return html`
      <form name="preop">
        ${formLogic.form.map(col => html`<div class="col">${col.map(item => this.renderForm(item))}</div>`)}
      </form>
      <button name="clipboard" type="button" @click="${this._copyToClipboard}">Copy text to clipboard you might have to use ctrl c</button>
    `;
  }
}
customElements.define('preop-view', PreopView);
