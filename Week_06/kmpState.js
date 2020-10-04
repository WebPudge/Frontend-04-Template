
function kmp(pattern){
  const patternLen = pattern.length;
  const dfa = new Array(patternLen).fill(null).map(()=>({}));
  const uniqueKey = [...new Set(pattern.split(''))];
  // 设置初始值
  for(let k of uniqueKey){
    dfa[0][k] = 0;
  }
  // 设置状态1
  dfa[0][pattern[0]]=1;
  // 生成状态表
  for(let x=0,i=1; i < patternLen;i++){
    const c = pattern[i];
    for(let k of uniqueKey){ // 设置失败跳转状态
      dfa[i][k] = dfa[x][k];
    }
    dfa[i][c] = i+1; // 设置字符匹配时的状态
    // 参考 https://zhuanlan.zhihu.com/p/83334559
    x = dfa[x][c]; // 为下一个状态寻找最大相同前缀的状态节点，影子状态
  }
  
  return dfa
}


function match(source, pattern){
    const dfa = kmp(pattern);
    const sourceLen = source.length;
    const patternLen = pattern.length;
    let j = 0
    for (let i = 0; i < sourceLen&& j < patternLen; i++) {
      const c = source[i]
      j = dfa[j][c]?dfa[j][c]:0
    }
    if(j === patternLen){
      return true
    }
    return false
}

console.log(match('abcdabcdabcaabcdabce','abcdaabce'))