<template>
  <div class="CanvasContainer">
    <canvas width="1000" height="800" ref="backgroundCanvas"></canvas>
    <button @click="test" style="display: none">测试</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { serverUrl, playerJoin, playerMove, playerShoot, playerDelete } from "../api/api.js"
import { createCharacter } from '../entity/createCharacter.js'
import { drawPlayer, drawBullet } from "../renderer/renderer.js"

function test() {
  ws.send(JSON.stringify({ type: "test" }))
}

const backgroundCanvas = ref(null)
let ctx = null
let ws = null
//我的
let name = null
let type = null
let color = null
//玩家集合
let players = []
//子弹集合
let bullets = []
//按键字典
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  mouseX: 0,
  mouseY: 0,
  mouseDown: false,
  mouseLatestDown: 0
}
//按下按键
function keyDown(e) {
  const me = players.find(player => player.name === name)
  switch (e.key) {
    case "w":
      me.up = true;
      break;
    case "s":
      me.down = true;
      break;
    case "a":
      me.left = true;
      break;
    case "d":
      me.right = true;
      break;
  }
  playerMove(ws, me)
}
//松开按键
function keyUp(e) {
  const me = players.find(player => player.name === name)
  switch (e.key) {
    case "w":
      me.up = false;
      break;
    case "s":
      me.down = false;
      break;
    case "a":
      me.left = false;
      break;
    case "d":
      me.right = false;
      break;
  }
  playerMove(ws, me)
}
//鼠标按下
function mouseDown(e) {
  const me = players.find(player => player.name === name)
  me.angle = Math.atan2(keys.mouseY - me.y, keys.mouseX - me.x) / Math.PI * 180
  playerShoot(ws, me)
}
//鼠标移动
function mouseMove(e) {
  keys.mouseX = e.clientX - backgroundCanvas.value.getBoundingClientRect().left;
  keys.mouseY = e.clientY - backgroundCanvas.value.getBoundingClientRect().top;
}
//画鼠标准心
function drawMouse() {
  const cx = keys.mouseX
  const cy = keys.mouseY
  const len = 8
  const gap = 3

  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2

  ctx.beginPath()
  ctx.moveTo(cx, cy - gap - len)
  ctx.lineTo(cx, cy - gap)
  ctx.moveTo(cx, cy + gap)
  ctx.lineTo(cx, cy + gap + len)

  ctx.moveTo(cx - gap - len, cy)
  ctx.lineTo(cx - gap, cy)
  ctx.moveTo(cx + gap, cy)
  ctx.lineTo(cx + gap + len, cy)
  ctx.stroke()
}
//画
function draw() {
  //清空画布
  ctx.clearRect(0, 0, backgroundCanvas.value.width, backgroundCanvas.value.height)

  players.forEach(player => {
    drawPlayer(ctx, player)
  })

  bullets.forEach(bullet => {
    drawBullet(ctx, bullet)
  })
  drawMouse()
}
//动画
function animate() {
  draw()
  requestAnimationFrame(animate)
}
//初始化
onMounted(() => {

  const canvas = backgroundCanvas.value
  ctx = canvas.getContext("2d")

  name = localStorage.getItem("name") || "defaultName"
  type = localStorage.getItem("type") || "StandardPlayer"
  color = localStorage.getItem("color") || "red"

  ws = new WebSocket(serverUrl)

  ws.onopen = () => {
    let x = Math.random() * canvas.width
    let y = Math.random() * canvas.height
    const me = createCharacter(name, Date.now(), color, type);//name, id, color, type
    me.name = name
    me.x = x
    me.y = y
    playerJoin(ws, me)
    //绑定按键事件
    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mousedown', mouseDown)
    //启动
    animate()
  }
  //同步服务器数据
  ws.onmessage = (message) => {
    const msg = JSON.parse(message.data)
    const type = msg.type
    const data = msg.data
    switch (type) {
      case "gameSync":
        players = data.players
        bullets = data.bullets
    }
  }
})


</script>

<style scoped>
.CanvasContainer {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  align-items: center;
  justify-content: center;
}

canvas {
  background-color: #000333;
  border: red solid 2px;
  cursor: none;
}
</style>