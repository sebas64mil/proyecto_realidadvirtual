// pc.js
export class PC {
    constructor() {}

    initializeGamepad() {
        window.addEventListener("gamepadconnected", (event) => {
            console.log("Gamepad connected:", event.gamepad);
        });
        window.addEventListener("gamepaddisconnected", (event) => {
            console.log("Gamepad disconnected:", event.gamepad);
        });
    }
}
