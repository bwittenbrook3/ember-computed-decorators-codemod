# ember-computed-decorators-codemod

This codemod uses [`jscodeshift`](https://github.com/facebook/jscodeshift) to update an Ember application using [`ember-computed-decorators`](https://github.com/ember-decorators/ember-decorators/tree/v0.3.0) to [`ember-decorators`](https://github.com/ember-decorators/ember-decorators). This update allows applications to migrate to babel 6 and beyond without having to rely on the [`babel-plugin-transform-decorators-legacy`](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy).

For example, it will rewrite code that looks like this:

```js
import Ember from 'ember';
import computed, { alias } from 'ember-computed-decorators';

const { Component } = Ember;

export default Component.extend({

  @alias('fullName') myFullName,
  @computed('firstName', 'lastName')
  fullName() {
    return `${this.get('firstName')} + ${this.get('lastName')}`
  }
})
```

Into this:

```js
import Ember from 'ember';
import { computed } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';

const { Component } = Ember;

export default Component.extend({

  @alias('fullName') myFullName,
  @computed('firstName', 'lastName')
  fullName() {
    return `${this.get('firstName')} + ${this.get('lastName')}`
  }
})
```

## Usage

**WARNING**: `jscodeshift`, and thus this codemod, **edit your files in place**.
It does not make a copy. Make sure your code is checked into a source control
repository like Git and that you have no outstanding changes to commit before
running this tool.

The simplest way to use the codemod is like this:

```sh
yarn global add ember-computed-decorators-codemod
cd my-ember-app
ember-computed-decorators-codemod
```

https://github.com/ember-decorators/auto-computed

### Running Tests

```sh
yarn test // run all tests once
yarn test -- --watchAll // continuously run tests
```

Tests for this codemod work by comparing a paired input and output file in the `__testfixtures__` directory.  Pre-transform files should be of format `<test-name>.input.js`, expected output after the transform should be named `<test-name>.output.js`. Files must use the same `<test-name>` in their names so they can be compared.


## Credit

All code present in this repo was derived from the excellent work in [`ember-modules-codemod`](https://github.com/ember-cli/ember-modules-codemod).
