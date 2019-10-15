"use strict";
var L02_FirstFudge;
(function (L02_FirstFudge) {
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        let node = new fudge.Node("Quad");
        let mesh = new fudge.MeshQuad();
        let mtrSolidWhite = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        let cmpMesh = new fudge.ComponentMesh(mesh);
        let cmpMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        let cam = new fudge.ComponentCamera();
        cam.pivot.translateZ(5);
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        let viewport = new fudge.Viewport();
        viewport.initialize("Viewport", node, cam, canvas);
        viewport.draw();
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
//# sourceMappingURL=Main.js.map