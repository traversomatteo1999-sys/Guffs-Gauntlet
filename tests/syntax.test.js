// Syntax gate: extract every inline <script> from index.html and vm.Script-compile it.
const fs=require('fs'),vm=require('vm'),path=require('path');
const INDEX=require('path').join(__dirname,'..','play.html');
const html=fs.readFileSync(INDEX,'utf8');
const re=/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m,i=0,fail=0;
while((m=re.exec(html))){i++;const code=m[1];if(!code.trim())continue;
  try{new vm.Script(code,{filename:`inline-script-${i}.js`});console.log(`ok: script #${i} (${code.length} chars) compiles`);}
  catch(e){fail++;console.error(`FAIL: script #${i}: ${e.message}`);}
}
console.log(fail?'SYNTAX FAILED':'SYNTAX OK');
process.exit(fail?1:0);
