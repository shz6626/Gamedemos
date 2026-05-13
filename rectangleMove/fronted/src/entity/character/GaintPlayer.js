//玩家类
class GaintPlayer {
  constructor({
    name,
    id,
    color
  }) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.maxHp = 300;
    this.hp = 300;
    this.at = 30;
    this.latestShoot = 0;
    this.latestHurt = 0;
    this.x = 0;
    this.y = 0;
    this.w = 120;
    this.h = 120;
    this.a = 0;
    this.v = 3;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.angle = 0;
  }
}

export default GaintPlayer;