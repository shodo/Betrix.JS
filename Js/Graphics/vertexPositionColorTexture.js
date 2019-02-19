import VertexDeclaration from "./vertexDeclaration"
import Vertex from "./vertex"

let vertexPositionColorTextureDeclaration = new VertexDeclaration();
vertexPositionColorTextureDeclaration.addElement(Vertex.Usages.POSITION, Vertex.Types.FLOAT32, Vertex.Packing.VECTOR3);
vertexPositionColorTextureDeclaration.addElement(Vertex.Usages.COLOR, Vertex.Types.FLOAT32, Vertex.Packing.COLOR);
vertexPositionColorTextureDeclaration.addElement(Vertex.Usages.TEXTURE, Vertex.Types.FLOAT32, Vertex.Packing.VECTOR2);

export default class
{
    constructor(i_oPosition, i_oColor, i_oTextureUV)
    {
        let $this = this;

        $this.p_oPosition = i_oPosition;
        $this.p_oColor = i_oColor;
        $this.p_oTextureUV = i_oTextureUV;
    }

    static get vertexDeclaration()
    {
        return vertexPositionColorTextureDeclaration;
    }

    static get vertexElementsCount()
    {
        return vertexPositionColorTextureDeclaration.elementsCount;
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

            case 2:
                oPlainArray = $this.p_oTextureUV.byteArray;
            break;
        
            default:
            break;
        }
   
        return oPlainArray;
    }
}