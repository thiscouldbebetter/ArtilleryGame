"use strict";
class Globals {
    static Instance() {
        if (Globals._instance == null) {
            Globals._instance = new Globals();
        }
        return Globals._instance;
    }
    initialize(timerTicksPerSecond, display, world) {
        this.timerTicksPerSecond = timerTicksPerSecond;
        this.display = display;
        this.display.initialize(null);
        this.world = world;
        this.inputHelper = new InputHelper2();
        var millisecondsPerTimerTick = Math.floor(1000 / this.timerTicksPerSecond);
        this.timer = setInterval(this.handleEventTimerTick.bind(this), millisecondsPerTimerTick);
        this.inputHelper.initialize();
    }
    // events
    handleEventTimerTick() {
        this.world.drawToDisplay(this.display);
        this.world.updateForTimerTick();
    }
}
