let maxScore = 301;

let leftName;
let rightName;
let leftScore;
let rightScore;
let leftScoreList;
let rightScoreList;
let scoreEntry;
let turnCounter;
let leftWins;
let rightWins;
let leftStats;
let rightStats;
let leftNameEntry;
let rightNameEntry;

let leftScores = [];
let rightScores = [];
let leftTotal = 0;
let rightTotal = 0;
let leftNum = 0;
let rightNum = 0;

let leftDarts = 60;
let rightDarts = 60;

let turn = true;

let finishList = [];

function init(){

    leftName = document.getElementById("leftName");
    rightName = document.getElementById("rightName");
    leftScore = document.getElementById("leftScore");
    rightScore = document.getElementById("rightScore");
    leftScoreList = document.getElementById("leftList");
    rightScoreList = document.getElementById("rightList");
    scoreEntry = document.getElementById("scoreInput");
    turnCounter = document.getElementById("turn");
    leftWins = document.getElementById("leftWins");
    rightWins = document.getElementById("rightWins");
    leftStats = document.getElementById("leftStats");
    rightStats = document.getElementById("rightStats");
    leftNameEntry = document.getElementById("leftNameInput");
    rightNameEntry = document.getElementById("rightNameInput");

    resize();
    generateFinishList()

}

window.onresize = function(event) {resize();};

function resize(){

    bot = document.getElementById("bottom");

    if (window.screen.height > window.screen.width){

        let s = document.getElementById("selection");
        s.style.fontSize = (3) + 'em';

        leftName.style.fontSize = (3) + 'em';
        leftScore.style.fontSize = (3) + 'em';
        rightName.style.fontSize = (3) + 'em';
        rightScore.style.fontSize = (3) + 'em';
        leftWins.style.fontSize = (3) + 'em';
        rightWins.style.fontSize = (3) + 'em';
        turnCounter.style.fontSize = (3) + 'em';
        scoreEntry.style.fontSize = (3) + 'em';
        leftScoreList.style.fontSize = (2.5) + 'em';
        rightScoreList.style.fontSize = (2.5) + 'em';
        leftStats.style.fontSize = (3) + 'em';
        rightStats.style.fontSize = (3) + 'em';

    } else {

        let s = document.getElementById("selection");
        s.style.fontSize = (2) + 'em';

        leftName.style.fontSize = (2) + 'em';
        leftScore.style.fontSize = (2) + 'em';
        rightName.style.fontSize = (2) + 'em';
        rightScore.style.fontSize = (2) + 'em';
        leftWins.style.fontSize = (2) + 'em';
        rightWins.style.fontSize = (2) + 'em';
        turnCounter.style.fontSize = (2) + 'em';
        scoreEntry.style.fontSize = (2) + 'em';
        leftScoreList.style.fontSize = (1.5) + 'em';
        rightScoreList.style.fontSize = (1.5) + 'em';
        leftStats.style.fontSize = (2) + 'em';
        rightStats.style.fontSize = (2) + 'em';

    }

    leftScoreList.style.height = (window.innerHeight - bot.clientHeight- leftName.clientHeight - leftScore.clientHeight - leftStats.clientHeight - 60) + "px";
    rightScoreList.style.height = (window.innerHeight - bot.clientHeight- rightName.clientHeight - rightScore.clientHeight - rightStats.clientHeight - 60) + "px";

    leftScoreList.scrollTop = leftScoreList.scrollHeight;
    rightScoreList.scrollTop = rightScoreList.scrollHeight;

}

function setMaxScore(score){

    maxScore = score;
    leftScore.innerHTML = maxScore;
    rightScore.innerHTML = maxScore;

    let x = document.getElementById("scoreSelect");
    let y = document.getElementById("nameSelect");
    x.style.display = "none";
    y.style.display = "block";

}

function resetGame(){

    leftScore.innerHTML = maxScore;
    rightScore.innerHTML = maxScore;
    leftList.innerHTML = "";
    rightList.innerHTML = "";
    leftScores = [];
    rightScores = [];

    if (turn){

        turnCounter.innerHTML = "" + possessive(leftName.innerHTML) + " turn (" + leftDarts + " left)"  + bestRoute(maxScore)

    } else {

        turnCounter.innerHTML = "" + possessive(rightName.innerHTML) + " turn (" + rightDarts + " left)"  + bestRoute(maxScore)

    }

    updateStats();

}

function bestRoute(score){

    if (score <= 170){

        return "<br>checkout " + finishList[score-1];

    } else {

        return "";

    }

}

function submitNames(){

    if (leftNameEntry.value.length <= 1){leftNameEntry.value = "Player 1";}
    if (rightNameEntry.value.length <= 1){rightNameEntry.value = "Player 2";}

    leftName.innerHTML = leftNameEntry.value;
    rightName.innerHTML = rightNameEntry.value;

    turnCounter.innerHTML = "" + possessive(leftName.innerHTML) + " turn (" + leftDarts + " left)"  + bestRoute(maxScore)

    startGame()

}

function startGame(){

    let x = document.getElementById("selection");

    x.style.display = "none";
    game.style.display = "inline-block";

    resize();
    resetGame();
    updateStats();
    scoreEntry.focus();

}

function updateStats(){

    leftTotal = sumArray(leftScores)
    leftNum = leftScores.length;

    let leftAvg = 0;
    if (leftNum == 0){leftAvg = 0}
    else {leftAvg = leftTotal / leftNum}
    leftStats.innerHTML = "averaging " + round(leftAvg)

    rightTotal = sumArray(rightScores)
    rightNum = rightScores.length;

    let rightAvg = 0;
    if (rightNum == 0){rightAvg = 0;}
    else {rightAvg = rightTotal / rightNum;}
    rightStats.innerHTML = "averaging " + round(rightAvg);

    resize();


}

function isValidInt(str) {return /^(0|[1-9]\d*)$/.test(str);}

function sumArray(arr){

    return arr.reduce(function(a,b){

        return a + b;

    }, 0);

}

function addScore(score){

    if (score.length < 1){return;}

    score = score.toLowerCase();
    split = score.split(" ")

    if (split[0] == "help"){

        alert("scores can be entered as:\n - 67\n - T20 20 Bull\n - t19 d13 b\n - treble 20 double 20 bull\n - 2*d20 6\n\ncan also use:\n - undo\n - reset\n - wins <left|right> <num>\n - name <left|right> <name>");

    } else if (split[0] == "undo"){

        if (!turn){

            if (leftScores.length <= 0){return;}

            leftScoreList.innerHTML = leftScoreList.innerHTML.substr(0, leftScoreList.innerHTML.length-5);
            endIndex = leftScoreList.innerHTML.lastIndexOf("<hr>") + 4;
            if (endIndex == 3){leftScoreList.innerHTML = "";}
            else{leftScoreList.innerHTML = leftScoreList.innerHTML.substr(0, endIndex);}

            leftDarts += 3;

            leftScore.innerHTML = parseInt(leftScore.innerHTML) + leftScores.pop(leftScores.length-1);
            turnCounter.innerHTML = "" + possessive(leftName.innerHTML) + " turn (" + leftDarts + " left)"  + bestRoute(parseInt(leftScore.innerHTML))

            updateStats()

        } else {

            if (rightScores.length <= 0){return;}

            rightScoreList.innerHTML = rightScoreList.innerHTML.substr(0, rightScoreList.innerHTML.length-5);
            endIndex = rightScoreList.innerHTML.lastIndexOf("<hr>") + 4;
            if (endIndex == 3){rightScoreList.innerHTML = "";}
            else{rightScoreList.innerHTML = rightScoreList.innerHTML.substr(0, endIndex);}

            rightDarts += 3;

            rightScore.innerHTML = parseInt(rightScore.innerHTML) + rightScores.pop(rightScores.length-1);
            turnCounter.innerHTML = "" + possessive(rightName.innerHTML) + " turn (" + rightDarts + " left)"  + bestRoute(parseInt(rightScore.innerHTML))

            updateStats()

        }

        turn = !turn;

    } else if (split[0] == "reset"){

        resetGame();
        leftWins.innerHTML = 0;
        rightWins.innerHTML = 0;
        resize();

    } else if (split[0] == "wins"){

        if (split[1] == "left") {

            leftWins.innerHTML = split[2];

        } else if (split[1] == "right") {

            rightWins.innerHTML = split[2];

        }

        resize();

    } else if (split[0] == "name"){

        if (split[1] == "left") {

            leftName.innerHTML = capitalizeFirstLetter(score.substring(score.indexOf("left")+4+1, score.length));

        } else if (split[1] == "right") {

            rightName.innerHTML = capitalizeFirstLetter(score.substring(score.indexOf("right")+5+1, score.length));

        }

        resize();

    } else {

        score = score.replace(/\s\s+/g, " ");
        score = score.replace(/ \* /g, "*");
        score = score.replace(/\* /g, "*");
        score = score.replace(/ \*/g, "*");
        score = score.replace(/miss /g, "0");
        score = score.replace(/treble /g, "3*");
        score = score.replace(/double /g, "2*");
        score = score.replace(/bullseye/g, "50");
        score = score.replace(/bull/g, "50");
        score = score.replace(/x/g, "0");
        score = score.replace(/b/g, "50");
        score = score.replace(/t /g, "3*");
        score = score.replace(/d /g, "2*");
        score = score.replace(/t/g, "3*");
        score = score.replace(/d/g, "2*");
        score = score.replace(/ /g, "+");

        try {
            score = parseInt(eval(score));
        } catch (e) {
            alert('not valid, try typing "help"')
            return;
        }

        if (parseInt(score) > 180){

            alert('not a valid total for 3 darts')
            return;

        }

        if (turn){

            leftScoreList.innerHTML += score + " (from " + parseInt(leftScore.innerHTML) + ")<hr>";
            leftScores.push(score);
            leftTotal += score;
            leftNum += 1;
            leftScoreList.scrollTop = leftScoreList.scrollHeight;

            newScore = parseInt(leftScore.innerHTML) - score;
            if (newScore == 0 || newScore >= 2) {

                leftScore.innerHTML = newScore;
                turnCounter.innerHTML = "" + possessive(rightName.innerHTML) + " turn (" + rightDarts + " left)"  + bestRoute(parseInt(rightScore.innerHTML))

                if (newScore == 0){

                    alert(leftName.innerHTML + " has won!");
                    leftWins.innerHTML = parseInt(leftWins.innerHTML) + 1;
                    turn = false;
                    resetGame();
                    return;

                }

            }

            leftDarts -= 3;

        } else {

            rightScoreList.innerHTML += score + " (from " + parseInt(rightScore.innerHTML) + ")<hr>";
            rightScores.push(score);
            rightTotal += score;
            rightNum += 1;
            rightScoreList.scrollTop = rightScoreList.scrollHeight;
            turnCounter.innerHTML = "" + possessive(leftName.innerHTML) + " turn (" + leftDarts + " left)"  + bestRoute(parseInt(leftScore.innerHTML))

            newScore = parseInt(rightScore.innerHTML) - score;
            if (newScore == 0 || newScore >= 2) {

                rightScore.innerHTML = newScore;

                if (newScore == 0){

                    alert(rightName.innerHTML + " has won!");
                    rightWins.innerHTML = parseInt(rightWins.innerHTML) + 1;
                    turn = false;
                    resetGame();
                    return;

                }

            }

            rightDarts -= 3;

        }

        updateStats();
        turn = !turn;

    }

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function round(num){

    return num.toFixed(1);

}

function multiplierToLetter(multi){

    switch (multi) {
        case 1:
            return "";
            break;
        case 2:
            return "D";
            break;
        case 3:
            return "T";
            break;
        default:
            return "";
            break;

    }

}

function generateFinishList(){

    for (let i=1; i<=170; i++){

        finishList.push(finishers(i))

    }

}

function finishers(score){

    let dart1 = 0;
    let dart1Mod = 1;
    let dart2 = 0;
    let dart2Mod = 1;
    let dart3 = 0;
    let dart3Mod = 2;

    bestString = "none";
    bestSum = 0;

    for (dart1Mod = 3; dart1Mod >= 1; dart1Mod--) {

        for (dart2Mod = 3; dart2Mod >= 1; dart2Mod--) {

            for (dart1 = 20; dart1 >= 1; dart1--) {

                for (dart2 = 20; dart2 >= 0; dart2--) {

                    for (dart3 = 20; dart3 >= 0; dart3--) {

                        testScore = score - dart1*dart1Mod - dart2*dart2Mod - dart3*dart3Mod;

                        if (dart3 == 0 && dart2 != 0 && dart2Mod != 2 && testScore != 50) {continue;}
                        else if (dart2 == 0 && dart1 != 0 && dart1Mod != 2 && testScore != 50) {continue;}

                        if (testScore == 0 || (testScore == 50 && dart3 == 0)){

                            returnString = "";
                            returnString += multiplierToLetter(dart1Mod) + dart1 + " ";
                            if (dart2 > 0){returnString += multiplierToLetter(dart2Mod) + dart2 + " ";}
                            if (testScore == 50 && dart3 == 0) {returnString += "Bull";}
                            else if (dart3 > 0){returnString += multiplierToLetter(dart3Mod) + dart3;}

                            sum = 5*dart1+3*dart2+dart3;
                            if (dart2 == 0 && dart3 == 0 && testScore == 0){sum += 300;}
                            else if (dart3 == 0 && testScore == 0){sum += 100;}
                            if (dart1Mod == 3){sum += 50;}

                            if (sum > bestSum){

                                bestSum = sum;
                                bestString = returnString;

                            }

                        }

                    }

                }

            }

        }

    }

    return bestString;

}

function possessive(name){

    if (name.substr(name.length-1,1) == "s"){return name + "'"}
    else {return name + "'s"}

}

function keyPress(e){

    e.preventDefault();
    if (e.key == "Enter"){

        addScore(scoreEntry.value)
        scoreEntry.value = "";

    } else {

        scoreEntry.value += e.key;

    }

}
