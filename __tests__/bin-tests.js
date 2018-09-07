'use strict';

const path = require('path');
const fs = require('fs-extra');
const cp = require('child_process');
const tmp = require('tmp');

const originalCwd = process.cwd();

let tmpPath;

function run() {
  let stdout = '';
  let stderr = '';

  return new Promise(resolve => {
    let ps = cp.spawn('node', [
      path.join(originalCwd, 'bin/ember-computed-decorators-codemod')
    ], {
      cwd: tmpPath
    });

    ps.stdout.on('data', data => {
      stdout += data.toString();
    });

    ps.stderr.on('data', data => {
      stderr += data.toString();
    });

    ps.on('exit', code => {
      resolve({
        exitCode: code,
        stdout,
        stderr
      });
    });
  });
}

describe('bin acceptance', function () {
  let tmpPackageJson;

  beforeEach(function () {
    tmpPath = tmp.dirSync()
      .name;

    process.chdir(tmpPath);

    tmpPackageJson = path.join(process.cwd(), 'package.json');
  });

  afterAll(function () {
    process.chdir(originalCwd);
  });

  it('handles non-ember projects', function () {
    return run()
      .then(result => {
        let exitCode = result.exitCode;
        let stderr = result.stderr;

        expect(exitCode)
          .not.toEqual(0);

        expect(stderr)
          .toEqual(`It doesn't look like you're inside an Ember app. I couldn't find a package.json at ${tmpPackageJson}\n`);
      });
  });

  describe('with valid package.json', function () {
    beforeEach(function () {
      fs.writeJsonSync(tmpPackageJson, {
        devDependencies: {
          'ember-cli': ''
        }
      });
    });

    it('exits gracefully when no files found', function () {
      return run()
        .then(result => {
          let exitCode = result.exitCode;
          let stderr = result.stderr;

          expect(exitCode)
            .toEqual(0);

          // jscodeshift can process in any order
          expect(stderr)
            .toMatch('Skipping path app which does not exist.');
          expect(stderr)
            .toMatch('Skipping path addon which does not exist.');
          expect(stderr)
            .toMatch('Skipping path addon-test-support which does not exist.');
          expect(stderr)
            .toMatch('Skipping path tests which does not exist.');
          expect(stderr)
            .toMatch('Skipping path test-support which does not exist.');
          expect(stderr)
            .toMatch('Skipping path lib which does not exist.');
        });
    });

    describe('with valid file', function () {
      let tmpFile;
      const inputFile = path.join(originalCwd, '__testfixtures__/computed.input.js');
      const outputFile = path.join(originalCwd, '__testfixtures__/computed.output.js');


      beforeEach(function () {
        fs.ensureDirSync(path.join(tmpPath, 'app'));

        tmpFile = path.join(tmpPath, 'app/computed.js');

        fs.copySync(
          inputFile,
          tmpFile
        );
      });

      it('works', function () {
        return run()
          .then(result => {
            let exitCode = result.exitCode;
            let stdout = result.stdout;

            expect(exitCode)
              .toEqual(0);

            expect(stdout)
              .toMatch('Done! All uses of the ember-computed-decorators have been updated.\n');

            expect(fs.readFileSync(tmpFile, 'utf8'))
              .toEqual(fs.readFileSync(outputFile, 'utf8'));
          });
      });
    });
  });
});