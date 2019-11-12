
namespace L04_3DTetris {
    import fudge = FudgeCore;
    window.addEventListener("load", handleLoad);

    let viewport: fudge.Viewport;



    function handleLoad(): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        
        fudge.RenderManager.initialize();

        let cam: fudge.ComponentCamera = new fudge.ComponentCamera();
        cam.pivot.translateZ(20);

        viewport = new fudge.Viewport();

        viewport.initialize("Viewport", sceneNode, cam, canvas);

        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, updateLoopFrame);
        fudge.Loop.start();

        viewport.draw();

    }

    function updateLoopFrame(_event: Event): void {

 
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




    function createScene(): fudge.Node {
      

        return sceneNode;
    }




}