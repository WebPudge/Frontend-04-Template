function getUTF8(unicodeBinary){
  let charBinary = unicodeBinary.split('');
  let utf8Binary = []
  // utf8的段个数
  let count = Math.floor(charBinary.length/6);
  if(unicodeBinary%6 !== 0){
    count++;
  }
  for(let i = 1; i < count ;i++){
    const arr = charBinary.splice(-6);
    utf8Binary.unshift(`0b10${arr.join('')}`)
  }
  // 第一位添加
  // 空位补0
  const fill = 8 - count - charBinary.length;
  utf8Binary.unshift(`0b${new Array(count).fill(1).join('')}${new Array(fill).fill(0).join('')}${charBinary.join('')}`)
  return utf8Binary;
}

function UTF8_string(string){
  let binary = [] 
  for(let char of string){
    const unicode = char.charCodeAt(0)
    const utf8 = getUTF8(unicode.toString(2))
    binary = binary.concat(utf8);
  }
  console.log('utf8二进制编码：',binary)
  return Buffer.from(binary)
}

const buffer = UTF8_string('一');
console.log('utf8字符：',buffer.toString('utf8'))
