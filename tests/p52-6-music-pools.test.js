// P52.6: the 6 newly-added warden soundtracks are wired into MUSIC_POOLS and each entry is a real file.
const {boot}=require('./harness.js');
const fs=require('fs');const path=require('path');
const {window,errors}=boot();
const ev=e=>window.eval(e);
let fail=0; const ok=(c,m)=>{if(!c){console.error('FAIL:',m);fail++;}else console.log('ok:',m);};

// 1. The new tracks are present in the pools.
ok(ev("MUSIC_POOLS.Grakk.indexOf('Burning Flame')>=0 && MUSIC_POOLS.Grakk.indexOf('Gates Of The Ember')>=0"), 'Grakk pool has the 2 new tracks');
ok(ev("MUSIC_POOLS.Murglax.indexOf('Evil Spirits')>=0 && MUSIC_POOLS.Murglax.indexOf('Underground')>=0"), 'Murglax pool has the 2 new tracks');
ok(ev("MUSIC_POOLS.Vael.indexOf('Ashveil Reliquary')>=0 && MUSIC_POOLS.Vael.indexOf('The Hollowing')>=0"), 'Vael pool has the 2 new tracks');
ok(ev("MUSIC_POOLS.Grakk.length===6 && MUSIC_POOLS.Murglax.length===6 && MUSIC_POOLS.Vael.length===6"), 'each warden pool now has 6 tracks');

// 2. Every pool entry maps to a real file on disk (Soundtrack/<Pool>/<track>.mp3).
['Grakk','Murglax','Vael','Menu','Victory'].forEach(pool=>{
  const tracks=ev(`MUSIC_POOLS['${pool}']`);
  tracks.forEach(tk=>{
    const p=path.join(__dirname,'..','Soundtrack',pool,tk+'.mp3');
    ok(fs.existsSync(p), `${pool}/${tk}.mp3 exists on disk`);
  });
});

if(errors.length){console.error('jsdomErrors:',errors.slice(0,5));fail++;}
console.log(fail?'P52.6 FAILED':'P52.6 PASSED');
process.exit(fail?1:0);
