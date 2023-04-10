const fs = require("fs");
const { title } = require("process");

class ProductManager{
    constructor() {
        this.products = []
        this.index = 0
        this.filename = './products.json'
        fs.writeFileSync(this.filename, JSON.stringify(this.products, null,"\t"))
    }
    
    getProducts = () => {
        const productList = fs.readFileSync(this.filename, "utf-8")
        return (productList);
    }
    
    getProductByID = (id) => {
        const list = JSON.parse(fs.readFileSync(this.filename, "utf-8"))
        
    const found = list.find(e=> e.id === id)
    found === undefined ? console.log("Not Found") : console.log(found)
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        this.index++

        const id = this.index

        const product = {id,title,description,price,thumbnail,code,stock}

        if (this.products.some(i => i.code === code)){
            console.log("Repeated code")
        } else if (!title || !description || !price || !thumbnail || !code || !code || !stock) {
            console.log("Missing data")
        } else {
            this.products.push(product)
            fs.writeFileSync(this.filename, JSON.stringify(this.products, null, "\t"))
        }
    }

    updateProduct = (id, key, value) => {
        const pIndex = this.products.findIndex(p => p.id === id);
        
        console.log('\nFuncion updateProduct:\n')

        if (pIndex !== -1){
            this.products[pIndex][key] = value

            fs.writeFileSync(this.filename, JSON.stringify(this.products, null, '\t')) 

            return console.log(`El producto con id ${id} ha sido actualizado`)
        } else {
            return console.log('Producto no encontrado')
        }
    }

    deleteProduct = (id) => {
        fs.readFileSync(this.filename, 'utf-8', (err, data) => {
           if (err) {
            console.log(err);
           } else {
                const product = JSON.parse(data) 

                const index = product.findIndex((producto) => producto.id === id);
                if (index !== -1) {
                product.splice(index, 1);

                fs.writeFile(this.filename, JSON.stringify(product), (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Producto eliminado exitosamente!');
                }
                });
                } else {
                console.log('No se encontró el producto con ese ID.');
                }
            }
        })
    } 
}

const manager = new ProductManager()

manager.addProduct(
    'Lentes de sol',
    'Ray ban ClubMaster',
    34000,
    'https://http2.mlstatic.com/D_NQ_NP_710134-MLA50997233933_082022-O.webp',
    12345678,
    3,
)
manager.addProduct(
    'Lentes de sol',
    'Aviator Caravan',
    38000,
    'https://http2.mlstatic.com/D_NQ_NP_972870-MLA48699908684_122021-O.webp',
    123456789,
    2,
)

console.log(manager.getProducts()); 
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123",25 );
console.log(manager.getProducts()); 
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123",25 );
manager.getProductByID(1); 
manager.getProductByID(2);
manager.deleteProduct(3);
manager.updateProduct(2)