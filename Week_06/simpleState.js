// 查找abababc
function match(text){
  let state = foundA;
  for(let c of text){
    state = state(c);
  }
  return state === end
}

// 查找a
function foundA(c){
  if(c === 'a'){
    return foundB
  }
  return foundA
}

// 查找b
function foundB(c){
  if(c === 'b'){
    return foundA2
  }
  return foundA(c)
}

// 查找第二个a
function foundA2(c){
  if(c === 'a'){
    return foundB2
  }
  return foundA(c)
}

// 查找第二个b
function foundB2(c){
  if(c === 'b'){
    return foundA3
  }
  return foundA(c)
}

// 查找第三个a
function foundA3(c){
  if(c === 'a'){
    return foundB3
  }
  return foundA(c)
}

// 查找第三个b
function foundB3(c){
  if(c === 'b'){
    return foundC
  }
  return foundA(c)
}

// 查找c
function foundC(c){
  if(c === 'c'){
    return end
  }
  return foundA3(c)
}

function end(){
  return end
}

console.log(match('aabacabababc'))