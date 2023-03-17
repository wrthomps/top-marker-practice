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
    let elements = document.querySelectorAll(".debuff");
    elements.forEach(element => {
        element.remove();
    });
}

function clearAllMarks() {
    for (var i = 1; i < 9; i++) {
        clearMark("party" + i);
    }
}

function clearMark(p: string): void {
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
    const oldMark = party!.getElementsByClassName("mark");
    Array.prototype.forEach.call(oldMark, (om) => om.remove());
}

function assignSigmaDyn1(): void {
    let shuffle = permute();
    var j = 1;
    shuffle.forEach(function(i) {
        if (j < 7) {
            let p = document.getElementById("party" + i);
            let newDebuff = document.createElement("div");
            newDebuff.classList.add("debuff", "dyn1");
            p.appendChild(newDebuff);
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
            let newDebuff = document.createElement("div");
            newDebuff.classList.add("debuff", "dyn1");
            p.appendChild(newDebuff);
        } else {
            let p = document.getElementById("party" + i);
            let newDebuff = document.createElement("div");
            newDebuff.classList.add("debuff", "dyn2");
            p.appendChild(newDebuff);
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
            let newDebuff = document.createElement("div");
            newDebuff.classList.add("debuff", hw[j]);
            p.appendChild(newDebuff);
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
            let newDebuff = document.createElement("div");
            newDebuff.classList.add("debuff", hw[j], il[j]);
            p.appendChild(newDebuff);
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
            let newDebuff = document.createElement("div");
            newDebuff.classList.add("debuff");
            if (j < 3) {
                newDebuff.classList.add("dyn3");
            } else if (j < 5) {
                newDebuff.classList.add("dyn2", "second", hw[j]);
            } else {
                newDebuff.classList.add("dyn2");
            }
            p.appendChild(newDebuff);
            j++;
    });
}

function markNextAttack(p: string) {
    clearMark(p);
    for (var i = 1; i < attacks.length; i++) {
        if (attacks[i] === "") {
            attacks[i] = p;
            let newMark = document.createElement("div");
            newMark.classList.add("mark", "attack" + i);
            let icons = document.getElementById(p)!.getElementsByClassName("icon_container");
            Array.prototype.forEach.call(icons, (icon) => icon.appendChild(newMark));
            break;
        }
    }
}

function markNextBind(p) {
    clearMark(p);
    for (var i = 1; i < binds.length; i++) {
        if (binds[i] === "") {
            binds[i] = p;
            let newMark = document.createElement("div");
            newMark.classList.add("mark", "bind" + i);
            let icons = document.getElementById(p)!.getElementsByClassName("icon_container");
            Array.prototype.forEach.call(icons, (icon) => icon.appendChild(newMark));
            break;
        }
    }
}

var moParty = 1;
var attacks = ["", "", "", "", "", "", "", "", ""];
var binds = ["", "", "", "", "", "", "", "", ""];

for (var i = 1; i < 9; i++) {
    let j = i;
    document.getElementById("party" + j)!.addEventListener("mouseover", (event) => { moParty = j; });
}

window.addEventListener("keydown", (event) => {
    if (event.code === "F1" || event.code === "Digit1") {
        markNextAttack("party" + moParty);
    } else if (event.code === "F2" || event.code === "Digit2") {
        markNextBind("party" + moParty);
    }
});

const sigButton = document.querySelector("#sigma");
sigButton!.addEventListener("click", (event) => {
    clearAllMarks();
    clearDebuffs();
    assignSigmaDyn1();
    assignSigmaHelloWorld();
});

const om1Button = document.querySelector("#omega1");
om1Button!.addEventListener("click", (event) => {
    clearAllMarks();
    clearDebuffs();
    assignOmega1Dyn();
    assignOmega1HelloWorld();
});

const om2Button = document.querySelector("#omega2");
om2Button!.addEventListener("click", (event) => {
    clearAllMarks();
    clearDebuffs();
    assignOmega2Debuffs();
})