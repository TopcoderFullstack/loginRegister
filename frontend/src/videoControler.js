import axios from 'axios';

export class VideoLoader {
  constructor() {
    this.controller = null;
    this.videoElement = document.querySelector('video');
  }

  // 加载视频
  loadVideo(url) {
    // 如果已有请求正在进行，则取消它
    if (this.controller) {
      this.controller.abort();
    }

    // 创建新的 AbortController 实例
    this.controller = new AbortController();

    // 发起 Axios 请求
    axios.get(url, {
      responseType: 'blob',
      signal: this.controller.signal
    })
      .then(response => {
        console.log('视频加载成功');
        const videoBlob = response.data;
        const videoUrl = URL.createObjectURL(videoBlob);
        this.videoElement.src = videoUrl;
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('视频请求已取消');
        } else {
          console.error('视频加载失败:', error);
        }
      });
  }

  // 取消视频加载
  cancelLoad() {
    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }
  }
}
