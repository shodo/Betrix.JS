import VertexDeclaration from "./vertexDeclaration"
import Vertex from "./vertex"

let vertexPositionColorDeclaration = new VertexDeclaration();
vertexPositionColorDeclaration.addElement(Vertex.Usages.POSITION, Vertex.Types.FLOAT32, Vertex.Packing.VECTOR3);
vertexPositionColorDeclaration.addElement(Vertex.Usages.COLOR, Vertex.Types.FLOAT32, Vertex.Packing.COLOR);

export default class
{
    constructor(i_oPosition, i_oColor)
    {
        let $this = this;

        $this.p_oPosition = i_oPosition;
        $this.p_oColor = i_oColor;
    }

    static get vertexDeclaration()
    {
        return vertexPositionColorDeclaration;
    }

    static get vertexElementsCount()
    {
        return vertexPositionColorDeclaration.elementsCount;
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
        
        case 1:
            oPlainArray = $this.p_oColor.byteArray;
            break;
        
        default:
         
            break;
        }
   
        return oPlainArray;
    }
}