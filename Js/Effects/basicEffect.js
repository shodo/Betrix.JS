import { VertexPosition } from "../graphics"
import { VertexPositionColor } from "../graphics"
import { VertexPositionColorTexture } from "../graphics"
import { Matrix4 } from "../math"

export default class
{
    constructor(i_oGraphicDevice, i_oShaderCompiler, i_oShaderProgramBuilder)
    {
        let $this = this;

        $this.p_oGraphicDevice = i_oGraphicDevice;
        $this.p_oShaderCompiler = i_oShaderCompiler;
        $this.m_oShaderProgramBuilder = i_oShaderProgramBuilder;

        //Simple vertex shaders
        $this.p_oShaderProgram = undefined;
        
        //Color vertex shaders
        $this.p_oColorShaderProgram = undefined;
        
        //Color Texture vertex shaders
        $this.p_oColorTextureShaderProgram = undefined;
        
        //Texture vertex shaders
        $this.p_oTextureShaderProgram = undefined;
        
        //Current program
        $this.p_oCurrentShaderProgram = undefined;
        $this.p_eCurrentEffectState = $this.constructor.EffectStates.POSITION;
        
        $this.p_oWorldMatrix = undefined;
        $this.p_oViewMatrix = undefined;
        $this.p_oProjectionMatrix = undefined;
        $this.p_oWorldViewMatrix = new Matrix4();
        $this.p_oWorldViewMatrix.makeIdentity();
        
        $this.m_bColorEnabled = false;
        $this.m_bTextureEnabled = false;
    }

    init()
    {
        let $this = this;

        var oGLContext = $this.p_oGraphicDevice.oWebGLContext;
    
        //Creating vertex position shader
        $this.p_oShaderProgram = $this.m_oShaderProgramBuilder.buildProgram("shader-vs", "shader-fs");

        $this.p_oShaderProgram.m_oVertexLocation = oGLContext.getAttribLocation($this.p_oShaderProgram, "aVertexPosition");    
        $this.p_oShaderProgram.m_oProjectionMatrixLocation = oGLContext.getUniformLocation($this.p_oShaderProgram, "uPMatrix");
        $this.p_oShaderProgram.m_oModelViewMatrixLocation = oGLContext.getUniformLocation($this.p_oShaderProgram, "uMVMatrix");
        $this.p_oShaderProgram.m_oVertexDeclaration = VertexPosition.vertexDeclaration;
    
        //Creating vertex position color shader
        $this.p_oColorShaderProgram = $this.m_oShaderProgramBuilder.buildProgram("shader-vs-color", "shader-fs-color");

        $this.p_oColorShaderProgram.m_oVertexLocation = oGLContext.getAttribLocation($this.p_oColorShaderProgram, "aVertexPosition");    
        $this.p_oColorShaderProgram.m_oVertexColorLocation = oGLContext.getAttribLocation($this.p_oColorShaderProgram, "aVertexColor");
        $this.p_oColorShaderProgram.m_oProjectionMatrixLocation = oGLContext.getUniformLocation($this.p_oColorShaderProgram, "uPMatrix");
        $this.p_oColorShaderProgram.m_oModelViewMatrixLocation = oGLContext.getUniformLocation($this.p_oColorShaderProgram, "uMVMatrix");
        $this.p_oColorShaderProgram.m_oVertexDeclaration = VertexPositionColor.vertexDeclaration;

        //Creating vertex position color shader
        $this.p_oColorTextureShaderProgram = $this.m_oShaderProgramBuilder.buildProgram("shader-vs-color-texture", "shader-fs-color-texture");

        $this.p_oColorTextureShaderProgram.m_oVertexLocation = oGLContext.getAttribLocation($this.p_oColorTextureShaderProgram, "aVertexPosition");    
        $this.p_oColorTextureShaderProgram.m_oVertexColorLocation = oGLContext.getAttribLocation($this.p_oColorTextureShaderProgram, "aVertexColor");
        $this.p_oColorTextureShaderProgram.m_oVertexUVLocation = oGLContext.getAttribLocation($this.p_oColorTextureShaderProgram, "aVertexUV");
        $this.p_oColorTextureShaderProgram.m_oProjectionMatrixLocation = oGLContext.getUniformLocation($this.p_oColorTextureShaderProgram, "uPMatrix");
        $this.p_oColorTextureShaderProgram.m_oModelViewMatrixLocation = oGLContext.getUniformLocation($this.p_oColorTextureShaderProgram, "uMVMatrix");
        $this.p_oColorTextureShaderProgram.m_oSampler = oGLContext.getUniformLocation($this.p_oColorTextureShaderProgram, 'uSampler'),
        $this.p_oColorTextureShaderProgram.m_oVertexDeclaration = VertexPositionColorTexture.vertexDeclaration;
    
        $this._updateState();
    }

    begin(i_oVertexDeclaration)
    {   
        let $this = this;

        let oGLContext = this.p_oGraphicDevice.oWebGLContext;
        let oCurrentVertexDeclaration = i_oVertexDeclaration;
            
        $this.p_oWorldViewMatrix.makeIdentity();
        $this.p_oWorldViewMatrix.mult($this.p_oViewMatrix);
        $this.p_oWorldViewMatrix.mult($this.p_oWorldMatrix);

        oGLContext.enableVertexAttribArray($this.p_oCurrentShaderProgram.m_oVertexLocation);   
        oGLContext.vertexAttribPointer($this.p_oCurrentShaderProgram.m_oVertexLocation, 3, oGLContext.FLOAT, false, oCurrentVertexDeclaration.stride, 0);   
               
        if($this.m_bColorEnabled)
        {
            oGLContext.enableVertexAttribArray($this.p_oCurrentShaderProgram.m_oVertexColorLocation);  
            oGLContext.vertexAttribPointer($this.p_oCurrentShaderProgram.m_oVertexColorLocation, 4, oGLContext.FLOAT, false, oCurrentVertexDeclaration.stride, oCurrentVertexDeclaration.getElementSize(0));
        }

        if($this.m_bTextureEnabled)
        {
            oGLContext.enableVertexAttribArray($this.p_oCurrentShaderProgram.m_oVertexUVLocation);  
            oGLContext.vertexAttribPointer($this.p_oCurrentShaderProgram.m_oVertexUVLocation, 2, oGLContext.FLOAT, false, oCurrentVertexDeclaration.stride, oCurrentVertexDeclaration.getElementSize(1));
            oGLContext.uniform1i($this.p_oCurrentShaderProgram.m_oSampler, 0);
        }
        
        oGLContext.uniformMatrix4fv($this.p_oCurrentShaderProgram.m_oProjectionMatrixLocation, false, new Float32Array(this.p_oProjectionMatrix.array));
        oGLContext.uniformMatrix4fv($this.p_oCurrentShaderProgram.m_oModelViewMatrixLocation, false, new Float32Array(this.p_oWorldViewMatrix.array));
    }

    end()
    {
        //TODO
    };

    _updateState()
    {
        let $this = this;

        var oGLContext = $this.p_oGraphicDevice.oWebGLContext;
        
        if($this.m_bTextureEnabled && $this.m_bColorEnabled)
        {
            $this.p_eCurrentEffectState = $this.constructor.EffectStates.POSITION_COLOR_TEXTURE;
            $this.p_oCurrentShaderProgram = $this.p_oColorTextureShaderProgram;
        }
        else if(this.m_bTextureEnabled)
        {
            $this.p_eCurrentEffectState = $this.constructor.EffectStates.POSITION_TEXTURE;
            $this.p_oCurrentShaderProgram = $this.p_oTextureShaderProgram;
        }
        else if(this.m_bColorEnabled)
        {
            $this.p_eCurrentEffectState = $this.constructor.EffectStates.POSITION_COLOR;
            $this.p_oCurrentShaderProgram = $this.p_oColorShaderProgram;
        }
        else
        {
            $this.p_eCurrentEffectState = $this.constructor.EffectStates.POSITION;
            $this.p_oCurrentShaderProgram = $this.p_oShaderProgram;
        }
        
        oGLContext.useProgram($this.p_oCurrentShaderProgram);
    };

    set worldMatrix(i_oWorldMatrix) { this.p_oWorldMatrix = i_oWorldMatrix; }

    get worldMatrix() { return this.p_oWorldMatrix; }

    set viewMatrix(i_oViewMatrix) { this.p_oViewMatrix = i_oViewMatrix; }

    set projectionMatrix(i_oProjectionMatrix) { this.p_oProjectionMatrix = i_oProjectionMatrix; };

    set textureEnabled(i_bEnabled) 
    { 
        this.m_bTextureEnabled = i_bEnabled;
        this._updateState();
    };

    set colorEnabled(i_bEnabled)
    {
        this.m_bColorEnabled = i_bEnabled;
        this._updateState();
    };

    static get EffectStates()
    {
        return {
            POSITION : 0,
            POSITION_COLOR: 1,
            POSITION_TEXTURE: 2,
            POSITION_COLOR_TEXTURE: 3
        }
    }
}






