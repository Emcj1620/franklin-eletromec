/* ==========================================================================
   FRANKLIN ELETROMEC — I18N REACTIVE TRANSLATION ENGINE
   ========================================================================== */

import { en } from './i18n/en.js?v=1.2';
import { pt } from './i18n/pt.js?v=1.2';
import { es } from './i18n/es.js?v=1.2';

const dictionaries = { en, pt, es };
const STORAGE_KEY = 'franklin_eletromec_lang';

class I18nEngine {
  constructor() {
    this.currentLang = this.detectLanguage();
    this.init();
  }

  detectLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && dictionaries[saved]) {
      return saved;
    }
    
    // Check browser languages if no saved preference
    const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (browserLang.startsWith('pt')) return 'pt';
    if (browserLang.startsWith('es')) return 'es';
    
    return 'en'; // Default to English as specified
  }

  init() {
    this.applyLanguage(this.currentLang);
    this.bindLanguageSwitchers();
  }

  getNestedTranslation(dict, path) {
    return path.split('.').reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : null), dict);
  }

  translate(key, lang = this.currentLang) {
    const dict = dictionaries[lang] || dictionaries.en;
    const value = this.getNestedTranslation(dict, key);
    if (value !== null) return value;
    
    // Fallback to English if key missing
    const fallback = this.getNestedTranslation(dictionaries.en, key);
    return fallback !== null ? fallback : key;
  }

  setLanguage(lang) {
    if (!dictionaries[lang]) return;
    this.currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    this.applyLanguage(lang);
    
    // Dispatch custom event for dynamic components
    window.dispatchEvent(new CustomEvent('franklin:languageChanged', { detail: { lang } }));
  }

  applyLanguage(lang) {
    const dict = dictionaries[lang] || dictionaries.en;

    // 1. Text Content
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = this.getNestedTranslation(dict, key);
      if (text !== null) {
        el.textContent = text;
      }
    });

    // 2. HTML Content (for highlighted terms with span tags)
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const html = this.getNestedTranslation(dict, key);
      if (html !== null) {
        el.innerHTML = html;
      }
    });

    // 3. Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = this.getNestedTranslation(dict, key);
      if (text !== null) {
        el.setAttribute('placeholder', text);
      }
    });

    // 4. Titles / Aria labels
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      const text = this.getNestedTranslation(dict, key);
      if (text !== null) {
        el.setAttribute('title', text);
        el.setAttribute('aria-label', text);
      }
    });

    // 5. Select Options
    document.querySelectorAll('option[data-i18n]').forEach((opt) => {
      const key = opt.getAttribute('data-i18n');
      const text = this.getNestedTranslation(dict, key);
      if (text !== null) {
        opt.textContent = text;
      }
    });

    // 6. Update Page Meta Title & Description
    if (dict.meta) {
      if (dict.meta.title) document.title = dict.meta.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && dict.meta.description) {
        metaDesc.setAttribute('content', dict.meta.description);
      }
    }

    // 7. Update UI Buttons Active State
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  bindLanguageSwitchers() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-btn');
      if (btn) {
        const targetLang = btn.getAttribute('data-lang');
        if (targetLang && targetLang !== this.currentLang) {
          this.setLanguage(targetLang);
        }
      }
    });
  }
}

export const i18n = new I18nEngine();
