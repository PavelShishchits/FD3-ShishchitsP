class Scales {

    private products:Array<object>;

    constructor() {
        this.products = [];
    }

    public add(product:Product):void {
        this.products = [...this.products, product];
    }

    public getSumScale():number {
        return this.products.reduce((sumWeigth:number, item:{_name:string, _scale:number}):number => {
            return sumWeigth += item._scale;
        }, 0)
    }

    public getNameList():Array<string> {
        return this.products.map((item:{_name:string, _scale:number}):string => {
            return item._name;
        });
    }
}

class Product {

    constructor(protected _name:string, protected _scale:number) {

    }

    get name():string {
        return this._name;
    }

    get scale():number {
        return this._scale;
    }
}

class Kiwi extends Product {

    constructor(name:string, scale:number) {
        super(name, scale);
    }
}

class Apple extends Product {

    constructor(name:string, scale:number) {
        super(name, scale);
    }
}

const kiwi1:Kiwi = new Kiwi('kiwi1', 12);
const kiwi2:Kiwi = new Kiwi('kiwi2', 25);
const apple1:Apple = new Apple('apple1', 50);
const apple2:Apple = new Apple('apple2', 89);

const scales = new Scales();

scales.add(kiwi1);
scales.add(apple2);
scales.add(kiwi2);
scales.add(apple1);

console.log(scales.getSumScale(), scales.getNameList());