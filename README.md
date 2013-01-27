zuse-z1.js
==========

### WebGL simulations of Konrad Zuse's Z1 computer ###

[View the simulation](http://daign.github.com/zuse-z1.js/src/) — [About this project](https://github.com/daign/zuse-z1.js/wiki/About) — [Todo](https://github.com/daign/zuse-z1.js/wiki/Todo)

Licensed under [MIT License](https://github.com/daign/zuse-z1.js/blob/master/LICENSE.txt)

Dependencies:
* [three.js](https://github.com/mrdoob/three.js)
* [tween.js](https://github.com/sole/tween.js)
* [jQuery](https://github.com/jquery/jquery)
* [jQueryUI](https://github.com/jquery/jquery-ui)

### Build ###

Download the [Google Closure Compiler](https://developers.google.com/closure/compiler/) and put the `compiler.jar` into `build` directory.

Go to `build` directory and run the command

```python
python build.py
```

This updates `zuse-z1.js` in directory `src/js`.

If you've changed `index-dev.html` you need to build `index.html` by hand. Just replace the linked `js-dev` scripts with

```html
<script src="js/zuse-z1.js"></script>
```

