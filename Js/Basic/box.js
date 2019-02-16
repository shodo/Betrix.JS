import { Matrix4 } from "../math";
import { Vector3 } from "../math";
import { VertexBuffer, VertexPositionColor, IndexBuffer, DrawModes } from "../graphics";

export default class
{ 
    constructor(colors, textures, graphicDevice)
    {
        let $this = this;

        $this.graphicDevice = graphicDevice;

        $this.vertexBuffer =  new VertexBuffer($this.graphicDevice, VertexPositionColor.vertexDeclaration);
        $this.vertexBuffer.setData(  
        [
            //FRONT
            new VertexPositionColor(new Vector3(-1.0, -1.0, 1.0), colors[0]),
            new VertexPositionColor(new Vector3(-1.0, 1.0, 1.0), colors[0]),
            new VertexPositionColor(new Vector3(1.0,  1.0, 1.0), colors[0]),
            new VertexPositionColor(new Vector3(1.0, -1.0, 1.0), colors[0]),
            //REAR
            new VertexPositionColor(new Vector3(-1.0, -1.0, -1.0), colors[1]),
            new VertexPositionColor(new Vector3(-1.0, 1.0, -1.0), colors[1]),
            new VertexPositionColor(new Vector3(1.0,  1.0, -1.0), colors[1]),
            new VertexPositionColor(new Vector3(1.0, -1.0, -1.0), colors[1]),
            //RIGHT
            new VertexPositionColor(new Vector3(1.0, -1.0, 1.0), colors[2]),
            new VertexPositionColor(new Vector3(1.0,  1.0, 1.0), colors[2]),
            new VertexPositionColor(new Vector3(1.0,  1.0, -1.0), colors[2]),
            new VertexPositionColor(new Vector3(1.0, -1.0, -1.0), colors[2]),
            //LEFT
            new VertexPositionColor(new Vector3(-1.0, -1.0, 1.0), colors[3]),
            new VertexPositionColor(new Vector3(-1.0, 1.0, 1.0), colors[3]),
            new VertexPositionColor(new Vector3(-1.0,  1.0, -1.0), colors[3]),
            new VertexPositionColor(new Vector3(-1.0, -1.0, -1.0), colors[3]),
            //TOP
            new VertexPositionColor(new Vector3(-1.0, 1.0, 1.0), colors[4]),
            new VertexPositionColor(new Vector3(1.0, 1.0, 1.0), colors[4]),
            new VertexPositionColor(new Vector3(1.0,  1.0, -1.0), colors[4]),
            new VertexPositionColor(new Vector3(-1.0, 1.0, -1.0), colors[4]),
            //BOTTOM
            new VertexPositionColor(new Vector3(-1.0, -1.0, 1.0), colors[5]),
            new VertexPositionColor(new Vector3(1.0, -1.0, 1.0), colors[5]),
            new VertexPositionColor(new Vector3(1.0,  -1.0, -1.0), colors[5]),
            new VertexPositionColor(new Vector3(-1.0, -1.0, -1.0), colors[5])
        ]);

        $this.indexBuffer = new IndexBuffer($this.graphicDevice);
        $this.indexBuffer.setData
        ([
            2, 1, 0, 0, 3, 2,
            7, 4, 5, 5, 6, 7,
            8, 11, 10, 10, 9, 8,
            12, 13, 14, 14, 15, 12,
            16, 17, 18, 18, 19, 16,
            22, 21, 20, 20, 23, 22 
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
