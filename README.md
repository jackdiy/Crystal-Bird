# Crystal Bird

GPGPU Particles -> Flowfield Animation -> Unreal Bloom -> Chromatic Aberration -> Film Grain -> Motion Blur

<img width="100%" height="100%" src="./preview.png" />

[🚀 Live Demo](https://crystal-bird.vercel.app/)

An immersive 3D experience featuring a crystalline bird surrounded by dynamic flowfield particles, sparkle effects, and atmospheric environments. Built with Three.js and custom GLSL shaders for high-performance real-time graphics.

## ✨ 新功能 (New Features)

### 🌐 多语言支持 (Multi-language Support)
- 支持简体中文和英文切换 (Supports Chinese and English switching)
- 默认简体中文，可手动切换 (Default Chinese, manual switch available)
- 本地存储语言偏好 (Local storage for language preference)

### 🎮 手势控制 (Gesture Control)
- 通过摄像头识别手势 (Gesture recognition via camera)
- 单手旋转场景 (Single hand rotation)
- 双手捏合缩放 (Two-hand pinch to zoom)
- 实时手部关键点可视化 (Real-time hand landmark visualization)

### 🖼️ 自定义形象 (Custom Avatar)
- 上传图片替换模型 (Upload images to replace model)
- 三种展示样式：粒子、平面、网格 (Three styles: particles, plane, mesh)
- 支持拖拽上传 (Drag-and-drop upload support)
- 实时动画效果 (Real-time animation effects)

### 🎨 配色方案 (Color Schemes)
- 8种预设主题 (8 preset themes)
  - 默认蓝色 / 多巴胺 / 马卡龙 / 日落 / 森林 / 海洋 / 紫色梦幻 / 霓虹
- 自定义配色 (Custom color selection)
- 平滑颜色过渡 (Smooth color transitions)
- 实时shader颜色更新 (Real-time shader color updates)

📖 详细使用指南请查看 [FEATURES.md](./FEATURES.md)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/SahilK-027/Crystal-Bird.git
cd crystal-bird

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

### 核心技术 (Core Technologies)
- **Three.js** (v0.182.0) - 3D graphics and WebGL rendering
- **GLSL** - Custom vertex and fragment shaders
- **Vite** (v6.0.0) - Build tool and development server
- **GSAP** (v3.14.2) - High-performance animations
- **Tweakpane** (v4.0.5) - Debug GUI controls
- **three-perf** (v1.0.11) - Performance monitoring
- **vite-plugin-glsl** (v1.5.1) - GLSL shader imports

### 新增技术 (New Technologies)
- **i18next** (v23.16.8) - Internationalization framework
- **i18next-browser-languagedetector** (v8.0.1) - Language detection
- **MediaPipe Hands** (v0.4.1679945972) - Hand gesture recognition
- **MediaPipe Camera Utils** (v0.3.1675469404) - Camera handling
- **MediaPipe Drawing Utils** (v0.3.1675469404) - Visualization

## 📁 项目结构 (Project Structure)

```
src/
├── i18n/                   # 国际化模块 (Internationalization)
│   ├── i18n.js            # i18n配置 (Configuration)
│   └── translations.js     # 翻译资源 (Translation resources)
├── ui/                     # UI组件 (UI Components)
│   └── LanguageSwitcher.js # 语言切换器 (Language switcher)
├── gesture/                # 手势控制 (Gesture Control)
│   └── GestureManager.js   # 手势管理器 (Gesture manager)
├── avatar/                 # 自定义形象 (Custom Avatar)
│   └── AvatarManager.js    # 形象管理器 (Avatar manager)
├── theme/                  # 主题配色 (Theme Colors)
│   └── ColorSchemeManager.js # 配色管理器 (Color scheme manager)
├── managers/               # 场景管理器 (Scene Managers)
├── particles/              # 粒子系统 (Particle Systems)
├── environment/            # 环境元素 (Environment)
├── effects/                # 特效 (Effects)
└── shaders/                # 着色器 (Shaders)
```

## 📄 License

This project is for educational and demonstration purposes.

## 🙏 Credits

- **3D Model**: [Bee Eater](https://sketchfab.com/3d-models/bee-eater-7d9d998d873248ed9a0179b752bdf472) by [muzea.malopolska](https://sketchfab.com/muzea.malopolska)
- **Music by**: [Metriko](https://pixabay.com/users/metriko-51027196/)
- **Created by**: [SahilK-027](https://github.com/SahilK-027)
- **Enhanced by**: Contributors

---

Made with 💜 using Three.js, GLSL, MediaPipe, and i18next.

