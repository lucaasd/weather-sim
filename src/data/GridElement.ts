import Vector2 from "../math/Vector2";

class GridElement {
    public x: number;
    public y: number;

    public windSpeed: Vector2;
    public temperature: number;
    public humidity: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.windSpeed = new Vector2();
        this.temperature = 0;
        this.humidity = 0.25;
    }
}

export default GridElement;