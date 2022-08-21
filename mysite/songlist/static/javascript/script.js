
  var l = 0;
  var j=0;

//var i=0;

var arryx=[];
var arryy=[];


function double(){
  
  if(j==0){
    //console.log(j);
    j+=draw2();
     [l,arryx[0],arryy[0]] = drawfirst();
     [l,arryx[l-1], arryy[l-1]]=draw(l,arryx, arryy);
    // console.log(l, arryx[0],arryy[0]);
  }else{
    [l,arryx[l-1], arryy[l-1]]=draw(l,arryx, arryy);
  console.log(l, arryx[l-1],arryy[l-1]);
  }
  //console.log(j);
}

function drawfirst(){
  var x = Math.random()*700, y = 0; //ボールの初期位置
  var vy =0; //y軸方向の初期速度
  var R = 10; //ボールの半径
  var GRAVITY = 2; //重力
  var FRICTION = 0.75; //跳ね返り係数
  
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  
  function loop() {
      //ctx.clearRect(0 ,0, canvas.width, canvas.height); //キャンバス上の図形をクリアにする
      
      vy += GRAVITY; //重力による速度の変化
      y += vy; //ｙ座標を動かす
      
      if(y >canvas.height){ //地面に到達したら
          vy *= -1* FRICTION; //速度を反転し減速
          y = canvas.height;//-R; //座標を画面内に戻す
          if (Math.abs(vy) < GRAVITY) { //速度がある程度小さくなったら強制的に0にする
              vy = 0;
          }
      }
      
      //ctx.beginPath();
      // ctx.fillStyle = '#9d3757';
      // ctx.font = '50pt Arial';
      // ctx.fillText('いぬい',x,y-30, 150)

      // //ctx.beginPath();
      // ctx.fillStyle = '#9d3757';;
      // ctx.font = '50pt Arial';
      // ctx.fillText('どんどん', x+300, y-30, 150)
      

      //  ctx.fillStyle = '#9d3757';;
      //  ctx.font = '50pt Arial';
      //  ctx.fillText('すきになる', x+600, y-30, 150)
       requestAnimationFrame(loop);
  }
     
  loop();
  const temp=[1, x, y];
  return temp;
}




function draw(l, arryx, arryy){
  var x = Math.random()*1500, y = 0; //ボールの初期位置
  var vy =0; //y軸方向の初期速度
  var R = 10; //ボールの半径
  var GRAVITY = 2; //重力
  var FRICTION = 0.75; //跳ね返り係数
  
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  
  function loop() {
      //ctx.clearRect(0 ,0, canvas.width, canvas.height); //キャンバス上の図形をクリアにする
      
      vy += GRAVITY; //重力による速度の変化
      y += vy; //ｙ座標を動かす
    // let k=0;
    // let count=0;
    //   if(y > arryy[k] && Math.abs(x-arryx[k])< 20){
        
    //     k=k+1;
    //     count=k;
    //     console.log(count);
    //   }
    var count = 0;
    for(let i=1; i<l; i++){
      if(Math.abs(x-arryx[i])< 150){
        count++;
      }
    }
    // var modify=0;
    // for(let i=1; i<l-1; i++){
    //   for(let j=0; j<i; j++){
    //     if(Math.abs(x-arryx[i])< 10 &&  Math.abs(arryy[i]-arryy[j])<1){
    //       modify--;
    //       console.log(modify);
    //     }
    //   }
    // }
    

    if(count>0){
      if(y>canvas.height-55*(count-1)){
        vy *= -1* FRICTION; //速度を反転し減速
          y = canvas.height-55*(count-1);
         // console.log(l,x , arryx[l-1], Math.abs(x-arryx[l-1]));
          
          if (Math.abs(vy) < GRAVITY) { //速度がある程度小さくなったら強制的に0にする
            vy = 0;
            
        }
      }
    }else if(y >canvas.height){ //地面に到達したら
      vy *= -1* FRICTION; //速度を反転し減速
      y = canvas.height;//-R; //座標を画面内に戻す
     // console.log(y);
      if (Math.abs(vy) < GRAVITY) { //速度がある程度小さくなったら強制的に0にする
          vy = 0;
          //console.log(y);
      }
  }

      //   if(y > canvas.height-55*l && Math.abs(x-arryx[l-2])< 30){
      //     vy *= -1* FRICTION; //速度を反転し減速
      //     y = canvas.height-55*l;
      //    // console.log(l,x , arryx[l-1], Math.abs(x-arryx[l-1]));
          
      //     if (Math.abs(vy) < GRAVITY) { //速度がある程度小さくなったら強制的に0にする
      //       vy = 0;
            
      //   }
      //   }else if(y >canvas.height){ //地面に到達したら
      //     vy *= -1* FRICTION; //速度を反転し減速
      //     y = canvas.height;//-R; //座標を画面内に戻す
      //    // console.log(y);
      //     if (Math.abs(vy) < GRAVITY) { //速度がある程度小さくなったら強制的に0にする
      //         vy = 0;
      //         //console.log(y);
      //     }
      // }
      
      
      
      
      // ctx.beginPath();
      if(l%3==2){
        ctx.fillStyle = '#000000';
      ctx.font = '50pt Arial';
      ctx.fillText('いぬい',x,y-10, 150)
      }
      
      if(l%3==0){
        //ctx.beginPath();
      ctx.fillStyle = '#000000';;
      ctx.font = '50pt Arial';
      ctx.fillText('どんどん', x, y-10, 150)
      }
      
      
      if(l%3==1){
        ctx.fillStyle = '#000000';;
        ctx.font = '50pt Arial';
        ctx.fillText('すきになる', x, y-10, 150)
      }
      
       requestAnimationFrame(loop);
  }
     
  loop();
  l+=1;
  const temp=[l, x, y];
  return temp;
}


function draw2(){
  var x = 100, y = 0; //ボールの初期位置
  var vy =0; //y軸方向の初期速度
  var R = 10; //ボールの半径
  var GRAVITY = 2; //重力
  var FRICTION = 0.75; //跳ね返り係数
  
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  
  function loop() {
    
      ctx.clearRect(0 ,0, canvas.width, canvas.height); //キャンバス上の図形をクリアにする
    
      
      
      vy += GRAVITY; //重力による速度の変化
      y += vy; //ｙ座標を動かす
      
      if(y >canvas.height){ //地面に到達したら
          vy *= -1* FRICTION; //速度を反転し減速
          y = canvas.height;//-R; //座標を画面内に戻す
          if (Math.abs(vy) < GRAVITY) { //速度がある程度小さくなったら強制的に0にする
              vy = 0;
          }
      }
      
      // //ctx.beginPath();
      // ctx.fillStyle = '#9d3757';
      // ctx.font = '50pt Arial';
      // ctx.fillText('いぬい',x,y-10, 150)

      // //ctx.beginPath();
      // ctx.fillStyle = '#9d3757';;
      // ctx.font = '50pt Arial';
      // ctx.fillText('どんどん', x+300, y-10, 150)
      

      //  ctx.fillStyle = '#9d3757';;
      //  ctx.font = '50pt Arial';
      //  ctx.fillText('すきになる', x+600, y-10, 150)
       requestAnimationFrame(loop);
  }
     
  loop();
  i = 1;
  //console.log(i);
  return i;
}

// let button = document.getElementById('button');
// button.addEventListener('click', draw());

  // function changeColor(idname){
  //   var obj = document.getElementById(idname);
  //   obj.style.color = '#ffffff';            //文字色を白にする
  //   obj.style.backgroundColor = '#ff0000';  //背景色を赤にする
  // }