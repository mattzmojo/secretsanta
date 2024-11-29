let pairings = {}; // Global variable to store pairings

document.getElementById("generate-btn").addEventListener("click", function() {
    const input = document.getElementById("participants").value.trim();
    const participants = input.split("\n").map(name => name.trim()).filter(name => name);
    const errorMessage = document.getElementById("error-message");

    if (participants.length < 2) {
        errorMessage.innerText = "Please enter at least two participants!";
        return;
    }

    if (participants.length % 2 !== 0) {
        errorMessage.innerText = "The number of participants must be even! Please add or remove a name.";
        return;
    }

    errorMessage.innerText = ""; // Clear any previous error
    pairings = generateSecretSanta(participants);

    document.getElementById("step-1").style.display = "none";
    document.getElementById("step-2").style.display = "block";

    alert("Pairings generated! Participants can now check their pairings individually.");
});

document.getElementById("check-btn").addEventListener("click", function() {
    const name = document.getElementById("participant-name").value.trim();

    if (!name || !pairings[name]) {
        document.getElementById("result").innerText = "Name not found or invalid.";
        return;
    }

    // Display the pairing for the participant
    document.getElementById("result").innerText = `Hi ${name}, you are gifting to: ${pairings[name]} 🎁`;
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
