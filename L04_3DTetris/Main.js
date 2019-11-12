"use strict";
var L04_3DTetris;
(function (L04_3DTetris) {
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    let viewport;
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        let cam = new fudge.ComponentCamera();
        cam.pivot.translateZ(20);
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", sceneNode, cam, canvas);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, updateLoopFrame);
        fudge.Loop.start();
        viewport.draw();
    }
    function updateLoopFrame(_event) {
        fudge.RenderManager.update();
        viewport.draw();
    }
    function detectHit(hitterPosition, collisionObject) {
        let objectScaling = collisionObject.getComponent(fudge.ComponentMesh).pivot.scaling;
        let objectPosition = collisionObject.cmpTransform.local.translation;
        let bottomRight = new fudge.Vector3(objectPosition.x + (objectScaling.x / 2), objectPosition.y + (objectScaling.y / 2), 0);
        let topLeft = new fudge.Vector3(objectPosition.x - (objectScaling.x / 2), objectPosition.y - (objectScaling.y / 2));
        //hitting from Right or Left
        if (hitterPosition.x > topLeft.x && hitterPosition.x < bottomRight.x) {
            //hitting from top or Bottom
            if (hitterPosition.y > topLeft.y && hitterPosition.y < bottomRight.y) {
                return true;
            }
        }
        else
            return false;
    }
    function createScene() {
        return sceneNode;
    }
})(L04_3DTetris || (L04_3DTetris = {}));
//# sourceMappingURL=Main.js.map