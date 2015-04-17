Ionic bootstrap with JSPM
===========================

This is a simple boilerplate app with bower swapped out in favor of jspm. This
provides much powerful SystemJS async module loading and all ES6 goodness with
traceur/babel support.


Setup
------------

* Install the global dependencies

```bash
npm install -g ionic cordova jspm gulp
```

* Clone this repo and change into project directory

```bash
git clone git@github.com:akagr/ionic-jspm-kickstart.git
cd ionic-jspm-kickstart
```

* Install local dependencies (including npm, jspm packages and cordova plugins)

```bash
npm install
gulp install
```

* Start the app

```bash
ionic serve
```

Notes:
--------------------
* Obviously, using `ionic add <bower_package>` is discouraged even though the
command will remain available (can't change the ionic cli).


Bugs/ToDos
--------------------
* The ionicons fonts are not loading for some reason.
* Clean up `package.json`.
