 
function collision () {
    for (var i = 0; i < ball.num ; i++){
        if (ball.alive[i]){
            if ( (ball.x[i] - Circle_X) * (ball.x[i] - Circle_X) + (ball.y[i] - Circle_Y) * (ball.y[i] - Circle_Y)
             < (RADIUS + ball.radius) * (RADIUS + ball.radius) )
                {
                    ball.vectorX[i] = - ball.vectorX[i];
                    ball.vectorY[i] = - ball.vectorY[i];
                    //计算小球碰撞的角度
                    var deltaX = ball.x[i] - Circle_X ;
                    var deltaY = -( ball.y[i] - Circle_Y );
                    var beta;
                    var countBlock;                        //计算砖块的位次

                    if (deltaY >= 0)
                        beta= 2 * Math.PI - Math.atan2( deltaY, deltaX) ;
                    else
                        beta= - Math.atan2( deltaY, deltaX)  ;
                    countBlock = Math.floor((beta + 2 * Math.PI - blocks.radian[0]) / ( 2 * Math.PI / 7)) % 7;//小球的碰撞的砖块
                    
                    //两种碰撞情况
                    addMinus.alive[addMinus.count] =true;
                    addMinus.x[addMinus.count] = ball.x[i];
                    addMinus.y[addMinus.count] = ball.y[i];
                    addMinus.vectorX[addMinus.count] = ball.vectorX[i];
                    addMinus.vectorY[addMinus.count] = ball.vectorY[i];
                    if ( ball.color[i] != colors[countBlock] ){//小球与砖块颜色不同
                        ball.color[i] = colors[countBlock];
                        addMinus.value[addMinus.count] = -5;  //减5分
                        data.score -= 5;
                    }
                    else {
                        ball.alive[i] = false;
                        addMinus.value[addMinus.count] =Math.abs( Math.ceil( blocks.speed * 100) );//加分
                        data.score += addMinus.value[addMinus.count]  ;
                    }
                    addMinus.count = (addMinus.count + 1) % addMinus.num;
                }
        }
    }
}

function killBall () {
    for (var i = 0; i < ball.num ; i++) {
        if (ball.alive[i] && (ball.x[i] < - 2 *ball.radius || ball.y[i] < -2 *ball.radius))
            ball.alive[i] = false;
    }
}

// console.log("deltaX:"  + deltaX +"  deltaY:"  + deltaY  )
// console.log(beta *  180/ Math.PI + "<br />");
// console.log("countBlock:" + countBlock );

// Math.pow((ball.x[i] - Circle_X) , 2) + Math.pow((ball.y[i] - Circle_Y) , 2) 
//                 < Math.pow( (RADIUS + ball.radius), 2)
