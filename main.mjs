import * as rl from 'readline';

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
  });


const people = [
    {
        "name": "michael jackson",
        "tips": [
            "is a singer",
            "is dead"
        ],
        "hasBeenPlayed": false
    },
    {
        "name": "justin bieber",
        "tips": [
            "has a song named 'Baby'",
            "probably was abused"
        ],
        "hasBeenPlayed": false

    }

]

let totalPoints = 0;
let roundPointsStart = 15;

start();

async function start() {
    while (true) {
        await askCategory();

        console.log(`\nYou have ${totalPoints} points`);
    }

}

async function askCategory() {
    await new Promise((res) => {
        readline.question("What category do you want to play?\n0- Exit\n1 - Famous people\n", async (answer) => {
            answer = parseInt(answer);
            
            switch (answer) {
                case 0:
                    readline.close();
                    return;
                case 1:
                    console.log(); // Breaking line
                    await playPersonRound();
                    res()
                    break;
            }
        })
    });

}

async function playPersonRound() {
    let currentRoundPoints = roundPointsStart;
    let gotRight = false;
    let chosenPerson = getPerson();
    let tipIndex = 1;

    for (let tip of chosenPerson.tips) {
        if (gotRight) {
            break;
        }

        await new Promise((res) => {
            readline.question(`Tip ${tipIndex}: ${tip}\n`, answer => {
                if (answer.toLowerCase() == chosenPerson.name) {
                    console.log(`Well done! You got ${currentRoundPoints} points`)
                    totalPoints += currentRoundPoints;
                    gotRight = true;
                    res();
                } else {
                    currentRoundPoints--;
                    tipIndex++;
                    res();
                }

            })
        })
    }
}

function getPerson() {
    let randomNumber = Math.floor(Math.random() * people.length);
    let unplayedPeople = people.filter((p) => !p.hasBeenPlayed);
    
    if (unplayedPeople.length == 0) {
        throw new Error("No more people to play guess");
    }

    let chosenPerson = unplayedPeople[randomNumber]

    people.find((p) => p.name == chosenPerson.name).hasBeenPlayed = true;

    return chosenPerson;
}