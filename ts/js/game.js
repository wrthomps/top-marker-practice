function permute() {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8];
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
        clearMark("party" + i);
    }
}
function clearMark(p) {
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
}
function assignSigmaDyn1() {
    var shuffle = permute();
    var j = 1;
    shuffle.forEach(function (i) {
        if (j < 7) {
            var p = document.getElementById("party" + i);
            var newDebuff = document.createElement("div");
            newDebuff.classList.add("debuff", "dyn1");
            p.appendChild(newDebuff);
            j++;
        }
    });
}
function assignOmega1Dyn() {
    var shuffle = permute();
    var j = 1;
    shuffle.forEach(function (i) {
        if (j < 5) {
            var p = document.getElementById("party" + i);
            var newDebuff = document.createElement("div");
            newDebuff.classList.add("debuff", "dyn1");
            p.appendChild(newDebuff);
        }
        else {
            var p = document.getElementById("party" + i);
            var newDebuff = document.createElement("div");
            newDebuff.classList.add("debuff", "dyn2");
            p.appendChild(newDebuff);
        }
        j++;
    });
}
function assignSigmaHelloWorld() {
    var shuffle = permute();
    var hw = ["", "near", "distant"];
    var j = 1;
    shuffle.forEach(function (i) {
        if (j < 3) {
            var p = document.getElementById("party" + i);
            var newDebuff = document.createElement("div");
            newDebuff.classList.add("debuff", hw[j]);
            p.appendChild(newDebuff);
            j++;
        }
    });
}
function assignOmega1HelloWorld() {
    var shuffle = permute();
    var hw = ["", "near", "near", "distant", "distant"];
    var il = ["", "first", "second", "first", "second"];
    var j = 1;
    shuffle.forEach(function (i) {
        if (j < 5) {
            var p = document.getElementById("party" + i);
            var newDebuff = document.createElement("div");
            newDebuff.classList.add("debuff", hw[j], il[j]);
            p.appendChild(newDebuff);
            j++;
        }
    });
}
function assignOmega2Debuffs() {
    var shuffle = permute();
    var hw = ["", "", "", "near", "distant"];
    var j = 1;
    shuffle.forEach(function (i) {
        var p = document.getElementById("party" + i);
        var newDebuff = document.createElement("div");
        newDebuff.classList.add("debuff");
        if (j < 3) {
            newDebuff.classList.add("dyn3");
        }
        else if (j < 5) {
            newDebuff.classList.add("dyn2", "second", hw[j]);
        }
        else {
            newDebuff.classList.add("dyn2");
        }
        p.appendChild(newDebuff);
        j++;
    });
}
function markNextAttack(p) {
    clearMark(p);
    var _loop_2 = function () {
        if (attacks[i] === "") {
            attacks[i] = p;
            var newMark_1 = document.createElement("div");
            newMark_1.classList.add("mark", "attack" + i);
            var icons = document.getElementById(p).getElementsByClassName("icon_container");
            Array.prototype.forEach.call(icons, function (icon) { return icon.appendChild(newMark_1); });
            return "break";
        }
    };
    for (var i = 1; i < attacks.length; i++) {
        var state_1 = _loop_2();
        if (state_1 === "break")
            break;
    }
}
function markNextBind(p) {
    clearMark(p);
    var _loop_3 = function () {
        if (binds[i] === "") {
            binds[i] = p;
            var newMark_2 = document.createElement("div");
            newMark_2.classList.add("mark", "bind" + i);
            var icons = document.getElementById(p).getElementsByClassName("icon_container");
            Array.prototype.forEach.call(icons, function (icon) { return icon.appendChild(newMark_2); });
            return "break";
        }
    };
    for (var i = 1; i < binds.length; i++) {
        var state_2 = _loop_3();
        if (state_2 === "break")
            break;
    }
}
var moParty = 1;
var attacks = ["", "", "", "", "", "", "", "", ""];
var binds = ["", "", "", "", "", "", "", "", ""];
var _loop_1 = function () {
    var j = i;
    document.getElementById("party" + j).addEventListener("mouseover", function (event) { moParty = j; });
};
for (var i = 1; i < 9; i++) {
    _loop_1();
}
window.addEventListener("keydown", function (event) {
    if (event.code === "F1" || event.code === "Digit1") {
        markNextAttack("party" + moParty);
    }
    else if (event.code === "F2" || event.code === "Digit2") {
        markNextBind("party" + moParty);
    }
});
var sigButton = document.querySelector("#sigma");
sigButton.addEventListener("click", function (event) {
    clearAllMarks();
    clearDebuffs();
    assignSigmaDyn1();
    assignSigmaHelloWorld();
});
var om1Button = document.querySelector("#omega1");
om1Button.addEventListener("click", function (event) {
    clearAllMarks();
    clearDebuffs();
    assignOmega1Dyn();
    assignOmega1HelloWorld();
});
var om2Button = document.querySelector("#omega2");
om2Button.addEventListener("click", function (event) {
    clearAllMarks();
    clearDebuffs();
    assignOmega2Debuffs();
});
//# sourceMappingURL=game.js.map