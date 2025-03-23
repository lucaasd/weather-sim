import Vector2 from "../math/Vector2";

export enum ElementType {
    Air = 0,
    Water = 1,
    Land = 2
}

class GridElement {
    public x: number;
    public y: number;

    public windSpeed: Vector2;
    public temperature: number;
    public humidity: number;

    public elementType: ElementType;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.windSpeed = new Vector2();
        this.temperature = 0;
        this.humidity = 0.25;
        this.elementType = ElementType.Air;
    }
}

export default GridElement;