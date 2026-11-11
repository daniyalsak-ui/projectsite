/* Moon phases ---------- */
(function(){
  var c=document.getElementById('moon'),x=c.getContext('2d'),R=300,C=320;
  var names=[[0,'Новолуние','Небо самое тёмное. Лучшее время для Млечного Пути и далёких галактик.'],
    [6,'Растущий серп','Тонкий серп виден сразу после заката и быстро заходит. Звёзд ещё много.'],
    [20,'Первая четверть','Луна светит до полуночи. Хорошо смотреть её кратеры в телескоп вдоль границы света и тени.'],
    [35,'Растущая Луна','Яркий свет начинает заглушать слабые звёзды.'],
    [47,'Полнолуние','Луна светит всю ночь. Слабые объекты не разглядеть, зато видно степь без фонаря.'],
    [53,'Убывающая Луна','Луна восходит поздно вечером. Первая половина ночи снова тёмная.'],
    [72,'Последняя четверть','Луна восходит около полуночи. Перед рассветом она освещает горизонт.'],
    [88,'Убывающий серп','Серп виден перед рассветом. Вечернее небо тёмное.']];
  var nm=document.getElementById('pname'),nt=document.getElementById('pnote'),sl=document.getElementById('slider');
  function draw(v){
    var p=v/100,k=Math.cos(2*Math.PI*p),waxing=p<=.5;
    x.clearRect(0,0,640,640);
    x.fillStyle='#161d42';x.beginPath();x.arc(C,C,R,0,6.283);x.fill();
    x.save();if(!waxing){x.translate(640,0);x.scale(-1,1)}
    var g=x.createRadialGradient(C-60,C-60,40,C,C,R);g.addColorStop(0,'#fbfcff');g.addColorStop(1,'#cdd4e6');
    x.fillStyle=g;x.beginPath();x.arc(C,C,R,-Math.PI/2,Math.PI/2,false);
    x.ellipse(C,C,Math.abs(k)*R,R,0,Math.PI/2,-Math.PI/2,k>0);
    x.closePath();x.fill();
    x.fillStyle='rgba(120,130,160,.22)';
    [[C+80,C-90,46],[C+30,C+70,30],[C+140,C+30,24],[C-70,C-30,38],[C-110,C+100,26]].forEach(function(m){x.beginPath();x.arc(m[0],m[1],m[2],0,6.283);x.fill()});
    x.restore();
    x.strokeStyle='rgba(238,241,248,.18)';x.lineWidth=2;x.beginPath();x.arc(C,C,R,0,6.283);x.stroke();
    var cur=names[0];names.forEach(function(n){if(v>=n[0])cur=n});
    nm.textContent=cur[1];nt.textContent=cur[2];
  }
  sl.addEventListener('input',function(){draw(+sl.value)});
  draw(0);
})();
