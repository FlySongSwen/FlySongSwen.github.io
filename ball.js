var ballObj = function () {
    this.alive = []; //bool
    this.x = [];
    this.y = [];
    this.ratio = [];
    this.color = [];
    this.vectorX = [];
    this.vectorY = [];
    this.ballTimer = 0;
    this.ballInterval = 10;
}

ballObj.prototype.num = 10;
ballObj.prototype.radius = 30;
ballObj.prototype.gravity = 0.3;

ballObj.prototype.init = function () {
    for (var i = 0;i < this.num;i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.ratio[i] = 15;
        this.vectorX[i] = 0;
        this.vectorY[i] = 0;
        this.color[i] = colors[Math.floor( Math.random() * 6.99)];
    }
    
}


ballObj.prototype.draw = function() {       
    this.upDateBalls();
    //console.log("(" + this.x[0] +"," + this.y[0] + ")");
    ctx2.clearRect(0,0,canWidth,canHeight);
    for (var i = 0; i < this.num ; i ++) {
        if (this.alive[i]) {
            
            ctx2.save();
            ctx2.fillStyle = this.color[i];
            
            ctx2.beginPath();
            ctx2.arc(this.x[i] , this.y[i] , this.radius , 0 , 2 * Math.PI, false);
            ctx2.closePath();
            ctx2.fill();
            ctx2.restore();
        }
    }
}

ballObj.prototype.upDateBalls = function () {
    
    this.ballTimer = this.ballTimer + deltaTime;
    if (this.ballTimer > this.ballInterval){
        for (var i = 0; i < this.num ; i ++) {
            
            if (this.alive[i]) { 
                    this.ratio[i] += this.gravity;
                    this.x[i] += this.vectorX[i] * this.ratio[i];
                    this.y[i] += this.vectorY[i] * this.ratio[i];
                } 
            }
        this.ballTimer %= this.ballInterval; 
    }      
}
