// P40: deferred keyword backlog — enters-tapped (real) · prowess (real) · flash + rare-evasion recognition + import parse.
const {boot}=require('./harness.js');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

ev("fresh('standard')");

// 1) keyword lists
ok(ev("KW_LIST.includes('flash') && KW_LIST.includes('prowess')"), 'KW_LIST gains flash + prowess (creator toggles)');
const rk=ev("(function(){var f=SCRY.buildImportedCard({name:'K',type_line:'Creature — Rogue',oracle_text:'Flash. Prowess. Fear. Shadow. Skulk.',keywords:['Flash','Prowess','Fear','Shadow','Skulk'],power:'2',toughness:'2',colors:['U'],cmc:2,mana_cost:'{1}{U}'});return f.kw;})()");
ok(['flash','prowess','fear','shadow','skulk'].every(k=>rk.indexOf(k)>=0), 'import recognises flash/prowess + rare evasion (kw='+rk.join(',')+')');

// 2) inferEffects parses "enters tapped"
ok(ev("SCRY.inferEffects({oracle_text:'This artifact enters the battlefield tapped.'},'artifact').props.entersTapped")===true, 'inferEffects parses "enters tapped" → props.entersTapped');
ok(ev("!SCRY.inferEffects({oracle_text:'Draw a card.'},'artifact').props.entersTapped"), 'a normal card is not enters-tapped');

// 3) a player creature with entersTapped resolves TAPPED
ev("S.my.creatures=[]");
ev("resolvePlayerItem({ctype:'creature',name:'Guardpost',p:2,t:3,color:['W'],props:{entersTapped:true}})");
ok(ev("S.my.creatures[0].tapped")===true, 'player creature with entersTapped enters the battlefield tapped');
ev("S.my.creatures=[];resolvePlayerItem({ctype:'creature',name:'Normal',p:2,t:2,color:['W'],props:{}})");
ok(ev("S.my.creatures[0].tapped")===false, 'a normal creature enters untapped');

// 4) PROWESS: a noncreature spell buffs your prowess creatures; a creature spell does not; end-of-turn clears it
ev("S.my.creatures=[{id:S.nextId++,name:'Adept',p:2,t:2,baseP:2,baseT:2,kw:['prowess'],color:['U'],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,token:false,dies:'graveyard'}]");
const p0=ev("effP(S.my.creatures[0])");
ev("resolvePlayerItem({ctype:'instant',name:'Bolt',color:['R'],props:{},auto:null})");
ok(ev("effP(S.my.creatures[0])")===p0+1 && ev("effT(S.my.creatures[0])")===p0+1, 'prowess: a noncreature spell gives your prowess creature +1/+1 ('+p0+'→'+ev("effP(S.my.creatures[0])")+')');
// a creature spell does NOT trigger prowess
const p1=ev("effP(S.my.creatures[0])");
ev("resolvePlayerItem({ctype:'creature',name:'Bear',p:2,t:2,color:['G'],props:{}})");
ok(ev("effP(S.my.creatures[0])")===p1, 'a creature spell does NOT trigger prowess');
// end of turn clears the prowess buff
ev("S.over=false;S.paused=false;youEnd()");
ok(ev("effP(S.my.creatures[0])")===2, 'prowess +1/+1 expires at your end step ('+ev("effP(S.my.creatures[0])")+' back to 2)');

// 5) ENEMY prowess: an enemy noncreature spell buffs enemy prowess creatures
ev("S.tokens=[{id:S.nextId++,name:'EAdept',p:2,t:2,baseP:2,baseT:2,kw:['prowess'],color:['R'],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,token:true,dies:'graveyard'}]");
const e0=ev("effP(S.tokens[0])");
ev("S.plays=[{status:'pending',type:'sorcery',n:'Enemy Bolt',run:null,target:null,color:'R'}];resolvePlay(0)");
ok(ev("effP(S.tokens[0])")===e0+1, 'enemy prowess: enemy noncreature spell gives its prowess creature +1/+1 ('+e0+'→'+ev("effP(S.tokens[0])")+')');
// an enemy CREATURE resolve does NOT trigger it
ev("S.tokens[0]._tp=0;S.tokens[0]._tt=0;");const e1=ev("effP(S.tokens[0])");
ev("S.plays=[Object.assign(mkPlay(FX['ogre']),{_card:{key:'ogre'}})];resolvePlay(0)");
ok(ev("effP(S.tokens[0])")===e1, 'an enemy creature card does NOT trigger enemy prowess');

// 5b) review-fix: a prowess buff cast on the OPPONENT's turn expires at THIS turn's end (not a turn later)
ev("fresh('standard');S.activeTurn='vael';S.plays=[]");
ev("S.my.creatures=[{id:S.nextId++,name:'Adept2',p:2,t:2,baseP:2,baseT:2,kw:['prowess'],color:['U'],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,token:false,dies:'graveyard'}]");
ev("resolvePlayerItem({ctype:'instant',name:'Flash Bolt',color:['R'],props:{}})");// player casts during the ENEMY's turn
ok(ev("effP(S.my.creatures[0])")===3, 'prowess fires when you cast on the enemy turn (2→3)');
ev("S.over=false;S.paused=false;vaelEnd()");// the enemy's end step = the CURRENT turn's end
ok(ev("effP(S.my.creatures[0])")===2, 'review-fix: that prowess buff clears at the enemy end step (this turn), not a turn later');
// mirror: an enemy prowess buff created on YOUR turn clears at your end step
ev("fresh('standard');S.activeTurn='you';S.plays=[]");
ev("S.tokens=[{id:S.nextId++,name:'EAdept2',p:2,t:2,baseP:2,baseT:2,kw:['prowess'],color:['R'],plus:0,minus:0,other:[],tapped:false,sick:false,phased:false,token:true,dies:'graveyard'}]");
ev("S.plays=[{status:'pending',type:'instant',n:'E Instant',run:null,target:null,color:'R'}];resolvePlay(0)");
ok(ev("effP(S.tokens[0])")===3, 'enemy prowess fires when it casts on your turn (2→3)');
ev("S.over=false;S.paused=false;youEnd()");
ok(ev("effP(S.tokens[0])")===2, 'review-fix: enemy prowess buff clears at your end step (this turn)');

// 6) full smoke still clean (no regression in resolve paths)
ev("fresh('standard')");let threw=null;try{ev("beginVaelTurn();advancePhase();render()");}catch(e){threw=e.message;}
ok(!threw,'turn cycle still runs after P40'+(threw?': '+threw:''));

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P40 FAILED':'P40 PASSED');
process.exit(fail?1:0);
