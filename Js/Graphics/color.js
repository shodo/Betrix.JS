import Vector4 from "../Math/vector4"

export default class Color extends Vector4
{
    constructor(r, g, b, a)
    {
        super(r, g, b, a)
    }

    get r() { return super.x; }
    get g() { return super.y; }
    get b() { return super.z; }
    get a() { return super.w; }

    static get BLACK() { return new Color(0.0, 0.0, 0.0, 1.0); }
    static get RED()  { return new Color(1.0, 0.0, 0.0, 1.0); }
    static get GREEN() { return new Color(0.0, 1.0, 0.0, 1.0); }
    static get BLUE() { return new Color(0.0, 0.0, 1.0, 1.0); }
    static get YELLOW() { return new Color(1.0, 1.0, 0.0, 1.0); }
    static get WHITE() { return new Color(1.0, 1.0, 1.0, 1.0); }
    static get CYAN() { return new Color(0.0, 1.0, 1.0, 1.0); }
}