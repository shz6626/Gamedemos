//玩家类
class HurryPlayer {
  constructor({
    name,
    id,
    color
  }) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.maxHp = 50;
    this.hp = 50;
    this.at = 10;
    this.latestShoot = 0;
    this.latestHurt = 0;
    this.x = 0;
    this.y = 0;
    this.w = 60;
    this.h = 60;
    this.a = 0;
    this.v = 10;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.angle = 0;
  }
}

export default HurryPlayer;