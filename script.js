const fileInput = document.getElementById('file-input');
const compressButton = document.getElementById('compress-button');
const progressBar = document.querySelector('.progress-bar .progress-inner');
const resultArea = document.querySelector('.result-area');
const compressedFiles = document.querySelector('.compressed-files');

compressButton.addEventListener('click', () => {
  // 获取用户选择的文件
  const files = fileInput.files;

  // 显示压缩区域
  compressArea.style.display = 'block';

  // 遍历所有文件并进行压缩
  for (const file of files) {
    // 创建一个新的压缩任务
    const task = new CompressTask(file);

    // 监听压缩任务的进度
    task.onprogress = (progress) => {
      // 更新进度条
      progressBar.style.width = `${progress}%`;
    };

    // 监听压缩任务的完成
    task.oncomplete = (compressedFile) => {
      // 添加压缩后的文件到列表中
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="file-name">${compressedFile.name}</span>
        <span class="file-size">${compressedFile.size}</span>
        <a href="${compressedFile.url}" download>下载</a>
      `;
      compressedFiles.appendChild(li);

      // 隐藏进度条
      progressBar.style.width = '0%';

      // 显示结果区域
      resultArea.style.display = 'block';
    };

    // 开始压缩任务
    task.start();
  }
});

// 压缩任务类
class CompressTask {
  constructor(file) {
    this.file = file;
    this.progress = 0;
    this.onprogress = () => {};
    this.oncomplete = () => {};
  }

  start() {
    // 模拟压缩过程
    setTimeout(() => {
      // 压缩完成
      const compressedFile = {
        name: this.file.name,
        size: 100, // 压缩后文件大小
        url: 'https://www.example.com/download.zip', // 压缩后文件的下载链接
      };

      // 调用完成回调函数
      this.oncomplete(compressedFile);
    }, 1000);

    // 模拟压缩进度
    const interval = setInterval(() => {
      this.progress += 10;
      this.onprogress(this.progress);

      if (this.progress === 100) {
        clearInterval(interval);
      }
    }, 100);
  }
}
