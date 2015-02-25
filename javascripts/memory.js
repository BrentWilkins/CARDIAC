function pad(num, size) {
  if(num < 0) {
    s = "00000" + -num;
    return "-"+s.substr(s.length-size);
  } else {
    s = "00000" + num;
    return s.substr(s.length-size);
  }
}

function drawMemory()
{
  var cell;
  var el = document.getElementById("memory");
    
  for(cell = 0; cell < 100; cell++) {
    el.innerHTML += '  <div class="form-group">\n'
    +'<label for="mem'+pad(cell, 2)+'" class="col-sm-1 control-label">'
    +pad(cell, 2)+'</label>'
    +'<div class="col-sm-1">'
    +'<input type="number" min="-999" max="999" class="form-control" id="mem'
    +pad(cell, 02)+'" placeholder="000" placeholder="000">'
    +'</div>'
    +'</div>\n';
  }
  document.getElementById("mem00").parentElement.parentElement.classList.add("has-success");
  document.getElementById("mem00").value = "001";
  document.getElementById("mem00").readOnly = "readOnly";
  document.getElementById("mem99").value = "800";
}
