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
    el.innerHTML +=
  '  <div class="form-group">\n'
    +  '<label for="mem'+pad(cell, 2)+'" class="col-sm-1 control-label">'
    +  pad(cell, 2)+'</label>'
    +  '<div class="col-sm-1">'
    +   '<input type="number" min="-999" max="999" class="form-control" id="mem'
    +      pad(cell, 2)+'" placeholder="000" style="float:left">'
    +  '<div id="lBug'+pad(cell, 2)+'" style="position:absolute;right:-240%;'
    +    'display:none">\n<image src="images/Anonymous-Ladybug.png" height="32"'
    +    'width="32">\n</div>'
    +  '</div>'
    +  '</div>\n';
  }
  //document.getElementById("mem00").parentElement.parentElement.classList.add("has-success");
  //document.getElementById("mem00").parentElement.innerHTML += '<div id="lBug" style="position:absolute;right:-240%">\n<image src="images/Anonymous-Ladybug.png" height="32" width="32">\n</div>';
  document.getElementById("lBug00").style.display = 'inline';
  document.getElementById("mem00").value = "001";
  document.getElementById("mem00").readOnly = "readOnly";
  document.getElementById("mem99").value = "800";
}
