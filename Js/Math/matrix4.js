export default class
{
    constructor(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33)
    {
        let $this = this;

        if(a00 === undefined) a00 = 0;
        if(a01 === undefined) a01 = 0;
        if(a02 === undefined) a02 = 0;
        if(a03 === undefined) a03 = 0;
        if(a10 === undefined) a10 = 0;
        if(a11 === undefined) a11 = 0;
        if(a12 === undefined) a12 = 0;
        if(a13 === undefined) a13 = 0;
        if(a20 === undefined) a20 = 0;
        if(a21 === undefined) a21 = 0;
        if(a22 === undefined) a22 = 0;
        if(a23 === undefined) a23 = 0;
        if(a30 === undefined) a30 = 0;
        if(a31 === undefined) a31 = 0;
        if(a32 === undefined) a32 = 0;
        if(a33 === undefined) a33 = 0;

        $this.p_oRawPlainArray = new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT * 16);
        $this.p_afPlainArrayView = new Float32Array($this.p_oRawPlainArray);
        
        //first column
        $this.p_afPlainArrayView[0]  = a00;
        $this.p_afPlainArrayView[1]  = a10;
        $this.p_afPlainArrayView[2]  = a20;
        $this.p_afPlainArrayView[3]  = a30;
        
        //second column
        $this.p_afPlainArrayView[4]  = a01;
        $this.p_afPlainArrayView[5]  = a11;
        $this.p_afPlainArrayView[6]  = a21;
        $this.p_afPlainArrayView[7]  = a31;
        
        //third column
        $this.p_afPlainArrayView[8]  = a02;
        $this.p_afPlainArrayView[9]  = a12;
        $this.p_afPlainArrayView[10] = a22;
        $this.p_afPlainArrayView[11] = a32;
        
        //fourth column
        $this.p_afPlainArrayView[12] = a03;
        $this.p_afPlainArrayView[13] = a13;
        $this.p_afPlainArrayView[14] = a23;
        $this.p_afPlainArrayView[15] = a33;
    }

    get x() { return this.p_afPlainArrayView[0]; }
    get y() { return this.p_afPlainArrayView[1]; }
    get z() { return this.p_afPlainArrayView[2]; }

    get array() { return this.p_oRawPlainArray; };
    get byteArray() { return new Uint8Array(this.p_oRawPlainArray); }

    makeIdentity()
    {
        let $this = this;

        //first column
        $this.p_afPlainArrayView[0]  = 1;
        $this.p_afPlainArrayView[1]  = 0;
        $this.p_afPlainArrayView[2]  = 0;
        $this.p_afPlainArrayView[3]  = 0;
        
        //second column
        $this.p_afPlainArrayView[4]  = 0;
        $this.p_afPlainArrayView[5]  = 1;
        $this.p_afPlainArrayView[6]  = 0;
        $this.p_afPlainArrayView[7]  = 0;
        
        //third column
        $this.p_afPlainArrayView[8]  = 0;
        $this.p_afPlainArrayView[9]  = 0;
        $this.p_afPlainArrayView[10] = 1;
        $this.p_afPlainArrayView[11] = 0;
        
        //fourth column
        $this.p_afPlainArrayView[12] = 0;
        $this.p_afPlainArrayView[13] = 0;
        $this.p_afPlainArrayView[14] = 0;
        $this.p_afPlainArrayView[15] = 1;

        return $this;
    }

    makeProjection(i_fFieldOfView, i_fAspectRatio, i_fNearPlane, i_fFarPlane)
    {
        let $this = this;

         //In GL -> vertical FOV = horizontal FOV.
        //i_fFieldOfView * Math.PI / 180 -> deg to rad conversion. 
        //I'm using 360 instead, to divide the angle by 2.
        let fTop = Math.tan(i_fFieldOfView * Math.PI / 360) * i_fNearPlane;
        let fBottom = -fTop;
        let fRight = fTop * i_fAspectRatio;
        let fLeft = -fRight;
        
        $this.p_afPlainArrayView[0]  = (2 * i_fNearPlane) / (fRight - fLeft);
        $this.p_afPlainArrayView[1]  = 0;
        $this.p_afPlainArrayView[2]  = 0;
        $this.p_afPlainArrayView[3]  = 0;
        
        $this.p_afPlainArrayView[4]  = 0;
        $this.p_afPlainArrayView[5]  = (2 * i_fNearPlane) / (fTop - fBottom);
        $this.p_afPlainArrayView[6]  = 0;
        $this.p_afPlainArrayView[7]  = 0;
        
        $this.p_afPlainArrayView[8]  = (fRight + fLeft) / (fRight - fLeft);
        $this.p_afPlainArrayView[9]  = (fTop + fBottom) / (fTop - fBottom);
        $this.p_afPlainArrayView[10] = -((i_fFarPlane + i_fNearPlane) / (i_fFarPlane - i_fNearPlane));
        $this.p_afPlainArrayView[11] = -1;
        
        $this.p_afPlainArrayView[12]  = 0;
        $this.p_afPlainArrayView[13]  = 0;
        $this.p_afPlainArrayView[14] = -((2 * i_fFarPlane * i_fNearPlane) / (i_fFarPlane - i_fNearPlane));
        $this.p_afPlainArrayView[15] = 0;

        return $this;
    }

    makeRotationX(i_fAngleRad)
    {
        let $this = this;
        
        //first column
        $this.p_afPlainArrayView[0]  = 1;
        $this.p_afPlainArrayView[1]  = 0;
        $this.p_afPlainArrayView[2]  = 0;
        $this.p_afPlainArrayView[3]  = 0;
        
        //second column
        $this.p_afPlainArrayView[4]  = 0;
        $this.p_afPlainArrayView[5]  =  Math.cos(i_fAngleRad);
        $this.p_afPlainArrayView[6]  =  Math.sin(i_fAngleRad);
        $this.p_afPlainArrayView[7]  = 0;
        
        //third column
        $this.p_afPlainArrayView[8]  = 0;
        $this.p_afPlainArrayView[9]  = -Math.sin(i_fAngleRad);
        $this.p_afPlainArrayView[10] =  Math.cos(i_fAngleRad);
        $this.p_afPlainArrayView[11] = 0;
        
        //fourth column
        $this.p_afPlainArrayView[12] = 0;
        $this.p_afPlainArrayView[13] = 0;
        $this.p_afPlainArrayView[14] = 0;
        $this.p_afPlainArrayView[15] = 1;

        return $this;
    };

    makeRotationY(i_fAngleRad)
    {
        let $this = this;
        
        //first column
        $this.p_afPlainArrayView[0]  =  Math.cos(i_fAngleRad);
        $this.p_afPlainArrayView[1]  = 0;
        $this.p_afPlainArrayView[2]  = -Math.sin(i_fAngleRad);
        $this.p_afPlainArrayView[3]  = 0;
        
        //second column
        $this.p_afPlainArrayView[4]  = 0;
        $this.p_afPlainArrayView[5]  = 1;
        $this.p_afPlainArrayView[6]  = 0;
        $this.p_afPlainArrayView[7]  = 0;
        
        //third column
        $this.p_afPlainArrayView[8]  =  Math.sin(i_fAngleRad);
        $this.p_afPlainArrayView[9]  = 0;
        $this.p_afPlainArrayView[10] =  Math.cos(i_fAngleRad);
        $this.p_afPlainArrayView[11] = 0;
        
        //fourth column
        $this.p_afPlainArrayView[12] = 0;
        $this.p_afPlainArrayView[13] = 0;
        $this.p_afPlainArrayView[14] = 0;
        $this.p_afPlainArrayView[15] = 1;

        return $this;
    };

    makeRotationZ(i_fAngleRad)
    {
        let $this = this;

        //first column
        $this.p_afPlainArrayView[0] =  Math.cos(i_fAngleRad);
        $this.p_afPlainArrayView[1] =  Math.sin(i_fAngleRad);
        $this.p_afPlainArrayView[2]  = 0;
        $this.p_afPlainArrayView[3]  = 0;
        
        //second column
        $this.p_afPlainArrayView[4] =  -Math.sin(i_fAngleRad);
        $this.p_afPlainArrayView[5] =  Math.cos(i_fAngleRad);
        $this.p_afPlainArrayView[6]  = 0;
        $this.p_afPlainArrayView[7]  = 0;
        
        //third column
        $this.p_afPlainArrayView[8]  = 0;
        $this.p_afPlainArrayView[9]  = 0;
        $this.p_afPlainArrayView[10] = 1;
        $this.p_afPlainArrayView[11] = 0;
        
        //fourth column
        $this.p_afPlainArrayView[12] = 0;
        $this.p_afPlainArrayView[13] = 0;
        $this.p_afPlainArrayView[14] = 0;
        $this.p_afPlainArrayView[15] = 1;

        return $this;
    };

    setTranslation(i_fX, i_fY, i_fZ)
    {
        let $this = this;

        if(i_fX === undefined) i_fX = $this.p_afPlainArrayView[12];
        if(i_fY === undefined) i_fY = $this.p_afPlainArrayView[13];
        if(i_fZ === undefined) i_fZ = $this.p_afPlainArrayView[14];
                
        $this.p_afPlainArrayView[12] = i_fX;
        $this.p_afPlainArrayView[13] = i_fY;
        $this.p_afPlainArrayView[14] = i_fZ;

        return $this;
    }

    mult(i_oMatrix)
    {
        let $this = this;

        let oLeftArray = $this.p_afPlainArrayView;
        let oRightArray = i_oMatrix.p_afPlainArrayView;
        let oTempArray = new Float32Array(16);
    
        oTempArray[0]  = oLeftArray[0] * oRightArray[0]  + oLeftArray[4] * oRightArray[1]   + oLeftArray[8]   * oRightArray[2]   + oLeftArray[12] * oRightArray[3];
        oTempArray[1]  = oLeftArray[1] * oRightArray[0]  + oLeftArray[5] * oRightArray[1]   + oLeftArray[9]   * oRightArray[2]   + oLeftArray[13] * oRightArray[3];
        oTempArray[2]  = oLeftArray[2] * oRightArray[0]  + oLeftArray[6] * oRightArray[1]   + oLeftArray[10]  * oRightArray[2]   + oLeftArray[14] * oRightArray[3];
        oTempArray[3]  = oLeftArray[3] * oRightArray[0]  + oLeftArray[7] * oRightArray[1]   + oLeftArray[11]  * oRightArray[2]   + oLeftArray[15] * oRightArray[3];
        
        oTempArray[4]  = oLeftArray[0] * oRightArray[4]  + oLeftArray[4] * oRightArray[5]   + oLeftArray[8]   * oRightArray[6]   + oLeftArray[12] * oRightArray[7];
        oTempArray[5]  = oLeftArray[1] * oRightArray[4]  + oLeftArray[5] * oRightArray[5]   + oLeftArray[9]   * oRightArray[6]   + oLeftArray[13] * oRightArray[7];
        oTempArray[6]  = oLeftArray[2] * oRightArray[4]  + oLeftArray[6] * oRightArray[5]   + oLeftArray[10]  * oRightArray[6]   + oLeftArray[14] * oRightArray[7];
        oTempArray[7]  = oLeftArray[3] * oRightArray[4]  + oLeftArray[7] * oRightArray[5]   + oLeftArray[11]  * oRightArray[6]   + oLeftArray[15] * oRightArray[7];
        
        oTempArray[8]  = oLeftArray[0] * oRightArray[8]  + oLeftArray[4] * oRightArray[9]   + oLeftArray[8]   * oRightArray[10]  + oLeftArray[12] * oRightArray[11];
        oTempArray[9]  = oLeftArray[1] * oRightArray[8]  + oLeftArray[5] * oRightArray[9]   + oLeftArray[9]   * oRightArray[10]  + oLeftArray[13] * oRightArray[11];
        oTempArray[10] = oLeftArray[2] * oRightArray[8]  + oLeftArray[6] * oRightArray[9]   + oLeftArray[10]  * oRightArray[10]  + oLeftArray[14] * oRightArray[11];
        oTempArray[11] = oLeftArray[3] * oRightArray[8]  + oLeftArray[7] * oRightArray[9]   + oLeftArray[11]  * oRightArray[10]  + oLeftArray[15] * oRightArray[11];
        
        oTempArray[12] = oLeftArray[0] * oRightArray[12] + oLeftArray[4] * oRightArray[13]  + oLeftArray[8]   * oRightArray[14]  + oLeftArray[12] * oRightArray[15];
        oTempArray[13] = oLeftArray[1] * oRightArray[12] + oLeftArray[5] * oRightArray[13]  + oLeftArray[9]   * oRightArray[14]  + oLeftArray[13] * oRightArray[15];
        oTempArray[14] = oLeftArray[2] * oRightArray[12] + oLeftArray[6] * oRightArray[13]  + oLeftArray[10]  * oRightArray[14]  + oLeftArray[14] * oRightArray[15];
        oTempArray[15] = oLeftArray[3] * oRightArray[12] + oLeftArray[7] * oRightArray[13]  + oLeftArray[11]  * oRightArray[14]  + oLeftArray[15] * oRightArray[15];
        
        $this.p_afPlainArrayView[0] = oTempArray[0];
        $this.p_afPlainArrayView[1] = oTempArray[1];
        $this.p_afPlainArrayView[2] = oTempArray[2];
        $this.p_afPlainArrayView[3] = oTempArray[3];
        $this.p_afPlainArrayView[4] = oTempArray[4];
        $this.p_afPlainArrayView[5] = oTempArray[5];
        $this.p_afPlainArrayView[6] = oTempArray[6];
        $this.p_afPlainArrayView[7] = oTempArray[7];
        $this.p_afPlainArrayView[8] = oTempArray[8];
        $this.p_afPlainArrayView[9] = oTempArray[9];
        $this.p_afPlainArrayView[10] = oTempArray[10];
        $this.p_afPlainArrayView[11] = oTempArray[11];
        $this.p_afPlainArrayView[12] = oTempArray[12];
        $this.p_afPlainArrayView[13] = oTempArray[13];
        $this.p_afPlainArrayView[14] = oTempArray[14];
        $this.p_afPlainArrayView[15] = oTempArray[15];   

        return $this;
    };
}