import { VertexPosition } from "../graphics"
import { VertexPositionColor } from "../graphics"
import { Matrix4 } from "../math"

export default class
{
    constructor(i_oGraphicDevice, i_oShaderCompiler)
    {
        let $this = this;

        $this.p_oGraphicDevice = i_oGraphicDevice;
        $this.p_oShaderCompiler = i_oShaderCompiler;
              
        //Simple vertex shaders
        $this.p_oVertexShader = undefined;
        $this.p_oFragmentShader = undefined;
        $this.p_oShaderProgram = undefined;
        
        //Color vertex shaders
        $this.p_oColorVertexShader = undefined;
        $this.p_oColorFragmentShader = undefined;
        $this.p_oColorShaderProgram = undefined;
        
        //Color Texture vertex shaders
        $this.p_oColorTextureVertexShader = undefined;
        $this.p_oColorTextureFragmentShader = undefined;
        $this.p_oColorTextureShaderProgram = undefined;
        
        //Texture vertex shaders
        $this.p_oTextureVertexShader = undefined;
        $this.p_oTextureFragmentShader = undefined;
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
        $this.p_oVertexShader = $this.p_oShaderCompiler.compile("shader-vs");
        $this.p_oFragmentShader = $this.p_oShaderCompiler.compile("shader-fs");
   
        $this.p_oShaderProgram = oGLContext.createProgram();
    
        oGLContext.attachShader($this.p_oShaderProgram, $this.p_oVertexShader);
        oGLContext.attachShader($this.p_oShaderProgram, $this.p_oFragmentShader);
        oGLContext.linkProgram($this.p_oShaderProgram);

        if(!oGLContext.getProgramParameter($this.p_oShaderProgram, oGLContext.LINK_STATUS)) 
        {
            alert("Could not initialise shaders");
        }
    
        $this.p_oShaderProgram.m_oVertexLocation = oGLContext.getAttribLocation($this.p_oShaderProgram, "aVertexPosition");    
        $this.p_oShaderProgram.m_oProjectionMatrixLocation = oGLContext.getUniformLocation($this.p_oShaderProgram, "uPMatrix");
        $this.p_oShaderProgram.m_oModelViewMatrixLocation = oGLContext.getUniformLocation($this.p_oShaderProgram, "uMVMatrix");
        $this.p_oShaderProgram.m_oVertexDeclaration = VertexPosition.vertexDeclaration;
    
        //Creating vertex position color shader
        $this.p_oColorVertexShader = $this.p_oShaderCompiler.compile("shader-vs-color");
        $this.p_oColorFragmentShader = $this.p_oShaderCompiler.compile("shader-fs-color");
    
        $this.p_oColorShaderProgram = oGLContext.createProgram();
    
        oGLContext.attachShader($this.p_oColorShaderProgram, $this.p_oColorVertexShader);
        oGLContext.attachShader($this.p_oColorShaderProgram, $this.p_oColorFragmentShader);
        oGLContext.linkProgram($this.p_oColorShaderProgram);
        if(!oGLContext.getProgramParameter($this.p_oColorShaderProgram, oGLContext.LINK_STATUS)) 
        {
            alert("Could not initialise shaders");
        }
    
        $this.p_oColorShaderProgram.m_oVertexLocation = oGLContext.getAttribLocation($this.p_oColorShaderProgram, "aVertexPosition");    
        $this.p_oColorShaderProgram.m_oVertexColorLocation = oGLContext.getAttribLocation($this.p_oColorShaderProgram, "aVertexColor");
        $this.p_oColorShaderProgram.m_oProjectionMatrixLocation = oGLContext.getUniformLocation($this.p_oColorShaderProgram, "uPMatrix");
        $this.p_oColorShaderProgram.m_oModelViewMatrixLocation = oGLContext.getUniformLocation($this.p_oColorShaderProgram, "uMVMatrix");
        $this.p_oColorShaderProgram.m_oVertexDeclaration = VertexPositionColor.vertexDeclaration;
    
        $this._updateState();
    }

    begin()
    {   
        let $this = this;

        let oGLContext = this.p_oGraphicDevice.oWebGLContext;
        let oCurrentVertexDeclaration = this.p_oCurrentShaderProgram.m_oVertexDeclaration;
            
        $this.p_oWorldViewMatrix.makeIdentity();
        $this.p_oWorldViewMatrix.mult(this.p_oViewMatrix);
        $this.p_oWorldViewMatrix.mult(this.p_oWorldMatrix);

        oGLContext.enableVertexAttribArray(this.p_oCurrentShaderProgram.m_oVertexLocation);   
        oGLContext.vertexAttribPointer(this.p_oCurrentShaderProgram.m_oVertexLocation, 3, oGLContext.FLOAT, false, oCurrentVertexDeclaration.stride, 0);   
        
        if(this.m_bTextureEnabled)
        {
            
        }
        
        if(this.m_bColorEnabled)
        {
            oGLContext.enableVertexAttribArray(this.p_oCurrentShaderProgram.m_oVertexColorLocation);  
            oGLContext.vertexAttribPointer(this.p_oCurrentShaderProgram.m_oVertexColorLocation, 4, oGLContext.FLOAT, false, oCurrentVertexDeclaration.stride, oCurrentVertexDeclaration.getElementSize(0));
        }
        
        oGLContext.uniformMatrix4fv(this.p_oCurrentShaderProgram.m_oProjectionMatrixLocation, false, new Float32Array(this.p_oProjectionMatrix.array));
        oGLContext.uniformMatrix4fv(this.p_oCurrentShaderProgram.m_oModelViewMatrixLocation, false, new Float32Array(this.p_oWorldViewMatrix.array));
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
            $this.p_oCurrentShaderProgram = $this.p_oTextureColorShaderProgram;
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






