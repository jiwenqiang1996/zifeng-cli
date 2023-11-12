const copydir = require('copy-dir');
const fs = require('fs');
const path = require('path');

function mkdirGuard(target) {
  try {
    fs.mkdirSync(target, { recursive: true });
  } catch (e) {
    mkdirp(target)
    function mkdirp(dir) {
      if (fs.existsSync(dir)) { return true }
      const dirname = path.dirname(dir);
      mkdirp(dirname);
      fs.mkdirSync(dir);
    }
  }
}

function copyDir(form, to, options) {
  mkdirGuard(to);
  copydir.sync(form, to, options);
}

function copyFile(from, to) {
  console.log(from, to,1);
  const buffer = fs.readFileSync(from);
  const parentPath = path.dirname(to);

  mkdirGuard(parentPath)

  fs.writeFileSync(to, buffer);
}

function checkMkdirExists(path) {
  return fs.existsSync(path)
};

exports.checkMkdirExists = checkMkdirExists;
exports.mkdirGuard = mkdirGuard;
exports.copyDir = copyDir;
exports.copyFile = copyFile;
