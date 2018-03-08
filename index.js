const fs = require('fs');
const path = require('path');

const _console = process.argv;
const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const randFolder = path.join(__dirname, 'randomFolder');
const psevdoFolder = path.join(__dirname, 'psevdoFolder');
const rand = Math.floor(Math.random() * 5 + 4);

function randWord () {
  let arr = [];
  for (let i = rand; i > 0; i--) {
    arr.push(abc[Math.floor(Math.random() * abc.length)]);
  }
  return arr.join('');
}

if (_console.length === 3 && _console[2] === 'random') {
  createMessFolder(function (folderName) {
    fs.writeFile(`./randomFolder/${folderName}/${randWord()}.txt`, randWord(), function (err) {
      if (err) {
        console.log('error!');
      }
    });
    for (let i = rand; i > 0; i--) {
      fs.writeFile(`./randomFolder/${folderName}/${randWord()}.txt`, randWord(), function (err) {
        if (err) {
          console.log('error!');
        }
      });
    }
  });
} else if (_console.length === 3 && _console[2] === 'build') {
  prettifyFolder(function (folderName) {
    fs.readdirSync('./randomFolder/' + folderName).forEach(item => {
      let fileReaded = fs.readFileSync(path.join(randFolder, folderName, item), 'utf8');
      fs.writeFileSync(path.join(psevdoFolder, item), fileReaded);
    });
  });
} else {
  console.log('для содания рандомной папки введите команду - node index random');
}

// create folder -------------------------------------------------------------------------------------------------------

function createMessFolder (callback) {
  fs.mkdir('randomFolder', function () {
    for (let i = rand; i > 0; i--) {
      fs.mkdir(`./randomFolder/${randWord()}`, function (err) {
        if (err) {
          console.log('error!');
        }
      });
    }
    for (let i = rand; i > 0; i--) {
      fs.writeFile(`./randomFolder/${randWord()}.txt`, randWord(), function (err) {
        if (err) {
          console.log('error!');
        }
      });
    }
    fs.readdir(randFolder, function (err, files) {
      if (err) {
        console.log('error!');
      }
      files.forEach(item => {
        let local = path.join(randFolder, item);
        let state = fs.statSync(local);
        if (state.isDirectory()) {
          callback(item);
        }
      });
    });
  });
  console.log('папка создана! для упорядочения ее по алфавиту введите команду node index build');
}

// prettify folder -----------------------------------------------------------------------------------------------------

function prettifyFolder (callback) {
  fs.readdir(randFolder, function (err, files) {
    if (err) {
      console.log('error!');
    }
    fs.mkdirSync('psevdoFolder');
    files.forEach(item => {
      let local = path.join(randFolder, item);
      let state = fs.statSync(local);

      if (state.isDirectory()) {
        callback(item);
      } else {
        let fileReaded = fs.readFileSync(path.join(randFolder, item), 'utf8');
        fs.writeFileSync(path.join(psevdoFolder, item), fileReaded);
      }
    });
  });
  sortFolder();
}

function sortFolder () {
  fs.mkdir('sortFolder', function () {
    fs.readdir(psevdoFolder, function (err, files) {
      if (err) {
        console.log('error!');
      }
      files.forEach(el => {
        abc.forEach(abcItem => {
          if (abcItem === el[0]) {
            fs.mkdir(path.join('./sortFolder', abcItem), function () {
              let fileReaded = fs.readFileSync(path.join('./psevdoFolder', el), 'utf8');
              fs.writeFileSync(path.join('./sortFolder', abcItem, el), fileReaded);
            });
          }
        });
      });
    });
  });
  console.log('восхитительно! отсортированные файлы лежат в папке sortFolder');
}

