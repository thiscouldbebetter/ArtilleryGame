"use strict";
function main() {
    var displaySize = new Coords(400, 300, 1);
    var display = Display2D.fromSize(displaySize);
    var world = World2.random(new Coords(0, .05, 0), displaySize);
    Globals.Instance().initialize(50, // ticksPerSecond
    display, world);
}
