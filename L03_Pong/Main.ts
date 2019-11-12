
namespace L03_Pong {
    import fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    interface keyPress {
        [code: string]: Boolean;

    }



    let sceneNode: fudge.Node;
    let nodeBall: fudge.Node = new fudge.Node("Ball");
    let nodePaddleLeft: fudge.Node = new fudge.Node("PaddleLeft");
    let nodePaddleRight: fudge.Node = new fudge.Node("PaddleRight");
    let wallLeft: fudge.Node;
    let wallRight: fudge.Node;
    let wallTop: fudge.Node; 
    let wallBottom: fudge.Node;

    let hittedWall = false;


    let viewport: fudge.Viewport;

    let keysPressed: keyPress = {};


    let ballStartdirection: fudge.Vector3;

    let canvasHeight = 14;
    let canvasLength = 20;

    let pointsP1 = 0;
    let pontsP2 = 0;

    let ballPosition;

    let paddleMovementUP: fudge.Vector3 = new fudge.Vector3(0,0.1,0);
    let paddleMovementDown: fudge.Vector3 = new fudge.Vector3(0,-0.1,0);




    function handleLoad(): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        
        fudge.RenderManager.initialize();

        let cam: fudge.ComponentCamera = new fudge.ComponentCamera();
        cam.pivot.translateZ(20);

        viewport = new fudge.Viewport();

        let sceneNode: fudge.Node = createScene();
        spawnBall();
        viewport.initialize("Viewport", sceneNode, cam, canvas);

        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, updateLoopFrame);
        fudge.Loop.start();

        viewport.draw();

    }

    function getRandomSign(): number {
        return Math.random() < 0.5 ? -1 : 1;
    }


    function updateLoopFrame(_event: Event): void {

        // Controls
        if (keysPressed[fudge.KEYBOARD_CODE.W]) {
           // nodePaddleLeft.cmpTransform.local.translate(paddleMovementUP);
           nodePaddleLeft.cmpTransform.local.translateY(0.1);

            
        }

        if (keysPressed[fudge.KEYBOARD_CODE.S]) {
            //nodePaddleLeft.cmpTransform.local.translate(paddleMovementDown);
            nodePaddleLeft.cmpTransform.local.translateY(-0.1);


        }

        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_UP]) {
           // nodePaddleRight.cmpTransform.local.translate(paddleMovementUP);
           nodePaddleRight.cmpTransform.local.translateY(0.1);


        }

        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_DOWN]) {
            //nodePaddleRight.cmpTransform.local.translate(paddleMovementDown);
            nodePaddleRight.cmpTransform.local.translateY(-0.1);

        }

        ballPosition = nodeBall.cmpTransform.local.translation;

        //CheckIfBallis hitting paddles
        if(detectHit(ballPosition, nodePaddleLeft))
         {
             ballStartdirection.x = -ballStartdirection.x;
         }
        if(detectHit(ballPosition, nodePaddleRight))
         {
             ballStartdirection.x = -ballStartdirection.x;
         }

        //checkIfBallIsHittingWall
        if( detectHit(ballPosition, wallLeft))
        {
  
            if(!hittedWall)
            {
                pontsP2++;
                document.querySelector("h2").innerHTML = "Points P1: " + pointsP1 + "  " + " Points P2: " + pontsP2;
                hittedWall = true;
                spawnBall();
                hittedWall = false;
            }       

        }

        
        if(detectHit(ballPosition, wallRight))
        {
           
            if(!hittedWall)
            {
                sceneNode.removeChild(nodeBall);
                pointsP1++;
                document.querySelector("h2").innerHTML = "Points P1: " + pointsP1 + "  " + " Points P2: " + pontsP2;
                hittedWall = true;
                spawnBall();
                hittedWall = false;

            }
            
        }
        if(detectHit(ballPosition, wallTop))
        {
            ballStartdirection.y = -ballStartdirection.y;
        }
        if(detectHit(ballPosition, wallBottom))
        {
            ballStartdirection.y = -ballStartdirection.y;
        }
        //move ball 
        nodeBall.cmpTransform.local.translate(ballStartdirection);
        

        //update Scene
        fudge.RenderManager.update();
        viewport.draw();

    }

    function detectHit(hitterPosition: fudge.Vector3, collisionObject: fudge.Node): boolean{
        
        let objectScaling: fudge.Vector3 = (collisionObject.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;
        let objectPosition: fudge.Vector3 = collisionObject.cmpTransform.local.translation;

        let bottomRight: fudge.Vector3 = new fudge.Vector3(objectPosition.x + (objectScaling.x/2), objectPosition.y + (objectScaling.y/2),0 );
        let topLeft: fudge.Vector3 = new fudge.Vector3(objectPosition.x - (objectScaling.x/2), objectPosition.y - (objectScaling.y/2));

        //hitting from Right or Left
        if(hitterPosition.x > topLeft.x && hitterPosition.x < bottomRight.x)
        {
             //hitting from top or Bottom
            if(hitterPosition.y > topLeft.y && hitterPosition.y < bottomRight.y )
            {

                return true;

            }

        }else return false;
        
    }

    function handleKeyDown(event: KeyboardEvent): void {
        keysPressed[event.code] = true;
    }

    function handleKeyUp(event: KeyboardEvent): void {
        keysPressed[event.code] = false;
    }


    function createScene(): fudge.Node {
        //setup Meshs and Materials
        let mesh: fudge.MeshQuad = new fudge.MeshQuad();
        let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));


        //create Ball
        let cmpMeshBall: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        let cmpMaterialBall: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        let cmpTransformBall: fudge.ComponentTransform = new fudge.ComponentTransform();

        nodeBall.addComponent(cmpMeshBall);
        nodeBall.addComponent(cmpMaterialBall);
        nodeBall.addComponent(cmpTransformBall);


        //positioning
        (nodeBall.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scale(new fudge.Vector3(1, 1, 0));


        //create Player 1 paddle
        let cmpMeshPaddleLeft: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        let cmpMateriaPaddleLeft: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        let cmpTransformPaddleLeft: fudge.ComponentTransform = new fudge.ComponentTransform();


        nodePaddleLeft.addComponent(cmpMeshPaddleLeft);
        nodePaddleLeft.addComponent(cmpMateriaPaddleLeft);
        nodePaddleLeft.addComponent(cmpTransformPaddleLeft);

        //positionin
        nodePaddleLeft.cmpTransform.local.translateX(-9);
        (nodePaddleLeft.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scale(new fudge.Vector3(1, 4, 0));


        //create Player 2 paddle
        let cmpMeshPaddleRight: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        let cmpMateriaPaddleRight: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        let cmpTransformPaddleRight: fudge.ComponentTransform = new fudge.ComponentTransform();

        nodePaddleRight.addComponent(cmpMeshPaddleRight);
        nodePaddleRight.addComponent(cmpMateriaPaddleRight);
        nodePaddleRight.addComponent(cmpTransformPaddleRight);

        //positioning
        nodePaddleRight.cmpTransform.local.translateX(9);
        (nodePaddleRight.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scale(new fudge.Vector3(1, 4, 0));


        //createBorder
        wallRight = createWall("Wall1", canvasHeight, 1);
        wallLeft = createWall("Wall2", canvasHeight, 1);
        wallTop = createWall("Wall3", 1, canvasLength);
        wallBottom = createWall("Wall4", 1, canvasLength);

        //position walls
        wallRight.cmpTransform.local.translateX(canvasLength/2);
        wallLeft.cmpTransform.local.translateX(-canvasLength/2);

        wallTop.cmpTransform.local.translateY(-canvasHeight/2);
        wallBottom.cmpTransform.local.translateY(canvasHeight/2);


        
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

    function createWall(nodeName: string, borderHeight: number, borderLength: number): fudge.Node
    {

        let mesh: fudge.MeshQuad = new fudge.MeshQuad();
        let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));

        let nodeBorder: fudge.Node = new fudge.Node(nodeName);
        let cmpMeshBorder: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        let cmpMateriaBorder: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        let cmpTransformBorder: fudge.ComponentTransform = new fudge.ComponentTransform();
        nodeBorder.addComponent(cmpMeshBorder);
        nodeBorder.addComponent(cmpMateriaBorder);
        nodeBorder.addComponent(cmpTransformBorder);

        (nodeBorder.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scale(new fudge.Vector3(borderLength, borderHeight, 0));

        return nodeBorder;
    }

    function spawnBall()
    {
            nodeBall.cmpTransform.local.translation = (new fudge.Vector3(0, 0, 0));
            ballStartdirection = new fudge.Vector3(getRandomSign() * Math.random() / 5, getRandomSign() * Math.random() / 5, 0);
    }



}