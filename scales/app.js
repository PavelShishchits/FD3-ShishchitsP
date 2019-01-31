var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scales = /** @class */ (function () {
    function Scales() {
        this.products = [];
    }
    Scales.prototype.add = function (product) {
        this.products = this.products.concat([product]);
    };
    Scales.prototype.getSumScale = function () {
        return this.products.reduce(function (sumWeigth, item) {
            return sumWeigth += item._scale;
        }, 0);
    };
    Scales.prototype.getNameList = function () {
        return this.products.map(function (item) {
            return item._name;
        });
    };
    return Scales;
}());
var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        this._name = _name;
        this._scale = _scale;
    }
    Object.defineProperty(Product.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        enumerable: true,
        configurable: true
    });
    return Product;
}());
var Kiwi = /** @class */ (function (_super) {
    __extends(Kiwi, _super);
    function Kiwi(name, scale) {
        return _super.call(this, name, scale) || this;
    }
    return Kiwi;
}(Product));
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(name, scale) {
        return _super.call(this, name, scale) || this;
    }
    return Apple;
}(Product));
var kiwi1 = new Kiwi('kiwi1', 12);
var kiwi2 = new Kiwi('kiwi2', 25);
var apple1 = new Apple('apple1', 50);
var apple2 = new Apple('apple2', 89);
var scales = new Scales();
scales.add(kiwi1);
scales.add(apple2);
scales.add(kiwi2);
scales.add(apple1);
console.log(scales.getSumScale(), scales.getNameList());
