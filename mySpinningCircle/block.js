var blockObj = function () {
    this.radian = [];         //每一个区块的弧度数
    this.color = [];          //每一个区块的颜色
    this.blockTimer = 0;
    this.blockInterval = 60;
    this.speedTimer = 0;
    this.speedSuspend = 3000;
    this.flag = 0;
}

blockObj.prototype.num = 7;
blockObj.prototype.speed = 0.4;
blockObj.prototype.acceleration = 0.007;
blockObj.prototype.init = function () {
    this.radian[0] = Math.random() * 2 * Math.PI /7;
    this.color[0] = colors[0];
    for (var i = 1; i < this.num ; i++ ){           //初始化点的位置
        this.radian[i] = this.radian[i-1] + 2*Math.PI /7;
        this.color[i] = colors[i]; 
    }
}

blockObj.prototype.draw = function() {
    //ctx1.lineWidth = 2;
    //ctx1.strokeStyle = "#000000";
    this.updateBlocks();
    for (var i = 0; i < 7 ;i++ ){
        ctx1.save();
        ctx1.fillStyle = this.color[i];        
        ctx1.beginPath();
        ctx1.moveTo(Circle_X,Circle_Y);
        ctx1.lineTo( Circle_X + RADIUS * Math.cos(this.radian[i]), Circle_Y + RADIUS * Math.sin(this.radian[i]) );           
        ctx1.arc(Circle_X,Circle_Y,RADIUS,this.radian[i],this.radian[(i+1)%7],false);
        ctx1.moveTo(Circle_X,Circle_Y);
        ctx1.closePath();
        //ctx1.stroke();
        ctx1.fill();
        ctx1.restore();
    }    
}

blockObj.prototype.updateBlocks = function () {

    this.blockTimer = this.blockTimer + deltaTime; 
    if (this.blockTimer > this.blockInterval ){
        //改变速度
        if (this.speed > 0.45 || this.speed < - 0.45){
            this.acceleration = - this.acceleration ;            
        }                                               //反向

        if (this.speed > -0.33 && this.speed < 0.33){   //保持一段时间
            if (this.flag == 0){
                this.speedSuspend = 200 + 600 *Math.random();
                this.flag = 1;
            }           //确定转盘停滞时间
            else {
                this.speedTimer += deltaTime;
            }
            if (this.speedTimer > this.speedSuspend){
                this.speed += this.acceleration * 0.5 ;
            }
        }else {
            this.speed +=  this.acceleration;
            this.speedTimer = 0;
            this.flag = 0;
        }

        for (var i = 0 ;i < 7; i++) {
            this.radian[i] += this.speed;
            if(this.radian[i] > 2 * Math.PI) {
                this.radian[i]  -= 2 * Math.PI;
            }
        }
        this.blockTimer %= this.blockInterval;           
    }
}

function suspend() {
    this.speedTimer = 3000 + 3000 * Math.random()
}