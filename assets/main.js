let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if (answer.value == '' || attempt.value == '') {
      setHiddenFields();
    }
    if (!validateInput(input.value)) {
      return false;
    } else {
      attempt.value++;
    }
    let turn = getResults(input.value);
    if (turn) {
      setMessage("You Win! :)");
      showAnswer(true);
      showReplay();
    } else if (attempt.value >= 10) {
      setMessage("You Lose! :(");
      showAnswer(false);
      showReplay();
    } else {
      setMessage("Incorrect, try again.");
    }
}

function setHiddenFields() {
  let num = Math.floor(Math.random()*10000).toString();
  while (num.length<4) {
    num = '0' + num;
  }
  answer.value = num;
  attempt.value = 0;
}

function setMessage(msg) {
  let message = document.getElementById('message');
  message.innerHTML = msg;
}

function validateInput(guess) {
  if (guess.length == 4) {
    return true;
  } else {
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }
}

function getResults(input) {
  let newResult = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
  let correctCount = 0;
  for (var i = 0; i < input.length; i++) {
    if (input.charAt(i) == answer.value.charAt(i)) {
      newResult += '<span class="glyphicon glyphicon-ok"></span>';
      correctCount++;
    } else if (answer.value.indexOf(input.charAt(i)) > -1) {
      newResult += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      newResult += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  newResult += '</div></div>';
  document.getElementById('results').innerHTML += newResult;
  if (correctCount == 4) {
    return true;
  } else {
    return false;
  }
}

function showAnswer(won) {
  let code = document.getElementById('code');
  code.innerHTML = answer.value;
  if (won) {
    code.className += ' success';
  } else {
    code.className += ' failure';
  }
}

function showReplay() {
  document.getElementById('guessing-div').style = 'display: none';
  document.getElementById('replay-div').style = 'display: block';
}
