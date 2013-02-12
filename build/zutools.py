import os

FILES = "\
	../src/js-dev/zutools/zutools.js\
	../src/js-dev/zutools/LayoutManager.js\
	../src/js-dev/zutools/Separator.js\
	../src/js-dev/zutools/Toolbar.js\
	../src/js-dev/zutools/WebGL.js\
	../src/js-dev/zutools/WebGLErrorMessage.js\
	../src/js-dev/zutools/Tool.js\
	../src/js-dev/zutools/Controls.js\
	../src/js-dev/zutools/Digit.js\
	../src/js-dev/zutools/Tabbar.js\
	../src/js-dev/zutools/Tab.js\
	../src/js-dev/zutools/Status.js"

#LEVEL = "WHITESPACE_ONLY"
LEVEL = "SIMPLE_OPTIMIZATIONS"

os.system("java -jar compiler.jar --js %s --js_output_file ../src/js/zutools.js --compilation_level %s" % (FILES, LEVEL))
