namespace L02_FirstFudge {
import fudge = FudgeCore;
window.addEventListener("load", handleLoad);

function handleLoad(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    fudge.RenderManager.initialize();

    let node: fudge.Node = new fudge.Node("Quad");


    let mesh: fudge.MeshQuad = new fudge.MeshQuad();
    let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
    let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
    let cmpMaterial: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

    let cam: fudge.ComponentCamera = new fudge.ComponentCamera();
    cam.pivot.translateZ(5);
    
    node.addComponent(cmpMesh); 
    node.addComponent(cmpMaterial);
    

    





    let viewport: fudge.Viewport = new fudge.Viewport();

    viewport.initialize("Viewport", node, cam , canvas );

    viewport.draw();
    


}
   

}