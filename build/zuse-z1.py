import os

FILES = "\
	../src/js-dev/zuse-z1.js\
	../src/js-dev/Path.js\
	../src/js-dev/CameraControls.js\
	../src/js-dev/SheetTypes.js\
	../src/js-dev/ShapeFiles.js\
	../src/js-dev/Shapes.js\
	../src/js-dev/Cyclable.js\
	../src/js-dev/Transition.js\
	../src/js-dev/TriggerRules.js\
	../src/js-dev/CycleAccess.js\
	../src/js-dev/CycleControl.js\
	../src/js-dev/materials/Shader.js\
	../src/js-dev/Colors.js\
	../src/js-dev/materials/ShaderUniforms.js\
	../src/js-dev/materials/Material.js\
	../src/js-dev/materials/Materials.js\
	../src/js-dev/Sheet.js\
	../src/js-dev/Pin.js\
	../src/js-dev/PlaneGeometry.js\
	../src/js-dev/Axis.js\
	../src/js-dev/Selection.js\
	../src/js-dev/InputElement.js\
	../src/js-dev/InputControlLayer.js\
	../src/js-dev/LayerTypes.js\
	../src/js-dev/Layer.js\
	../src/js-dev/Adder.js\
	../src/js-dev/SVGUtils.js\
	../src/js-dev/XMLUtils.js\
	../src/js-dev/InitObj.js\
	../src/js-dev/InitPicking.js\
	../src/js-dev/InitZutools.js\
	../src/js-dev/WebGLErrorMessage.js\
	../src/js-dev/Simulation.js\
	../src/js-dev/TempCalculator.js"

#LEVEL = "WHITESPACE_ONLY"
LEVEL = "SIMPLE_OPTIMIZATIONS"

os.system("java -jar compiler.jar --js %s --js_output_file ../src/js/zuse-z1.js --compilation_level %s" % (FILES, LEVEL))

