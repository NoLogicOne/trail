function checkNumber(value) {
  return typeof +value == 'number';
}
function checkArray(value) {
  return typeof value == 'array';
}
function checkFunction(value) {
  return typeof value == 'function';
}
function checkObject(value) {
  return typeof value == 'object';
}
function typeCheck(f, checks) {
  return function() { 
    for (var i = 0; i < arguments.length; i++) {
      if (!checks[i](arguments[i])) {
        log( "Некорректный тип аргумента номер " + i, 'error');
        return;
      }
    }
    return f.apply(this, arguments);
  }
}
