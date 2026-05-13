import Player from './entity/PLayer.js';
import Bullet from './entity/Bullet.js';
import express from 'express';
import {WebSocketServer} from 'ws';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const server = app.listen(5000, () => {
    console.log('服务器运行在 http://localhost:5000');
});

const wss = new WebSocketServer({server});

let players = []
let bullets = []

let config = {
    //频率
    FPS: 1000 / 60,
    //画面宽高
    canvasWidth: 1000,
    canvasHeight: 800,
    //射击间隔ms
    shootGap: 500,
}

wss.on('connection', ws => {

    ws.on('message', message => {

        const msg = JSON.parse(message);
        const type = msg.type;
        const data = msg.data;

        const tsp = Date.now();
        let index;
        //接受玩家消息
        switch (type) {
            //玩家加入
            case 'pJoin':
                index = players.findIndex(player => player.id === data.id)
                if (index === -1) {
                    players.push(new Player(data))
                    console.log(data.name + " 加入游戏")
                } else {
                    console.log(data.name + "重新加入游戏")
                }
                break;
            //玩家移动
            case 'pMove':
                index = players.findIndex(player => player.id === data.id)
                if (index > -1) {
                    players[index].up = data.up;
                    players[index].down = data.down;
                    players[index].left = data.left;
                    players[index].right = data.right;
                }
                break;
            //玩家射击
            case 'pShoot':
                index = players.findIndex(player => player.id === data.id)
                if ((index > -1) && (tsp - players[index].latestShoot > config.shootGap)) {
                    //新建子弹
                    bullets.push(new Bullet({
                        id: tsp,
                        from: players[index].id,
                        color: players[index].color,
                        at: players[index].at,
                        x: players[index].x,
                        y: players[index].y,
                        w: 10,
                        h: 10,
                        a: 0,
                        v: 10,
                        angle: data.angle
                    }));
                    //更新玩家角度
                    players[index].angle = data.angle;
                    //更新玩家最新射击时间戳
                    players[index].latestShoot = tsp;
                }
                break;
            //玩家死亡
            case 'pDelete':
                index = players.findIndex(player => player.id === data.id)
                if (index > -1) {
                    players.splice(index, 1)
                    console.log(data.name + " 离开游戏")
                }
                break;
            case 'test':
                console.log(players, bullets);
        }
    })
})

//广播定时器
setInterval(() => {

    //更新玩家位置
    players.forEach(player => {
        player.playerMove();
        //防止玩家出界
        player.x = Math.min(Math.max(player.x, player.w / 2), config.canvasWidth - player.w / 2);
        player.y = Math.min(Math.max(player.y, player.h / 2), config.canvasHeight - player.h / 2);
    })

    //更新子弹位置
    bullets.forEach(bullet => {
        bullet.bulletMove();
        //移除边界外子弹
        if (bullet.x > config.canvasWidth || bullet.x < 0 || bullet.y > config.canvasHeight || bullet.y < 0) {
            bullets.splice(bullets.findIndex(b => b.id === bullet.id), 1);
        }
    })

    //所有客户端同步玩家和子弹
    wss.clients.forEach((client) => {
        client.send(JSON.stringify({type: "gameSync", data: {players: players, bullets: bullets}}))
    })

    //碰撞检测
    players.forEach(player => {
        bullets.forEach(bullet => {
            const crush = (
                Math.abs(bullet.x - player.x) < (bullet.w + player.w) / 2 &&
                Math.abs(bullet.y - player.y) < (bullet.h + player.h) / 2 &&
                bullet.from !== player.id
            )

            switch (crush) {
                case true:
                    //碰撞
                    bullets.splice(bullets.findIndex(b => b.id === bullet.id), 1);
                    player.hp -= bullet.at
                    if (player.hp <= 0) {
                        players.splice(players.findIndex(p => p.name === player.name), 1);
                        console.log(player.name + "被" + bullet.from + "击败");
                    }
                    break;
                case false:
                    //未碰撞
                    break;
            }
        })
    })

}, config.FPS)
