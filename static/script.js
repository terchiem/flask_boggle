$(function() {
  const BASE_URL = "http://localhost:5000/"
  $submitButton = $('#submit');
  $guessInput = $('#guess');
  $result = $('#result');
  $gameOverMsg = $('#gameOverMsg')
  let score =0;

  $submitButton.on('click', async function(e){
    e.preventDefault();

    let guess = $guessInput.val();
    let response = await axios.get(`${BASE_URL}/make-guess?guess=${guess}`);
    $guessInput.val("")

    // display result from JSON response
    if(response.data.result =="ok"){
      score+=guess.length
    }
    $result.text(score)
  });

  setTimeout(function(){
    $submitButton.prop("disabled", true)
    $gameOverMsg.text("Time is out")
    }, 6000)
    
});
