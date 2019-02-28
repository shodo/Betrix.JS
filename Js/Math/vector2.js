export default class
{
    constructor(x, y)
    {
        let $this = this;

        if(x === undefined) x = 0;
        if(y === undefined) y = 0;
        
        $this.p_oRawPlainArray = new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT * 2);
        $this.p_afPlainArrayView = new Float32Array(this.p_oRawPlainArray);
        $this.p_afPlainArrayView[0] = x;
        $this.p_afPlainArrayView[1] = y;
    }

    get x() { return this.p_afPlainArrayView[0]; }
    get y() { return this.p_afPlainArrayView[1]; }

    get array() { return this.p_oRawPlainArray; };
    get byteArray() { return new Uint8Array(this.p_oRawPlainArray); }
}