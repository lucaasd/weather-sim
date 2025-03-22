class Vector2 {
    constructor(public x: number = 0, public y: number = 0) { }

    add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    subtract(v: Vector2): Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    multiply(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    divide(scalar: number): Vector2 {
        return scalar !== 0 ? new Vector2(this.x / scalar, this.y / scalar) : new Vector2();
    }

    magnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize(): Vector2 {
        const mag = this.magnitude();
        return mag !== 0 ? this.divide(mag) : new Vector2();
    }

    static random(): Vector2 {
        return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
    }
}

export default Vector2;