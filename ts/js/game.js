function permuteParty() {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8];
    return permute(arr);
}
function permuteBuffs() {
    var arr = ["missionary", "eprog", "holos", "panhaima", "asylum", "brother", "bvoice", "mballad", "mbarrier"];
    return permute(arr);
}
function permute(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
function clearDebuffs() {
    var elements = document.querySelectorAll(".debuff");
    elements.forEach(function (element) {
        element.remove();
    });
}
function clearAllMarks() {
    for (var i = 1; i < 9; i++) {
        clearMark("party" + i, function (_e) { return false; });
    }
}
function clearMark(p, validate) {
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
    var party = document.getElementById(p);
    var oldMark = party.getElementsByClassName("mark");
    Array.prototype.forEach.call(oldMark, function (om) { return om.remove(); });
    if (validate != null) {
        var result = validate.call();
        if (result) {
            console.log(end - start + "ms");
        }
    }
}
function assignSigmaDyn1() {
    var shuffle = permuteParty();
    var j = 1;
    shuffle.forEach(function (i) {
        if (j < 7) {
            var p = document.getElementById("party" + i);
            var newDyn = document.createElement("div");
            newDyn.classList.add("debuff", "dyn1");
            p.appendChild(newDyn);
            j++;
        }
    });
}
function assignOmega1Dyn() {
    var shuffle = permuteParty();
    var j = 1;
    shuffle.forEach(function (i) {
        if (j < 5) {
            var p = document.getElementById("party" + i);
            var newDyn = document.createElement("div");
            newDyn.classList.add("debuff", "dyn1");
            p.appendChild(newDyn);
        }
        else {
            var p = document.getElementById("party" + i);
            var newDyn = document.createElement("div");
            newDyn.classList.add("debuff", "dyn2");
            p.appendChild(newDyn);
        }
        j++;
    });
}
function assignSigmaHelloWorld() {
    var shuffle = permuteParty();
    var hw = ["", "near", "distant"];
    var j = 1;
    shuffle.forEach(function (i) {
        if (j < 3) {
            var p = document.getElementById("party" + i);
            var newHw = document.createElement("div");
            newHw.classList.add("debuff", hw[j]);
            p.appendChild(newHw);
            j++;
        }
    });
}
function assignOmega1HelloWorld() {
    var shuffle = permuteParty();
    var hw = ["", "near", "near", "distant", "distant"];
    var il = ["", "first", "second", "first", "second"];
    var j = 1;
    shuffle.forEach(function (i) {
        if (j < 5) {
            var p = document.getElementById("party" + i);
            var newIl = document.createElement("div");
            newIl.classList.add("debuff", il[j]);
            var newHw = document.createElement("div");
            newHw.classList.add("debuff", hw[j]);
            p.appendChild(newIl);
            p.appendChild(newHw);
            j++;
        }
    });
}
function assignOmega2Debuffs() {
    var shuffle = permuteParty();
    var hw = ["", "", "", "near", "distant"];
    var j = 1;
    shuffle.forEach(function (i) {
        var p = document.getElementById("party" + i);
        if (j < 3) {
            var newDyn = document.createElement("div");
            newDyn.classList.add("debuff", "dyn3");
            p.appendChild(newDyn);
        }
        else if (j < 5) {
            var newDyn = document.createElement("div");
            var newIl = document.createElement("div");
            var newHw = document.createElement("div");
            newDyn.classList.add("debuff", "dyn2");
            newIl.classList.add("debuff", "second");
            newHw.classList.add("debuff", hw[j]);
            p.appendChild(newDyn);
            p.appendChild(newIl);
            p.appendChild(newHw);
        }
        else {
            var newDyn = document.createElement("div");
            newDyn.classList.add("debuff", "dyn2");
            p.appendChild(newDyn);
        }
        j++;
    });
}
function emptyBuffSlots(p) {
    var children = p.childNodes;
    var slotsFilled = 0;
    children.forEach(function (node) {
        if (node.classList && node.classList.contains("debuff")) {
            slotsFilled++;
        }
    });
    return 5 - slotsFilled;
}
function fillRandomBuffs() {
    var shuffle = permuteBuffs();
    for (var i = 1; i < 9; i++) {
        var isMedicated = false;
        var buffIndex = 0;
        var p = document.getElementById("party" + i);
        var emptySlots = emptyBuffSlots(p);
        for (var j = 0; j < emptySlots; j++) {
            var newBuff = document.createElement("div");
            newBuff.classList.add("debuff");
            var r = Math.random();
            if (r < 0.07 && !isMedicated) {
                newBuff.classList.add("medicated");
                isMedicated = true;
            }
            else if (r < 0.3) {
                newBuff.classList.add(getRandomClassBuff(p));
            }
            else {
                newBuff.classList.add(shuffle[buffIndex]);
                buffIndex++;
            }
            p.appendChild(newBuff);
        }
    }
}
function getRandomClassBuff(p) {
    var cls = p.classList[1];
    var buffs = [];
    switch (cls) {
        case "drk": {
            buffs = ["sprint", "rampart", "living", "tbn", "oblation"];
            break;
        }
        case "gnb": {
            buffs = ["sprint", "rampart", "bolide", "shell", "nomercy"];
            break;
        }
        case "whm": {
            buffs = ["sprint", "lucid", "temp", "thin", "presence"];
            break;
        }
        case "sge": {
            buffs = ["sprint", "lucid", "swift", "eukrasia", "zoe"];
            break;
        }
        case "nin": {
            buffs = ["sprint", "length", "suiton", "kassatsu", "tcj"];
            break;
        }
        case "mnk": {
            buffs = ["sprint", "length", "bloodbath", "ridfire", "leaden"];
            break;
        }
        case "brd": {
            buffs = ["sprint", "length", "blast", "straight", "raging"];
            break;
        }
        case "rdm": {
            buffs = ["sprint", "accel", "verstone", "verfire", "manafic"];
            break;
        }
    }
    var existingBuffs = p.getElementsByClassName("debuff");
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
function validateSigmaSimple() {
    for (var i = 1; i < 4; i++) {
        if (attacks[i] === "") {
            return false;
        }
        var p = document.getElementById(attacks[i]);
        var debuffs = p.getElementsByClassName("debuff");
        for (var j = 0; j < debuffs.length; j++) {
            if (debuffs[j].classList.contains("near") || debuffs[j].classList.contains("distant")) {
                return false;
            }
        }
    }
    validationFunction = null;
    end = Date.now();
    var r = document.getElementById("results");
    r.textContent = ((end - start) / 1000) + "s";
    return true;
}
function validateSigmaComplex() {
    for (var i = 1; i < 5; i++) {
        if (attacks[i] === "") {
            return false;
        }
        var p = document.getElementById(attacks[i]);
        var debuffs = p.getElementsByClassName("debuff");
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
        var p = document.getElementById(binds[i]);
        var debuffs = p.getElementsByClassName("debuff");
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
    var r = document.getElementById("results");
    r.textContent = ((end - start) / 1000) + "s";
    return true;
}
function validateOmega1Simple() {
    var dyn2seconds = [];
    for (var i = 1; i < 9; i++) {
        var p = document.getElementById("party" + i);
        var debuffs = p.getElementsByClassName("debuff");
        var second = false;
        var dyn2 = false;
        for (var j = 0; j < debuffs.length; j++) {
            if (debuffs[j].classList.contains("second")) {
                second = true;
            }
            if (debuffs[j].classList.contains("dyn2")) {
                dyn2 = true;
            }
        }
        if (second && dyn2) {
            dyn2seconds.push("party" + i);
        }
    }
    for (var i = 0; i < dyn2seconds.length; i++) {
        var p = document.getElementById(dyn2seconds[i]);
        var marks = p.getElementsByClassName("mark");
        if (!marks || marks.length == 0) {
            return false;
        }
        for (var j = 0; j < marks.length; j++) {
            if (!marks[j].classList.contains("bind1") && !marks[j].classList.contains("bind2")) {
                return false;
            }
        }
    }
    for (var i = 1; i < 3; i++) {
        if (attacks[i] === "") {
            return false;
        }
        var p = document.getElementById(attacks[i]);
        var debuffs = p.getElementsByClassName("debuff");
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
        var p = document.getElementById(binds[i]);
        var debuffs = p.getElementsByClassName("debuff");
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
    var r = document.getElementById("results");
    r.textContent = ((end - start) / 1000) + "s";
    return true;
}
function validateOmega1Complex() {
    for (var i = 1; i < 5; i++) {
        if (attacks[i] === "") {
            return false;
        }
        var p = document.getElementById(attacks[i]);
        var debuffs = p.getElementsByClassName("debuff");
        var second = false;
        var dyn2 = false;
        for (var j = 0; j < debuffs.length; j++) {
            if (debuffs[j].classList.contains("first")) {
                return false;
            }
            if (debuffs[j].classList.contains("second")) {
                second = true;
            }
            if (debuffs[j].classList.contains("dyn2")) {
                dyn2 = true;
            }
        }
        if (second && dyn2) {
            return false;
        }
    }
    for (var i = 1; i < 3; i++) {
        if (binds[i] === "") {
            return false;
        }
        var p = document.getElementById(binds[i]);
        var debuffs = p.getElementsByClassName("debuff");
        var foundDyn = false;
        for (var j = 0; j < debuffs.length; j++) {
            if (debuffs[j].classList.contains("first")) {
                return false;
            }
            if (debuffs[j].classList.contains("dyn1")) {
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
    var r = document.getElementById("results");
    r.textContent = ((end - start) / 1000) + "s";
    return true;
}
function validateOmega2Simple() {
    for (var i = 1; i < 3; i++) {
        if (attacks[i] === "") {
            return false;
        }
        var p = document.getElementById(attacks[i]);
        var debuffs = p.getElementsByClassName("debuff");
        for (var j = 0; j < debuffs.length; j++) {
            if (debuffs[j].classList.contains("second") || debuffs[j].classList.contains("dyn3")) {
                return false;
            }
        }
    }
    for (var i = 1; i < 3; i++) {
        if (binds[i] === "") {
            return false;
        }
        var p = document.getElementById(binds[i]);
        var debuffs = p.getElementsByClassName("debuff");
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
    var r = document.getElementById("results");
    r.textContent = ((end - start) / 1000) + "s";
    return true;
}
function validateOmega2Complex() {
    for (var i = 1; i < 5; i++) {
        if (attacks[i] === "") {
            return false;
        }
        var p = document.getElementById(attacks[i]);
        var debuffs = p.getElementsByClassName("debuff");
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
        var p = document.getElementById(binds[i]);
        var debuffs = p.getElementsByClassName("debuff");
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
    var r = document.getElementById("results");
    r.textContent = ((end - start) / 1000) + "s";
    return true;
}
function markNextAttack(p, validate) {
    var _loop_2 = function () {
        if (attacks[i] === "") {
            clearMark(p, function (_e) { return false; });
            attacks[i] = p;
            var newMark_1 = document.createElement("div");
            newMark_1.classList.add("mark", "attack" + i);
            var icons = document.getElementById(p).getElementsByClassName("icon_container");
            Array.prototype.forEach.call(icons, function (icon) { return icon.appendChild(newMark_1); });
            if (validate != null) {
                var result = validate.call();
                if (result) {
                    console.log(end - start + "ms");
                }
            }
            return { value: void 0 };
        }
    };
    for (var i = 1; i < attacks.length; i++) {
        var state_1 = _loop_2();
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
function markNextBind(p, validate) {
    var _loop_3 = function () {
        if (binds[i] === "") {
            clearMark(p, function (_e) { return false; });
            binds[i] = p;
            var newMark_2 = document.createElement("div");
            newMark_2.classList.add("mark", "bind" + i);
            var icons = document.getElementById(p).getElementsByClassName("icon_container");
            Array.prototype.forEach.call(icons, function (icon) { return icon.appendChild(newMark_2); });
            if (validate != null) {
                var result = validate.call();
                if (result) {
                    console.log(end - start + "ms");
                }
            }
            return { value: void 0 };
        }
    };
    for (var i = 1; i < binds.length; i++) {
        var state_2 = _loop_3();
        if (typeof state_2 === "object")
            return state_2.value;
    }
}
var moParty = 1;
var attacks = ["", "", "", "", "", ""];
var binds = ["", "", "", ""];
var validationFunction, start, end;
var _loop_1 = function () {
    var j = i;
    document.getElementById("party" + j).addEventListener("mouseover", function (event) { moParty = j; });
};
for (var i = 1; i < 9; i++) {
    _loop_1();
}
window.addEventListener("keydown", function (event) {
    if (event.code === "Digit1") {
        markNextAttack("party" + moParty, validationFunction);
    }
    else if (event.code === "Digit2") {
        markNextBind("party" + moParty, validationFunction);
    }
    else if (event.code === "Digit3") {
        clearMark("party" + moParty, validationFunction);
    }
});
var sigButton = document.querySelector("#sigma");
sigButton.addEventListener("click", function (event) {
    validationFunction = document.querySelector("#sigma_rules").checked ?
        validateSigmaComplex : validateSigmaSimple;
    start = Date.now();
    var r = document.getElementById("results");
    r.textContent = "-.---s";
    clearAllMarks();
    clearDebuffs();
    assignSigmaDyn1();
    assignSigmaHelloWorld();
    fillRandomBuffs();
});
var om1Button = document.querySelector("#omega1");
om1Button.addEventListener("click", function (event) {
    validationFunction = document.querySelector("#omega1_rules").checked ?
        validateOmega1Complex : validateOmega1Simple;
    start = Date.now();
    var r = document.getElementById("results");
    r.textContent = "-.---s";
    clearAllMarks();
    clearDebuffs();
    assignOmega1Dyn();
    assignOmega1HelloWorld();
    fillRandomBuffs();
});
var om2Button = document.querySelector("#omega2");
om2Button.addEventListener("click", function (event) {
    validationFunction = document.querySelector("#omega2_rules").checked ?
        validateOmega2Complex : validateOmega2Simple;
    start = Date.now();
    var r = document.getElementById("results");
    r.textContent = "-.---s";
    clearAllMarks();
    clearDebuffs();
    assignOmega2Debuffs();
    fillRandomBuffs();
});
//# sourceMappingURL=game.js.map