namespace L02_FirstFudge {
import fudge = FudgeCore;
window.addEventListener("load", handleLoad);

function handleLoad(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    fudge.RenderManager.initialize();

    let mesh: fudge.MeshQuad = new fudge.MeshQuad();
    let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
    let mtrSolidRed: fudge.Material = new fudge.Material("SolidRed", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 0, 1)));
    let mtrSolidGreen: fudge.Material = new fudge.Material("SolidRed", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 0, 1)));


    let nodeBall: fudge.Node = new fudge.Node("Ball");
    let nodePlayer1: fudge.Node = new fudge.Node("Player1");
    let nodePlayer2: fudge.Node = new fudge.Node("Player2");


    //Ball
    let cmpMeshBall: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
    let cmpMaterialBall: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

    cmpMeshBall.pivot.scale(new fudge.Vector3(0.3, 0.3, 0.3));

    nodeBall.addComponent(cmpMeshBall); 
    nodeBall.addComponent(cmpMaterialBall);
    //Player1
    let cmpMeshPlayer1: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
    let cmpMateriaPlayer1: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidRed);

    cmpMeshPlayer1.pivot.translateX(2);
    cmpMeshPlayer1.pivot.scaleY(3);
    cmpMeshPlayer1.pivot.scaleX(0.3);
    
    nodePlayer1.addComponent(cmpMeshPlayer1);
    nodePlayer1.addComponent(cmpMateriaPlayer1);

    //Player2
    let cmpMeshPlayer2: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
    let cmpMateriaPlayer2: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidGreen);
    
    cmpMeshPlayer2.pivot.translateX(-2);
    cmpMeshPlayer2.pivot.scaleY(3);
    cmpMeshPlayer2.pivot.scaleX(0.3);
        
    nodePlayer2.addComponent(cmpMeshPlayer2);
    nodePlayer2.addComponent(cmpMateriaPlayer2);
    

    //show
    let parentNode: fudge.Node = new fudge.Node("Parent");
    parentNode.appendChild(nodePlayer1);
    parentNode.appendChild(nodeBall);
    parentNode.appendChild(nodePlayer2);

    let cam: fudge.ComponentCamera = new fudge.ComponentCamera();
    cam.pivot.translateZ(5);

    let viewport: fudge.Viewport = new fudge.Viewport();

    viewport.initialize("Viewport", parentNode, cam , canvas );

    viewport.draw();

 
    


}


   

}