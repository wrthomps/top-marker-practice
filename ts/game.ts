function permuteParty() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    return permute(arr);
}

function permuteBuffs() {
    let arr = ["missionary", "eprog", "holos", "panhaima", "asylum", "brother", "bvoice", "mballad", "mbarrier"]
    return permute(arr);
}

function permute(arr) {
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

function clearAllMarks(): void {
    for (var i = 1; i < 9; i++) {
        clearMark("party" + i, (_e) => false);
    }
}

function clearMark(p: string, validate): void {
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
    if (validate != null) {
        let result = validate.call();
        if (result) {
            console.log(end - start + "ms");
        }
    }
}

function assignSigmaDyn1(): void {
    let shuffle = permuteParty();
    var j = 1;
    shuffle.forEach(function(i) {
        if (j < 7) {
            let p = document.getElementById("party" + i);
            let newDyn = document.createElement("div");
            newDyn.classList.add("debuff", "dyn1");
            p.appendChild(newDyn);
            j++;
        }
    });
}

function assignOmega1Dyn(): void {
    let shuffle = permuteParty();
    var j = 1;
    shuffle.forEach(function(i) {
        if (j < 5) {
            let p = document.getElementById("party" + i);
            let newDyn = document.createElement("div");
            newDyn.classList.add("debuff", "dyn1");
            p.appendChild(newDyn);
        } else {
            let p = document.getElementById("party" + i);
            let newDyn = document.createElement("div");
            newDyn.classList.add("debuff", "dyn2");
            p.appendChild(newDyn);
        }
        j++;
    });
}

function assignSigmaHelloWorld(): void {
    let shuffle = permuteParty();
    let hw = ["", "near", "distant"];
    var j = 1;
    shuffle.forEach(function(i) {
        if (j < 3) {
            let p = document.getElementById("party" + i);
            let newHw = document.createElement("div");
            newHw.classList.add("debuff", hw[j]);
            p.appendChild(newHw);
            j++;
        }
    });
}

function assignOmega1HelloWorld(): void {
    let shuffle = permuteParty();
    let hw = ["", "near", "near", "distant", "distant"];
    let il = ["", "first", "second", "first", "second"];
    var j = 1;
    shuffle.forEach(function(i) {
        if (j < 5) {
            let p = document.getElementById("party" + i);
            let newIl = document.createElement("div");
            newIl.classList.add("debuff", il[j]);
            let newHw = document.createElement("div");
            newHw.classList.add("debuff", hw[j]);
            p.appendChild(newIl);
            p.appendChild(newHw);
            j++;
        }
    });
}

function assignOmega2Debuffs(): void {
    let shuffle = permuteParty();
    let hw = ["", "", "", "near", "distant"];
    var j = 1;
    shuffle.forEach(function(i) {
            let p = document.getElementById("party" + i);
            if (j < 3) {
                let newDyn = document.createElement("div");
                newDyn.classList.add("debuff", "dyn3");
                p.appendChild(newDyn);
            } else if (j < 5) {
                let newDyn = document.createElement("div");
                let newIl = document.createElement("div");
                let newHw = document.createElement("div");
                newDyn.classList.add("debuff", "dyn2");
                newIl.classList.add("debuff", "second");
                newHw.classList.add("debuff", hw[j]);
                p.appendChild(newDyn);
                p.appendChild(newIl);
                p.appendChild(newHw);
            } else {
                let newDyn = document.createElement("div");
                newDyn.classList.add("debuff", "dyn2");
                p.appendChild(newDyn);
            }
            j++;
    });
}

function emptyBuffSlots(p) {
    let children = p.childNodes;
    var slotsFilled = 0;
    children.forEach((node) => {
        if (node.classList && node.classList.contains("debuff")) {
            slotsFilled++;
        }
    })

    return 5 - slotsFilled;
}

function fillRandomBuffs(): void {
    let shuffle = permuteBuffs();
    for (var i = 1; i < 9; i++) {
        var isMedicated = false;
        var buffIndex = 0;
        let p = document.getElementById("party" + i);
        let emptySlots = emptyBuffSlots(p);
        for (var j = 0; j < emptySlots; j++) {
            let newBuff = document.createElement("div");
            newBuff.classList.add("debuff");
            let r = Math.random();
            if (r < 0.07 && !isMedicated) {
                newBuff.classList.add("medicated");
                isMedicated = true;
            } else if (r < 0.3) {
                newBuff.classList.add(getRandomClassBuff(p));
            } else {
                newBuff.classList.add(shuffle[buffIndex]);
                buffIndex++;
            }
            p.appendChild(newBuff);
        }
    }
}

function getRandomClassBuff(p) {
    let cls = p.classList[1];
    var buffs = [];
    switch (cls) {
        case "drk": { buffs = ["sprint", "rampart", "living", "tbn", "oblation"]; break; }
        case "gnb": { buffs = ["sprint", "rampart", "bolide", "shell", "nomercy"]; break; }
        case "whm": { buffs = ["sprint", "lucid", "temp", "thin", "presence"]; break; }
        case "sge": { buffs = ["sprint", "lucid", "swift", "eukrasia", "zoe"]; break; }
        case "nin": { buffs = ["sprint", "length", "suiton", "kassatsu", "tcj"]; break; }
        case "mnk": { buffs = ["sprint", "length", "bloodbath", "ridfire", "leaden"]; break; }
        case "brd": { buffs = ["sprint", "length", "blast", "straight", "raging"]; break; }
        case "rdm": { buffs = ["sprint", "accel", "verstone", "verfire", "manafic"]; break; }
    }

    let existingBuffs = p.getElementsByClassName("debuff");
    if (existingBuffs.length === 5) {
        return null; // We shouldn't ever call this so let's just crash
    }

    var candidate = buffs[Math.floor(Math.random() * 5)];
    while (hasClassName(existingBuffs, candidate)) {
        candidate = buffs[Math.floor(Math.random() * 5)]; // There's a better way to do this but I cba to do it
    }

    return candidate;
}

function hasClassName(els, name) {
    for (var i = 0; i < els.length; i++) {
        if (els[i].classList.contains(name)) {
            return true;
        }
    }
    return false;
}

function validateSigmaComplex() {
    for (var i = 1; i < 5; i++) {
        if (attacks[i] === "") {
            return false;
        }
        let p = document.getElementById(attacks[i]);
        let debuffs = p.getElementsByClassName("debuff");
        for (var j = 0; j < debuffs.length; j++) {
            if (debuffs[j].classList.contains("near") || debuffs[j].classList.contains("distant")) {
                return false;
            }
        }
    }
    for (var i = 1; i < 3; i++) {
        if (binds[i] === "") {
            return false;
        }
        let p = document.getElementById(binds[i]);
        let debuffs = p.getElementsByClassName("debuff");
        var foundDyn = false;
        for (var j = 0; j < debuffs.length; j++) {
            if (debuffs[j].classList.contains("near") || debuffs[j].classList.contains("distant")) {
                return false;
            }
            if (debuffs[j].classList.contains("dyn1")) {
                foundDyn = true;
            }
        }
        if (!foundDyn) {
            return false;
        }
    }
    validationFunction = null;
    end = Date.now();
    let r = document.getElementById("results");
    r.textContent = ((end - start) / 1000) + "s";
    return true;
}

function validateOmega1Complex() {
    for (var i = 1; i < 5; i++) {
        if (attacks[i] === "") {
            return false;
        }
        let p = document.getElementById(attacks[i]);
        let debuffs = p.getElementsByClassName("debuff");
        for (var j = 0; j < debuffs.length; j++) {
            if (debuffs[j].classList.contains("first")) {
                return false;
            }
        }
    }
    for (var i = 1; i < 3; i++) {
        if (binds[i] === "") {
            return false;
        }
        let p = document.getElementById(binds[i]);
        let debuffs = p.getElementsByClassName("debuff");
        var foundDyn = false;
        for (var j = 0; j < debuffs.length; j++) {
            if (debuffs[j].classList.contains("first")) {
                return false;
            }
            if (debuffs[j].classList.contains("dyn2")) {
                foundDyn = true;
            }
        }
        if (!foundDyn) {
            return false;
        }
    }
    validationFunction = null;
    end = Date.now();
    let r = document.getElementById("results");
    r.nodeValue = ((end - start) / 1000) + "s";
    return true;
}

function validateOmega2Complex() {
    for (var i = 1; i < 5; i++) {
        if (attacks[i] === "") {
            return false;
        }
        let p = document.getElementById(attacks[i]);
        let debuffs = p.getElementsByClassName("debuff");
        for (var j = 0; j < debuffs.length; j++) {
            if (debuffs[j].classList.contains("second")) {
                return false;
            }
        }
    }
    for (var i = 1; i < 3; i++) {
        if (binds[i] === "") {
            return false;
        }
        let p = document.getElementById(binds[i]);
        let debuffs = p.getElementsByClassName("debuff");
        var foundDyn = false;
        for (var j = 0; j < debuffs.length; j++) {
            if (debuffs[j].classList.contains("second")) {
                return false;
            }
            if (debuffs[j].classList.contains("dyn3")) {
                foundDyn = true;
            }
        }
        if (!foundDyn) {
            return false;
        }
    }
    validationFunction = null;
    end = Date.now();
    let r = document.getElementById("results");
    r.nodeValue = ((end - start) / 1000) + "s";
    return true;
}

function markNextAttack(p: string, validate) {
    clearMark(p, (_e) => false);
    for (var i = 1; i < attacks.length; i++) {
        if (attacks[i] === "") {
            attacks[i] = p;
            let newMark = document.createElement("div");
            newMark.classList.add("mark", "attack" + i);
            let icons = document.getElementById(p)!.getElementsByClassName("icon_container");
            Array.prototype.forEach.call(icons, (icon) => icon.appendChild(newMark));
            if (validate != null) {
                let result = validate.call();
                if (result) {
                    console.log(end - start + "ms");
                }
            }
            return;
        }
    }
}

function markNextBind(p, validate) {
    clearMark(p, (_e) => false);
    for (var i = 1; i < binds.length; i++) {
        if (binds[i] === "") {
            binds[i] = p;
            let newMark = document.createElement("div");
            newMark.classList.add("mark", "bind" + i);
            let icons = document.getElementById(p)!.getElementsByClassName("icon_container");
            Array.prototype.forEach.call(icons, (icon) => icon.appendChild(newMark));
            if (validate != null) {
                let result = validate.call();
                if (result) {
                    console.log(end - start + "ms");
                }
            }
            return;
        }
    }
}

var moParty = 1;
var attacks = ["", "", "", "", "", "", "", "", ""];
var binds = ["", "", "", "", "", "", "", "", ""];

var validationFunction, start, end;

for (var i = 1; i < 9; i++) {
    let j = i;
    document.getElementById("party" + j)!.addEventListener("mouseover", (event) => { moParty = j; });
}

window.addEventListener("keydown", (event) => {
    if (event.code === "F1" || event.code === "Digit1") {
        markNextAttack("party" + moParty, validationFunction);
    } else if (event.code === "F2" || event.code === "Digit2") {
        markNextBind("party" + moParty, validationFunction);
    } else if (event.code === "F3" || event.code === "Digit3") {
        clearMark("party" + moParty, validationFunction);
    }
});

const sigButton = document.querySelector("#sigma");
sigButton!.addEventListener("click", (event) => {
    validationFunction = validateSigmaComplex;
    start = Date.now();
    let r = document.getElementById("results");
    r.textContent = "";
    clearAllMarks();
    clearDebuffs();
    assignSigmaDyn1();
    assignSigmaHelloWorld();
    fillRandomBuffs();
});

const om1Button = document.querySelector("#omega1");
om1Button!.addEventListener("click", (event) => {
    validationFunction = validateOmega1Complex;
    start = Date.now();
    let r = document.getElementById("results");
    r.textContent = "";
    clearAllMarks();
    clearDebuffs();
    assignOmega1Dyn();
    assignOmega1HelloWorld();
    fillRandomBuffs();
});

const om2Button = document.querySelector("#omega2");
om2Button!.addEventListener("click", (event) => {
    validationFunction = validateOmega2Complex;
    start = Date.now();
    let r = document.getElementById("results");
    r.textContent = "";
    clearAllMarks();
    clearDebuffs();
    assignOmega2Debuffs();
    fillRandomBuffs();
})