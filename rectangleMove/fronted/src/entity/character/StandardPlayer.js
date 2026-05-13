//玩家类
class StandardPlayer {
  constructor({
    name,
    id,
    color
  }) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.maxHp = 100;
    this.hp = 100;
    this.at = 10;
    this.latestShoot = 0;
    this.latestHurt = 0;
    this.x = 0;
    this.y = 0;
    this.w = 60;
    this.h = 60;
    this.a = 0;
    this.v = 5;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.angle = 0;
  }
}

export default StandardPlayer;