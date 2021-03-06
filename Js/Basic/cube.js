import { Matrix4 } from "../math";
import { Vector3 } from "../math";
import { VertexBuffer, VertexPositionColor, IndexBuffer, DrawModes } from "../graphics";

export default class
{ 
    constructor(color, graphicDevice)
    {
        let $this = this;

        $this.graphicDevice = graphicDevice;

        $this.vertexBuffer =  new VertexBuffer($this.graphicDevice, VertexPositionColor.vertexDeclaration);
        $this.vertexBuffer.setData(  
        [
            new VertexPositionColor(new Vector3(-1.0, -1.0, 1.0), color),
            new VertexPositionColor(new Vector3(-1.0, 1.0, 1.0), color),
            new VertexPositionColor(new Vector3(1.0,  1.0, 1.0), color),
            new VertexPositionColor(new Vector3(1.0, -1.0, 1.0), color),
            new VertexPositionColor(new Vector3(-1.0, -1.0, -1.0), color),
            new VertexPositionColor(new Vector3(-1.0, 1.0, -1.0), color),
            new VertexPositionColor(new Vector3(1.0,  1.0, -1.0), color),
            new VertexPositionColor(new Vector3(1.0, -1.0, -1.0), color),
        ]);

        $this.indexBuffer = new IndexBuffer($this.graphicDevice);
        $this.indexBuffer.setData
        ([
            2, 1, 0, 0, 3, 2,
            3, 7, 6, 6, 2, 3,
            4, 0, 1, 1, 5, 4,
            7, 4, 5, 5, 6, 7,
            1, 2, 6, 6, 5, 1,
            0, 4, 7, 7, 3, 0    
        ]);

        $this.transformMatrix = new Matrix4().makeIdentity();
        $this.tempMatrix = new Matrix4();
        $this.translation = new Vector3(0.0, 0.0, 0.0);
    }

    rotateOnX(angle) { this.transform.mult(this.tempMatrix.makeRotationX(angle)); }
    rotateOnY(angle) { this.transform.mult(this.tempMatrix.makeRotationY(angle)); }
    rotateOnZ(angle) { this.transform.mult(this.tempMatrix.makeRotationZ(angle)); }

    set translation(translationVector)
    {
        let $this = this;
        $this.transformMatrix.setTranslation(translationVector.x, translationVector.y, translationVector.z);
    }

    get transform() { return this.transformMatrix; }

    draw()
    {
        let $this = this;
        $this.graphicDevice.drawIndexed($this.vertexBuffer, $this.indexBuffer, DrawModes.TRIANGLES, 0, $this.indexBuffer.indexCount)
    }
}
