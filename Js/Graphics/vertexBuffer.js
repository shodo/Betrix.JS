export default class 
{
    constructor(i_oGraphicDevice, i_oVertexDeclaration)
    {
        let $this = this;
            
        $this.p_oGraphicDevice = i_oGraphicDevice;
        $this.p_oVertexDeclaration = i_oVertexDeclaration;
        $this.p_oInnerVertexBuffer = this.p_oGraphicDevice.oWebGLContext.createBuffer();
    };

    setData(i_aoVertexData)
    {
        let $this = this;

        $this.p_oInnerVertexBuffer.numItems = i_aoVertexData.length;
    
        let oInterleavedVerticesPlainArray = new ArrayBuffer($this.p_oVertexDeclaration.stride * i_aoVertexData.length);
        let auiInterleavedVerticesByteView = new Uint8Array(oInterleavedVerticesPlainArray);
       
        let uiOffset = 0;
        let uiVertexElementsCount = $this.p_oVertexDeclaration.elementsCount;
        for(let uiVertexIndex = 0; uiVertexIndex < i_aoVertexData.length; ++uiVertexIndex)
        {
           let oCurrentVertex = i_aoVertexData[uiVertexIndex];
           //assert(uiVertexElementsCount === oCurrentVertex.vertexElementsCount, "VertexBuffer::SetData -> VertexDeclaration elements count doesn't match vertex data elements count");
           for(let uiVertexElementIndex = 0; uiVertexElementIndex < uiVertexElementsCount; ++uiVertexElementIndex)
           {
                let auiCurrentVertexElementByteView = oCurrentVertex.getElementBytes(uiVertexElementIndex);
                let uiCurrentVertexElementByteLength = auiCurrentVertexElementByteView.length;
               
               for(let uiByteIndex = 0; uiByteIndex < uiCurrentVertexElementByteLength; ++uiByteIndex)
               {
                    auiInterleavedVerticesByteView[uiOffset + uiByteIndex] = auiCurrentVertexElementByteView[uiByteIndex];  
               }
               
                uiOffset += uiCurrentVertexElementByteLength;         
           }    
        }
        
        let oGLContext = $this.p_oGraphicDevice.oWebGLContext;
        oGLContext.bindBuffer(oGLContext.ARRAY_BUFFER, $this.p_oInnerVertexBuffer);
        oGLContext.bufferData(oGLContext.ARRAY_BUFFER, auiInterleavedVerticesByteView, oGLContext.STATIC_DRAW);
        oGLContext.bindBuffer(oGLContext.ARRAY_BUFFER, null);
    }

    get vertexCount() { return this.p_oInnerVertexBuffer.numItems; };
}