export default class 
{
    constructor(i_oGraphicDevice)
    {
        let $this = this;

        $this.graphicDevice = i_oGraphicDevice;
        $this.innerIndexBuffer = $this.graphicDevice.oWebGLContext.createBuffer();            
    };

    setData(i_auiIndexData)
    {
        let $this = this;
        let oGLContext = $this.graphicDevice.oWebGLContext;

        $this.innerIndexBuffer.numItems = i_auiIndexData.length;
    
        oGLContext.bindBuffer(oGLContext.ELEMENT_ARRAY_BUFFER, $this.innerIndexBuffer);
        oGLContext.bufferData(oGLContext.ELEMENT_ARRAY_BUFFER, new Uint16Array(i_auiIndexData), oGLContext.STATIC_DRAW);
        oGLContext.bindBuffer(oGLContext.ELEMENT_ARRAY_BUFFER, null);
    }

    get indexCount() { return this.innerIndexBuffer.numItems; };
}