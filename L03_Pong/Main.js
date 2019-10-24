"use strict";
var L03_Pong;
(function (L03_Pong) {
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    let nodeBall = new fudge.Node("Ball");
    let nodePaddleLeft = new fudge.Node("PaddleLeft");
    let nodePaddleRight = new fudge.Node("PaddleRight");
    let viewport;
    let keysPressed = {};
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        let cam = new fudge.ComponentCamera();
        cam.pivot.translateZ(6);
        viewport = new fudge.Viewport();
        let sceneNode = createScene();
        viewport.initialize("Viewport", sceneNode, cam, canvas);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, updateLoopFrame);
        fudge.Loop.start();
        viewport.draw();
    }
    function updateLoopFrame(_event) {
        // Controls
        if (keysPressed[fudge.KEYBOARD_CODE.W]) {
            nodePaddleLeft.cmpTransform.local.translateY(0.1);
        }
        if (keysPressed[fudge.KEYBOARD_CODE.S]) {
            nodePaddleLeft.cmpTransform.local.translateY(-0.1);
        }
        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_UP]) {
            nodePaddleRight.cmpTransform.local.translateY(0.1);
        }
        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_DOWN]) {
            nodePaddleRight.cmpTransform.local.translateY(-0.1);
        }
        //update Scene
        fudge.RenderManager.update();
        viewport.draw();
    }
    function handleKeyDown(event) {
        keysPressed[event.code] = true;
    }
    function handleKeyUp(event) {
        keysPressed[event.code] = false;
    }
    function createScene() {
        //setup Meshs and Materials
        let mesh = new fudge.MeshQuad();
        let mtrSolidWhite = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        //create Ball
        let cmpMeshBall = new fudge.ComponentMesh(mesh);
        let cmpMaterialBall = new fudge.ComponentMaterial(mtrSolidWhite);
        let cmpTransformBall = new fudge.ComponentTransform();
        nodeBall.addComponent(cmpMeshBall);
        nodeBall.addComponent(cmpMaterialBall);
        nodeBall.addComponent(cmpTransformBall);
        //positioning
        nodeBall.getComponent(fudge.ComponentMesh).pivot.scale(new fudge.Vector3(0.2, 0.2, 0.2));
        //create Player 1 paddle
        let cmpMeshPaddleLeft = new fudge.ComponentMesh(mesh);
        let cmpMateriaPaddleLeft = new fudge.ComponentMaterial(mtrSolidWhite);
        let cmpTransformPaddleLeft = new fudge.ComponentTransform();
        nodePaddleLeft.addComponent(cmpMeshPaddleLeft);
        nodePaddleLeft.addComponent(cmpMateriaPaddleLeft);
        nodePaddleLeft.addComponent(cmpTransformPaddleLeft);
        //positionin
        nodePaddleLeft.cmpTransform.local.translateX(-2.5);
        nodePaddleLeft.getComponent(fudge.ComponentMesh).pivot.scale(new fudge.Vector3(0.2, 1.5, 0));
        //create Player 2 paddle
        let cmpMeshPaddleRight = new fudge.ComponentMesh(mesh);
        let cmpMateriaPaddleRight = new fudge.ComponentMaterial(mtrSolidWhite);
        let cmpTransformPaddleRight = new fudge.ComponentTransform();
        nodePaddleRight.addComponent(cmpMeshPaddleRight);
        nodePaddleRight.addComponent(cmpMateriaPaddleRight);
        nodePaddleRight.addComponent(cmpTransformPaddleRight);
        //positioning
        nodePaddleRight.cmpTransform.local.translateX(2.5);
        nodePaddleRight.getComponent(fudge.ComponentMesh).pivot.scale(new fudge.Vector3(0.2, 1.5, 0));
        //ceate scene Node
        let sceneNode = new fudge.Node("Scene");
        sceneNode.appendChild(nodePaddleLeft);
        sceneNode.appendChild(nodeBall);
        sceneNode.appendChild(nodePaddleRight);
        return sceneNode;
    }
})(L03_Pong || (L03_Pong = {}));
//# sourceMappingURL=Main.js.map