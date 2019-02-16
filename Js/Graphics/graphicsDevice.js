import DrawModes from "./drawModes";

export default class
{
    constructor()
    {
        let $this = this;

        $this.oWebGLContext = undefined;
    }

    init(i_oWebGLContext)
    {
        let $this = this;
        $this.oWebGLContext = i_oWebGLContext;

        $this.oWebGLContext.enable($this.oWebGLContext.CULL_FACE);
        $this.oWebGLContext.cullFace($this.oWebGLContext.BACK);
    }

    clear()
    {
        let $this = this;

        $this.oWebGLContext.viewport(0, 0, $this.oWebGLContext.viewportWidth, $this.oWebGLContext.viewportHeight);
        $this.oWebGLContext.clear($this.oWebGLContext.COLOR_BUFFER_BIT | $this.oWebGLContext.DEPTH_BUFFER_BIT);
    };

    draw(i_oVertex, i_eDrawMode, i_uiOffsetIndex, i_uiNumElements)
    {
        let $this = this;

        let eDrawMode = getGLDrawMode(i_eDrawMode);
       
        $this.oWebGLContext.bindBuffer($this.oWebGLContext.ARRAY_BUFFER, i_oVertex.p_oInnerVertexBuffer);

        $this.m_oEffect.begin();
        $this.oWebGLContext.drawArrays(eDrawMode, i_uiOffsetIndex, i_uiNumElements);
        $this.m_oEffect.end();
    }

    drawIndexed(i_oVertex, i_oIndex, i_eDrawMode, i_uiOffsetIndex, i_uiNumElements)
    {
        let $this = this;

        let eDrawMode = $this.getGLDrawMode(i_eDrawMode);
       
        $this.oWebGLContext.bindBuffer($this.oWebGLContext.ARRAY_BUFFER, i_oVertex.p_oInnerVertexBuffer);
        $this.oWebGLContext.bindBuffer($this.oWebGLContext.ELEMENT_ARRAY_BUFFER, i_oIndex.innerIndexBuffer);

        $this.m_oEffect.begin();
        $this.oWebGLContext.drawElements(eDrawMode, i_uiNumElements, $this.oWebGLContext.UNSIGNED_SHORT, i_uiOffsetIndex * 2);
        $this.m_oEffect.end();
    }

    getGLDrawMode(i_eDrawMode)
    {
        let $this = this;
        let eDrawMode = undefined;
        switch(i_eDrawMode)
        {
            case DrawModes.LINES:
                eDrawMode = $this.oWebGLContext.LINES;
                break;
                
            case DrawModes.LINE_LOOP:
                eDrawMode = $this.oWebGLContext.LINE_LOOP;
                break;
                
            case DrawModes.LINE_STRIP:
                eDrawMode = $this.oWebGLContext.LINE_STRIP;
                break;
                
            case DrawModes.POINTS:
                eDrawMode = $this.oWebGLContext.POINTS;
                break;
                
            case DrawModes.TRIANGLES:
                eDrawMode = $this.oWebGLContext.TRIANGLES;
                break;
                
            case DrawModes.TRIANGLE_STRIP:
                eDrawMode = $this.oWebGLContext.TRIANGLE_STRIP;
            break;
    
            case DrawModes.TRIANGLE_FAN:
                eDrawMode = $this.oWebGLContext.TRIANGLE_FAN;
                break;
        }

        return eDrawMode;
    }

    set effect(i_oEffect) { this.m_oEffect = i_oEffect; }
    get aspectRatio() { return this.oWebGLContext.viewportWidth / this.oWebGLContext.viewportHeight; }
    set clearColor(i_oClearColor)  { this.oWebGLContext.clearColor(i_oClearColor.r, i_oClearColor.g, i_oClearColor.b, i_oClearColor.a); }
}