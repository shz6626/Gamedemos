# RectangleMove 多人对战小游戏
A real-time multiplayer shooting game developed with Vue.js, Node.js, and WebSocket.

## 功能
- 玩家进入房间后选择角色（标准型、巨人型、侏儒型）和颜色，输入昵称即可加入对战
- WASD 键控制角色移动，鼠标指向瞄准，鼠标点击向该方向发射子弹
- 三种角色各具特色：标准型属性均衡，巨人型血量高/攻击高但速度慢，侏儒型血量低但速度快
- 子弹命中其他玩家可削减其生命值，生命值归零则被淘汰
- 服务端实时同步所有玩家和子弹状态，支持多人同时在线对战
- 边界碰撞限制（角色和子弹无法超出画布范围）

## 技术栈
- 前端：Vue 3 + Vue Router + Canvas
- 后端：Node.js + Express + WebSocket (ws)
- 通信协议：WebSocket 实时双向通信

## 如何运行
1. 安装后端依赖并启动服务器：
   ```
   cd backed
   npm install
   node app.js
   ```
2. 安装前端依赖并启动开发服务器：
   ```
   cd fronted
   npm install
   npm run dev
   ```
3. 在浏览器中打开前端地址，输入昵称、选择角色和颜色即可加入游戏

## Features
- Players join a lobby, choose a character type (Standard, Giant, Hurry), pick a color, and enter a nickname to join the battle
- WASD keys to move, mouse to aim, mouse click to shoot bullets in the aimed direction
- Three distinct character types: Standard (balanced stats), Giant (high HP/ATK but slow), Hurry (low HP but fast)
- Bullets hitting other players reduce their HP; HP reaching zero eliminates the player
- Server authoritatively syncs all player and bullet states in real time, supporting multiple concurrent players
- Boundary collision restriction (characters and bullets cannot exceed the canvas bounds)

## Tech Stack
- Frontend: Vue 3 + Vue Router + Canvas
- Backend: Node.js + Express + WebSocket (ws)
- Protocol: WebSocket real-time bidirectional communication

## How to Run
1. Install backend dependencies and start the server:
   ```
   cd backed
   npm install
   node app.js
   ```
2. Install frontend dependencies and start the dev server:
   ```
   cd fronted
   npm install
   npm run dev
   ```
3. Open the frontend URL in a browser, enter a nickname, choose a character and color to join the game
