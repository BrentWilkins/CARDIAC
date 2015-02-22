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

  for(cell = 0; cell < 100; cell++) {
    document.writeln('  <div class="form-group">');
    document.writeln('    <label for="mem'+pad(cell, 2)+'" class="col-sm-1 control-label">'+pad(cell, 2)+'</label>');
    document.writeln('    <div class="col-sm-1">');
    document.writeln('      <input type="number" min="-999" max="999" class="form-control" id="mem'+pad(cell, 2)+'" placeholder="000" placeholder="000">');
    document.writeln('    </div>');
    document.writeln('  </div>');
  }
  document.getElementById("mem00").parentElement.parentElement.classList.add("has-success");
  document.getElementById("mem00").value = "001";
  document.getElementById("mem00").readOnly = "readOnly";
  document.getElementById("mem99").value = "800";
}
