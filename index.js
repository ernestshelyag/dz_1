const fs = require('fs');
const path = require('path');
const stream = require('stream');

const _console = process.argv;
const abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const randfolder = path.join(__dirname, 'randomFolder');

let totalArr = [];

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

    prettifyFolder(function (folderName) {

        fs.readdirSync('./randomFolder/' + folderName).forEach(item => {

            totalArr.push(item);

        })
    });

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

        fs.readdir(randfolder, function (err, files){

            files.forEach(item => {

                let local = path.join(randfolder, item);
                let state = fs.statSync(local);

                if (state.isDirectory()){

                    callback(item);
                }

            });

        });

    });

    console.log('папка создана! для упорядочения ее по алфавиту введите команду node index build')
}

// prettify folder -----------------------------------------------------------------------------------------------------

function prettifyFolder(callback) {

    fs.readdir(randfolder, function (err, files) {

        files.forEach(item => {

            let local = path.join(randfolder, item);
            let state = fs.statSync(local);

            if (state.isDirectory()){

                callback(item);

            } else {

                totalArr.push(item);

            }

        });

        //console.log(totalArr);

        let fileReaded = fs.readFileSync(totalArr[3], 'utf8');

        console.log(fileReaded);

        fs.mkdir('newFolder', function () {

            abc.forEach(item => {

                totalArr.forEach(el => {

                    if( item === el[0]){

                        fs.mkdir('./newFolder/' + item , function () {

                            console.log('done!');

                        })

                    }

                })

            })

        });

    });

}
