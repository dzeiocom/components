export function buildClassName() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    var classesFinal = [];
    root: for (var _a = 0, classes_1 = classes; _a < classes_1.length; _a++) {
        var classe = classes_1[_a];
        if (typeof classe === 'undefined') {
            continue;
        }
        if (typeof classe === 'string') {
            classesFinal.push(classe);
            continue;
        }
        var classToPut = classe.shift();
        if (typeof classToPut === 'undefined') {
            continue;
        }
        for (var _b = 0, classe_1 = classe; _b < classe_1.length; _b++) {
            var iterator = classe_1[_b];
            if (!iterator) {
                continue root;
            }
        }
        classesFinal.push(classToPut);
    }
    if (classesFinal.length === 0) {
        return undefined;
    }
    return classesFinal.join(' ');
}
export var colors = {
    default: '#3949AB',
    primary: '#3949AB',
    secondary: '#FCFCFC',
    info: '#03A9F4',
    success: '#2DCE89',
    danger: '#F5365C',
    warning: '#FB6340'
};
