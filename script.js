symbols = new Array("🎈","🎨","🧶","💎","🔮");

let cards = $('.game-section .card').toArray();

for(i=0; i<5;i++)
{
    $(cards[i]).text(symbols[i]);
    $(cards[i+5]).text(symbols[i]);
}

cards.sort(()=>Math.random()-0.5);
$('.game-section').empty().append(cards);

$('#play-button').on('click', function(){
    if ($(this).text() == 'START') {
        $('.card').removeClass('card-face matched').addClass('card-back');
        $(this).text('FINISH');
    } else {
        $('.card').removeClass('card-back matched').addClass('card-face');
        $('.card').off('click').css('pointer-events', 'none');
        $(this).text('START').prop('disabled', false);
    }
});


let counter=0;
let matches = 0;

cards.forEach((card)=>{
    $(card).on('click', function(){
        if($(this).hasClass('card-face') || $(this).hasClass('matched')) return;

        counter++;
        $(this).addClass('card-face');

        if(counter==2){
            currentOpenCards=$('.card-face:not(.matched)');
            if(currentOpenCards.length==2){
                if($(currentOpenCards[0]).text()==$(currentOpenCards[1]).text())
                {
                    $(currentOpenCards[0]).addClass('matched');
                    $(currentOpenCards[1]).addClass('matched');                    
                    matches++;
                    counter=0;
                }
                else{
                    console.log("Не пара");
                    setTimeout(()=>{
                        currentOpenCards.removeClass('card-face');
                        counter=0;
                        
                    },2000);
                }
            }
        }
    })
})
if(matches==5)
{
    alert("ПОБЕДА");
}



