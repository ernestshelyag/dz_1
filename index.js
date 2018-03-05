const fs = require('fs');
const path = require('path');

const _console = process.argv;
const abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

function randWord() {

    let arr = [];
    for( let i = Math.floor(Math.random()*5+4) ; i > 0 ; i-- ){
        arr.push((()=>{

            let j = Math.floor( Math.random() * abc.length);
            return abc[j];

            })());
    }
    return arr.join('');

}

if(_console.length === 3 && _console[2] === 'random'){

    createMessFolder( function (folderName) {

        fs.writeFile(`./randomFolder/${folderName}/${randWord()}.txt`, randWord(), function () {});

        for( let i = Math.floor(Math.random()*3+2) ; i > 0 ; i-- ){
            fs.writeFile(`./randomFolder/${folderName}/${randWord()}.txt`, randWord(), function () {});
        }

    });

} else if(_console.length === 3 && _console[2] === 'build'){

    prettifyFolder();

} else {
    console.log('для содания рандомной папки введите команду - node index random');
}

// create folder -------------------------------------------------------------------------------------------------------

function createMessFolder(callback) {

    fs.mkdir('randomFolder', function () {

        for(let i = Math.floor(Math.random()*5+4) ; i > 0 ; i-- ){

            fs.mkdir(`./randomFolder/${randWord()}`, function () {

            })
        }

        for( let i = Math.floor(Math.random()*5+4) ; i > 0 ; i-- ){
            fs.writeFile(`./randomFolder/${randWord()}.txt`, randWord(), function () {})
        }

        fs.readdir(path.join(__dirname, 'randomFolder'), function (err, files){

            files.forEach(item => {

                let local = path.join(__dirname, 'randomFolder', item);
                let state = fs.statSync(local);

                if (state.isDirectory()){

                    callback(item);
                }

            });

        });

    });

    console.log('папка создана! для упорядочения ее по алфавиту введите команду node index build (пока не работает)')
}

// prettify folder -----------------------------------------------------------------------------------------------------

function prettifyFolder() {

    console.log('start work');

}
