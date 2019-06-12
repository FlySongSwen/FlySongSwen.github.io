var dataObj = function () {
    this.score = 0;
    this.positionX = canWidth/10;
    this.positionY = canHeight/10;
    this.width = 120;
    this.height = 60;
}

dataObj.prototype.draw = function () {
    //画提前色
    ctx1.save();
    ctx1.fillStyle = ball.color[ballCount];
    ctx1.fillRect(this.positionX , this.positionY , this.width, this.height);

    //画分数
    //ctx1.shadowBlur = 20;
    //ctx1.shadowColor = "black";

    ctx1.fillStyle = "black";
    ctx1.font = "20px Verdana";
    ctx1.clearRect(this.positionX, this.positionY + this.height  , this.width, 30);
    ctx1.fillText("SCORE:  " + this.score,this.positionX , this.positionY + this.height * 1.5, this.width);

    ctx1.restore();
}