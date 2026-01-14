// 翻译资源文件 (Translation Resources)
export const translations = {
  'zh-CN': {
    translation: {
      // 加载屏幕 (Loading Screen)
      loading: {
        progress: '加载中',
        hint: '正在加载体验',
        withMusic: '开启音乐探索',
        withoutMusic: '静音探索',
      },
      // 欢迎引导 (Onboarding)
      onboarding: {
        title: '欢迎来到水晶鸟',
        subtitle: '探索这个互动体验的方式',
        tips: {
          drag: '拖拽',
          dragDesc: '环绕场景旋转',
          scroll: '滚动',
          scrollDesc: '放大和缩小',
          space: '空格',
          spaceDesc: '按住慢动作',
          debug: '/?mode=debug',
          debugDesc: '添加到URL以显示控制面板',
        },
        dontShow: '不再显示',
        gotIt: '知道了',
      },
      // 提示文本 (Hints)
      hints: {
        scroll: '滚动 放大和缩小',
        drag: '拖拽 探索所有角度',
        hover: '悬停 在鸟上查看魔法 ✨',
        space: '空格 或按住慢动作',
      },
      // 标签 (Tags)
      tags: {
        gpgpu: 'GPGPU',
        postfx: '后期特效',
        webgl: 'WebGL',
        threejs: 'Three.js',
      },
      // 内容 (Content)
      content: {
        subtitle: '交互式3D体验，具有水晶鸟几何体、GPGPU驱动的流场粒子动画和实时后期处理效果。',
      },
      // 元数据 (Metadata)
      meta: {
        createdBy: '创建者',
        model3d: '3D模型',
        music: '音乐',
      },
      // 导航 (Navigation)
      nav: {
        source: '源码',
        github: 'GitHub',
        twitter: 'Twitter',
      },
      // 语言切换器 (Language Switcher)
      language: {
        switch: '切换语言',
        cn: '简体中文',
        en: 'English',
      },
      // 手势控制 (Gesture Control)
      gesture: {
        title: '手势控制',
        enable: '启用摄像头',
        disable: '关闭摄像头',
        permissionDenied: '摄像头权限被拒绝',
        notSupported: '浏览器不支持摄像头',
        connecting: '正在连接摄像头...',
        ready: '手势识别就绪',
        gestures: {
          openPalm: '张开手掌 - 暂停',
          closedFist: '握拳 - 旋转',
          pinch: '捏合 - 缩放',
          swipe: '滑动 - 移动视角',
        },
      },
      // 自定义形象 (Custom Avatar)
      avatar: {
        title: '自定义形象',
        upload: '上传图片',
        reset: '重置为默认',
        processing: '处理中...',
        uploadHint: '支持 JPG, PNG (建议 1:1 比例)',
        style: {
          plane: '平面',
          particles: '粒子',
          mesh: '网格',
        },
      },
      // 配色方案 (Color Scheme)
      colorScheme: {
        title: '配色方案',
        preset: '预设方案',
        custom: '自定义',
        schemes: {
          default: '默认蓝色',
          dopamine: '多巴胺',
          macaron: '马卡龙',
          sunset: '日落',
          forest: '森林',
          ocean: '海洋',
          purple: '紫色梦幻',
          neon: '霓虹',
        },
        primary: '主色',
        secondary: '辅色',
        accent: '强调色',
        background: '背景色',
      },
      // 控制面板 (Control Panel)
      controls: {
        title: '控制面板',
        scene: '场景',
        effects: '特效',
        performance: '性能',
      },
    },
  },
  'en': {
    translation: {
      // Loading Screen
      loading: {
        progress: 'Loading',
        hint: 'Loading experience',
        withMusic: 'Explore with Music',
        withoutMusic: 'Explore without Music',
      },
      // Onboarding
      onboarding: {
        title: 'Welcome to Crystal Bird',
        subtitle: "Here's how to explore the experience",
        tips: {
          drag: 'Drag',
          dragDesc: 'Orbit around the scene',
          scroll: 'Scroll',
          scrollDesc: 'Zoom in and out',
          space: 'Space',
          spaceDesc: 'Hold for slow motion',
          debug: '/?mode=debug',
          debugDesc: 'Add to URL for controls',
        },
        dontShow: "Don't show again",
        gotIt: 'Got it',
      },
      // Hints
      hints: {
        scroll: 'SCROLL to zoom in & out',
        drag: 'DRAG to explore all angles',
        hover: 'Hover over the bird for magic ✨',
        space: 'SPACE or hold for slow motion',
      },
      // Tags
      tags: {
        gpgpu: 'GPGPU',
        postfx: 'Post-FX',
        webgl: 'WebGL',
        threejs: 'Three.js',
      },
      // Content
      content: {
        subtitle: 'Interactive 3D experience featuring crystal bird geometry with GPGPU-powered flowfield particle animation and real-time post-processing effects.',
      },
      // Metadata
      meta: {
        createdBy: 'Created By',
        model3d: '3D Model',
        music: 'Music',
      },
      // Navigation
      nav: {
        source: 'Source',
        github: 'GitHub',
        twitter: 'Twitter',
      },
      // Language Switcher
      language: {
        switch: 'Switch Language',
        cn: '简体中文',
        en: 'English',
      },
      // Gesture Control
      gesture: {
        title: 'Gesture Control',
        enable: 'Enable Camera',
        disable: 'Disable Camera',
        permissionDenied: 'Camera permission denied',
        notSupported: 'Camera not supported',
        connecting: 'Connecting to camera...',
        ready: 'Gesture recognition ready',
        gestures: {
          openPalm: 'Open Palm - Pause',
          closedFist: 'Closed Fist - Rotate',
          pinch: 'Pinch - Zoom',
          swipe: 'Swipe - Move View',
        },
      },
      // Custom Avatar
      avatar: {
        title: 'Custom Avatar',
        upload: 'Upload Image',
        reset: 'Reset to Default',
        processing: 'Processing...',
        uploadHint: 'Supports JPG, PNG (1:1 ratio recommended)',
        style: {
          plane: 'Plane',
          particles: 'Particles',
          mesh: 'Mesh',
        },
      },
      // Color Scheme
      colorScheme: {
        title: 'Color Scheme',
        preset: 'Preset Schemes',
        custom: 'Custom',
        schemes: {
          default: 'Default Blue',
          dopamine: 'Dopamine',
          macaron: 'Macaron',
          sunset: 'Sunset',
          forest: 'Forest',
          ocean: 'Ocean',
          purple: 'Purple Dream',
          neon: 'Neon',
        },
        primary: 'Primary',
        secondary: 'Secondary',
        accent: 'Accent',
        background: 'Background',
      },
      // Control Panel
      controls: {
        title: 'Control Panel',
        scene: 'Scene',
        effects: 'Effects',
        performance: 'Performance',
      },
    },
  },
};
