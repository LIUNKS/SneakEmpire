let store = [];

//CLASE
class Calzado {
    constructor(name, price, color, size, stock, info, imageSrc, linkDetails) {
        this.name = name;          
        this.price = price;        
        this.color = color;       
        this.size = size;          
        this.stock = stock;   
        this.info = info;     
        this.imageSrc = imageSrc;  
        this.linkDetails = linkDetails;  
    }
}

// Como parametro recibe un json
function loadData() {
    loadJson().then(data => {
        for (let i = 0; i < data.length; i++) {
            const calzado = new Calzado(
                data[i].name, 
                data[i].price, 
                data[i].color, 
                data[i].size, 
                data[i].stock, 
                data[i].info, 
                data[i].imageSrc, 
                data[i].linkDetails);   
            store.push(calzado);
          }
    })
}
  
// Mejora posible: hacer la lectura de linea por linea, en vez de cargar todo en memoria.
async function loadJson() {
    try {
        const response = await fetch('../data/zapatillas.json');

        if (!response.ok) {
            throw new Error(`Error al cargar el JSON: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}
