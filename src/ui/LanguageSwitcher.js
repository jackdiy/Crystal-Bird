// 语言切换器UI管理器 (Language Switcher UI Manager)
import i18n from '../i18n/i18n.js';

export class LanguageSwitcher {
  constructor() {
    this.currentLang = i18n.language || 'zh-CN';
    
    // 等待DOM加载完成后再创建UI (Wait for DOM to load before creating UI)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initialize();
      });
    } else {
      this.initialize();
    }
  }

  // 初始化 (Initialize)
  initialize() {
    this.createUI();
    this.setupEventListeners();
    // 首次更新所有文本 (First time update all text)
    setTimeout(() => {
      this.updateAllText();
    }, 100);
  }

  // 创建语言切换器UI (Create Language Switcher UI)
  createUI() {
    // 创建容器 (Create container)
    this.container = document.createElement('div');
    this.container.className = 'language-switcher';
    this.container.innerHTML = `
      <button class="lang-btn" data-lang="zh-CN">
        <span class="lang-flag">🇨🇳</span>
        <span class="lang-text">中文</span>
      </button>
      <button class="lang-btn" data-lang="en">
        <span class="lang-flag">🇬🇧</span>
        <span class="lang-text">EN</span>
      </button>
    `;

    // 添加到header (Add to header)
    const header = document.querySelector('.header .nav-links');
    if (header) {
      header.appendChild(this.container);
    }

    // 高亮当前语言 (Highlight current language)
    this.updateActiveState();
  }

  // 设置事件监听器 (Setup event listeners)
  setupEventListeners() {
    const buttons = this.container.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        this.switchLanguage(lang);
      });
    });

    // 监听语言变化事件 (Listen for language change events)
    i18n.on('languageChanged', (lng) => {
      this.currentLang = lng;
      this.updateActiveState();
      this.updateAllText();
    });
  }

  // 切换语言 (Switch language)
  switchLanguage(lang) {
    if (lang === this.currentLang) return;
    
    i18n.changeLanguage(lang);
    localStorage.setItem('crystal-bird-language', lang);
  }

  // 更新激活状态 (Update active state)
  updateActiveState() {
    const buttons = this.container.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      if (lang === this.currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // 更新所有文本 (Update all text)
  updateAllText() {
    // 更新所有带有data-i18n属性的元素 (Update all elements with data-i18n attribute)
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = i18n.t(key);
    });

    // 更新特殊元素 (Update special elements)
    this.updateLoadingScreen();
    this.updateOnboarding();
    this.updateHints();
    this.updateContent();
  }

  // 更新加载屏幕 (Update loading screen)
  updateLoadingScreen() {
    const musicBtn = document.querySelector('.crystal-btn-music span:last-child');
    const silentBtn = document.querySelector('.crystal-btn-silent span:last-child');
    const progressText = document.querySelector('.crystal-loader-hint');

    if (musicBtn) musicBtn.textContent = i18n.t('loading.withMusic');
    if (silentBtn) silentBtn.textContent = i18n.t('loading.withoutMusic');
    if (progressText) progressText.textContent = i18n.t('loading.hint');
  }

  // 更新欢迎引导 (Update onboarding)
  updateOnboarding() {
    const title = document.querySelector('.onboarding-title');
    const subtitle = document.querySelector('.onboarding-subtitle');
    const gotItBtn = document.querySelector('.onboarding-dismiss');
    const dontShowLabel = document.querySelector('.onboarding-checkbox span:last-child');

    if (title) title.textContent = i18n.t('onboarding.title');
    if (subtitle) subtitle.textContent = i18n.t('onboarding.subtitle');
    if (gotItBtn) gotItBtn.textContent = i18n.t('onboarding.gotIt');
    if (dontShowLabel) dontShowLabel.textContent = i18n.t('onboarding.dontShow');

    // 更新提示项 (Update tip items)
    const tips = document.querySelectorAll('.onboarding-tip');
    const tipKeys = ['drag', 'scroll', 'space', 'debug'];
    tips.forEach((tip, index) => {
      const key = tip.querySelector('.onboarding-tip-key');
      const desc = tip.querySelector('.onboarding-tip-desc');
      if (key && tipKeys[index] !== 'debug') {
        key.textContent = i18n.t(`onboarding.tips.${tipKeys[index]}`);
      }
      if (desc) {
        desc.textContent = i18n.t(`onboarding.tips.${tipKeys[index]}Desc`);
      }
    });
  }

  // 更新提示文本 (Update hints)
  updateHints() {
    // 更新全局hints数组 (Update global hints array)
    if (window.updateHintsFromi18n) {
      window.updateHintsFromi18n();
    }
  }

  // 更新内容 (Update content)
  updateContent() {
    const subtitle = document.querySelector('.subtitle');
    const navLinks = document.querySelectorAll('.nav-link');
    const metaLabels = document.querySelectorAll('.meta-label');

    if (subtitle) subtitle.textContent = i18n.t('content.subtitle');

    // 更新导航链接 (Update navigation links)
    const navKeys = ['source', 'github', 'twitter'];
    navLinks.forEach((link, index) => {
      if (navKeys[index]) {
        link.textContent = i18n.t(`nav.${navKeys[index]}`);
      }
    });

    // 更新元数据标签 (Update metadata labels)
    const metaKeys = ['createdBy', 'model3d', 'music'];
    metaLabels.forEach((label, index) => {
      if (metaKeys[index]) {
        label.textContent = i18n.t(`meta.${metaKeys[index]}`);
      }
    });

    // 更新标签 (Update tags)
    const tags = document.querySelectorAll('.tag');
    const tagKeys = ['gpgpu', 'postfx', 'webgl', 'threejs'];
    tags.forEach((tag, index) => {
      if (tagKeys[index]) {
        tag.textContent = i18n.t(`tags.${tagKeys[index]}`);
      }
    });
  }
}
