var count = -1;
var slides = jQuery.makeArray($('#slides article')), //base 0
    totalSlides = slides.length - 1;
var         startPos = { "top":'100%',  "z-index": "0" },
            endPos = { 'top':'0px', "z-index": "2" },
            prevPos = {'top': '-100%',  "z-index": "0"},
            transit = {"transition": "top 800ms ease 0s", "transition-delay": "0s"},
            nonetrans = {"transition": "none"},
            timer = null;


  function advance() {
    if (count == totalSlides){ 
      $(slides[count]).animate(startPos,0).css(transit);
        count = 0;
      $(slides[count]).css(prevPos).css(nonetrans);
      $(slides[count]).animate(endPos,0).css(transit);
     }else {  
       
      $(slides[count]).animate(startPos,0).css(transit);
       count++;
       $(slides[count]).css(prevPos).css(nonetrans);
      $(slides[count]).animate(endPos,0).css(transit);
       
      } 
    }
 
        function rewind() { 
     
          if( count === 0 ) {
            $(slides[count]).animate(prevPos,0).css(transit);
            count = totalSlides;
            $(slides[count]).css(startPos).css(nonetrans);
            $(slides[count]).animate(endPos,0).css(transit);
          }else{
            $(slides[count]).prev().css(startPos).css(nonetrans);
            $(slides[count]).animate(prevPos,0).css(transit);
             count = count -1; 
            $(slides[count]).animate(endPos,0).css(transit);
          
          } 
      
          
        } 

//Dots functions
function selectDots(){  
  n = count + 1;
  $('#dots li:nth-child('+n+')').addClass('selected');
  $('#dots li:nth-child('+n+')').siblings().removeClass('selected');
}

function clickDots() {
  
 $('#dots li').bind('click',function (){
   
  var index = $(this).index();
   if (count > index){ 
      
     $(slides[count]).animate(prevPos,0).css(transit);
      count = index;
     $(slides[count]).css(startPos).css(nonetrans);
     $(slides[count]).animate(endPos,0).css(transit);

   }else if(count < index){
     $(slides[count]).animate(startPos,0).css(transit);
     count = index;
     $(slides[count]).css(prevPos).css(nonetrans);
     $(slides[count]).animate(endPos,0).css(transit);
 
 }else {
   return false;
 }
     selectDots();
     clearTimeout(timer); 
     timer = setTimeout(playSlides,7500);
     unbindBtn();
 });
  
} 

//next and prev buttons

function upDown() {
$('.next').bind('click', function() {
    advance();
    selectDots();
    clearTimeout(timer);  
    timer = setTimeout(playSlides, 7500);
    unbindBtn();
});

$('.prev').bind('click', function() {  
  if(count == -1){
    count = 0;
  }else{
  rewind();
  }
  
  selectDots();
  clearTimeout(timer);
  timer = setTimeout(playSlides, 7500);
  unbindBtn();
});
}
 
function unbindBtn() {
  $('.next,.prev,#dots li').unbind('click');
  setTimeout(upDown,800);
  setTimeout(clickDots,800);
}


// Slideshow automatic slide function
function playSlides() {
   clickDots();
   upDown();
   function loop() {
      advance();
      selectDots();
      timer = setTimeout(loop, 5000);
      unbindBtn();
      }                        
   loop();       
}
 

 
 
$(document).ready(function(){  
  playSlides();

  
});
   
