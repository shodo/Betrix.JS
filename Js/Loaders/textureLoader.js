import { Texture2D, Color } from "../graphics"

export default class
{
    constructor(i_oGraphicDevice)
    {
        let $this = this;

        if(!i_oGraphicDevice) throw "i_oGraphicDevice cannot be null";

        $this.m_oGraphicDevice = i_oGraphicDevice;
    }

    loadFromImageUrl(textureUrl, successCallback, errorCallback)
    {
        let $this = this;

        if(!textureUrl) throw "textureUrl cannot be null";
        if(!successCallback) throw "successCallback cannot be null"
        if(!errorCallback) throw "errorCallback cannot be null"
        
        let image = new Image();
        
        image.onload = () =>  
        {
            successCallback(new Texture2D({ width: image.width, height: image.height, imageData : image }, $this.m_oGraphicDevice));
        };

        image.onerror = errorCallback
        image.crossOrigin = "";
        image.src = textureUrl;
    }
}