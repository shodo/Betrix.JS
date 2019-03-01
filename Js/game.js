import { Vector3, Vector4, Matrix4 } from "./math";
import { Color, GraphicDevice, ShaderCompiler, ShaderProgramBuilder, Texture2D } from "./graphics";
import BasicEffect from "./Effects/basicEffect";
import TextureLoader from "./Loaders/textureLoader"

import Plane from "./Basic/plane"

export default class
{
    constructor()
    {
        let $this = this;

        $this.graphicDevice = new GraphicDevice();
        $this.shaderCompiler = new ShaderCompiler();      

    }

    init()
    {
        let $this = this;

        try
        {
            let oCanvas = document.getElementById("Canvas3D");
            let oWebGLContext = oCanvas.getContext("experimental-webgl", true);
            oWebGLContext.viewportWidth = oCanvas.width;
            oWebGLContext.viewportHeight = oCanvas.height;

            $this.graphicDevice.init(oWebGLContext);
            $this.shaderCompiler.init(oWebGLContext);
            $this.shaderProgramBuilder = new ShaderProgramBuilder($this.shaderCompiler, oWebGLContext);
          
        }
        catch(e)
        {
            alert("Error initializing WebGL context: " + e.message);
        }    

        $this.textureLoader = new TextureLoader($this.graphicDevice);

        $this.basicEffect = new BasicEffect($this.graphicDevice, $this.shaderCompiler, $this.shaderProgramBuilder);
        $this.textureLoader.loadFromImageUrl("./texture.jpg", (texture) => $this.texture = texture, () => alert("error"));
        $this.graphicDevice.clearColor = Color.BLACK;

        let projectionMatrix = new Matrix4().makeProjection(45, $this.graphicDevice.aspectRatio, 0.1, 100);
        let viewMatrix = new Matrix4().makeIdentity();
        let worldMatrix = new Matrix4().makeIdentity();

        $this.basicEffect.init();
        $this.basicEffect.projectionMatrix = projectionMatrix;
        $this.basicEffect.viewMatrix = viewMatrix;
        $this.basicEffect.worldMatrix = worldMatrix;
        $this.basicEffect.colorEnabled = true;
        $this.basicEffect.textureEnabled = true;

        $this.cube = new Plane(Color.RED, $this.graphicDevice);
        $this.cube.translation = new Vector3(0, 0, -5);
    }

    update(i_fDeltaTime)
    {
        let $this = this;

        //$this.cube.rotateOnX(0.01);
        $this.cube.rotateOnY(0.01);
        $this.basicEffect.worldMatrix = $this.cube.transform;
    }

    draw(i_fDeltaTime)
    {
        let $this = this;

        if($this.texture)
        {
            //Clear render target
            $this.graphicDevice.clear();

            //Set effect
            $this.graphicDevice.effect = $this.basicEffect;

            //Set texture
            $this.graphicDevice.bindTexture($this.texture);

            //Draw on render target
            $this.cube.draw();
        }
    }

    unload()
    {
        let $this = this;
    }
}