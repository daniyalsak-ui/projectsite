/* Starfield + meteors ---------- */
(function(){
  var c=document.getElementById('sky'),x=c.getContext('2d'),W,H,stars=[],meteors=[],mx=0,my=0,tx=0,ty=0;
  var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size(){
    var d=Math.min(devicePixelRatio||1,2);W=c.clientWidth;H=c.clientHeight;c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0);
    var n=Math.round(W*H/2800);stars=[];
    for(var i=0;i<n;i++)stars.push({x:Math.random()*W,y:Math.random()*H*.85,r:Math.random()*1.3+.2,z:Math.random()*.9+.1,p:Math.random()*6.28,s:Math.random()*1.5+.5,t:Math.random()<.18?'#f0c79a':Math.random()<.3?'#a9c4ff':'#ffffff'});
  }
  addEventListener('resize',size);size();
  addEventListener('pointermove',function(e){tx=(e.clientX/innerWidth-.5);ty=(e.clientY/innerHeight-.5)});
  function meteor(){var sx=Math.random()*W*.8+W*.1;meteors.push({x:sx,y:Math.random()*H*.35,vx:-7-Math.random()*5,vy:3.5+Math.random()*3,l:1})}
  var next=2200;
  function frame(t){
    mx+=(tx-mx)*.05;my+=(ty-my)*.05;
    x.clearRect(0,0,W,H);
    for(var i=0;i<stars.length;i++){
      var s=stars[i],a=calm?.8:.45+.55*Math.sin(t/1000*s.s+s.p);
      x.globalAlpha=Math.max(.1,a);x.fillStyle=s.t;
      x.beginPath();x.arc(s.x-mx*40*s.z,s.y-my*24*s.z,s.r,0,6.283);x.fill();
    }
    if(!calm){
      if(t>next){meteor();next=t+2500+Math.random()*4500}
      for(var j=meteors.length-1;j>=0;j--){
        var m=meteors[j];m.x+=m.vx;m.y+=m.vy;m.l-=.014;
        var g=x.createLinearGradient(m.x,m.y,m.x-m.vx*9,m.y-m.vy*9);
        g.addColorStop(0,'rgba(255,245,230,'+Math.max(m.l,0)+')');g.addColorStop(1,'rgba(255,245,230,0)');
        x.globalAlpha=1;x.strokeStyle=g;x.lineWidth=1.8;x.beginPath();x.moveTo(m.x,m.y);x.lineTo(m.x-m.vx*9,m.y-m.vy*9);x.stroke();
        if(m.l<=0)meteors.splice(j,1);
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
