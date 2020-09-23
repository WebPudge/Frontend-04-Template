
const numReg = /^0[bB]([01]+)$|^0[oO]([0-7]+)$|^0[xX]([0-9a-fA-F]+)$|^(\d+)$/;
const radixMap = {
  1:2,
  2:8,
  3:16,
  4:10,
}

function checkRadix(str) {
  const result = numReg.exec(str);
  for(let i =1; i < 5; i++){
    if(result[i]){
      return {
        radix:radixMap[i],
        value:result[i]
      }
    }
  }
  return null
}

function stringToNumber(str){
  // 检查参数
  if(typeof str === 'number'){
    return str
  }
  if(typeof str !== 'string'|| !numReg.test(str)){
    return 0
  }
  // 判断进制
  const { radix, value} = checkRadix(str);

  // 数字转换
  let num = 0;
  for(let i = 0; i < value.length;i++){
    const charAscii = value[i].charCodeAt(0);
    let digit = 1; // 使用ascii码求出对应位数数字的值然后求最后的10进制数据
    switch(value[i]){
      case 'a':
      case 'b':
      case 'c':
      case 'd':
      case 'e':
      case 'f': digit = charAscii - 97 + 10;break;
      case 'A':
      case 'B':
      case 'C':
      case 'D':
      case 'E':
      case 'F': digit = charAscii - 65 + 10;break;
      default: digit = charAscii - 48;break;
    }
    num = num + digit*Math.pow(radix,value.length - 1 - i);
  }
  return num
}

function numberToString(number, radix){
  // 效验
  if(typeof number !== 'number'){
    return number
  }
  if(typeof radix !== 'number'){
    throw 'radix is not number'
  }
    // 10进制转换目标进制字符
    let digits = [];
    let divisor = number;
    while(true){
      const curDivisor = divisor/radix;
      let digit = Math.floor(divisor%radix);
      // 无法表示超过26个字母的位数
      if(digit>=36){
        return null;
      }

      if(digit > 9 && digit < 36){
        digit = String.fromCharCode(97 + digit - 10);
      }
   
      digits.push(digit);
      if(Math.floor(curDivisor) === 0){
        break;
      }
      divisor = curDivisor;
    }
    
    return digits.reverse().join('')
}

console.log('0x1AB0字符转数字：',stringToNumber('0x1AB0'))

console.log('0x1AB0数字转三十进制字符：',numberToString(0x1AB0,30))