//子弹类
class Bullet {
    constructor({id, from, color, at, x, y, w, h, a, v, angle}) {
        this.id = id;
        this.from = from;
        this.color = color;
        this.at = at;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a;
        this.v = v;
        this.angle = angle;
    }

    bulletMove() {
        const rad = (this.angle * Math.PI) / 180;
        this.x += Math.cos(rad) * this.v;
        this.y += Math.sin(rad) * this.v;
    }
}

export default Bullet;