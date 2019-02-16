export default class
{
    static get Usages() 
    {
        return {
            POSITION: 0,
            COLOR:    1,   
            NORMAL:   2, 
            TEXTURE:  3      
        }
    }

    static get Types()
    {
        return {
            FLOAT32: 0       
        };
    }
    
    static get Packing()
    { 
        return {
            VECTOR2: 1,
            VECTOR3: 2,
            VECTOR4: 3,
            COLOR:   4
        }
    };
}