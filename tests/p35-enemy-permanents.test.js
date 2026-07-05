// P35.1: enemy creature CARDS resolve as real non-token permanents (die to gy, recurable); token-makers still spawn tokens.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

const castEnemy=(key,id)=>ev(`(function(){S.plays=[Object.assign(mkPlay(FX['${key}']),{_card:{id:${id||123},key:'${key}'}})];resolvePlay(0);})()`);

// 1) a single-body creature card → real permanent
ev("S.tokens=[]");castEnemy('ogre',1001);
let perm=ev("S.tokens[S.tokens.length-1]");
ok(perm && perm.token===false, 'enemy creature card → real permanent (token:false)');
ok(perm.key==='ogre' && perm.p===4 && perm.t===3, 'carries key + body stats (ogre 4/3)');
ok((perm.kw||[]).indexOf('trample')>=0, 'keywords carried (trample)');
ok(perm.dies==='graveyard', 'dies:graveyard set');

// 2) it dies to the graveyard as a recurable (keyed) card
const gyB=ev("S.gy.length");const pid=perm.id;
ev(`removeRef(S.tokens.find(c=>c.id===${pid}))`);
ok(ev(`S.tokens.some(c=>c.id===${pid})`)===false, 'dead creature left the board');
ok(ev("S.gy.length")===gyB+1, 'real creature death → S.gy (+1)');
ok(ev("S.gy[S.gy.length-1].key")==='ogre', 'gy record carries the key (reanimatable)');

// 3) a multi-spawn creature card → one real body + the rest tokens
ev("S.tokens=[]");castEnemy('warboss',1002); // 4/3 + two 1/1 goblins
ok(ev("S.tokens.filter(c=>!c.token).length")===1, 'multi-spawn: exactly one real body');
ok(ev("S.tokens.filter(c=>!c.token)[0].p")===4, 'the real body is the 4/3 warboss');
ok(ev("S.tokens.filter(c=>c.token).length")===2 && ev("S.tokens.filter(c=>c.token).every(t=>t.token===true)"), 'the two extra goblins are tokens');

// 4) a token-making SORCERY → all tokens (cease on leave)
ev("S.tokens=[]");castEnemy('warband',1003); // sorcery: two 1/1 goblins
ok(ev("S.tokens.length")===2 && ev("S.tokens.every(c=>c.token===true)"), 'token-making sorcery → all tokens');

// 5) selfLoss on a creature card still applies
ev("S.tokens=[];S.youLife=40");castEnemy('torchbearer',1004);
ok(ev("S.youLife")===39, 'creature selfLoss applied (you lose 1)');
ok(ev("S.tokens[0].token")===false, 'the torch body is a real permanent');

// 6) combat AI still works with a real creature; and it bounces to hand (not cease)
ev("S.tokens=[];S.cmd.inPlay=false;S.hand=[]");castEnemy('ogre',1005);
ev("S.tokens.forEach(c=>c.sick=false)");
ok(ev("vaelAttackers().length")>=1, 'a real enemy creature can attack (vaelAttackers)');
const rid=ev("S.tokens[0].id");const hb=ev("S.hand.length");
ev(`moveBoardById('token',${rid},'hand')`);
ok(ev("S.hand.length")===hb+1, 'real enemy creature bounces to HAND (not cease)');

// 7) a spawned TOKEN still ceases on bounce (P33 unchanged)
ev("S.tokens=[];S.hand=[]");ev("applyRun(['spawn','Tok',1,1,[],'R'])");
const tid=ev("S.tokens[0].id");const hb2=ev("S.hand.length");
ev(`moveBoardById('token',${tid},'hand')`);
ok(ev("S.hand.length")===hb2, 'a spawned token still ceases on bounce (no hand entry)');

// 8) a real creature slain via P26 still routes to gy + fires the tithe
ev("S.tokens=[];S.youLife=40;S.boss.life=40");
ev("if(!S.rules.some(r=>r.bloodpact))applyRun(['bloodpact',2])");
castEnemy('ogre',1006);const sid=ev("S.tokens[0].id");const gyB2=ev("S.gy.length"),yl=ev("S.youLife");
ev(`slayTo(${sid},'graveyard')`);
ok(ev("S.gy.length")===gyB2+1, 'slain real creature → S.gy');
ok(ev("S.youLife")<yl, "slay fired the Pit's Tithe");

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P35.1 FAILED':'P35.1 PASSED');
process.exit(fail?1:0);
