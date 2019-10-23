namespace L03_Pong {
import fudge = FudgeCore;
window.addEventListener("load", handleLoad);
window.addEventListener("keydown", handleKeyDown);

let nodeBall: fudge.Node = new fudge.Node("Ball");
let nodePaddleLeft: fudge.Node = new fudge.Node("PaddleLeft");
let nodePaddleRight: fudge.Node = new fudge.Node("PaddleRight");

let viewport: fudge.Viewport;

function handleLoad(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    fudge.RenderManager.initialize();

    

    let cam: fudge.ComponentCamera = new fudge.ComponentCamera();
    cam.pivot.translateZ(6);

    viewport = new fudge.Viewport();



    let sceneNode: fudge.Node = createScene();
    viewport.initialize("Viewport", sceneNode, cam , canvas );

    viewport.draw();
}

function handleKeyDown(event: KeyboardEvent): void
{
   switch (event.keyCode)
   {
        case 87: 
        {
            (nodePaddleLeft.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.translateY(0.1);
            viewport.draw();
            break;
        }
        case 83:
        {
            (nodePaddleLeft.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.translateY(-0.1);
            viewport.draw();
            break;

        }
        case 38:
        {
            (nodePaddleRight.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.translateY(0.1);
            viewport.draw();
            break;
        }
        case 40:
        {
            (nodePaddleRight.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.translateY(-0.1);
            viewport.draw();
            break;
        }
        
   }
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
    (nodeBall.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scale(new fudge.Vector3(0.2, 0.2 , 0.2));


    //create Player 1 paddle
    let cmpMeshPaddleLeft: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
    let cmpMateriaPaddleLeft: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
    let cmpTransformPaddleLeft: fudge.ComponentTransform = new fudge.ComponentTransform();


    nodePaddleLeft.addComponent(cmpMeshPaddleLeft);
    nodePaddleLeft.addComponent(cmpMateriaPaddleLeft);
    nodePaddleLeft.addComponent(cmpTransformPaddleLeft);

    //positionin
    nodePaddleLeft.cmpTransform.local.translateX(-2.5);
    (nodePaddleLeft.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scale(new fudge.Vector3(0.2, 1.5 , 0));

    
    //create Player 2 paddle
    let cmpMeshPaddleRight: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
    let cmpMateriaPaddleRight: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
    let cmpTransformPaddleRight: fudge.ComponentTransform = new fudge.ComponentTransform();

    nodePaddleRight.addComponent(cmpMeshPaddleRight);
    nodePaddleRight.addComponent(cmpMateriaPaddleRight);
    nodePaddleRight.addComponent(cmpTransformPaddleRight);

    //positioning
    nodePaddleRight.cmpTransform.local.translateX(2.5);
    (nodePaddleRight.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scale(new fudge.Vector3(0.2, 1.5 , 0));
    

    //ceate scene Node
    let sceneNode: fudge.Node = new fudge.Node("Scene");
    sceneNode.appendChild(nodePaddleLeft);
    sceneNode.appendChild(nodeBall);
    sceneNode.appendChild(nodePaddleRight);

    return sceneNode;
}


   

}