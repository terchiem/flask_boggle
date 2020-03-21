class BoggleGame{
  constructor(time){
    this.score=0;
    this.time = 60000;
    this.guessedWords = []
    this.BASE_URL = "http://localhost:5000/"
    setTimeout(endGame, this.time);
    $('#submit').on('submit', this.handleButton.bind(this));
  }

  async sendGuess(guess){
    let response = await axios.get(`${BASE_URL}/make-guess?guess=${guess}`);
    return response.data.result
  }

  updateScore(serverResponse, guess){
    if(serverResponse =="ok"){
      this.score+=guess.length
    }
    $('#result').text(this.score)
  }

  async sendScore(){

      let json = { score: this.score }
      await axios.post(`${BASE_URL}/send-score`, json);
  }

  async handleButton(e){
    e.preventDefault();
    $guessInput = $('#guess');
    let guess = $guessInput.val();
    let serverResponse = sendGuess(guess)
    $guessInput.val("")
    this.updateScore(serverResponse, guess)
  }

  endGame() {
    $('#submit').prop("disabled", true);
    $('#gameOverMsg').text("Time is out");
    this.sendScore(this.score);
  }

}
boggleGame = new BoggleGame(60000);


