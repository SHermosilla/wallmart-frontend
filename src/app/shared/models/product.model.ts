export class Product {
    id: number;
    brand: string;
    description: string;
    image: string;
    price: number;
    threshold: number;
    discount: number;
    quantity: number;
    constructor() {
        this.id = 0,
            this.brand = "",
            this.description = "",
            this.image = "",
            this.price = 0,
            this.threshold = 0,
            this.discount = 0,
            this.quantity = 0
    }
}
