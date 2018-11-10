function typeCheck(f, checks) {
  var checkers = {
    checkNumber : (value) => {
      return typeof +value == 'number';
    },
    checkArray : (value) => {
      return typeof value == 'array';
    },
    checkFunction : (value) => {
      return typeof value == 'function';
    },
    checkObject : (value) => {
      return typeof value == 'object';
    }
  }

  return function() { 
    for (var i = 0; i < arguments.length; i++) {
      if (!checkers[checks[i]](arguments[i])) {
        log( "Некорректный тип аргумента номер " + i, 'error');
        return;
      }
    }
    return f.apply(this, arguments);
  }
}

export {typeCheck};
