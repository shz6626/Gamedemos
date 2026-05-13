const serverUrl = "ws://192.168.8.97:5000"

function playerJoin(ws, player) {
  ws.send(JSON.stringify({
    type: "pJoin",
    data: player
  }))
}

function playerMove(ws, player) {
  ws.send(JSON.stringify({
    type: "pMove",
    data: player
  }))
}

function playerShoot(ws, player) {
  ws.send(JSON.stringify({
    type: "pShoot",
    data: player
  }))
}

function playerDelete(ws, player) {
  ws.send(JSON.stringify({
    type: "pDelete",
    data: player
  }))
}

export {
  serverUrl,
  playerJoin,
  playerMove,
  playerShoot,
  playerDelete
}