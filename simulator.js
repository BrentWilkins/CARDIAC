// Attach event listeners to buttons
var el = document.getElementById("step");
el.addEventListener("click", doStep);
el = document.getElementById("run");
el.addEventListener("click", doDelayRun);
el = document.getElementById("stop");
el.addEventListener("click", doStop);
el = document.getElementById("reset");
el.addEventListener("click", doReset);

// Speed slider
function changeDelay(newValue) {
  // 0 delay == 100% 2K delay == 10%
  delay = (100-newValue)*20;
  clearInterval(timerId);
  timerId = setInterval(doRun, delay);
  document.getElementById("delayValue").innerHTML = newValue;
}

function doReset()
{
  doStop();
  highlightAddr(00)
  pc = 0;
  acEl.value = "0000";
  pcEl.value = "00";
  instEl.value   = "";
  outputEl.value = "";
}

function doStop()
{
  mode = 0;
}

function doRun()
{
  if(mode == 0)
    clearInterval(timerId);
  else
    doStep();
}

function doDelayRun()
{
 mode = 1;
 timerId = setInterval(doRun, delay);
}

function loadInput() {
  inputs = document.getElementById("input").value.split("\n");
  inIndex = 0;
}

function store(addr, val)
{
  document.getElementById("mem"+pad(addr, 2)).value = pad(val,3);
}

function fetch(addr)
{
  return Number(document.getElementById('mem'+pad(addr, 2)).value);
}

function highlightAddr(addr)
{
  clearHighlight()
  addrElPP = document.getElementById("mem"+pad(addr, 2)).parentElement.parentElement;
  addrElPP.classList.add("has-warning");
}

function highlightOP(inst)
{
    if(lastOP) {
      lastOP.classList.remove("info");
    }
    lastOP = document.getElementById(inst);
    lastOP.classList.add("info");
}

function clearHighlight()
{
  if(addrElPP) {
    addrElPP.classList.remove("has-warning");
  }
}

///////////////////////////////////////////////////////////////////////////////
// Single step
///////////////////////////////////////////////////////////////////////////////
function doStep() {
  loadInput(); // (Re)load input tape
  // Read current memory cell marked by PC to get opcode and address
  var currentCell = document.getElementById("mem"+pad(pc, 2));
  inst = currentCell.value;
  instEl.value = pad(inst, 3);
  var op = Math.floor(inst / 100);
  var addr = inst % 100;
  
  // Increment PC and update UI
  pcEl.value = pad(++pc, 2);
  currentCell.parentElement.parentElement.classList.remove("has-success");

  switch(op) {
  case 0:  // INP - Input (take value from input and put in memory
    if(inIndex >= inputs.length || inputs[inIndex] == '') {
      mode = 0;
      pc = 0;
    }
    else {
      store(addr, Number(inputs[inIndex]));
      inIndex++;
      input.value = '';
      for(i = inIndex; i < inputs.length; ++i)
        input.value += inputs[i]+'\n';
    }
    // Highlight last instruction run
    highlightOP("INP");
    highlightAddr(addr);
    break;
  case 1:  // CLA - Clear and add (load)
    ac = fetch(addr);
    acEl.value = pad(ac, 4);
    // Highlight last instruction run
    highlightOP("CLA");
    highlightAddr(addr);
    break;
  case 2:  // ADD - Add
    ac += fetch(addr);
    acEl.value = pad(ac, 4);
    break;
  case 3:  // TAC - Test accumulator
    if(ac < 0)
    pc = addr;
    // Highlight last instruction run
    highlightOP("TAC");
    highlightAddr(addr);
    break;
  case 4:  // SFT - Shift
    var left = Math.floor(addr / 10);
    var right = addr % 10;
    for(i = 0; i < left; ++i) {
      acc = (acc * 10) % 10000;
    }
    for(i = 0; i < right; ++i) {
      ac = Math.floor(acc / 10);
    }
    acEl.value = pad(ac, 4);
    // Highlight last instruction run
    highlightOP("SFT");
    clearHighlight();
    break;
  case 5:  // OUT - Output
    outputEl.value += pad(fetch(addr), 3)+'\n';
    // Highlight last instruction run
    highlightOP("OUT");
    highlightAddr(addr);
    break;
  case 6:  // STO - Store
    store(addr, pad(ac, 3));
    // Highlight last instruction run
    highlightOP("STO");
    highlightAddr(addr);
    break;
  case 7:  // SUB - Subtract
    ac -= fetch(addr);
    acEl.value = pad(ac, 4);;
    // Highlight last instruction run
    highlightOP("SUB");
    highlightAddr(addr);
    break;
  case 8:  // JMP - Jump
    store(99, pc+800);
    pc = addr;
    // Highlight last instruction run
    highlightOP("JMP");
    highlightAddr(addr);
    break;
  case 9:  // HRS - Halt and reset
  default:
    mode = 0;
    pc = addr;
    // Highlight last instruction run
    highlightOP("HRS");
    clearHighlight();
    break;
  }
  // Update PC in UI
  pcEl.value = pad(pc, 2);
  document.getElementById("mem"+pad(pc, 2)).parentElement.parentElement.classList.add("has-success");
}

function init() {
  ac   = 0;
  pc   = 0;
  inst = 0;
  mar  = 0;
  mdr  = 0;
  lpc  = 0;

  mode    = 0;
  timerId = -1;
  delay   = 1000;

  lastOP    = 0;
  addrElPP  = 0;
  acEl      = document.getElementById("AC");
  pcEl      = document.getElementById("PC");
  instEl    = document.getElementById("INST");
  outputEl  = document.getElementById("output");
}
