
var fs = require('fs');
var path = require('path');

function copyFromDir(startPath, filter) {

  const localPath = path.resolve(startPath);
  if (!fs.existsSync(localPath)) {
    console.log("no dir ", localPath);
    return;
  }

  var files = fs.readdirSync(localPath);
  console.log(files);

  for (var i = 0; i < files.length; i++) {
    const filename = path.join(localPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      copyFromDir(filename, filter);
    } else if (filename.endsWith(filter)) {
      // se for o index copia pra src
      copyBuild(filename, `${path.resolve('./build')}/src/index.js`);
    } else if (!filename.endsWith('.html')) {
      // se for um asset copia pra a pasta do asset
      copyBuild(filename, `${path.resolve('./build')}/assets/${files[i]}`);
    }
  };
};

function copyBuild(filePath, outputPath) {
  fs.copyFileSync(filePath, outputPath);
}

function createBuild() {
  if (fs.existsSync(path.resolve('./dist'))) {
    if (!fs.existsSync(path.resolve('./build'))) {
      fs.mkdirSync('./build');
      fs.mkdirSync('./build/src');
      fs.mkdirSync('./build/scripts');
      fs.mkdirSync('./build/assets');
      fs.copyFileSync(path.resolve('./manifest.json'), `${path.resolve('./build')}/manifest.json`);
    }
    copyFromDir('./dist', '.js');
  }
}



createBuild();
