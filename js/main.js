function lesson_1() {
    var temperatureDeg = parseFloat(prompt("Введите температуру в градусах по Цельсию", 25));
    var temperatureFar = (9 * temperatureDeg) / 5 + 32;
    alert(`Температура в градусах по Цельсию: ${temperatureDeg}\r\nТемпература в градусах по Фаренгейту: ${temperatureFar}`);
    var name_ = "Василий";
    var admin_;
    alert(`name: ${name_}\r\nadmin: ${admin_}`);
    admin_ = name_;
    alert(`name: ${name_}\r\nadmin: ${admin_}`);
    alert(`JS-выражение 1000 + "108" будет равно ${1000 + "108"} т.к. движок JS выполнит конкатенацию строк, преобразовав первый аргумент в строку`);
}

function lesson_2() {
    let a, b;

    function sum(x, y) { return x + y; }

    function multiply(x, y) { return x * y; }

    function diff(x, y) { return x - y; }

    function div(x, y) { return x / y; }

    function makeOperation(x, y, opcode = "sum") {
        switch (opcode) {
            case "sum":
                return sum(x, y);
            case "multiply":
                return multiply(x, y);
            case "diff":
                return diff(x, y);
            case "div":
                return div(x, y);
            default:
                return sum(x, y);
        }
    }
    // let b = parseInt();
    while (Number.isNaN(a = parseInt(prompt("Введите a")))) {}
    while (Number.isNaN(b = parseInt(prompt("Введите b")))) {}
    //
    alert((a >= 0 && b >= 0) ? ("a - b = " + diff(a, b)) : ((a < 0 && b < 0) ? ("a * b = " + multiply(a, b)) : ("a + b = " + sum(a, b))));
    //
    let a_ = a;
    a = a < 0 ? 0 : (a > 15 ? 15 : a);
    if (a != a_) {
        alert("Change a value. New value: " + a);
    }
    let froma = "[a=" + a + " to 15]: ";
    switch (a) {
        case 0:
            froma += "0,";
        case 1:
            froma += "1,";
        case 2:
            froma += "2,";
        case 3:
            froma += "3,";
        case 4:
            froma += "4,";
        case 5:
            froma += "5,";
        case 6:
            froma += "6,";
        case 7:
            froma += "7,";
        case 8:
            froma += "8,";
        case 9:
            froma += "9,";
        case 10:
            froma += "10,";
        case 11:
            froma += "11,";
        case 12:
            froma += "12,";
        case 13:
            froma += "13,";
        case 14:
            froma += "14,";
        case 15:
            froma += "15";
    }
    alert(froma);
    //------------------------------------
    function _pow(val, pow) {
        let nego = pow < 0;
        pow = Math.abs(pow);
        let p = pow == 0 ? 1 : (val * _pow(val, --pow));
        return (nego ? (1 / p) : p);
    }
    let powResults = "";
    let numbers = [2, 4, 10];
    let pows = [0, 2, 3, 16, -1, -2];
    for(let n of numbers) {
        for(let p of pows) {
            powResults += n + " ^ " + p + " = " + _pow(n, p) + "\r\n";
        }    
        powResults += "---------------------------\r\n";
    }
    alert(powResults);
    console.log(powResults);
}