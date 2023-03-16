function permute(): Array<Number> {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i+1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function clearDebuffs(): void {
    let elements = document.getElementsByClassName("party");
    for (var i = 0; i < elements.length; i++) {
        let p = document.getElementById("party" + (i + 1));
        let debuffs = p.getElementsByClassName("debuff");
        for (var j = 0; j < debuffs.length; j++) {
            debuffs[j].classList.remove("dyn1", "dyn2", "dyn3", "near", "distant", "first", "second");
        }
    }
}

function assignSigmaDyn1(): void {
    let shuffle = permute();
    var j = 1;
    shuffle.forEach(function(i) {
        if (j < 7) {
            let p = document.getElementById("party" + i);
            let debuffs = p.getElementsByClassName("debuff");
            for (var k = 0; k < debuffs.length; k++) {
                if (debuffs[k].classList.length > 1) {
                    continue;
                }
                debuffs[k].classList.add("dyn1");
                break;
            }
            j++;
        }
    });
}

function assignOmega1Dyn(): void {
    let shuffle = permute();
    var j = 1;
    shuffle.forEach(function(i) {
        if (j < 5) {
            let p = document.getElementById("party" + i);
            let debuffs = p.getElementsByClassName("debuff");
            for (var k = 0; k < debuffs.length; k++) {
                if (debuffs[k].classList.length > 1) {
                    continue;
                }
                debuffs[k].classList.add("dyn1");
                break;
            }
        } else {
            let p = document.getElementById("party" + i);
            let debuffs = p.getElementsByClassName("debuff");
            for (var k = 0; k < debuffs.length; k++) {
                if (debuffs[k].classList.length > 1) {
                    continue;
                }
                debuffs[k].classList.add("dyn2");
                break;
            }
        }
        j++;
    });
}

function assignSigmaHelloWorld(): void {
    let shuffle = permute();
    let hw = ["", "near", "distant"];
    var j = 1;
    shuffle.forEach(function(i) {
        if (j < 3) {
            let p = document.getElementById("party" + i);
            let debuffs = p.getElementsByClassName("debuff");
            for (var k = 0; k < debuffs.length; k++) {
                if (debuffs[k].classList.length > 1) {
                    continue;
                }
                debuffs[k].classList.add(hw[j]);
                break;
            }
            j++;
        }
    });
}

function assignOmega1HelloWorld(): void {
    let shuffle = permute();
    let hw = ["", "near", "near", "distant", "distant"];
    let il = ["", "first", "second", "first", "second"];
    var j = 1;
    shuffle.forEach(function(i) {
        if (j < 5) {
            let p = document.getElementById("party" + i);
            let debuffs = p.getElementsByClassName("debuff");
            for (var k = 0; k < debuffs.length; k++) {
                if (debuffs[k].classList.length > 1) {
                    continue;
                }
                debuffs[k].classList.add(il[j]);
                debuffs[k+1].classList.add(hw[j]);
                break;
            }
            j++;
        }
    });
}

function assignOmega2Debuffs(): void {
    let shuffle = permute();
    let hw = ["", "", "", "near", "distant"];
    var j = 1;
    shuffle.forEach(function(i) {
            let p = document.getElementById("party" + i);
            let debuffs = p.getElementsByClassName("debuff");
            for (var k = 0; k < debuffs.length; k++) {
                if (debuffs[k].classList.length > 1) {
                    continue;
                }
                if (j < 3) { // Three stacks, no HW
                    debuffs[k].classList.add("dyn3");
                } else if (j < 5) { // Add 2 stacks and HWs
                    debuffs[k].classList.add("dyn2");
                    debuffs[k+1].classList.add("second")
                    debuffs[k+2].classList.add(hw[j]);
                } else { // Add 2 stacks only
                    debuffs[k].classList.add("dyn2");
                }
                break;
            }
            j++;
    });
}

const sigButton = document.querySelector("#sigma");
sigButton.addEventListener("click", (event) => {
    clearAllMarks();
    clearDebuffs();
    assignSigmaDyn1();
    assignSigmaHelloWorld();
});

const om1Button = document.querySelector("#omega1");
om1Button.addEventListener("click", (event) => {
    clearAllMarks();
    clearDebuffs();
    assignOmega1Dyn();
    assignOmega1HelloWorld();
});

const om2Button = document.querySelector("#omega2");
om2Button.addEventListener("click", (event) => {
    clearAllMarks();
    clearDebuffs();
    assignOmega2Debuffs();
})

function clearAllMarks() {
    for (var i = 1; i < 9; i++) {
        clearMark("party" + i);
    }
}

function clearMark(p: string) {
    for (var i = 0; i < attacks.length; i++) {
        if (p === attacks[i]) {
            attacks[i] = "";
            break;
        }
    }
    for (var i = 0; i < binds.length; i++) {
        if (p === binds[i]) {
            binds[i] = "";
            break;
        }
    }
    const party = document.getElementById(p);
    const oldMark = party.getElementsByClassName("mark");
    for (var i = 0; i < oldMark.length; i++) {
        document.getElementById(p).removeChild(oldMark[i]);
    }
}

function markNextAttack(p: string) {
    clearMark(p);
    for (var i = 1; i < attacks.length; i++) {
        if (attacks[i] === "") {
            attacks[i] = p;
            console.log("Attacks: " + attacks);
            let newMark = document.createElement("div");
            newMark.classList.add("mark", "attack" + i);
            document.getElementById(p).appendChild(newMark);
            break;
        }
    }
}

function markNextBind(p) {
    clearMark(p);
    for (var i = 1; i < binds.length; i++) {
        if (binds[i] === "") {
            binds[i] = p;
            console.log("Binds: " + binds);
            let newMark = document.createElement("div");
            newMark.classList.add("mark", "bind" + i);
            document.getElementById(p).appendChild(newMark);
            break;
        }
    }
}

var moParty = 1;
var attacks = ["", "", "", "", "", "", "", "", ""];
var binds = ["", "", "", "", "", "", "", "", ""];

for (var i = 1; i < 9; i++) {
    let j = i;
    document.getElementById("party" + j).addEventListener("mouseover", (event) => { moParty = j; });
}

window.addEventListener("keydown", (event) => {
    if (event.code === "F1") {
        markNextAttack("party" + moParty);
    } else if (event.code === "F2") {
        markNextBind("party" + moParty);
    }
});