"use strict";
class InputHelper2 {
    constructor() {
        this.keyPressed = null;
        this.keysToPreventDefaultsFor = ["Tab"];
    }
    initialize() {
        document.body.onkeydown = this.handleEventKeyDown.bind(this);
    }
    // events 
    handleEventKeyDown(event) {
        this.keyPressed = event.key;
        if (this.keysToPreventDefaultsFor.indexOf(this.keyPressed) >= 0) {
            event.preventDefault();
        }
    }
}
