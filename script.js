const outsTable = {
  170:"T20 T20 Bull",167:"T20 T19 Bull",164:"T20 T18 Bull",161:"T20 T17 Bull",160:"T20 T20 D20",158:"T20 T20 D19",157:"T20 T19 D20",156:"T20 T20 D18",155:"T20 T19 D19",154:"T20 T18 D20",153:"T20 T19 D18",152:"T20 T20 D16",151:"T20 T17 D20",150:"T20 T18 D18",149:"T20 T19 D16",148:"T20 T16 D20",147:"T20 T17 D18",146:"T20 T18 D16",145:"T20 T15 D20",144:"T20 T20 D12",143:"T20 T17 D16",142:"T20 T14 D20",141:"T20 T15 D18",140:"T20 T16 D16",139:"T20 T13 D20",138:"T20 T14 D18",137:"T20 T15 D16",136:"T20 T16 D14",135:"T20 T17 D12",134:"T20 T14 D16",133:"T20 T19 D8",132:"T20 T16 D12",131:"T20 T13 D16",130:"T20 T20 D5",129:"T19 T16 D12",128:"T18 T14 D16",127:"T20 T17 D8",126:"T19 T19 D6",125:"Bull T15 D20",124:"T20 T16 D8",123:"T19 T16 D9",122:"T18 T20 D4",121:"T20 T11 D14",120:"T20 20 D20",119:"T19 10 D16",118:"T20 18 D20",117:"T20 17 D20",116:"T20 16 D20",115:"T20 15 D20",114:"T20 14 D20",113:"T20 13 D20",112:"T20 12 D20",111:"T20 11 D20",110:"T20 10 D20",109:"T20 9 D20",108:"T20 8 D20",107:"T20 7 D20",106:"T20 6 D20",105:"T20 5 D20",104:"T18 18 D16",103:"T19 10 D18",102:"T20 10 D16",101:"T17 18 D16",100:"T20 D20",99:"T19 10 D16",98:"T20 D19",97:"T19 D20",96:"T20 D18",95:"T19 D19",94:"T18 D20",93:"T19 D18",92:"T20 D16",91:"T17 D20",90:"T18 D18",89:"T19 D16",88:"T16 D20",87:"T17 D18",86:"T18 D16",85:"T15 D20",84:"T20 D12",83:"T17 D16",82:"T14 D20",81:"T15 D18",80:"T16 D16",79:"T13 D20",78:"T14 D18",77:"T15 D16",76:"T20 D8",75:"T17 D12",74:"T14 D16",73:"T19 D8",72:"T16 D12",71:"T13 D16",70:"T18 D8",69:"T19 D6",68:"T16 D10",67:"T17 D8",66:"T10 D18",65:"T19 D4",64:"T16 D8",63:"T13 D12",62:"T10 D16",61:"T15 D8",60:"20 D20",59:"19 D20",58:"18 D20",57:"17 D20",56:"16 D20",55:"15 D20",54:"14 D20",53:"13 D20",52:"12 D20",51:"11 D20",50:"10 D20",49:"9 D20",48:"16 D16",47:"15 D16",46:"14 D16",45:"13 D16",44:"12 D16",43:"11 D16",42:"10 D16",41:"9 D16",40:"D20",39:"7 D16",38:"D19",37:"5 D16",36:"D18",35:"3 D16",34:"D17",33:"1 D16",32:"D16",31:"15 D8",30:"D15",29:"13 D8",28:"D14",27:"11 D8",26:"D13",25:"9 D8",24:"D12",23:"7 D8",22:"D11",21:"5 D8",20:"D10",19:"3 D8",18:"D9",17:"1 D8",16:"D8",15:"7 D4",14:"D7",13:"5 D4",12:"D6",11:"3 D4",10:"D5",9:"1 D4",8:"D4",7:"3 D2",6:"D3",5:"1 D2",4:"D2",3:"1 D1",2:"D1"
};

function showPage(page) {
  ['newgame','game','gameover','history','settings'].forEach(p =>
    document.getElementById('page-' + p).classList.add('hidden')
  );
  document.getElementById('page-' + page).classList.remove('hidden');
  ['tab-newgame','tab-game','tab-history','tab-settings'].forEach(tab =>
    document.getElementById(tab).classList.remove('text-primary','font-semibold')
  );
  if(['newgame','game','history','settings'].includes(page)) {
    document.getElementById('tab-' + page).classList.add('text-primary','font-semibold');
  }
}
document.getElementById('tab-newgame').onclick = () => showPage('newgame');
document.getElementById('tab-game').onclick = () => showPage('game');
document.getElementById('tab-history').onclick = () => showPage('history');
document.getElementById('tab-settings').onclick = () => showPage('settings');

let playerNames = ["Spieler 1", "Spieler 2"];
let startScore = 501;
let gameMode = "Double Out";
let scores = [501, 501];
let currentPlayer = 0;
let history = [];
let dartsThrown = [0, 0];
let scoreSum = [0, 0];

document.getElementById('btnStartGame').onclick = function() {
  playerNames = [
    document.getElementById('player1').value || "Spieler 1",
    document.getElementById('player2').value || "Spieler 2"
  ];
  startScore = parseInt(document.getElementById('startScore').value,10) || 501;
  gameMode = document.getElementById('gameMode').value || "Double Out";
  scores = [startScore, startScore];
  currentPlayer = 0;
  history = [];
  dartsThrown = [0, 0];
  scoreSum = [0, 0];
  updateScores();
  updateHistory();
  document.getElementById('gameMsg').textContent = '';
  document.getElementById('btnThrow').disabled = false;
  clearInputs();
  showPage('game');
};

document.getElementById('btnPlayAgain').onclick = function() {
  scores = [startScore, startScore];
  currentPlayer = 0;
  history = [];
  dartsThrown = [0, 0];
  scoreSum = [0, 0];
  updateScores();
  updateHistory();
  document.getElementById('gameMsg').textContent = '';
  clearInputs();
  document.getElementById('btnThrow').disabled = false;
  showPage('game');
};

document.getElementById('btnMainMenu').onclick = function() {
  showPage('newgame');
};

function clearInputs() {
  ['scoreInput1','scoreInput2','scoreInput3'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('doubleOutCheck').checked = false;
}

function updateScores() {
  document.getElementById('p1name').textContent = playerNames[0];
  document.getElementById('p2name').textContent = playerNames[1];
  document.getElementById('p1score').textContent = scores[0];
  document.getElementById('p2score').textContent = scores[1];

  let avg1 = dartsThrown[0] ? ((scoreSum[0] / dartsThrown[0]) * 3).toFixed(2) : "0.00";
  let avg2 = dartsThrown[1] ? ((scoreSum[1] / dartsThrown[1]) * 3).toFixed(2) : "0.00";
  document.getElementById('p1avg').textContent = avg1;
  document.getElementById('p2avg').textContent = avg2;

  document.getElementById('p1out').textContent = currentPlayer === 0 && outsTable[scores[0]] ? ("Out: " + outsTable[scores[0]]) : "";
  document.getElementById('p2out').textContent = currentPlayer === 1 && outsTable[scores[1]] ? ("Out: " + outsTable[scores[1]]) : "";

  document.getElementById('p1box').classList.toggle('border-primary', currentPlayer === 0);
  document.getElementById('p2box').classList.toggle('border-primary', currentPlayer === 1);
  document.getElementById('p1score').classList.toggle('text-primary', currentPlayer === 0);
  document.getElementById('p2score').classList.toggle('text-primary', currentPlayer === 1);

  document.getElementById('p1active').style.display = currentPlayer === 0 ? 'inline-block' : 'none';
  document.getElementById('p2active').style.display = currentPlayer === 1 ? 'inline-block' : 'none';
}

document.getElementById('btnThrow').onclick = function() {
  let scoresInput = [
    parseInt(document.getElementById('scoreInput1').value,10) || 0,
    parseInt(document.getElementById('scoreInput2').value,10) || 0,
    parseInt(document.getElementById('scoreInput3').value,10) || 0
  ];
  let doubleOut = document.getElementById('doubleOutCheck').checked;
  let sumScore = scoresInput.reduce((a,b) => a+b, 0);
  for (let i=0; i<3; i++) {
    if (scoresInput[i] < 0 || scoresInput[i] > 180) {
      document.getElementById('gameMsg').textContent = 'Ungültige Punktzahl bei Wurf '+(i+1)+'!';
      return;
    }
  }
  let before = scores[currentPlayer];
  let after = before - sumScore;

  dartsThrown[currentPlayer] += 3;
  scoreSum[currentPlayer] += sumScore;

  if (after < 0 || after == 1) {
    document.getElementById('gameMsg').textContent = 'Bust! Score bleibt unverändert.';
    addHistoryRow(scoresInput, doubleOut, before, before, 'Bust!');
    clearInputs();
    currentPlayer = 1-currentPlayer;
    updateScores();
    return;
  }

  if (after === 0) {
    if (doubleOut) {
      scores[currentPlayer] = 0;
      document.getElementById('gameMsg').textContent = playerNames[currentPlayer] + ' gewinnt!';
      addHistoryRow(scoresInput, doubleOut, before, before, 'Checkout! Gewinn');
      updateScores();
      document.getElementById('btnThrow').disabled = true;
      setTimeout(() => showGameOver(currentPlayer), 1200);
      updateHistory();
      return;
    } else {
      document.getElementById('gameMsg').textContent = 'Bei 0 nur mit Doppel-Aus möglich (Checkbox setzen)!';
      addHistoryRow(scoresInput, doubleOut, before, before, 'Kein Doppel-Aus beim Checkout');
      clearInputs();
      currentPlayer = 1-currentPlayer;
      updateScores();
      return;
    }
  }

  addHistoryRow(scoresInput, doubleOut, before, after, '');
  scores[currentPlayer] = after;
  document.getElementById('gameMsg').textContent = '';
  clearInputs();
  currentPlayer = 1-currentPlayer;
  updateScores();
};

function addHistoryRow(scoresInput, doubleOut, before, after, extra) {
  let roundNum = history.length + 1;
  let turnText = scoresInput.map((s,i) => 'W'+(i+1)+': '+s).join(' | ');
  if (doubleOut) turnText += " (Doppel-Aus)";
  if(currentPlayer === 0) {
    history.push({
      round: roundNum,
      p1: turnText,
      p1Rest: after,
      p1Extra: extra,
      p2: '',
      p2Rest: scores[1],
      p2Extra: ''
    });
  } else {
    let h = history[history.length-1];
    if(h && h.p2 === '') {
      h.p2 = turnText;
      h.p2Rest = after;
      h.p2Extra = extra;
    } else {
      history.push({
        round: roundNum,
        p1: '',
        p1Rest: scores[0],
        p1Extra: '',
        p2: turnText,
        p2Rest: after,
        p2Extra: extra
      });
    }
  }
  updateHistory();
}

function updateHistory() {
  let tbody = document.getElementById('historyTable');
  tbody.innerHTML = '';
  history.forEach(r => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="p-2 text-center font-bold">${r.round}</td>
      <td class="p-2 border-l">
        ${r.p1!==''?'<p class="text-base font-bold">'+r.p1+'</p>':''}
        <p class="text-xs text-gray-500">${(r.p1Rest!==''?r.p1Rest+' left':'')}</p>
        ${r.p1Extra?'<p class="text-xs text-primary">'+r.p1Extra+'</p>':''}
      </td>
      <td class="p-2 border-l">
        ${r.p2!==''?'<p class="text-base font-bold">'+r.p2+'</p>':''}
        <p class="text-xs text-gray-500">${(r.p2Rest!==''?r.p2Rest+' left':'')}</p>
        ${r.p2Extra?'<p class="text-xs text-primary">'+r.p2Extra+'</p>':''}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function showGameOver(winnerIdx) {
  document.getElementById('winnerImg').src =
    winnerIdx === 0
      ? "https://randomuser.me/api/portraits/men/31.jpg"
      : "https://randomuser.me/api/portraits/men/32.jpg";
  document.getElementById('winnerText').textContent = "Herzliche Gratulation, " + playerNames[winnerIdx] + "!";
  document.getElementById('winnerMsg').textContent = "Du hast das Spiel (" + startScore + " Double Out) gewonnen!";
  showPage('gameover');
}

showPage('newgame');
