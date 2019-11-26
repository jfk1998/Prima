"use strict";
var L04_3DTetris;
(function (L04_3DTetris) {
    var ƒ = FudgeCore;
    class Fragment extends ƒ.Node {
        constructor(_shape) {
            super("Fragment-Type" + _shape);
            this.position = new ƒ.Vector3(0, 0, 0);
            let shape = Fragment.shapes[_shape];
            for (let position of shape) {
                let type = Fragment.getRandomEnum(L04_3DTetris.CUBE_TYPE);
                let vctPosition = ƒ.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube = new L04_3DTetris.Cube(type, vctPosition);
                this.appendChild(cube);
            }
        }
        static getShapeArray() {
            return [
                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]],
                //long
                [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, -1, 0]],
                //L
                [[0, 0, 0], [0, 1, 0], [0, -1, 0], [1, -1, 0]]
            ];
        }
        static getRandomEnum(_enum) {
            let randomKey = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
    Fragment.shapes = Fragment.getShapeArray();
    L04_3DTetris.Fragment = Fragment;
})(L04_3DTetris || (L04_3DTetris = {}));
//# sourceMappingURL=Fragment.js.map