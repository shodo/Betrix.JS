export default class
{
    constructor(x, y, z, w)
    {
        let $this = this;

        if(x === undefined) x = 0;
        if(y === undefined) y = 0;
        if(z === undefined) z = 0;
        if(w === undefined) w = 0;

        $this.p_oRawPlainArray = new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT * 4);
        $this.p_afPlainArrayView = new Float32Array(this.p_oRawPlainArray);
        $this.p_afPlainArrayView[0] = x;
        $this.p_afPlainArrayView[1] = y;
        $this.p_afPlainArrayView[2] = z;
        $this.p_afPlainArrayView[3] = w;
    }

    get x() { return this.p_afPlainArrayView[0]; }
    get y() { return this.p_afPlainArrayView[1]; }
    get z() { return this.p_afPlainArrayView[2]; }
    get w() { return this.p_afPlainArrayView[3]; }

    get array() { return this.p_oRawPlainArray; };
    get byteArray() { return new Uint8Array(this.p_oRawPlainArray); }
};