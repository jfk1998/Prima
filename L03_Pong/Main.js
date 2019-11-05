"use strict";
var L03_Pong;
(function (L03_Pong) {
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    let sceneNode;
    let nodeBall = new fudge.Node("Ball");
    let nodePaddleLeft = new fudge.Node("PaddleLeft");
    let nodePaddleRight = new fudge.Node("PaddleRight");
    let wallLeft;
    let wallRight;
    let wallTop;
    let wallBottom;
    let viewport;
    let keysPressed = {};
    let ballStartdirection = new fudge.Vector3(getRandomSign() * Math.random() / 5, getRandomSign() * Math.random() / 5, 0);
    let canvasHeight = 14;
    let canvasLength = 20;
    let pointsP1 = 0;
    let pontsP2 = 0;
    let ballPosition;
    let paddleMovementUP = new fudge.Vector3(0, 0.1, 0);
    let paddleMovementDown = new fudge.Vector3(0, -0.1, 0);
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
            nodePaddleLeft.cmpTransform.local.translate(paddleMovementUP);
        }
        if (keysPressed[fudge.KEYBOARD_CODE.S]) {
            nodePaddleLeft.cmpTransform.local.translate(paddleMovementDown);
        }
        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_UP]) {
            nodePaddleRight.cmpTransform.local.translate(paddleMovementUP);
        }
        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_DOWN]) {
            nodePaddleRight.cmpTransform.local.translate(paddleMovementDown);
        }
        ballPosition = nodeBall.cmpTransform.local.translation;
        //CheckIfBallis hitting paddles
        if (detectHit(ballPosition, nodePaddleLeft)) {
            ballStartdirection.x = -ballStartdirection.x;
        }
        if (detectHit(ballPosition, nodePaddleRight)) {
            ballStartdirection.x = -ballStartdirection.x;
        }
        //checkIfBallIsHittingWall
        if (detectHit(ballPosition, wallLeft)) {
            sceneNode.removeChild(nodeBall);
            pontsP2++;
            document.querySelector("h2").innerHTML = "Points P1: " + pointsP1 + "  " + " Points P2: " + pontsP2;
        }
        if (detectHit(ballPosition, wallRight)) {
            sceneNode.removeChild(nodeBall);
            pointsP1++;
            document.querySelector("h2").innerHTML = "Points P1: " + pointsP1 + "  " + " Points P2: " + pontsP2;
        }
        if (detectHit(ballPosition, wallTop)) {
            ballStartdirection.y = -ballStartdirection.y;
        }
        if (detectHit(ballPosition, wallBottom)) {
            ballStartdirection.y = -ballStartdirection.y;
        }
        //move ball 
        nodeBall.cmpTransform.local.translate(ballStartdirection);
        //update Scene
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
        wallRight = createWall("Wall1", canvasHeight, 1);
        wallLeft = createWall("Wall2", canvasHeight, 1);
        wallTop = createWall("Wall3", 1, canvasLength);
        wallBottom = createWall("Wall4", 1, canvasLength);
        //position walls
        wallRight.cmpTransform.local.translateX(canvasLength / 2);
        wallLeft.cmpTransform.local.translateX(-canvasLength / 2);
        wallTop.cmpTransform.local.translateY(-canvasHeight / 2);
        wallBottom.cmpTransform.local.translateY(canvasHeight / 2);
        //ceate scene Node
        sceneNode = new fudge.Node("Scene");
        sceneNode.appendChild(nodePaddleLeft);
        sceneNode.appendChild(nodeBall);
        sceneNode.appendChild(nodePaddleRight);
        sceneNode.appendChild(wallBottom);
        sceneNode.appendChild(wallTop);
        sceneNode.appendChild(wallRight);
        sceneNode.appendChild(wallLeft);
        return sceneNode;
    }
    function createWall(nodeName, borderHeight, borderLength) {
        let mesh = new fudge.MeshQuad();
        let mtrSolidWhite = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
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