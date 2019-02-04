var Scales = /** @class */ (function () {
    function Scales() {
        this.products = [];
    }
    Scales.prototype.add = function (product) {
        this.products.push(product);
    };
    Scales.prototype.getSumScale = function () {
        return this.products.reduce(function (sumWeigth, item) {
            return sumWeigth += item.getScale();
        }, 0);
    };
    Scales.prototype.getNameList = function () {
        return this.products.map(function (item) {
            return item.getName();
        });
    };
    return Scales;
}());
var Kiwi = /** @class */ (function () {
    function Kiwi(_name, _scale) {
        this._name = _name;
        this._scale = _scale;
    }
    Kiwi.prototype.getName = function () {
        return this._name;
    };
    Kiwi.prototype.getScale = function () {
        return this._scale;
    };
    return Kiwi;
}());
var Apple = /** @class */ (function () {
    function Apple(_name, _scale) {
        this._name = _name;
        this._scale = _scale;
    }
    Apple.prototype.getName = function () {
        return this._name;
    };
    Apple.prototype.getScale = function () {
        return this._scale;
    };
    return Apple;
}());
var kiwi1 = new Kiwi('kiwi1', 12);
var kiwi2 = new Kiwi('kiwi2', 25);
var apple1 = new Apple('apple1', 50);
var apple2 = new Apple('apple2', 105);
var scales = new Scales();
scales.add(kiwi1);
scales.add(apple2);
scales.add(kiwi2);
scales.add(apple1);
console.log(scales.getSumScale(), scales.getNameList());
