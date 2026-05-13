
//玩家类
class Player {
    constructor({
                    name,
                    id,
                    color,
                    maxHp,
                    hp,
                    at,
                    latestShoot,
                    latestHurt,
                    x,
                    y,
                    w,
                    h,
                    a,
                    v,
                    up,
                    down,
                    left,
                    right,
                    angle
                }) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.maxHp = maxHp;
        this.hp = hp;
        this.at = at;
        this.latestShoot = latestShoot;
        this.latestHurt = latestHurt;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a;
        this.v = v;
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
        this.angle = angle;
    }

    playerMove() {
        if (this.up) {
            this.y -= this.v;
        }
        if (this.down) {
            this.y += this.v;
        }
        if (this.left) {
            this.x -= this.v;
        }
        if (this.right) {
            this.x += this.v;
        }
    }
}

export default Player;