import { Matrix4 } from "../math";
import { Vector3 } from "../math";
import { Vector2 } from "../math";
import { VertexBuffer, VertexPositionColorTexture, IndexBuffer, DrawModes } from "../graphics";

export default class
{ 
    constructor(color, graphicDevice)
    {
        let $this = this;

        $this.graphicDevice = graphicDevice;

        $this.vertexBuffer =  new VertexBuffer($this.graphicDevice, VertexPositionColorTexture.vertexDeclaration);
        $this.vertexBuffer.setData(  
        [
            new VertexPositionColorTexture(new Vector3(-1.0, -1.0, 0.0), color, new Vector2(0, 1)),
            new VertexPositionColorTexture(new Vector3(-1.0, 1.0, 0.0), color, new Vector2(0, 0)),
            new VertexPositionColorTexture(new Vector3(1.0,  1.0, 0.0), color, new Vector2(1, 0)),
            new VertexPositionColorTexture(new Vector3(1.0, -1.0, 0.0), color, new Vector2(1, 1))
        ]);

        $this.indexBuffer = new IndexBuffer($this.graphicDevice);
        $this.indexBuffer.setData([2, 1, 0, 0, 3, 2]);

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
