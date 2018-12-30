//task #1
function getAttributes() {
  var arr = [];
  var link = document.getElementsByTagName('a')[0];
  arr.push(link.getAttribute('href'));
  arr.push(link.getAttribute('hreflang'));
  arr.push(link.getAttribute('rel'));
  arr.push(link.getAttribute('target'));
  arr.push(link.getAttribute('type'));
  return console.log(arr);
}

//task #2
paintTable();

//task #3
createSpanInBlockByID('hey');

//task #4
createCloneNode('a');

//task #5
addChildrenTo('div', 10, 'span');

//task #6
replaceElementBy('div', 'span');

//task #7
paintRandomColors('span');

//task #8
showCards(ANCESTRY_FILE);

function paintTable() {
  var table = document.getElementsByTagName('table')[0];
  for (var i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}

function createSpanInBlockByID(blockID) {
  var div = document.getElementById(blockID);
  if (!div) {
    console.log("There is no such ID");
  } else {
    if (!div.getElementsByTagName('span')[0]) {
      var span = document.createElement('span');
      span.innerText = 'SOMETHING';
      div.appendChild(span);
    } else {
      console.log("There is such span");
    }
  }
}

function createCloneNode(block) {
  var node = document.getElementsByTagName(block)[0];
  var newBlock = node.cloneNode(true);
  document.body.appendChild(newBlock);
}

function addChildrenTo(block, count, type) {
  var parrentBlock = document.getElementsByTagName(block)[0];
  for (var i = 0; i < count; i++) {
    var elem = document.createElement(type);
    elem.innerText = 'HEY, BUDDY\n';
    parrentBlock.appendChild(elem);
  }
}

function replaceElementBy(blockCurrent, blockToReplace) {
  var block = document.querySelector(blockCurrent);
  var newBlock = document.createElement(blockToReplace);
  newBlock.innerText = 'HELLO AGAIN\n';
  newBlock.style.fontSize = '25px';
  block.parentNode.replaceChild(newBlock, block);
}

function paintRandomColors(elemTag) {
  var elem = document.getElementsByTagName(elemTag)[0];
  var colorArr = [];
  var charArr = [];
  var color = 0xff0000;
  var arrLength = elem.innerText.length;

  for (var i = 0; i < arrLength; i++) {
    colorArr.push(color.toString(16));
    color -= 0xfaadf;
    charArr.push(elem.innerText[i]);
  }
  elem.innerText = '';

  var rand;

  for (i = 0; i < arrLength; i++) {
    var span = document.createElement(elemTag);
    span.innerText = charArr[i];
    rand = Math.round(Math.random() * (colorArr.length - 1));
    var charColor = colorArr.splice(rand, 1)[0];
    switch (charColor.length) {
      case 1:
        span.style.color = '#00000' + charColor;
        break;
      case 2:
        span.style.color = '#0000' + charColor;
        break;
      case 3:
        span.style.color = '#000' + charColor;
        break;
      case 4:
        span.style.color = '#00' + charColor;
        break;
      case 5:
        span.style.color = '#0' + charColor;
        break;
      default:
        span.style.color = '#' + charColor;
    }
    elem.appendChild(span);
  }
}

function showCards(obj) {
  var block = document.createElement('div');
  block.style.display = 'flex';
  block.style.flexWrap = 'wrap';
  document.body.appendChild(block);

  for (var i = 0; i < obj.length; i++) {
    var div = document.createElement('div');
    div.style.width = '20%';
    div.style.padding = '15px';
    div.style.textAlign = 'center';
    div.style.backgroundColor = '#c6bc00';
    div.style.boxShadow = 'inset 0 0 5px 3px #000000';
    block.appendChild(div);

    var name = document.createElement('h2');
    name.innerText = obj[i].name;
    name.style.color = '#000000';
    div.appendChild(name);

    var year = document.createElement('p');
    year.innerText = '(' + obj[i].born + ' - ' + obj[i].died + ')';
    year.style.marginBottom = '20px';
    div.appendChild(year);
    if (obj[i].mother) {
      var motherName = document.createElement('p');
      motherName.innerHTML = '<span style="font-weight: bold;">Mother: </span>' + obj[i].mother;
      div.appendChild(motherName);
    }
    if (obj[i].father) {
      var fatherName = document.createElement('p');
      fatherName.innerHTML = '<span style="font-weight: bold;">Father: </span>' + obj[i].father;
      div.appendChild(fatherName);
    }
    if (!obj[i].mother && !obj[i].father) {
      var orphan = document.createElement('p');
      orphan.innerText = 'Orphan';
      orphan.style.fontWeight = 'bold';
      div.appendChild(orphan);
    }
  }

  var statisticsBlock = document.createElement('div');
  statisticsBlock.style.width = '20%';
  statisticsBlock.style.padding = '15px';
  statisticsBlock.style.textAlign = 'center';
  statisticsBlock.style.backgroundColor = '#757575';
  statisticsBlock.style.boxShadow = 'inset 0 0 5px 3px #000000';
  block.appendChild(statisticsBlock);

  var blockName = document.createElement('h2');
  blockName.innerText = "STATISTICS";
  blockName.style.marginBottom = '15px';
  statisticsBlock.appendChild(blockName);

  var difference = document.createElement('p');
  difference.innerText = 'Difference between mothers and children: ' + calculateMiddleDifference(ANCESTRY_FILE) + ' years';
  statisticsBlock.appendChild(difference);

  var middleMaleAge = document.createElement('p');
  middleMaleAge.innerText = 'Middle male age: ' + calculateMiddleAge(ANCESTRY_FILE, 'm') + ' years';
  statisticsBlock.appendChild(middleMaleAge);

  var middleFemaleAge = document.createElement('p');
  middleFemaleAge.innerText = 'Middle female age: ' + calculateMiddleAge(ANCESTRY_FILE, 'f') + ' years';
  statisticsBlock.appendChild(middleFemaleAge);
}

function calculateAge(person) {
  return person.died - person.born;
}

function calculateMiddleDifference(obj) {
  var sum = 0;
  var count = 0;
  for (var i = 0; i < obj.length; i++) {
    if (!obj[i].mother) {
      continue;
    } else {
      var child = obj[i];
      for (var j = 0; j < obj.length; j++) {
        var mother = obj[j];
        if (child.mother === mother.name) {
          sum += Math.abs(calculateAge(mother) - calculateAge(child));
          count++;
        }
      }
    }
  }
  return Math.round(sum / count);
}

function calculateMiddleAge(obj, sex) {
  var sum = 0;
  var count = 0;
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].sex === sex) {
      sum += calculateAge(obj[i]);
      count++;
    }
  }
  return Math.round(sum / count);
}