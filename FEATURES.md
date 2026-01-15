# Crystal Bird - 新功能使用指南 (New Features Guide)

## 🌐 多语言支持 (Multi-language Support)

### 功能说明 (Feature Description)
项目现在支持简体中文和英文双语切换，默认语言为简体中文。

### 使用方法 (How to Use)
1. 在页面右上角导航栏中，您会看到两个语言按钮：
   - 🇨🇳 中文 - 切换到简体中文
   - 🇬🇧 EN - 切换到英文

2. 点击任一按钮即可立即切换语言

3. 语言选择会自动保存在浏览器本地存储中，下次访问时会自动使用上次选择的语言

### 技术实现 (Technical Implementation)
- 使用 i18next 国际化框架
- 支持浏览器语言检测
- 本地存储持久化语言设置
- 动态更新所有UI文本

---

## 🎮 手势控制 (Gesture Control)

### 功能说明 (Feature Description)
通过摄像头识别手势，实现无需鼠标的交互控制。支持单手和双手手势。

### 使用方法 (How to Use)

#### 启用手势控制 (Enable Gesture Control)
1. 点击页面右侧的 "启用摄像头" / "Enable Camera" 按钮
2. 浏览器会请求摄像头权限，点击允许
3. 摄像头画面会显示在右上角，并开始识别手势

#### 支持的手势 (Supported Gestures)

**单手手势 (Single Hand Gestures):**
- 👋 **张开手掌** - 暂停/重置位置
- ✊ **握拳或少量手指** - 移动手部来旋转场景视角

**双手手势 (Two Hands Gestures):**
- 🤏 **双手捏合** - 将两只手靠近或远离来缩放场景
  - 双手靠近 = 缩小
  - 双手远离 = 放大

#### 关闭手势控制 (Disable Gesture Control)
点击 "关闭摄像头" / "Disable Camera" 按钮即可关闭

### 技术实现 (Technical Implementation)
- 使用 MediaPipe Hands 进行手部关键点检测
- 实时手势识别和视觉反馈
- 支持最多2只手同时追踪
- 流畅的相机控制响应

---

## 🖼️ 自定义形象 (Custom Avatar)

### 功能说明 (Feature Description)
上传自己的图片（二次元角色、真实照片等），将其转换为3D效果显示在场景中。

### 使用方法 (How to Use)

#### 上传图片 (Upload Image)
1. 点击页面右侧的 "自定义形象" / "Custom Avatar" 按钮
2. 在打开的面板中，有两种上传方式：
   - **点击上传区域**：选择本地图片文件
   - **拖拽上传**：直接将图片拖入上传区域

3. 支持的图片格式：JPG, PNG
4. 建议使用 1:1 比例的图片以获得最佳效果

#### 选择展示样式 (Choose Display Style)
上传图片后，可以选择三种不同的展示样式：

- ✨ **粒子 (Particles)** - 将图片转换为彩色粒子云效果（默认）
  - 采样图片像素生成粒子
  - 保留原始颜色
  - 动态旋转动画

- ▢ **平面 (Plane)** - 显示为2D平面
  - 直接显示图片
  - 支持透明度
  - 双面渲染

- ◻ **网格 (Mesh)** - 映射到球体网格
  - 3D球体包裹
  - 材质效果
  - 立体感强

#### 重置为默认 (Reset to Default)
点击 "重置为默认" / "Reset to Default" 按钮可恢复原始的水晶鸟模型

### 技术实现 (Technical Implementation)
- Three.js 纹理加载和处理
- Canvas 像素采样用于粒子生成
- 多种几何体类型支持
- 实时材质切换

---

## 🎨 配色方案 (Color Scheme)

### 功能说明 (Feature Description)
实时更改整个场景的配色方案，包括预设主题和自定义颜色。

### 使用方法 (How to Use)

#### 选择预设方案 (Choose Preset Scheme)
1. 点击页面右侧的 "配色方案" / "Color Scheme" 按钮
2. 在打开的面板中，选择以下任一预设方案：

   - 🔵 **默认蓝色 (Default Blue)** - 原始的冷色调蓝色主题
   - 💖 **多巴胺 (Dopamine)** - 活力粉色和橙色组合
   - 🍭 **马卡龙 (Macaron)** - 柔和的粉彩色系
   - 🌅 **日落 (Sunset)** - 温暖的红橙金色
   - 🌲 **森林 (Forest)** - 清新的青绿色调
   - 🌊 **海洋 (Ocean)** - 深邃的蓝色系
   - 💜 **紫色梦幻 (Purple Dream)** - 神秘的紫色主题
   - ⚡ **霓虹 (Neon)** - 鲜艳的荧光色系

3. 点击任一配色卡片，颜色会平滑过渡到新主题

#### 自定义配色 (Custom Colors)
1. 在面板底部的"自定义"区域
2. 分别调整四种颜色：
   - **主色 (Primary)** - 主要UI元素颜色
   - **辅色 (Secondary)** - 辅助颜色
   - **强调色 (Accent)** - 高亮和特殊元素颜色
   - **背景色 (Background)** - 场景背景颜色

3. 点击 "自定义" / "Custom" 按钮应用你的配色

### 技术实现 (Technical Implementation)
- GSAP 平滑颜色过渡动画
- Three.js Shader 材质颜色更新
- CSS 自定义属性动态修改
- 实时UI颜色同步

---

## 🎯 组合使用示例 (Combined Usage Examples)

### 示例1：创建个性化体验
1. 切换到您喜欢的语言
2. 上传一张您喜欢的二次元角色图片
3. 选择"粒子"样式
4. 应用"多巴胺"配色方案
5. 启用手势控制，用手势探索场景

### 示例2：专业展示模式
1. 保持默认蓝色主题
2. 使用鼠标精确控制视角
3. 展示原始水晶鸟模型
4. 适合正式演示和截图

### 示例3：互动游戏模式
1. 启用手势控制
2. 选择"霓虹"配色方案
3. 上传游戏角色图片
4. 用手势进行动态互动

---

## 🔧 技术栈 (Tech Stack)

### 新增技术 (New Technologies)
- **i18next** - 国际化框架
- **MediaPipe Hands** - 手势识别
- **GSAP** - 动画库（已有）
- **Three.js** - 3D渲染（已有）

### 浏览器要求 (Browser Requirements)
- 支持 ES6+ 的现代浏览器
- 手势控制需要摄像头权限
- 建议使用 Chrome、Edge、Firefox 或 Safari 最新版本

---

## 📝 开发说明 (Development Notes)

### 项目结构 (Project Structure)
```
src/
├── i18n/               # 国际化模块
│   ├── i18n.js        # i18n配置
│   └── translations.js # 翻译资源
├── ui/                 # UI组件
│   └── LanguageSwitcher.js
├── gesture/            # 手势控制
│   └── GestureManager.js
├── avatar/             # 自定义形象
│   └── AvatarManager.js
└── theme/              # 主题配色
    └── ColorSchemeManager.js
```

### 启动开发服务器 (Start Dev Server)
```bash
npm install
npm run dev
```

### 构建生产版本 (Build for Production)
```bash
npm run build
```

---

## 🐛 已知问题 (Known Issues)

1. **手势控制**：
   - 某些浏览器可能需要 HTTPS 才能访问摄像头
   - 低光环境下识别准确度可能降低
   - 建议保持手部在摄像头视野内

2. **图片上传**：
   - 过大的图片可能导致性能下降
   - 建议图片大小不超过 2MB
   - 粒子样式对高分辨率图片会进行采样降低

3. **配色方案**：
   - 某些shader可能需要手动刷新才能完全应用新颜色
   - 自定义配色不会保存，刷新后会重置

---

## 🎉 未来计划 (Future Plans)

- [ ] 添加更多手势识别（比如手势快捷键）
- [ ] 支持保存和分享自定义配置
- [ ] 添加更多3D模型选项
- [ ] 优化移动端体验
- [ ] 添加音频可视化效果
- [ ] 支持实时协作模式

---

## 📧 联系方式 (Contact)

如有问题或建议，请访问：
- GitHub Issues: [Crystal-Bird Issues](https://github.com/jackdiy/Crystal-Bird/issues)
- Twitter: [@SahilK027](https://x.com/SahilK027)

---

**Made with 💜 using Three.js, MediaPipe, and i18next**
