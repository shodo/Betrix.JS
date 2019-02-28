import { Texture2D, Color } from "../graphics"

export default class
{
    constructor(i_oGraphicDevice)
    {
        let $this = this;

        if(!i_oGraphicDevice) throw "i_oGraphicDevice cannot be null";

        $this.m_oGraphicDevice = i_oGraphicDevice;
    }

    LoadFromUrl(textureUrl)
    {
        let $this = this;
        
        return new Texture2D({ width : 4, height: 1, colorData : new Uint8Array(Color.BLUE.unsignedByteFormat.concat(Color.BLUE.unsignedByteFormat).concat(Color.YELLOW.unsignedByteFormat).concat(Color.YELLOW.unsignedByteFormat))}, $this.m_oGraphicDevice);
    }
}