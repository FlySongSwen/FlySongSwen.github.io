var addMinusObj = function () {
    this.value = [];
    this.alive = [];
    this.x = [];
    this.y = [];
    this.vectorX = [];
    this.vectorY = [];
    this.alpha = [];
}

addMinusObj.prototype.num = 10;
addMinusObj.prototype.count = 0;
addMinusObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++){
        this.value[i] = 0;
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.vectorX[i] = 0;
        this.vectorY[i] = 0;
        this.alpha[i] =0.7;
    }
}

addMinusObj.prototype.draw = function () {
    for (var i = 0; i < this.num; i++){
        if (this.alpha[i] < 0){
            this.alpha[i] = 0.7;
            this.alive[i] = false;
        }
        if (this.alive[i] == true){
            this.alpha[i] -= deltaTime * 0.0006;
            this.x[i] += this.vectorX[i] * 0.3;
            this.x[i] += this.vectorY[i] * 0.3;
            ctx2.save();
            ctx2.font = "40px Verdana";

            ctx2.fillStyle = "rgba(0,0,0," + this.alpha[i] + ")";
            if (this.value[i] > 0)            //加法
                ctx2.fillText("+" + this.value[i],this.x[i] + 70* this.vectorX[i],this.y[i] + 70* this.vectorY[i],100);
            else                              //减法
                ctx2.fillText(this.value[i],this.x[i]+ 30* this.vectorX[i],this.y[i] + 30* this.vectorY[i],100);
            ctx2.restore();
            console.log("alive: " + this.count + "  vector: " + this.vectorX[this.count] + "," + this.vectorY[this.count]);
       }
    }
}