// 手势控制管理器 (Gesture Control Manager)
// 使用MediaPipe Hands进行手势识别 (Using MediaPipe Hands for gesture recognition)
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import i18n from '../i18n/i18n.js';

export class GestureManager {
  constructor(sceneManager) {
    this.sceneManager = sceneManager; // Three.js场景管理器 (Three.js scene manager)
    this.enabled = false;
    this.hands = null;
    this.camera = null;
    this.videoElement = null;
    this.canvasElement = null;
    
    // 手势状态 (Gesture states)
    this.currentGesture = null;
    this.previousHandPositions = [];
    this.gestureStartPosition = null;
    
    // 控制参数 (Control parameters)
    this.rotationSpeed = 0.01;
    this.zoomSpeed = 0.005;
    this.pinchDistance = 0;
    this.lastPinchDistance = 0;
    
    this.createUI();
  }

  // 创建手势控制UI (Create gesture control UI)
  createUI() {
    // 创建主容器 (Create main container)
    const container = document.createElement('div');
    container.className = 'gesture-control-container';
    container.innerHTML = `
      <button class="gesture-toggle-btn" id="gesture-toggle">
        <i class="fa-solid fa-video"></i>
        <span class="gesture-btn-text">${i18n.t('gesture.enable')}</span>
      </button>
      <div class="gesture-status" id="gesture-status" style="display: none;">
        <div class="gesture-status-icon">
          <i class="fa-solid fa-hand"></i>
        </div>
        <div class="gesture-status-text">${i18n.t('gesture.ready')}</div>
      </div>
      <div class="gesture-video-container" id="gesture-video-container" style="display: none;">
        <video class="gesture-video" id="gesture-video" autoplay playsinline></video>
        <canvas class="gesture-canvas" id="gesture-canvas"></canvas>
      </div>
    `;
    
    document.body.appendChild(container);
    
    // 绑定事件 (Bind events)
    const toggleBtn = document.getElementById('gesture-toggle');
    toggleBtn.addEventListener('click', () => this.toggleGesture());
  }

  // 切换手势控制 (Toggle gesture control)
  async toggleGesture() {
    if (this.enabled) {
      this.disable();
    } else {
      await this.enable();
    }
  }

  // 启用手势控制 (Enable gesture control)
  async enable() {
    try {
      // 初始化视频元素 (Initialize video element)
      this.videoElement = document.getElementById('gesture-video');
      this.canvasElement = document.getElementById('gesture-canvas');
      const videoContainer = document.getElementById('gesture-video-container');
      const statusEl = document.getElementById('gesture-status');
      const toggleBtn = document.getElementById('gesture-toggle');
      
      // 显示连接中状态 (Show connecting status)
      const btnText = toggleBtn.querySelector('.gesture-btn-text');
      btnText.textContent = i18n.t('gesture.connecting');
      
      // 请求摄像头权限 (Request camera permission)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: 'user'
        }
      });
      
      this.videoElement.srcObject = stream;
      
      // 初始化MediaPipe Hands (Initialize MediaPipe Hands)
      this.hands = new Hands({
        locateFile: (file) => {
          // 使用CDN加载MediaPipe文件，添加错误处理 (Load MediaPipe files from CDN with error handling)
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
      });
      
      // 配置MediaPipe (Configure MediaPipe)
      this.hands.setOptions({
        maxNumHands: 2, // 支持双手 (Support two hands)
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7
      });
      
      // 设置结果回调 (Set result callback)
      this.hands.onResults((results) => this.onResults(results));
      
      // 初始化相机 (Initialize camera)
      try {
        this.camera = new Camera(this.videoElement, {
          onFrame: async () => {
            await this.hands.send({ image: this.videoElement });
          },
          width: 640,
          height: 480
        });
        
        await this.camera.start();
      } catch (cameraError) {
        console.error('相机初始化失败 (Camera initialization failed):', cameraError);
        throw new Error(i18n.t('gesture.notSupported'));
      }
      
      // 更新UI状态 (Update UI state)
      this.enabled = true;
      videoContainer.style.display = 'block';
      statusEl.style.display = 'flex';
      toggleBtn.classList.add('active');
      btnText.textContent = i18n.t('gesture.disable');
      toggleBtn.querySelector('i').className = 'fa-solid fa-video-slash';
      
    } catch (error) {
      console.error('手势控制启用失败 (Failed to enable gesture control):', error);
      alert(i18n.t('gesture.permissionDenied'));
    }
  }

  // 禁用手势控制 (Disable gesture control)
  disable() {
    if (this.camera) {
      this.camera.stop();
    }
    
    if (this.videoElement && this.videoElement.srcObject) {
      const tracks = this.videoElement.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    
    // 更新UI状态 (Update UI state)
    const videoContainer = document.getElementById('gesture-video-container');
    const statusEl = document.getElementById('gesture-status');
    const toggleBtn = document.getElementById('gesture-toggle');
    const btnText = toggleBtn.querySelector('.gesture-btn-text');
    
    videoContainer.style.display = 'none';
    statusEl.style.display = 'none';
    toggleBtn.classList.remove('active');
    btnText.textContent = i18n.t('gesture.enable');
    toggleBtn.querySelector('i').className = 'fa-solid fa-video';
    
    this.enabled = false;
  }

  // 处理MediaPipe结果 (Handle MediaPipe results)
  onResults(results) {
    if (!this.canvasElement || !this.sceneManager) return;
    
    // 清空画布 (Clear canvas)
    const canvasCtx = this.canvasElement.getContext('2d');
    this.canvasElement.width = this.videoElement.videoWidth;
    this.canvasElement.height = this.videoElement.videoHeight;
    
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      // 绘制手部关键点 (Draw hand landmarks)
      for (const landmarks of results.multiHandLandmarks) {
        this.drawLandmarks(canvasCtx, landmarks);
      }
      
      // 识别手势 (Recognize gestures)
      this.recognizeGesture(results.multiHandLandmarks);
    }
    
    canvasCtx.restore();
  }

  // 绘制手部关键点 (Draw hand landmarks)
  drawLandmarks(ctx, landmarks) {
    // 绘制连接线 (Draw connections)
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], // 拇指 (Thumb)
      [0, 5], [5, 6], [6, 7], [7, 8], // 食指 (Index)
      [0, 9], [9, 10], [10, 11], [11, 12], // 中指 (Middle)
      [0, 13], [13, 14], [14, 15], [15, 16], // 无名指 (Ring)
      [0, 17], [17, 18], [18, 19], [19, 20], // 小指 (Pinky)
      [5, 9], [9, 13], [13, 17] // 手掌 (Palm)
    ];
    
    ctx.strokeStyle = 'rgba(106, 183, 255, 0.8)';
    ctx.lineWidth = 2;
    
    for (const [start, end] of connections) {
      ctx.beginPath();
      ctx.moveTo(
        landmarks[start].x * this.canvasElement.width,
        landmarks[start].y * this.canvasElement.height
      );
      ctx.lineTo(
        landmarks[end].x * this.canvasElement.width,
        landmarks[end].y * this.canvasElement.height
      );
      ctx.stroke();
    }
    
    // 绘制关键点 (Draw landmarks)
    ctx.fillStyle = 'rgba(147, 197, 253, 1)';
    for (const landmark of landmarks) {
      ctx.beginPath();
      ctx.arc(
        landmark.x * this.canvasElement.width,
        landmark.y * this.canvasElement.height,
        4,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }

  // 识别手势并控制场景 (Recognize gestures and control scene)
  recognizeGesture(multiHandLandmarks) {
    if (multiHandLandmarks.length === 1) {
      // 单手手势 (Single hand gesture)
      const landmarks = multiHandLandmarks[0];
      const gesture = this.detectSingleHandGesture(landmarks);
      
      if (gesture === 'rotate') {
        // 旋转控制 (Rotation control)
        this.handleRotation(landmarks);
      } else if (gesture === 'openPalm') {
        // 暂停/重置 (Pause/Reset)
        this.handlePause();
      }
    } else if (multiHandLandmarks.length === 2) {
      // 双手手势 - 捏合缩放 (Two hands - Pinch zoom)
      this.handlePinchZoom(multiHandLandmarks[0], multiHandLandmarks[1]);
    }
  }

  // 检测单手手势 (Detect single hand gesture)
  detectSingleHandGesture(landmarks) {
    // 计算手指伸展程度 (Calculate finger extension)
    const fingersExtended = this.getFingersExtended(landmarks);
    const extendedCount = fingersExtended.filter(f => f).length;
    
    if (extendedCount === 5) {
      return 'openPalm'; // 张开手掌 (Open palm)
    } else if (extendedCount <= 2) {
      return 'rotate'; // 握拳或少量手指 (Fist or few fingers)
    }
    
    return 'none';
  }

  // 获取手指伸展状态 (Get fingers extended state)
  getFingersExtended(landmarks) {
    const fingerTips = [4, 8, 12, 16, 20]; // 五个手指尖 (Five fingertips)
    const fingerPips = [2, 6, 10, 14, 18]; // 手指中间关节 (Finger middle joints)
    
    return fingerTips.map((tip, i) => {
      const tipY = landmarks[tip].y;
      const pipY = landmarks[fingerPips[i]].y;
      return tipY < pipY; // 手指向上伸展 (Finger extended upward)
    });
  }

  // 处理旋转 (Handle rotation)
  handleRotation(landmarks) {
    const currentPos = {
      x: landmarks[9].x, // 使用中指根部 (Use middle finger base)
      y: landmarks[9].y
    };
    
    if (this.previousHandPositions.length > 0) {
      const prevPos = this.previousHandPositions[this.previousHandPositions.length - 1];
      const deltaX = currentPos.x - prevPos.x;
      const deltaY = currentPos.y - prevPos.y;
      
      // 应用旋转到相机 (Apply rotation to camera)
      if (this.sceneManager.controls) {
        this.sceneManager.controls.rotateLeft(deltaX * this.rotationSpeed * 10);
        this.sceneManager.controls.rotateUp(deltaY * this.rotationSpeed * 10);
        this.sceneManager.controls.update();
      }
    }
    
    this.previousHandPositions.push(currentPos);
    if (this.previousHandPositions.length > 5) {
      this.previousHandPositions.shift();
    }
  }

  // 处理暂停 (Handle pause)
  handlePause() {
    // 重置位置历史 (Reset position history)
    this.previousHandPositions = [];
  }

  // 处理双手捏合缩放 (Handle two-hand pinch zoom)
  handlePinchZoom(hand1, hand2) {
    // 计算两手之间的距离 (Calculate distance between hands)
    const hand1Center = {
      x: hand1[9].x,
      y: hand1[9].y
    };
    const hand2Center = {
      x: hand2[9].x,
      y: hand2[9].y
    };
    
    const distance = Math.sqrt(
      Math.pow(hand2Center.x - hand1Center.x, 2) +
      Math.pow(hand2Center.y - hand1Center.y, 2)
    );
    
    if (this.lastPinchDistance > 0) {
      const deltaDistance = distance - this.lastPinchDistance;
      
      // 应用缩放到相机 (Apply zoom to camera)
      if (this.sceneManager.camera) {
        const zoomDelta = deltaDistance * this.zoomSpeed * 100;
        this.sceneManager.camera.position.z = Math.max(
          2,
          Math.min(20, this.sceneManager.camera.position.z - zoomDelta)
        );
      }
    }
    
    this.lastPinchDistance = distance;
  }

  // 清理资源 (Cleanup resources)
  destroy() {
    this.disable();
    const container = document.querySelector('.gesture-control-container');
    if (container) {
      container.remove();
    }
  }
}
