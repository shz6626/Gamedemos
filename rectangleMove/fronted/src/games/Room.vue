<template>
  <div class="background">
    <div class="dashboard">
      <div class="playerList">
        <div class="title">玩家列表</div>
        <div class="container">
          <div class="player" v-for="player in players" :key="player.id">
            {{ player.name }}
          </div>
        </div>
        <div class="join">
          <button class="joinGame" @click="join">加入</button>
        </div>
      </div>
    </div>
    <div class="modal" v-show="showModal">
      <div class="characterName">
        <p>你叫啥</p>
        <input type="text" v-model="name">
      </div>
      <div class="characterType">
        <p>选个角色</p>
        <select v-model="type">
          <option value="StandardPlayer">正常</option>
          <option value="GaintPlayer">巨人</option>
          <option value="HurryPlayer">侏儒</option>
        </select>
      </div>
      <div class="characterColor">
        <p>选个颜色</p>
        <input type="color" v-model="color">
      </div>
      <button class="confirm" @click="confirm">确定</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import router from "../router";
import { serverUrl } from "../api/api.js"

let players = ref([])

let ws = null
let showModal = ref(false)
let name = ref("")
let color = ref("")
let type = ref("")

function join() {
  showModal.value = true
}

function confirm() {
  if (!name.value || !color.value || !type.value) {
    alert("请输入完整信息")
    return
  }
  localStorage.setItem("name", name.value)
  localStorage.setItem("type", type.value)
  localStorage.setItem("color", color.value)
  router.push("/RectangleMove")
}

onMounted(() => {
  ws = new WebSocket(serverUrl)

  ws.onmessage = (message) => {
    const msg = JSON.parse(message.data)
    const type = msg.type
    const data = msg.data
    switch (type) {
      case "gameSync":
        players.value = data.players
        break;
    }
  }
})

</script>

<style scoped>
.background {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  align-items: center;
  justify-content: center;
}

.dashboard {
  width: 800px;
  height: 600px;
  background-color: #333;
  border-radius: 10px;
  border: #260c51 solid 3px;
}

.playerList {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.title {
  font-size: 24px;
  color: #ffffff;
  align-content: center;
  justify-content: center;
  flex: 1
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  flex: 5;
  background-color: #222;
  border-radius: 10px;
  overflow-y: scroll;
  scrollbar-width: none;
}

.player {
  font-size: 18px;
  color: #ffffff;
  background-color: #000;
  padding: 10px;
  width: 80%;
  margin: 10px 0;
  border-radius: 5px;
}

.join {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.joinGame {
  flex: 1;
  font-size: 18px;
  color: #ffffff;
  background-color: #38166e;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.modal {
  width: 500px;
  height: 400px;
  overflow-y: scroll;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 50px;
  border: #231051 3px solid;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #31254a;
  z-index: 10000;
  border-radius: 20px;
}

.characterName,
.characterType,
.characterColor {
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #ffffff;
  background-color: #3a0852;
  border-radius: 10px;
  gap: 10px;
}

.confirm {
  flex: 1;
  font-size: 18px;
  color: #ffffff;
  background-color: #38166e;
  margin: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

input {
  width: 70%;
  height: 30%;
  padding: 5px;
  border-radius: 5px;
  background-color: #491063;
  color: #ffffff;
  font-size: 20px;
}

select {
  width: 70%;
  height: 40%;
  padding: 5px;
  border-radius: 5px;
  background-color: #491063;
  color: #ffffff;
}

option {
  background-color: #491063;
  color: #ffffff;
}
</style>