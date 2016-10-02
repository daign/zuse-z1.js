## General ##
* Clean up code and make more modular, have project related data in xml files -> already made some progress on this one
* Add simulations of other components
* (Save state of simulation in local storage and load when user returns to website); make tool to reset simulation without reloading
* Decouple abstract elements from mesh-representation, allowing for coupling with other representations (e.g. SVG circuit or SVG topview ), allow to choose representation
* Make sure obsolete objects can be garbage collected to allow simulation running for a long time without performance loss.
* Maybe don't always have the animation loop running when there's no interaction with the simulation.

## GUI ##
* Add more language versions
* Allow resizing of controls and logic circuit
* Tools for CameraControl for use without mouse, e.g. without mousewheel; indicate use of shift key to pan

## Controls ##
* Allow control of sheet V
* Have something similar to a crank for cycle control

## Elements ##
* Add springs holding sheet K
* (Remove faces on connections of pins)

## Simulation ##
* (Add rules for movement of retransfer, that is to transfer the result of sheet K to sheet B)
* Make animations showing the succession of pushes between sheets

## Display ##
* Allow sheets to display as contour and pins as line
* Make better shader for ends of truncated sheets
* (Cast shadows of pins on sheets?)
* Currently sheets on different layers blend when viewed from above. Emphasize sheet borders?
* Selection box doesn't appear in Opera

## Navigation ##
* ~~Usefull translations of rotation center~~. Didn't work really good with old controls, not trying again.
* Adapt rotation center to selections
* Animate camera reset

## Interaction ##
* (Allow moving of sheets with clicks on modell)
* Automatically expand layers when selecting from circuit? collapse all others? deactivate expand-tools for invisible layers?

## Logic Circuit ##
* Allow different symbols on logic circuit
* Reset selection when clicking again on gate
* Fix: hand cursor doesn't work on SVG circuit when selecting all elements active
* Display current flow in logic circuit
* Allow input via logic circuit

