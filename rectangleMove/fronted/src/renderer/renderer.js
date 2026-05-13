//渲染器
export const drawPlayer = (ctx, player) => {
  //画玩家
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x - player.w / 2, player.y - player.h / 2, player.w, player.h);

  //画血条
  const barWidth = player.w;
  const barHeight = 4;
  const barY = player.y - player.h / 2 - 10;
  ctx.fillStyle = "#ff3333";
  ctx.fillRect(player.x - barWidth / 2, barY, barWidth, barHeight);
  const currentWidth = (player.hp / player.maxHp) * barWidth;
  ctx.fillStyle = "#33ff33";
  ctx.fillRect(player.x - barWidth / 2, barY, currentWidth, barHeight);

  //画名字
  ctx.fillStyle = "#fff";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.fillText(player.name, player.x, player.y + player.h / 2 + 5);
};

export const drawBullet = (ctx, bullet) => {
  ctx.fillStyle = bullet.color;
  ctx.fillRect(bullet.x - bullet.w / 2, bullet.y - bullet.h / 2, bullet.w, bullet.h);
};