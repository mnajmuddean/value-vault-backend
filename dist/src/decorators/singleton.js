"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleton = singleton;
function singleton(constructor) {
    let instance = null;
    return class extends constructor {
        constructor(...args) {
            if (!instance) {
                super(...args);
                instance = this;
            }
            return instance;
        }
    };
}
//# sourceMappingURL=singleton.js.map