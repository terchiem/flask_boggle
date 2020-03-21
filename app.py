from flask import Flask, request, render_template, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'

debug = DebugToolbarExtension(app)

@app.route('/')
def show_home_page():
    """ Show game board """

    session["board"] = boggle_game.make_board()
    high_score = session.get('high_score', 0)

    return render_template("board.html",
                            board=session["board"],
                            high_score=high_score)

@app.route('/make-guess')
def make_guess():
    """ Checks guess and responds with JSON result """

    guess = request.args['guess']
    result = boggle_game.check_valid_word(session["board"], guess)
    
    response = {"result": result}

    return jsonify(response)

@app.route('/send-score', methods=["POST"])
def send_score():
    """ Receive high score and save to session """

    score = request.json.get('score', 0)

    if score > session.get('high_score', 0) :
        session['high_score'] = score

    session['times_played'] = session.get('times_played', 0) + 1
    return jsonify({})


# TODO: add number of times played
# TODO: Step 7: refactor to OO, 
#       docstrings, handle duplicate words