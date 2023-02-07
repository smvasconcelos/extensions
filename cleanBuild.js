
import fs from 'fs';
import path from 'path';

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
    } else if (filename.endsWith('.html')) {
      // se for o html copia pra root
      copyBuild(filename, `${path.resolve('./build')}/${files[i]}`);
    } else if (!filename.endsWith('.json')) {
      // se for js copia pra assets
      copyBuild(filename, `${path.resolve('./build')}/assets/${files[i]}`);
    }
  };
};

function copyBuild(filePath, outputPath) {
  fs.copyFileSync(filePath, outputPath);
}

export function createBuild() {
  if (fs.existsSync(path.resolve('./dist'))) {
    if (!fs.existsSync(path.resolve('./build'))) {
      fs.mkdirSync('./build');
    }
    if (!fs.existsSync(path.resolve('./build/assets'))) {
      fs.rmSync(path.resolve('./build/assets'), { recursive: true, force: true });
      fs.mkdirSync('./build/assets');
    }
    fs.copyFileSync(path.resolve('./dist/manifest.json'), `${path.resolve('./build')}/manifest.json`);
    copyFromDir('./dist', '.js');
  }
}



createBuild();
