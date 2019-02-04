class Scales {

    private products:Array<IScalable>;

    constructor() {
        this.products = [];
    }

    public add(product:IScalable):void {
        this.products.push(product);
    }

    public getSumScale():number {
        return this.products.reduce((sumWeigth:number, item:IScalable):number => {
            return sumWeigth += item.getScale();
        }, 0)
    }

    public getNameList():Array<string> {
        return this.products.map((item:IScalable):string => {
            return item.getName();
        });
    }
}

interface IScalable {
    getName():string;
    getScale():number;
}

class Kiwi implements IScalable {

    constructor(private _name:string, private _scale:number) {

    }

    getName():string {
        return this._name;
    }

    getScale():number {
        return this._scale;
    }
}

class Apple implements IScalable {

    constructor(private _name:string, private _scale:number) {

    }

    getName():string {
        return this._name;
    }

    getScale():number {
        return this._scale;
    }
}

const kiwi1:Kiwi = new Kiwi('kiwi1', 12);
const kiwi2:Kiwi = new Kiwi('kiwi2', 25);
const apple1:Apple = new Apple('apple1', 50);
const apple2:Apple = new Apple('apple2', 105);

const scales = new Scales();

scales.add(kiwi1);
scales.add(apple2);
scales.add(kiwi2);
scales.add(apple1);

console.log(scales.getSumScale(), scales.getNameList());