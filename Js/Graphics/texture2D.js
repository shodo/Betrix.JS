export default class
{
    constructor(i_oTextureData, i_oGraphicDevice)
    {
        const $this = this;
        const glContext = i_oGraphicDevice.oWebGLContext;
        
        $this.m_oTexture = glContext.createTexture();
        glContext.bindTexture(glContext.TEXTURE_2D, $this.m_oTexture);

        const level = 0;
        const internalFormat = glContext.RGBA;
        const border = 0;
        const srcFormat = glContext.RGBA;
        const srcType = glContext.UNSIGNED_BYTE;
        
        if(i_oTextureData.colorData)
        {
            glContext.texImage2D(glContext.TEXTURE_2D, level, internalFormat, i_oTextureData.width, i_oTextureData.height, border, srcFormat, srcType, i_oTextureData.colorData);
        }

        if(i_oTextureData.imageData)
        {
            glContext.texImage2D(glContext.TEXTURE_2D, level, internalFormat, srcFormat, srcType, i_oTextureData.imageData);
        }
              
        if ($this._isPowerOf2(i_oTextureData.width) && $this._isPowerOf2(i_oTextureData.height)) 
        {
            // Yes, it's a power of 2. Generate mips.
            glContext.generateMipmap(glContext.TEXTURE_2D);
            // glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.CLAMP_TO_EDGE);
            // glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.CLAMP_TO_EDGE);
            // glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MIN_FILTER, glContext.LINEAR);
        } 
        else 
        {
            throw "Only image with height and width power of 2 supported";
            // No, it's not a power of 2. Turn off mips and set
            // wrapping to clamp to edge
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }

        glContext.bindTexture(glContext.TEXTURE_2D, null);
    }   

    _isPowerOf2(value) {
        return (value & (value - 1)) == 0;
      }
}