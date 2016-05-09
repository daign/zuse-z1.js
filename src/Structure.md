Note: some sections only apply to latest dev branch

### Branches ###

Has currently 3 branches: master, dev and gh-pages

### Src ###

There are two HTML files in Src: `index.html` and `index-dev.html`. This has nothing to do with the branches. They both exist in every branch. `index.html` references only the built scripts. `index-dev.html` references every single uncompiled `.js` file, so you can test changes without running the build process first.

### Build ###

Download the [Google Closure Compiler](https://developers.google.com/closure/compiler/) and put the `compiler.jar` into `build` directory.

Go to `build` directory and run the commands

```python
python zuse-z1.py
python zutools.py
```

This updates `zuse-z1.js` and `zutools.js` in directory `src/js`.

`zutools.js` is meant to be the library for the user interface and should be kept independent from `zuse-z1.js`.

### Add a script ###

If you add a `.js` file you have to add it's path to `index-dev.html` and the appropriate build script.

If you've changed something other than adding a script in `index-dev.html` you have to build `index.html` by hand. There shouldn't be many cases where you'll have to do this.
