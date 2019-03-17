// a basic javascript calculator
// there's the option for a secondary screen which is commented out by design choice

// main display;
var disp = "";
// secondary display;
var disp2 = "";
// current waiting operation;
var opside = "";
// last entry for operation;
var lastentry = "";

// numbers;

// buttons;
var buts = document.querySelectorAll("#num");

// global variables (unfortunately) for screen value and decimal status;
var sc1 = "";
var dot = "";

// event listener for each numerical button;
buts.forEach((i) => i.addEventListener("click", () => upd(i.innerHTML)));

// event listeners for operation buttons;
document.querySelector("#plus").addEventListener("click", () => { operator("+") });
document.querySelector("#minus").addEventListener("click", () => { operator("-") });
document.querySelector("#times").addEventListener("click", () => { operator("*") });
document.querySelector("#divide").addEventListener("click", () => { operator("/") });
document.querySelector("#equals").addEventListener("click", equals);
document.querySelector("#Escape").addEventListener("click", clear);
document.querySelector("#dot").addEventListener("click", dotter);
document.querySelector("#backspace").addEventListener("click", bsp);
document.querySelector("#√").addEventListener("click", sqrt);
document.querySelector("#pm").addEventListener("click", pm);


// function for updating display when numeric buttons pressed;
function upd(x) {
    if (disp.toString().length >= 12) {
        return;
    }

    // to start a new number after an operation;
    if (disp === "" && dot !== ".") {
        document.querySelector("#disp").innerHTML = disp;
    }
    // updating display;
    //for writing numbers such as 0.8001;
    if (x == 0) {
        sc1 = document.querySelector("#disp").innerHTML;
        sc1 = sc1 + "0";
        document.querySelector("#disp").innerHTML = sc1;
        disp = parseFloat(sc1);
        return
    }
    //remaining numbers;
    sc1 = document.querySelector("#disp").innerHTML;
    sc1 = sc1 + x;
    disp = parseFloat(sc1);
    document.querySelector("#disp").innerHTML = disp;
}

// basic operation functions;
function add(x, y) {
    // no new number entered, just changes the waiting operation;
    if (disp == "") {
        document.querySelector("#opside").innerHTML = "+";
        opside = "+";
    }
    // does the operation, displays result, empties disp;
    else {
        var result = x + y;
        lastentry = disp;
        disp = "";
        disp2 = result;
        // to display a limited number of digits;
        if (result.toString().length > 18) {
            result = result.toExponential(10);
        }
        document.querySelector("#disp").innerHTML = result;
        //document.querySelector("#disp2").innerHTML = lastentry;
        document.querySelector("#opside").innerHTML = "+";
        opside = "+";
    }
}

// same logic
function sub(x, y) {
    if (disp == "") {
        document.querySelector("#opside").innerHTML = "-";
        opside = "-";
    } else {
        var result = x - y;
        lastentry = disp;
        disp = "";
        disp2 = result;
        // to display a limited number of digits;
        if (result.toString().length > 18) {
            result = result.toExponential(10);
        }
        document.querySelector("#disp").innerHTML = result;
        //document.querySelector("#disp2").innerHTML = lastentry;
        document.querySelector("#opside").innerHTML = "-";
        opside = "-";
    }
}

//same logic
function mul(x, y) {
    if (disp == "") {
        document.querySelector("#opside").innerHTML = "*";
        opside = "*";
    } else {
        var result = x * y;
        lastentry = disp;
        disp = "";
        disp2 = result;
        // to display a limited number of digits;
        if (result.toString().length > 18) {
            result = result.toExponential(10);
        }
        document.querySelector("#disp").innerHTML = result;
        // document.querySelector("#disp2").innerHTML = lastentry;
        document.querySelector("#opside").innerHTML = "*";
        opside = "*";
    }
}

//same logic
function divide(x, y) {
    if (y == "0") {
        alert("A singularity is created somewhere!")
        clear();
    } else if (disp == "") {
        document.querySelector("#opside").innerHTML = "/";
        opside = "/";
    } else {
        var result = (x / y);
        lastentry = disp;
        disp = "";
        disp2 = result;
        if (result.toString().length > 18) {
            result = result.toExponential(10);
        }

        document.querySelector("#disp").innerHTML = result;
        //document.querySelector("#disp2").innerHTML = lastentry;
        document.querySelector("#opside").innerHTML = "/";
        opside = "/";
    }
}

// backspace function
function bsp() {
    if (disp !== "" && (sc1.toString()).length > 1) {
        sc1 = sc1.toString();
        var arr = sc1.split("");
        arr.pop();
        sc1 = parseFloat(arr.join(""));
        disp = sc1;
        document.querySelector("#disp").innerHTML = disp;
    }
}

// squareroot function
function sqrt() {
    var n = parseFloat(document.querySelector("#disp").innerHTML);
    if (n >= 0) {
        result = (Math.pow(n, 0.5));
        if (result.toString().length > 18) {
            result = result.toExponential(10);
        }
        document.querySelector("#disp").innerHTML = result;
        disp = parseFloat(document.querySelector("#disp").innerHTML);
    }
}

// sign change (plusminus) function
function pm() {
    var n = document.querySelector("#disp").innerHTML;
    n = n * (-1);
    document.querySelector("#disp").innerHTML = n;
    disp = parseFloat(document.querySelector("#disp").innerHTML);
}

// adds a dot for decimal calculations;
function dotter() {
    // when clicked "." just after choosing an operation, empty display;
    if ((typeof disp2 != "string" && opside !== "") && (disp === "" && dot === "")) {
        document.querySelector("#disp").innerHTML = "";
    }
    // normal decimal addition;
    if (dot === "") {
        sc1 = document.querySelector("#disp").innerHTML;
        sc1 = sc1 + ".";
        document.querySelector("#disp").innerHTML = sc1;
        dot = ".";
    }
}

// reset function;
function clear() {
    document.querySelector("#disp").innerHTML = 0;
    // document.querySelector("#disp2").innerHTML="";
    document.querySelector("#opside").innerHTML = "";
    disp = "";
    disp2 = "";
    lastentry = 0;
    dot = "";
}

// equals button function;
function equals() {
    if (typeof disp != "string" && typeof disp2 != "string") {
        operator(opside);
    } else if (disp === "" && disp2 !== "") {
        disp = lastentry;
        operator(opside);
    }
}

// operator function for operation buttons;
function operator(op) {
    // if secondary display is empty, carries main display to there;
    if (typeof disp2 == "string") {
        disp2 = disp;
        // document.querySelector("#disp2").innerHTML=disp2;
        lastentry = disp;
        disp = "";

        // updates current operator;
        opside = op;
        document.querySelector("#opside").innerHTML = opside;
        dot = "";
    }
    // if there's already an operator selected, and there's a number on disp, first it
    // calculates the previously selected operator and adds new op to waiting operator;
    else if (opside != op && disp != "") {
        if (opside == "+") {
            add(disp, disp2);
            document.querySelector("#opside").innerHTML = op;
            opside = op;
            dot = "";

        } else if (opside == "-") {
            sub(disp2, disp);
            document.querySelector("#opside").innerHTML = op;
            opside = op;
            dot = "";
        } else if (opside == "/") {
            divide(disp2, disp);
            document.querySelector("#opside").innerHTML = op;
            opside = op;
            dot = "";
        } else if (opside == "*") {
            mul(disp, disp2);
            document.querySelector("#opside").innerHTML = op;
            opside = op;
            dot = "";
        }
    }
    // to make normal operations;
    else {
        if (op == "+") {
            add(disp, disp2);
            dot = "";
        } else if (op == "-") {
            sub(disp2, disp);
            dot = "";
        } else if (op == "/") {
            divide(disp2, disp);
            dot = "";
        } else if (op == "*") {
            mul(disp, disp2);
            dot = "";
        }
    }
}

function expo(dis) {
    dis = dis.toString()
    if (dis.length >= 15) {

    }
}

// keyboard support;
document.addEventListener("keydown", function(e) {
    var nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var gums = ["+", "-", "*", "/"];
    if (nums.includes(e.key)) {
        upd(e.key);
    } else if (gums.includes(e.key)) {
        operator(e.key);
    } else if (e.key === "Escape") {
        clear();
    } else if (e.key === "." || e.key === ",") {
        dotter();
    } else if (e.key === "Enter") {
        equals();
    } else if (e.key === "Backspace" || e.key === "Delete") {
        bsp();
    }
});

// adding button animation with a class, and then removing it to use again;
// removing focus from buttons for easier keyboard use;
var m = document.querySelectorAll("button");

m.forEach((i) => i.addEventListener("click", () => {
    i.classList.add("animated")
    setTimeout(function() {
        document.querySelector(".animated").classList.remove("animated");
    }, 100);
}));

m.forEach((i) => i.onfocus = function() { this.blur() });