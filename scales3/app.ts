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

interface IStorageEngine {
    items:Array<Product>;
    addItem(item:Product):void;
    getItem(index:number):Product;
    getCount():number;
}

class Scales<StorageEngine extends IStorageEngine> {

    private products:Array<Product>;

    public storage:StorageEngine;

    constructor(storage:StorageEngine) {
        this.products = storage.items;
        this.storage = storage;
    };

    public addItem(item:Product):void {
        this.storage.addItem(item);
    }

    public getItem(index:number):Product {
        return this.storage.getItem(index);
    };

    public getCount():number {
        return this.storage.getCount();
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

const scales1:Scales<ScalesStorageEngineArray> = new Scales(new ScalesStorageEngineArray());


scales1.addItem(apple2);
scales1.addItem(kiwi1);
console.log(scales1.getCount());

console.log(scales1.getSumScale(), scales1.getNameList());