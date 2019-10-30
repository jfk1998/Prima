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
    let ballStartdirection = new fudge.Vector3(getRandomSign() * Math.random() / 5, getRandomSign() * Math.random() / 5, 0);
    let canvasHeight = 14;
    let canvasLength = 20;
    let ballPosition;
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        let cam = new fudge.ComponentCamera();
        cam.pivot.translateZ(20);
        viewport = new fudge.Viewport();
        let sceneNode = createScene();
        viewport.initialize("Viewport", sceneNode, cam, canvas);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, updateLoopFrame);
        fudge.Loop.start();
        viewport.draw();
    }
    function getRandomSign() {
        return Math.random() < 0.5 ? -1 : 1;
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
        //checkIfBallIsHittingWall
        ballPosition = nodeBall.cmpTransform.local.translation;
        if (ballPosition.x > (canvasLength / 2) || ballPosition.x < -(canvasLength / 2)) {
            ballStartdirection.x = -ballStartdirection.x;
            //ballStartdirection.scale(ballVelocity);
        }
        if (ballPosition.y > (canvasHeight / 2) || ballPosition.y < -(canvasHeight / 2)) {
            ballStartdirection.y = -ballStartdirection.y;
            // ballStartdirection.scale(ballVelocity);
        }
        //move ball 
        nodeBall.cmpTransform.local.translate(ballStartdirection);
        //update Scene
        fudge.RenderManager.update();
        viewport.draw();
    }
    function detectHit(hitter, mtrx) {
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
        nodeBall.getComponent(fudge.ComponentMesh).pivot.scale(new fudge.Vector3(1, 1, 0));
        //create Player 1 paddle
        let cmpMeshPaddleLeft = new fudge.ComponentMesh(mesh);
        let cmpMateriaPaddleLeft = new fudge.ComponentMaterial(mtrSolidWhite);
        let cmpTransformPaddleLeft = new fudge.ComponentTransform();
        nodePaddleLeft.addComponent(cmpMeshPaddleLeft);
        nodePaddleLeft.addComponent(cmpMateriaPaddleLeft);
        nodePaddleLeft.addComponent(cmpTransformPaddleLeft);
        //positionin
        nodePaddleLeft.cmpTransform.local.translateX(-9);
        nodePaddleLeft.getComponent(fudge.ComponentMesh).pivot.scale(new fudge.Vector3(1, 7, 0));
        //create Player 2 paddle
        let cmpMeshPaddleRight = new fudge.ComponentMesh(mesh);
        let cmpMateriaPaddleRight = new fudge.ComponentMaterial(mtrSolidWhite);
        let cmpTransformPaddleRight = new fudge.ComponentTransform();
        nodePaddleRight.addComponent(cmpMeshPaddleRight);
        nodePaddleRight.addComponent(cmpMateriaPaddleRight);
        nodePaddleRight.addComponent(cmpTransformPaddleRight);
        //positioning
        nodePaddleRight.cmpTransform.local.translateX(9);
        nodePaddleRight.getComponent(fudge.ComponentMesh).pivot.scale(new fudge.Vector3(1, 7, 0));
        //createBorder
        let wall1 = createWall("Wall1", canvasHeight, 1);
        let wall2 = createWall("Wall2", canvasHeight, 1);
        let wall3 = createWall("Wall3", 1, canvasLength);
        let wall4 = createWall("Wall4", 1, canvasLength);
        //position walls
        wall1.cmpTransform.local.translateX(canvasLength / 2);
        wall2.cmpTransform.local.translateX(-canvasLength / 2);
        wall3.cmpTransform.local.translateY(-canvasHeight / 2);
        wall4.cmpTransform.local.translateY(-canvasHeight / 2);
        //ceate scene Node
        let sceneNode = new fudge.Node("Scene");
        sceneNode.appendChild(nodePaddleLeft);
        sceneNode.appendChild(nodeBall);
        sceneNode.appendChild(nodePaddleRight);
        sceneNode.appendChild(wall1);
        sceneNode.appendChild(wall2);
        sceneNode.appendChild(wall3);
        sceneNode.appendChild(wall4);
        return sceneNode;
    }
    function decetHit(position, node) {
        let nodeObjectPositionX = node.cmpTransform.local.translation.x;
        let nodeObjectPositionY = node.cmpTransform.local.translation.y;
        let nodeObjectScaling = node.getComponent(fudge.ComponentMesh).pivot.scaling;
        let topLeft = new fudge.Vector3(nodeObjectPositionX - nodeObjectScaling.x / 2, nodeObjectPositionY - nodeObjectScaling.y / 2);
        let bottomRight = new fudge.Vector3(nodeObjectPositionX + nodeObjectScaling.x / 2, nodeObjectPositionY + nodeObjectScaling.y / 2);
        if (position.x > topLeft.x || )
            return true;
    }
    function createWall(nodeName, borderHeight, borderLength) {
        let mesh = new fudge.MeshQuad();
        let mtrSolidWhite = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        let nodeBorder = new fudge.Node(nodeName);
        let cmpMeshBorder = new fudge.ComponentMesh(mesh);
        let cmpMateriaBorder = new fudge.ComponentMaterial(mtrSolidWhite);
        let cmpTransformBorder = new fudge.ComponentTransform();
        nodeBorder.addComponent(cmpMeshBorder);
        nodeBorder.addComponent(cmpMateriaBorder);
        nodeBorder.addComponent(cmpTransformBorder);
        nodeBorder.getComponent(fudge.ComponentMesh).pivot.scale(new fudge.Vector3(borderLength, borderHeight, 0));
        return nodeBorder;
    }
})(L03_Pong || (L03_Pong = {}));
//# sourceMappingURL=Main.js.map