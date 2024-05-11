<p align="center">
  <img width="200" src="./public/icon.png">
</p>

这是 [摸鱼派客户端](https://github.com/imlinhanchao/fishpi-desktop) 机器人聊天窗口，用于在客户端归集机器人消息。

## 安装方式

1. 下载 [Release](https://github.com/imlinhanchao/fishpi-ext-bot/releases) 最新版本的压缩包。
2. 解压缩到客户端扩展目录。
3. 重新开启客户端即可。

## 功能说明
- TBD

## 调试说明
1. 首先，将代码 clone 到扩展目录，运行 `npm run serve`，启动 vue 服务。
2. 添加 `--dev` 命令行参数启动程序：
```bash
# Windows
.\fishpi.exe --dev

# MacOS
fishpi.app/Contents/MacOS/fishpi --dev
```
3. 点击侧边栏图标进入启动扩展。即可启动对扩展 `webview` 调试。