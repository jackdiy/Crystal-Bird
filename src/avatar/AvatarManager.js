// 自定义形象管理器 (Custom Avatar Manager)
// 允许用户上传图片来替换默认模型 (Allow users to upload images to replace default model)
import * as THREE from 'three';
import i18n from '../i18n/i18n.js';

export class AvatarManager {
  constructor(scene, sceneManager) {
    this.scene = scene;
    this.sceneManager = sceneManager;
    this.currentAvatar = null;
    this.defaultModel = null;
    this.avatarType = 'particles'; // 'plane', 'particles', 'mesh'
    
    this.createUI();
  }

  // 创建UI (Create UI)
  createUI() {
    const container = document.createElement('div');
    container.className = 'avatar-control-container';
    container.innerHTML = `
      <button class="avatar-toggle-btn" id="avatar-toggle">
        <i class="fa-solid fa-image"></i>
        <span>${i18n.t('avatar.title')}</span>
      </button>
      <div class="avatar-panel" id="avatar-panel" style="display: none;">
        <div class="avatar-panel-header">
          <h3>${i18n.t('avatar.title')}</h3>
          <button class="avatar-close-btn" id="avatar-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="avatar-panel-content">
          <div class="avatar-upload-area" id="avatar-upload-area">
            <i class="fa-solid fa-cloud-upload-alt"></i>
            <p>${i18n.t('avatar.upload')}</p>
            <span class="avatar-upload-hint">${i18n.t('avatar.uploadHint')}</span>
            <input type="file" id="avatar-file-input" accept="image/jpeg,image/png,image/jpg" style="display: none;">
          </div>
          <div class="avatar-preview" id="avatar-preview" style="display: none;">
            <img id="avatar-preview-img" src="" alt="Preview">
            <button class="avatar-reset-btn" id="avatar-reset">
              ${i18n.t('avatar.reset')}
            </button>
          </div>
          <div class="avatar-style-selector">
            <label>${i18n.t('avatar.style.plane')}:</label>
            <div class="avatar-style-buttons">
              <button class="avatar-style-btn active" data-style="particles">
                <i class="fa-solid fa-sparkles"></i>
                ${i18n.t('avatar.style.particles')}
              </button>
              <button class="avatar-style-btn" data-style="plane">
                <i class="fa-solid fa-square"></i>
                ${i18n.t('avatar.style.plane')}
              </button>
              <button class="avatar-style-btn" data-style="mesh">
                <i class="fa-solid fa-cube"></i>
                ${i18n.t('avatar.style.mesh')}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(container);
    this.setupEventListeners();
  }

  // 设置事件监听器 (Setup event listeners)
  setupEventListeners() {
    const toggleBtn = document.getElementById('avatar-toggle');
    const panel = document.getElementById('avatar-panel');
    const closeBtn = document.getElementById('avatar-close');
    const uploadArea = document.getElementById('avatar-upload-area');
    const fileInput = document.getElementById('avatar-file-input');
    const resetBtn = document.getElementById('avatar-reset');
    const styleButtons = document.querySelectorAll('.avatar-style-btn');
    
    toggleBtn.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
    
    closeBtn.addEventListener('click', () => {
      panel.style.display = 'none';
    });
    
    uploadArea.addEventListener('click', () => {
      fileInput.click();
    });
    
    // 拖拽上传 (Drag and drop upload)
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        this.handleFileUpload(file);
      }
    });
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        this.handleFileUpload(file);
      }
    });
    
    resetBtn.addEventListener('click', () => {
      this.resetToDefault();
    });
    
    styleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        styleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.avatarType = btn.getAttribute('data-style');
        if (this.currentAvatar) {
          this.updateAvatarStyle();
        }
      });
    });
  }

  // 处理文件上传 (Handle file upload)
  async handleFileUpload(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.createAvatarFromImage(img);
        this.showPreview(e.target.result);
      };
      img.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
  }

  // 从图片创建头像 (Create avatar from image)
  createAvatarFromImage(img) {
    // 移除旧的头像 (Remove old avatar)
    if (this.currentAvatar) {
      this.scene.remove(this.currentAvatar);
      this.disposeObject(this.currentAvatar);
    }
    
    // 创建纹理 (Create texture)
    const texture = new THREE.Texture(img);
    texture.needsUpdate = true;
    texture.colorSpace = THREE.SRGBColorSpace;
    
    // 根据类型创建不同的头像 (Create different avatar based on type)
    switch (this.avatarType) {
      case 'plane':
        this.currentAvatar = this.createPlaneAvatar(texture);
        break;
      case 'particles':
        this.currentAvatar = this.createParticleAvatar(texture, img);
        break;
      case 'mesh':
        this.currentAvatar = this.createMeshAvatar(texture);
        break;
    }
    
    if (this.currentAvatar) {
      this.scene.add(this.currentAvatar);
    }
  }

  // 创建平面头像 (Create plane avatar)
  createPlaneAvatar(texture) {
    const geometry = new THREE.PlaneGeometry(3, 3);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    
    return mesh;
  }

  // 创建粒子头像 (Create particle avatar)
  createParticleAvatar(texture, img) {
    // 创建画布来采样图片像素 (Create canvas to sample image pixels)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const resolution = 128; // 粒子分辨率 (Particle resolution)
    
    canvas.width = resolution;
    canvas.height = resolution;
    ctx.drawImage(img, 0, 0, resolution, resolution);
    
    const imageData = ctx.getImageData(0, 0, resolution, resolution);
    const positions = [];
    const colors = [];
    
    // 从图片采样粒子位置和颜色 (Sample particle positions and colors from image)
    for (let y = 0; y < resolution; y++) {
      for (let x = 0; x < resolution; x++) {
        const i = (y * resolution + x) * 4;
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];
        
        // 只添加不透明的像素 (Only add opaque pixels)
        if (a > 50) {
          const px = (x / resolution - 0.5) * 3;
          const py = -(y / resolution - 0.5) * 3;
          const pz = 0;
          
          positions.push(px, py, pz);
          colors.push(r / 255, g / 255, b / 255);
        }
      }
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(geometry, material);
    particles.position.set(0, 0, 0);
    
    return particles;
  }

  // 创建网格头像 (Create mesh avatar)
  createMeshAvatar(texture) {
    const geometry = new THREE.SphereGeometry(1.5, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.3,
      roughness: 0.7
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    
    return mesh;
  }

  // 更新头像样式 (Update avatar style)
  updateAvatarStyle() {
    if (!this.currentAvatar) return;
    
    // 获取当前纹理 (Get current texture)
    const texture = this.getCurrentTexture();
    if (!texture) return;
    
    // 重新创建头像 (Recreate avatar)
    const img = new Image();
    img.onload = () => {
      this.createAvatarFromImage(img);
    };
    img.src = texture.image.src;
  }

  // 获取当前纹理 (Get current texture)
  getCurrentTexture() {
    if (!this.currentAvatar) return null;
    
    if (this.currentAvatar.material) {
      return this.currentAvatar.material.map;
    }
    
    return null;
  }

  // 显示预览 (Show preview)
  showPreview(dataUrl) {
    const uploadArea = document.getElementById('avatar-upload-area');
    const preview = document.getElementById('avatar-preview');
    const previewImg = document.getElementById('avatar-preview-img');
    
    uploadArea.style.display = 'none';
    preview.style.display = 'block';
    previewImg.src = dataUrl;
  }

  // 重置为默认 (Reset to default)
  resetToDefault() {
    if (this.currentAvatar) {
      this.scene.remove(this.currentAvatar);
      this.disposeObject(this.currentAvatar);
      this.currentAvatar = null;
    }
    
    const uploadArea = document.getElementById('avatar-upload-area');
    const preview = document.getElementById('avatar-preview');
    
    uploadArea.style.display = 'flex';
    preview.style.display = 'none';
  }

  // 释放对象资源 (Dispose object resources)
  disposeObject(obj) {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(mat => mat.dispose());
      } else {
        obj.material.dispose();
      }
    }
  }

  // 更新动画 (Update animation)
  update(elapsedTime) {
    if (this.currentAvatar) {
      // 添加旋转动画 (Add rotation animation)
      this.currentAvatar.rotation.y = elapsedTime * 0.2;
    }
  }

  // 清理资源 (Cleanup resources)
  destroy() {
    this.resetToDefault();
    const container = document.querySelector('.avatar-control-container');
    if (container) {
      container.remove();
    }
  }
}
