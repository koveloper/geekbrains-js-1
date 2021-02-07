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
    console.log(powResults);
}

function lesson_3() {
    let task_1 = ({start = 0, end = 100}) => {
        function isPrimitive_(num) {
            if(num <= 1) {
                return false;
            }
            for(let i = 2; i < num; i++) {
                if((num % i) == 0) {
                    return false;
                }
            }
            return true;
        }
        let numbers = "";
        for(let i = start; i <= end; i++) {
            if(isPrimitive_(i)) {
                numbers += numbers.length ? ("," + i) : ("" + i);
            }
        }
        return numbers;
    };

    let task_2_3 = () => {
        function countBasketPrice(arr) {
            return arr.reduce((acc, el) => {return acc + el;}, 0);
        }
        let basket = [271, 10, 15, 78, 37, 1520, 1999];
        return countBasketPrice(basket);
    };

    let task_4 = () => {
        let result = [];
        for(let i = 0; i < 10; result.push(i), i++){}
        return result;
    };

    let task_5 = () => {
        let result = "";
        for(let i = 1; i <= 20; i++) {
            for(let j = 0; j < i; j++) {
                result += "X";                
            }
            result += "\r\n";
        }        
        return result;
    };

    return {
        task_1,
        task_2_3,
        task_4,
        task_5
    }
}

function lesson_4() {
    let task_1 = (num) => {
        if(num === undefined) {
            while(!num) {
                num = Math.floor(Math.random() * Math.pow(10, Math.floor(Math.random() * 10)));
            }        
        }
        let name = "";
        let obj_ = {
            _num: num,
            toString: baseToStringFunc
        };
        while(num) {
            name = name.length ? (name + "0") : "1";
            obj_["_" + name] = num % 10;
            num = Math.floor(num / 10); 
        }
        console.log(obj_);
        return obj_;
    }
    return {
        task_1
    }
}

/**
 * COMMON USED OBJECTS
 */
function CartItem({product = {}, user = {}, purchase = {}} = {}) {
    if(this != window) {
        this.product = {
            name: "",
            title: "",
            description: "",
            price: 0,
        };
        this.user = {
            account: "",
            name: "",
            phone: "",
            email: "",
            address: "",
        };
        this.purchase = {
            quantity: 1,
            paymentType: "",
            deliveryAddress: ""
        };
        move_ = (dst, src) => {
            for(let k in src) {
                if(k in dst) {
                    dst[k] = src[k];
                }
            }
        }
        this.toString = baseToStringFunc;
        console.log(arguments);
        console.log(this);
        for(let k in this) {
            if(typeof(this[k]) != "function") {
                this[k].toString = baseToStringFunc;
                if(arguments && arguments.length && arguments[0] && k in arguments[0]) {
                    move_(this[k], arguments[0][k]);
                }            
            }
        }
    }
}

function fillCart() {
    return [
        new CartItem({product: {name: "bread", price: 19}, purchase: {quantity: 3}}),
        new CartItem({product: {name: "potato", price: 39}, purchase: {quantity: 5}}),
        new CartItem({product: {name: "butter", price: 120}, purchase: {quantity: 1}}),
    ];
}

let cart = fillCart();
/**
 * COMMON USED FUNCTIONS
 */
function calculateCart(cartItems) {
    return cartItems.reduce((acc, el) => {
        return acc + (el.purchase.quantity * el.product.price);
    }, 0);
}

function baseToStringFunc() {
    let str_ = "";
    for(let k in this) {
        if(k != "_num" && typeof(this[k]) != "function") {
            str_ += (str_.length ? ", " : "") + k + ": " + this[k];
        }
    }
    return this._num + " = {" + str_ + "}"
}

function pretifyJsFunc(func, args, outResult = true) {
    let code = '' + func;
    let html = "<div style='display: flex; flex-direction: column;'>";
    html += "<span style='margin: 8px 0; border: 1px solid gray'></span>";
    let marginStep = 16;
    let margin = 0;
    function wrap(line, margin) {
        line = line.replaceAll("function", "<span style='color: blue'>function</span>");
        line = line.replaceAll("let ", "<span style='color: blue'>let </span>");
        line = line.replaceAll("new ", "<span style='color: blue'>new </span>");
        line = line.replaceAll("for", "<span style='color: magenta'>for</span>");
        line = line.replaceAll("if", "<span style='color: magenta'>if</span>");
        line = line.replaceAll("while", "<span style='color: magenta'>while</span>");
        line = line.replaceAll("return", "<span style='color: brown'>return</span>");
        line = line.replaceAll("true", "<span style='color: cornflowerblue'>true</span>");
        line = line.replaceAll("false", "<span style='color: cornflowerblue'>false</span>");
        return `<span style='margin: 0 0 0 ${margin}px'>${line}</span>`;
    }

    function calc(line, symbol) {
        let n = 0;
        for(let s of line) {
            n+= s == symbol;
        }
        return n;
    }

    for(let line of code.split("\r\n")) {
        if(line.includes("}")) {
            margin -= marginStep * calc(line, '}');
            if(calc(line, '{') == calc(line, '}')) {
                margin += marginStep * calc(line, '{');                
            }
        }
        if(line.includes("]")) {
            margin -= marginStep * calc(line, ']');
            if(calc(line, '[') == calc(line, ']')) {
                margin += marginStep * calc(line, '[');                
            }
        }
        html += wrap(line, margin < 0 ? 0 : margin);
        if(line.includes("{")) {
            margin += marginStep * calc(line, '{');
            if(calc(line, '{') == calc(line, '}')) {
                margin -= marginStep * calc(line, '}');                
            }
        }
        if(line.includes("[")) {
            margin += marginStep * calc(line, '[');
            if(calc(line, '[') == calc(line, ']')) {
                margin -= marginStep * calc(line, ']');                
            }
        }
    }
    if(outResult) {
        html += "<span style='margin: 8px 0; border: 1px solid gray'></span>";
        if(typeof func == "function") {
            html += `<span style="font-weight: 600; color: green">${func(args)}</span>`;
        }        
    }
    return html + "</div>";
}
