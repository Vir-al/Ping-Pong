const populateExistingScores = () => {
    let existingScore = document.querySelector('.existing-score')
    let tbody = document.querySelector('.existing-score tbody')
    let tbodyElements = document.querySelectorAll('.existing-score tbody tr')
    tbodyElements.forEach(e => e.remove())
    let player1name = document.querySelector('.existing-score .player-1-name')
    let player2name = document.querySelector('.existing-score .player-2-name')
    player1name.innerHTML = gPlayer1Name
    player2name.innerHTML = gPlayer2Name
    let scores = getCookieValue('scores')
    try {
        scores = JSON.parse(scores)
    } catch {
        console.log('Nothing to do')
    }
    if (scores.length) {
        existingScore.classList.remove('hidden')
        scores.forEach(item => {
            let newRow = tbody.insertRow()
            let p1 = newRow.insertCell(0)
            let p2 = newRow.insertCell(1)
            p1.appendChild(document.createTextNode(item.player1Score))
            p2.appendChild(document.createTextNode(item.player2Score))
        })
    } else {
        existingScore.classList.add('hidden')
    }
}

const hideExistingScores = () => {
    let existingScore = document.querySelector('.existing-score')
    existingScore.classList.add('hidden')
}