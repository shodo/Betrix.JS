import VertexDeclaration from "./vertexDeclaration"
import Vertex from "./vertex"

let vertexPositionDeclaration = new VertexDeclaration();
vertexPositionDeclaration.addElement(Vertex.Usages.POSITION, Vertex.Types.FLOAT32, Vertex.Packing.VECTOR3);

export default class
{
    constructor(i_oPosition)
    {
        let $this = this;
        $this.p_oPosition = i_oPosition;
    }

    static get vertexDeclaration()
    {
        return vertexPositionDeclaration;
    }

    static get vertexElementsCount()
    {
        return vertexPositionDeclaration.elementsCount;
    }

    getElementBytes(i_uiVertexElementIndex)
    {
        let $this = this;

        var oPlainArray = undefined;
        switch(i_uiVertexElementIndex)
        {
        case 0:
            oPlainArray = $this.p_oPosition.byteArray;
            break;
        
        default:
         
            break;
        }
   
        return oPlainArray;
    }
}