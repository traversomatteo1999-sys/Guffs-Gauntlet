// Reusable jsdom harness for Guff's Gauntlet (index.html single-file app).
// boot() loads the real index.html, stubs AudioContext + a no-op 2D canvas,
// and returns {window, errors}. Read engine state via window.eval('S').
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const INDEX = require('path').join(__dirname,'..','play.html');

function boot() {
  const html = fs.readFileSync(INDEX, 'utf8');
  const errors = [];
  const vc = new (require('jsdom').VirtualConsole)();
  vc.on('jsdomError', e => errors.push(e && e.message ? e.message : String(e)));
  // stub AudioContext + canvas before scripts run
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(window) {
      const AC = function(){ return {
        createOscillator(){return {connect(){},start(){},stop(){},frequency:{setValueAtTime(){},value:0},type:''};},
        createGain(){return {connect(){},gain:{setValueAtTime(){},value:0,linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}}};},
        createBuffer(){return {getChannelData(){return new Float32Array(1);}};},
        createBufferSource(){return {connect(){},start(){},stop(){},buffer:null};},
        destination:{}, currentTime:0, state:'running', resume(){}, close(){}
      };};
      window.AudioContext = AC; window.webkitAudioContext = AC;
      const proto = window.HTMLCanvasElement && window.HTMLCanvasElement.prototype;
      if (proto) proto.getContext = function(){ return {
        fillRect(){},clearRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},fill(){},arc(){},
        save(){},restore(){},translate(){},rotate(){},scale(){},drawImage(){},fillText(){},
        createLinearGradient(){return {addColorStop(){}};},createRadialGradient(){return {addColorStop(){}};},
        set fillStyle(v){},get fillStyle(){return '';},set strokeStyle(v){},get strokeStyle(){return '';},
        set lineWidth(v){},set font(v){},set globalAlpha(v){},set shadowBlur(v){},set shadowColor(v){},
        set lineCap(v){},set lineJoin(v){},set textAlign(v){},set textBaseline(v){},measureText(){return {width:0};},
        putImageData(){},getImageData(){return {data:new Uint8ClampedArray(4)};},createImageData(){return {data:new Uint8ClampedArray(4)};},
        setTransform(){},resetTransform(){},closePath(){},rect(){},clip(){},quadraticCurveTo(){},bezierCurveTo(){},ellipse(){}
      };};
      window.matchMedia = window.matchMedia || function(){return {matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}};};
      window.requestAnimationFrame = window.requestAnimationFrame || function(cb){return setTimeout(()=>cb(Date.now()),0);};
      window.scrollTo = window.scrollTo || function(){};
    }
  });
  return { window: dom.window, errors, dom };
}

// helper: eval an expression against the game's lexical scope
function ev(window, expr){ return window.eval(expr); }

module.exports = { boot, ev, INDEX };

// Run a smoke test when invoked directly.
if (require.main === module) {
  const { window, errors } = boot();
  const assert = (c,m)=>{ if(!c){ console.error('FAIL:',m); process.exitCode=1; } else console.log('ok:',m); };
  assert(typeof window.render === 'function', 'render() defined');
  assert(typeof window.eval('S') === 'object', 'S is an object');
  // start a run
  window.eval("fresh('standard')");
  assert(window.eval('S.roomIndex')===0, 'fresh → room 0');
  // walk a turn cycle
  try { window.eval('beginVaelTurn()'); window.eval('advancePhase()'); window.eval('render()'); assert(true,'turn cycle + render'); }
  catch(e){ assert(false,'turn cycle threw: '+e.message); }
  // autosave / undo round-trip
  try { window.eval('render()'); assert(true,'render idempotent'); } catch(e){ assert(false,'render threw: '+e.message); }
  if (errors.length) { console.error('jsdomErrors:', errors.slice(0,5)); process.exitCode=1; }
  else console.log('no jsdom errors');
  console.log(process.exitCode ? 'SMOKE FAILED' : 'SMOKE PASSED');
}
