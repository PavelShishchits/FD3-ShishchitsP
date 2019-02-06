var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        this._name = _name;
        this._scale = _scale;
    }
    ;
    Product.prototype.getName = function () {
        return this._name;
    };
    ;
    Product.prototype.getScale = function () {
        return this._scale;
    };
    ;
    return Product;
}());
var kiwi1 = new Product('kiwi1', 12);
var kiwi2 = new Product('kiwi2', 25);
var apple1 = new Product('apple1', 50);
var apple2 = new Product('apple2', 89);
var Scales = /** @class */ (function () {
    function Scales(storage) {
        this.products = storage.items;
        this.storage = storage;
    }
    ;
    Scales.prototype.addItem = function (item) {
        this.storage.addItem(item);
    };
    Scales.prototype.getItem = function (index) {
        return this.storage.getItem(index);
    };
    ;
    Scales.prototype.getCount = function () {
        return this.storage.getCount();
    };
    ;
    Scales.prototype.getSumScale = function () {
        return this.products.reduce(function (sumWeigth, item) {
            return sumWeigth += item.getScale();
        }, 0);
    };
    ;
    Scales.prototype.getNameList = function () {
        return this.products.map(function (item) {
            return item.getName();
        });
    };
    ;
    return Scales;
}());
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray() {
        this.items = [];
    }
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        this.items.push(item);
    };
    ;
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        if (index < 0 || index > this.items.length - 1) {
            throw new Error("\u041F\u043E\u0434 \u0438\u043D\u0434\u0435\u043A\u0441\u043E\u043C " + index + " \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0432\u0443\u0435\u0442 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430");
        }
        else {
            return this.items[index];
        }
    };
    ;
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.items.length;
    };
    ;
    return ScalesStorageEngineArray;
}());
var ScalesStorageEngineLocalStorage = /** @class */ (function () {
    function ScalesStorageEngineLocalStorage() {
        this.items = [];
        this.key = 'products';
        localStorage.setItem(this.key, JSON.stringify(this.items));
    }
    ScalesStorageEngineLocalStorage.reviver = function (item) {
        return new Product(item._name, item._scale);
    };
    ;
    ScalesStorageEngineLocalStorage.prototype.addItem = function (item) {
        this.items.push(item);
        localStorage.setItem(this.key, JSON.stringify(this.items));
    };
    ;
    ScalesStorageEngineLocalStorage.prototype.getItem = function (index) {
        var items = JSON.parse(localStorage.getItem(this.key));
        if (index < 0 || index > items.length - 1) {
            throw new Error("\u041F\u043E\u0434 \u0438\u043D\u0434\u0435\u043A\u0441\u043E\u043C " + index + " \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0432\u0443\u0435\u0442 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430");
        }
        else {
            return ScalesStorageEngineLocalStorage.reviver(items[index]);
        }
    };
    ;
    ScalesStorageEngineLocalStorage.prototype.getCount = function () {
        return JSON.parse(localStorage.getItem(this.key)).length;
    };
    ;
    return ScalesStorageEngineLocalStorage;
}());
var scales1 = new Scales(new ScalesStorageEngineArray());
var scales2 = new Scales(new ScalesStorageEngineLocalStorage());
scales1.addItem(apple2);
scales1.addItem(kiwi1);
scales2.addItem(kiwi2);
scales2.addItem(apple1);
scales2.addItem(apple2);
scales2.addItem(apple1);
console.log(scales1.getSumScale(), scales1.getNameList());
console.log(scales2.getSumScale(), scales2.getNameList());
