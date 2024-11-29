document.getElementById("generate-btn").addEventListener("click", function() {
    const input = document.getElementById("participants").value.trim();
    const participants = input.split("\n").map(name => name.trim()).filter(name => name);

    if (participants.length < 2) {
        alert("Please enter at least two participants!");
        return;
    }

    const pairings = generateSecretSanta(participants);
    displayResults(pairings);
});

function generateSecretSanta(participants) {
    let givers = [...participants];
    let receivers = [...participants];
    const pairings = {};

    // Shuffle the receivers
    shuffle(receivers);

    // Ensure no one is their own Secret Santa
    while (givers.some((giver, i) => giver === receivers[i])) {
        shuffle(receivers);
    }

    // Assign pairings
    givers.forEach((giver, i) => {
        pairings[giver] = receivers[i];
    });

    return pairings;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayResults(pairings) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h3>Here are the Secret Santa Pairings:</h3>`;
    for (const giver in pairings) {
        resultDiv.innerHTML += `<p><strong>${giver}</strong> -> <strong>${pairings[giver]}</strong></p>`;
    }}
