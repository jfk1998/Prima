"use strict";
var L04_3DTetris;
(function (L04_3DTetris) {
    var fudge = FudgeCore;
    window.addEventListener("load", load);
    let viewport;
    let game;
    let blockIsRotating = false;
    let goalRotationX = 0;
    let goalRotationY = 0;
    let currentRotation = fudge.Vector3.ZERO();
    let gridMap = new Map();
    let rotation = new fudge.Vector3(0, 0, 0);
    function load(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize(true);
        fudge.Debug.log("Canvas", canvas);
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(2, 3, 20));
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
        game = new fudge.Node("FudgeCraft");
        // let cube: Cube = new Cube(CUBE_TYPE.BLUE);
        let fragment = new L04_3DTetris.Fragment(0);
        // fudge.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform());
        game.appendChild(fragment);
        fragment = new L04_3DTetris.Fragment(1);
        // fudge.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(3))));
        game.appendChild(fragment);
        fragment = new L04_3DTetris.Fragment(2);
        // fudge.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(-3))));
        game.appendChild(fragment);
        fragment = new L04_3DTetris.Fragment(3);
        // fudge.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(6))));
        game.appendChild(fragment);
        fragment = new L04_3DTetris.Fragment(4);
        // fudge.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(-6))));
        game.appendChild(fragment);
        let cmpLight = new fudge.ComponentLight(new fudge.LightDirectional(fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new fudge.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        fudge.Debug.log("Viewport", viewport);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, updateLoopFrame);
        fudge.Loop.start();
        viewport.draw();
        fudge.Debug.log("Game", game);
        window.addEventListener("keydown", hndKeyDown);
    }
    function updateLoopFrame() {
        //rotation
        if (blockIsRotating) {
            for (let fragment of game.getChildren()) {
                // fragment.cmpTransform.local.rotate(rotate);
                getRotationForBlock();
                fragment.cmpTransform.local.rotate(getRotationForBlock());
                currentRotation = fragment.cmpTransform.local.rotation;
            }
        }
        console.log("update");
        fudge.RenderManager.update();
        viewport.draw();
    }
    function hndKeyDown(_event) {
        //let rotate: fudge.Vector3 = fudge.Vector3.ZERO();
        switch (_event.code) {
            case fudge.KEYBOARD_CODE.ARROW_UP:
                if (!blockIsRotating) {
                    goalRotationX = 90;
                    currentRotation = fudge.Vector3.ZERO();
                    blockIsRotating = true;
                }
                //rotation.x = -90;
                break;
            case fudge.KEYBOARD_CODE.ARROW_DOWN:
                if (!blockIsRotating) {
                    goalRotationX = -90;
                    currentRotation = fudge.Vector3.ZERO();
                    blockIsRotating = true;
                }
                // rotation.x = 90;          
                break;
            case fudge.KEYBOARD_CODE.ARROW_LEFT:
                if (!blockIsRotating) {
                    goalRotationY = 90;
                    currentRotation = fudge.Vector3.ZERO();
                    blockIsRotating = true;
                }
                // rotation.y = -90;
                break;
            case fudge.KEYBOARD_CODE.ARROW_RIGHT:
                if (!blockIsRotating) {
                    goalRotationY = -90;
                    currentRotation = fudge.Vector3.ZERO();
                    blockIsRotating = true;
                }
                // rotation.y = 90;
                break;
        }
        for (let fragment of game.getChildren()) {
            fragment.cmpTransform.local.rotate(rotation);
            currentRotation = fragment.cmpTransform.local.rotation;
        }
    }
    function getRotationForBlock() {
        if (goalRotationX < 0 && goalRotationX < currentRotation.x) {
            return new fudge.Vector3(-1, 0, 0);
        }
        else if (goalRotationX > 0 && goalRotationX > currentRotation.x) {
            return new fudge.Vector3(1, 0, 0);
        }
        else if (goalRotationY < 0 && goalRotationY < currentRotation.y) {
            return new fudge.Vector3(0, -1, 0);
        }
        else if (goalRotationY > 0 && goalRotationY > currentRotation.y) {
            return new fudge.Vector3(0, 1, 0);
        }
        else {
            blockIsRotating = false;
        }
    }
})(L04_3DTetris || (L04_3DTetris = {}));
//# sourceMappingURL=Main.js.map