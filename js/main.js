var temperatureDeg = parseFloat(prompt("Введите температуру в градусах по Цельсию", 25));
var temperatureFar = (9 * temperatureDeg) / 5 + 32;
alert(`Температура в градусах по Цельсию: ${temperatureDeg}\r\nТемпература в градусах по Фаренгейту: ${temperatureFar}`);
var name_ = "Василий";
var admin_;
alert(`name: ${name_}\r\nadmin: ${admin_}`);
admin_ = name_;
alert(`name: ${name_}\r\nadmin: ${admin_}`);
alert(`JS-выражение 1000 + "108" будет равно ${1000 + "108"} т.к. движок JS выполнит конкатенацию строк, преобразовав первый аргумент в строку`);