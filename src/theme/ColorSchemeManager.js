// 配色方案管理器 (Color Scheme Manager)
// 管理整个应用的配色方案，支持预设和自定义 (Manage app color schemes, support presets and custom)
import * as THREE from 'three';
import i18n from '../i18n/i18n.js';
import gsap from 'gsap';

export class ColorSchemeManager {
  constructor(shaderMaterialManager, postProcessing) {
    this.shaderMaterialManager = shaderMaterialManager;
    this.postProcessing = postProcessing;
    
    // 预设配色方案 (Preset color schemes)
    this.schemes = {
      default: {
        primary: '#6AB7FF',
        secondary: '#3B82F6',
        accent: '#93C5FD',
        background: '#050810',
        particle: '#6AB7FF'
      },
      dopamine: {
        primary: '#FF6B9D',
        secondary: '#FFA07A',
        accent: '#FFD93D',
        background: '#1A0B2E',
        particle: '#FF6B9D'
      },
      macaron: {
        primary: '#B4A7D6',
        secondary: '#FFB7B2',
        accent: '#A8E6CF',
        background: '#FFF5F7',
        particle: '#B4A7D6'
      },
      sunset: {
        primary: '#FF6B6B',
        secondary: '#FFA500',
        accent: '#FFD700',
        background: '#2C1B47',
        particle: '#FF6B6B'
      },
      forest: {
        primary: '#4ECDC4',
        secondary: '#44A08D',
        accent: '#95E1D3',
        background: '#1A3A2E',
        particle: '#4ECDC4'
      },
      ocean: {
        primary: '#00B4D8',
        secondary: '#0077B6',
        accent: '#90E0EF',
        background: '#03045E',
        particle: '#00B4D8'
      },
      purple: {
        primary: '#A855F7',
        secondary: '#9333EA',
        accent: '#C084FC',
        background: '#1E1B4B',
        particle: '#A855F7'
      },
      neon: {
        primary: '#39FF14',
        secondary: '#FF073A',
        accent: '#00F5FF',
        background: '#0A0A0A',
        particle: '#39FF14'
      }
    };
    
    this.currentScheme = 'default';
    this.customColors = null;
    
    this.createUI();
  }

  // 创建UI (Create UI)
  createUI() {
    const container = document.createElement('div');
    container.className = 'color-scheme-container';
    container.innerHTML = `
      <button class="color-scheme-toggle-btn" id="color-scheme-toggle">
        <i class="fa-solid fa-palette"></i>
        <span>${i18n.t('colorScheme.title')}</span>
      </button>
      <div class="color-scheme-panel" id="color-scheme-panel" style="display: none;">
        <div class="color-scheme-panel-header">
          <h3>${i18n.t('colorScheme.title')}</h3>
          <button class="color-scheme-close-btn" id="color-scheme-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="color-scheme-panel-content">
          <div class="color-scheme-presets">
            <h4>${i18n.t('colorScheme.preset')}</h4>
            <div class="color-scheme-grid" id="color-scheme-grid">
              ${Object.keys(this.schemes).map(scheme => `
                <button class="color-scheme-card ${scheme === 'default' ? 'active' : ''}" data-scheme="${scheme}">
                  <div class="color-scheme-preview">
                    <div class="color-preview-bar" style="background: ${this.schemes[scheme].primary}"></div>
                    <div class="color-preview-bar" style="background: ${this.schemes[scheme].secondary}"></div>
                    <div class="color-preview-bar" style="background: ${this.schemes[scheme].accent}"></div>
                  </div>
                  <span class="color-scheme-name">${i18n.t(`colorScheme.schemes.${scheme}`)}</span>
                </button>
              `).join('')}
            </div>
          </div>
          <div class="color-scheme-custom">
            <h4>${i18n.t('colorScheme.custom')}</h4>
            <div class="color-custom-controls">
              <div class="color-custom-item">
                <label>${i18n.t('colorScheme.primary')}</label>
                <input type="color" id="custom-primary" value="#6AB7FF">
              </div>
              <div class="color-custom-item">
                <label>${i18n.t('colorScheme.secondary')}</label>
                <input type="color" id="custom-secondary" value="#3B82F6">
              </div>
              <div class="color-custom-item">
                <label>${i18n.t('colorScheme.accent')}</label>
                <input type="color" id="custom-accent" value="#93C5FD">
              </div>
              <div class="color-custom-item">
                <label>${i18n.t('colorScheme.background')}</label>
                <input type="color" id="custom-background" value="#050810">
              </div>
            </div>
            <button class="color-apply-btn" id="color-apply-custom">
              <i class="fa-solid fa-check"></i>
              ${i18n.t('colorScheme.custom')}
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(container);
    this.setupEventListeners();
  }

  // 设置事件监听器 (Setup event listeners)
  setupEventListeners() {
    const toggleBtn = document.getElementById('color-scheme-toggle');
    const panel = document.getElementById('color-scheme-panel');
    const closeBtn = document.getElementById('color-scheme-close');
    const schemeCards = document.querySelectorAll('.color-scheme-card');
    const applyCustomBtn = document.getElementById('color-apply-custom');
    
    toggleBtn.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
    
    closeBtn.addEventListener('click', () => {
      panel.style.display = 'none';
    });
    
    schemeCards.forEach(card => {
      card.addEventListener('click', () => {
        const scheme = card.getAttribute('data-scheme');
        this.applyScheme(scheme);
        
        schemeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });
    
    applyCustomBtn.addEventListener('click', () => {
      this.applyCustomScheme();
    });
    
    // 实时预览自定义颜色 (Real-time preview of custom colors)
    const colorInputs = document.querySelectorAll('.color-custom-controls input[type="color"]');
    colorInputs.forEach(input => {
      input.addEventListener('input', () => {
        // 可以添加实时预览 (Can add real-time preview)
      });
    });
  }

  // 应用配色方案 (Apply color scheme)
  applyScheme(schemeName) {
    const scheme = this.schemes[schemeName];
    if (!scheme) return;
    
    this.currentScheme = schemeName;
    this.animateColorTransition(scheme);
  }

  // 应用自定义配色方案 (Apply custom color scheme)
  applyCustomScheme() {
    const customScheme = {
      primary: document.getElementById('custom-primary').value,
      secondary: document.getElementById('custom-secondary').value,
      accent: document.getElementById('custom-accent').value,
      background: document.getElementById('custom-background').value,
      particle: document.getElementById('custom-primary').value
    };
    
    this.customColors = customScheme;
    this.animateColorTransition(customScheme);
    
    // 取消预设方案的激活状态 (Deactivate preset schemes)
    document.querySelectorAll('.color-scheme-card').forEach(card => {
      card.classList.remove('active');
    });
  }

  // 动画过渡颜色 (Animate color transition)
  animateColorTransition(scheme) {
    const duration = 1.5;
    
    // 更新背景色 (Update background color)
    // 直接使用scheme中的颜色而不是从DOM获取 (Use color from scheme directly instead of from DOM)
    const currentBgColor = new THREE.Color(scheme.background);
    const targetBgColor = new THREE.Color(scheme.background);
    
    // 应用背景色 (Apply background color)
    document.body.style.background = scheme.background;
    document.querySelector('html').style.background = scheme.background;
    
    // 更新shader材质颜色 (Update shader material colors)
    if (this.shaderMaterialManager && this.shaderMaterialManager.material) {
      const material = this.shaderMaterialManager.material;
      
      // 更新主颜色 (Update primary color)
      if (material.uniforms.uColor1) {
        const currentColor = material.uniforms.uColor1.value;
        const targetColor = new THREE.Color(scheme.primary);
        
        gsap.to(currentColor, {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b,
          duration: duration,
          ease: 'power2.inOut'
        });
      }
      
      // 更新次要颜色 (Update secondary color)
      if (material.uniforms.uColor2) {
        const currentColor = material.uniforms.uColor2.value;
        const targetColor = new THREE.Color(scheme.secondary);
        
        gsap.to(currentColor, {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b,
          duration: duration,
          ease: 'power2.inOut'
        });
      }
      
      // 更新强调色 (Update accent color)
      if (material.uniforms.uColor3) {
        const currentColor = material.uniforms.uColor3.value;
        const targetColor = new THREE.Color(scheme.accent);
        
        gsap.to(currentColor, {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b,
          duration: duration,
          ease: 'power2.inOut'
        });
      }
    }
    
    // 更新UI元素颜色 (Update UI element colors)
    this.updateUIColors(scheme);
  }

  // 更新UI颜色 (Update UI colors)
  updateUIColors(scheme) {
    const root = document.documentElement;
    
    // 设置CSS变量 (Set CSS variables)
    root.style.setProperty('--color-primary', scheme.primary);
    root.style.setProperty('--color-secondary', scheme.secondary);
    root.style.setProperty('--color-accent', scheme.accent);
    root.style.setProperty('--color-background', scheme.background);
    
    // 更新各种UI元素的颜色 (Update colors of various UI elements)
    const primaryElements = document.querySelectorAll('.logo, .nav-link, .tag, .music-btn, .onboarding-icon i');
    primaryElements.forEach(el => {
      gsap.to(el, {
        color: scheme.primary,
        duration: 1.5,
        ease: 'power2.inOut'
      });
    });
  }

  // 获取当前配色方案 (Get current color scheme)
  getCurrentScheme() {
    return this.customColors || this.schemes[this.currentScheme];
  }

  // 清理资源 (Cleanup resources)
  destroy() {
    const container = document.querySelector('.color-scheme-container');
    if (container) {
      container.remove();
    }
  }
}
