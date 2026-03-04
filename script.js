symbols = new Array("🎈","🎨","🧶","💎","🔮");

let cards = $('.game-section .card').toArray();

for(i=0; i<5;i++)
{
    $(cards[i]).text(symbols[i]);
    $(cards[i+5]).text(symbols[i]);
}

cards.sort(()=>Math.random()-0.5);
$('.game-section').empty().append(cards);

let timerId = parseInt($('#timer').text());
let timer = 30;

let skin = 0;
$('#skinButton').on('click', function()
{
    if(skin==0)
    {
        skin = 1;
        $('.card-back').css('background', 'red');
    }
    else
    {
        skin = 0;
        $('.card-back').css('background', 'gray');
    }
});

$('#play-button').on('click', function(){
    if ($(this).text() == 'START') {
        $('.card').removeClass('card-face matched').addClass('card-back');
        $(this).text('FINISH');
        timerId = setInterval(()=>{
            if(timer>0)
            {
                timer--;
                $('#timer').text(timer);
                console.log(timer);
            }
            else
            {
                clearInterval(timerId);
                alert("Время вышло!");
                $('.card').off('click').removeClass('matched');
            }
        },1000);
    } else {
        $('.card').removeClass('card-back matched').addClass('card-face');
        $('.card').off('click').css('pointer-events', 'none');
        $(this).text('START').prop('disabled', false);
    }
});


let counter=0;
let matches = 0;

let isChecked=false;

cards.forEach((card)=>{
    $(card).on('click', function(){
        if($(this).hasClass('card-face') || $(this).hasClass('matched') || isChecked) return;

        counter++;
        $(this).addClass('card-face');

        if(counter==2){
            currentOpenCards=$('.card-face:not(.matched)');
            if(currentOpenCards.length==2){
                isChecked=true;
                if($(currentOpenCards[0]).text()==$(currentOpenCards[1]).text())
                {
                    $(currentOpenCards[0]).addClass('matched');
                    $(currentOpenCards[1]).addClass('matched');                    
                    matches++;
                    counter=0;
                    isChecked=false;

                    if(matches==5)
                    {
                        alert("ПОБЕДА");
                    }
                }
                else{
                    console.log("Не пара");
                    setTimeout(()=>{
                        currentOpenCards.removeClass('card-face');
                        counter=0;
                        isChecked=false;
                    },2000);
                }
            }
        }
       
    })
})




