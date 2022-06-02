   //initialize variables//
var arrImg = ["img/candy.png" , "img/gem.png","img/candy 2.png","img/gemstone.png","img/cool.png","img/football.png","img/panda.png","img/gemstone.png","img/panda.png","img/cool.png","img/earth.png","img/candy.png" ,"img/football.png","img/earth.png","img/gem.png","img/candy 2.png"]
var items = document.getElementsByClassName("item");
var container = document.getElementById("container");
var newGame = document.getElementById("new-btn");
var arrItems = Array.from(items);
var card =Array.from( document.getElementsByClassName("c-img"))
var hint = document.getElementById('hint');
var heart = document.querySelector(".heart-items");
var winner=document.querySelector(".winner")
var lose=document.querySelector(".lose")
var counter = 0;
var hintCounter=0;
var timerInterval;
var min = 2.00; 
var sec = 0.00;
var imgArr = [];
var itemArr =[];

//end of initialization//


// call function start game //
startGame(arrItems);


//function  shaffle
function shaffle(array)
{

    var current = array.length;
    var temp ;
    var random ;

    while(current > 0 )
    {
        random =Math.floor(Math.random()*current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp ;

    }
}

//function start game

function startGame(items)
{

shaffle(arrImg);//cal shaffle
timerInterval= setInterval(timer,1000); //call interval

//adding img to html
for(var i = 0 ; i < card.length ; i++ )
{
    card[i].innerHTML=`<img src="${arrImg[i]}"> `

}


//looping on element

items.forEach(function (element) {
    element.addEventListener('click', function () {
      element.style.transform = 'rotateY(180deg)';
      imgArr.push(element.children[1].children[0].getAttribute('src'));
      itemArr.push(element);

      console.log(imgArr, itemArr);

      if (itemArr.length == 1) {
        itemArr[0].style.pointerEvents = 'none';
      } else if (imgArr.length == 2) {
        setTimeout(() => {
          if (imgArr[0] === imgArr[1]) {
            itemArr[0].style.visibility = 'hidden';
            itemArr[1].style.visibility = 'hidden';
            counter++;
            console.log(itemArr[0], itemArr[1]);
          } else {
            itemArr[0].style.transform = 'rotateY(360deg)';
            itemArr[1].style.transform = 'rotateY(360deg)';

            itemArr[0].style.pointerEvents = 'auto';
            itemArr[1].style.pointerEvents = 'auto';
            console.log(imgArr);
          }

          itemArr = [];
          imgArr = [];
          if (counter == 8) {
            winner.style.display = 'block';
            clearInterval(timerInterval);
          }
        }, 500);

       
      }
    });
  });
}


//new game function

newGame.addEventListener('click', function(){
 //clear element
    counter = 0;
    hintCounter=0;
    container.innerHTML='';
    winner.style.display = 'none';
    lose.style.display="none";
    min = 2.00; 
    sec = 0.00;
    clearInterval(timerInterval);
    heart.innerHTML=` <span>💖</span> <span>💖</span> <span>💖</span>`;
    itemArr=[];
    imgArr=[];
    shaffle(arrImg);//calling shaffle again

    for(var i = 0 ; i<arrImg.length ; i++)
    {
        container.innerHTML+=` <div class="item">
        <div class="c-icon">
            <img src="img/question-mark.png" alt="mark">
        </div>

        <div class="c-img">
        <img src="${arrImg[i]}">
        </div>
    </div>`
    }
    var newItems = document.querySelectorAll(".item")//make new array items

    arrItems=newItems;

    startGame(newItems)//calling start game

    });


    //hint function

    hint.addEventListener('click',function()
    {
        if(hintCounter<3)
        {    
        heart.children[0].remove();
           itemArr=[];
            imgArr=[]; 

       for(var i =0 ; i< arrItems.length ; i++)
      
       {
            arrItems[i].style.transform="rotateY(180deg)"
            arrItems[i].style.pointerEvents="auto"
       }

       setTimeout(() => {


        for(var j =0 ; j< arrItems.length ; j++)
        {
 
        arrItems[j].style.transform="rotateY(360deg)"
        }
    }, 700);
    hintCounter++
}
else 
{
   hint.style.pointerEvents="none"
}
 
    console.log(hintCounter)
})


//timer function

function timer()
{
    var timer = document.querySelector(".timer");
    sec -- ;
    if(sec<=0)
    {
        sec=59
        min--;
 
    }
    if(min<0)
    {
        clearInterval(timerInterval);
        lose.style.display="block";

    }
    
    var time =(min <10 ? "0"+min : min )+ " : "+(sec <10 ? "0"+sec :sec) ;

    timer.innerHTML=time
 
}


