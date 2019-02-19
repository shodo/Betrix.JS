export default class
{
    constructor(i_oShaderCompiler, i_oGLContext)
    {
        let $this = this;

        $this.m_oShaderCompiler = i_oShaderCompiler;
        $this.m_oGLContext = i_oGLContext;
    }

    buildProgram(i_sVertexShaderId, i_sFragmentShaderId)
    {
        let $this = this;

        let oVertexShader = $this.m_oShaderCompiler.compile(i_sVertexShaderId);
        let oFragmentShader = $this.m_oShaderCompiler.compile(i_sFragmentShaderId);
   
        let oShaderProgram = $this.m_oGLContext.createProgram();
    
        $this.m_oGLContext.attachShader(oShaderProgram, oVertexShader);
        $this.m_oGLContext.attachShader(oShaderProgram, oFragmentShader);
        $this.m_oGLContext.linkProgram(oShaderProgram);

        if(!$this.m_oGLContext.getProgramParameter(oShaderProgram, $this.m_oGLContext.LINK_STATUS)) 
        {
            alert("Could not initialise shaders");
        }

        return oShaderProgram;
    }
}