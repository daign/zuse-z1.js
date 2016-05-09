## General ##
* Clean up code and make more modular, have project related data in xml files -> already made some progress on this one
* Add simulations of other components
* (Save state of simulation in local storage and load when user returns to website); make tool to reset simulation without reloading
* Decouple abstract elements from mesh-representation, allowing for coupling with other representations (e.g. SVG circuit or SVG topview ), allow to choose representation

## GUI ##
* Add more language versions
* Allow resizing of controls and logic circuit
* Toolbar resizing is slow; ~~maybe calculate the resized tools only after user has finished dragging~~ -> should be better now with throttle
* (Show tools in groups)
* Tools for CameraControl for use without mouse, e.g. without mousewheel; indicate use of shift key to pan
* Gradient in tools is wrong in some cases in Firefox on Windows

## Controls ##
* (Allow control of sheet V)
* Have something similar to a crank for cycle control
* (Maybe some kind of command line input?)

## Elements ##
* Add springs holding sheet K
* (Remove faces on connections of pins)

## Simulation ##
* (Add rules for movement of retransfer, that is to transfer the result of sheet K to sheet B)
* Make animations showing the succession of pushes between sheets

## Display ##
* Allow sheets to display as contour and pins as line
* Make better shader for ends of truncated sheets
* Allow instant hiding of elements without sliders -> done
* (Cast shadows of pins on sheets?)
* Currently sheets on different layers blend when viewed from above. Emphasize sheet borders?
* Selection box doesn't appear in Opera

## Navigation ##
* Prevent camera roll -> fixed with new OrbitControls
* ~~Usefull translations of rotation center~~. Didn't work really good with old controls, not trying again.
* Adapt rotation center to selections
* Orientate camera towards selections
* Animate camera reset

## Interaction ##
* (Allow to expand layers with click on them)
* Fix: invisible elements are found during selection
* Fix: selection change doesn't work on modell at height when layers expanded
* Sometimes element in intersects array can't be found anymore
* Selecting sheets when displaying only parts of modell is buggy
* (Allow moving of sheets with clicks on modell)
* Automatically expand layers when selecting from circuit? collapse all others? deactivate expand-tools for invisible layers?
* (Allow to colourise sheets?)

## Logic Circuit ##
* Allow different symbols on logic circuit
* Reset selection when clicking again on gate
* Fix: hand cursor doesn't work on SVG circuit when selecting all elements active
* Display current flow in logic circuit
* Allow input via logic circuit
