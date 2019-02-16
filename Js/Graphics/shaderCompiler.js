export default class
{
    constructor(i_oWebGLContext)
    {
        
    }

    init(i_oWebGLContext)
    {
        let $this = this;
        $this.oWebGLContext = i_oWebGLContext;
    }

    compile(i_sShaderId)
    {
        let $this = this;

        let oShaderScript = document.getElementById(i_sShaderId);
        if(oShaderScript)
        {
            let oShaderSource = "";
            let oShaderNode = oShaderScript.firstChild;
            while(oShaderNode)
            {
                if(oShaderNode.nodeType === 3)
                {
                    oShaderSource += oShaderNode.textContent;
                }
                oShaderNode = oShaderNode.nextSibling;
            }
        
            let oCompiledShader = null;
            if(oShaderScript.type === "x-shader/x-fragment")
            {
                oCompiledShader = $this.oWebGLContext.createShader($this.oWebGLContext.FRAGMENT_SHADER);
            }
            else if(oShaderScript.type === "x-shader/x-vertex")
            {
                oCompiledShader = $this.oWebGLContext.createShader($this.oWebGLContext.VERTEX_SHADER);
            }
        
            $this.oWebGLContext.shaderSource(oCompiledShader, oShaderSource);
            $this.oWebGLContext.compileShader(oCompiledShader);
            if(!$this.oWebGLContext.getShaderParameter(oCompiledShader, $this.oWebGLContext.COMPILE_STATUS))
            {
                alert($this.oWebGLContext.getShaderInfoLog(oCompiledShader));
            }
            
            return oCompiledShader;
        }
    }
}