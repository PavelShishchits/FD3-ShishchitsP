interface IStorageEngine {
    addItem(item:Product):void;
    getItem(index:number):Product;
    getCount():number;
}

class Scales<StorageEngine extends IStorageEngine> {

    private products:Array<Product>;

    constructor() {
        this.products = [];
    };

    public addItem(item:Product):void {
        this.products.push(item);
    };

    public getItem(index:number):Product {
        return this.products[index];
    };

    public getCount():number {
        return this.products.length;
    };

    public getSumScale():number {
        return this.products.reduce((sumWeigth: number, item: Product): number => {
            return sumWeigth += item.getScale();
        }, 0)
    };

    public getNameList():Array<string> {
        return this.products.map((item: Product): string => {
            return item.getName();
        });
    };
}

class ScalesStorageEngineArray implements IStorageEngine {

    items:Array<Product> = [];

    public addItem(item:Product):void {
        this.items.push(item);
    };

    public getItem(index:number):Product {
        return this.items[index];
    };

    public getCount():number {
        return this.items.length;
    };

}

class Product {

    constructor(protected _name: string, protected _scale: number) {

    };

    public getName():string {
        return this._name;
    };


    public getScale():number {
        return this._scale;
    };
}

const kiwi1:Product = new Product('kiwi1', 12);
const kiwi2:Product = new Product('kiwi2', 25);
const apple1:Product = new Product('apple1', 50);
const apple2:Product = new Product('apple2', 89);

const scales = new Scales();

scales.addItem(kiwi1);
scales.addItem(apple2);
scales.addItem(kiwi2);
scales.addItem(apple1);

console.log(scales.getItem(2));

console.log(scales.getSumScale(), scales.getNameList());