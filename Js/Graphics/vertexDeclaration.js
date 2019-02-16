import Vertex from "./vertex"

export default class
{
    constructor()
    {
        let $this = this;
        this.p_oElementArray = [];
    }

    addElement(i_oElementUsage, i_oElementType, i_oElementPacking)
    {
        let uiElementsCount = this.p_oElementArray.length;
        this.p_oElementArray[uiElementsCount] = 
        {
            USAGE  : i_oElementUsage, 
            TYPE  : i_oElementType,
            PACKING: i_oElementPacking
        };
    }

    get elementsCount()
    {
        return this.p_oElementArray.length;
    }

    get stride()
    {
        let $this = this;

        var uiByteStride = 0;
        var uiElementsCount = this.p_oElementArray.length;
        
        for(var uiElementIndex = 0; uiElementIndex < uiElementsCount; ++uiElementIndex)
        {
            uiByteStride += $this.getElementSize(uiElementIndex);
        }
        
        return uiByteStride;
    }

    getElement(i_uiIndex)
    {
        let $this = this;

        return $this.p_oElementArray[i_uiIndex];
    };

    getElementSize(i_uiIndex)
    {
        let $this = this;

        let uiVertexElementType = $this.p_oElementArray[i_uiIndex].TYPE;
        let uiVertexElementPacking = $this.p_oElementArray[i_uiIndex].PACKING;

        let uiPackingLenght = 0;
        switch(uiVertexElementPacking)
        {
            case Vertex.Packing.VECTOR2:
                uiPackingLenght = 2;
                break;
            case Vertex.Packing.VECTOR3:
                uiPackingLenght = 3;
                break;
            case Vertex.Packing.VECTOR4:
                uiPackingLenght = 4;
                break;
            case Vertex.Packing.COLOR:
                uiPackingLenght = 4;
                break;
        }
        
        let uiByteSize = 0;
        switch(uiVertexElementType)
        {
            case Vertex.Types.FLOAT32:
                uiByteSize = Float32Array.BYTES_PER_ELEMENT;
                break;
        }
        
        return uiByteSize * uiPackingLenght;
    }
}