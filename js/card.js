function generateCard(name, price, color, size, image, linkDetails, stock) {
    const card = `
        <div class="card">
            <div>
                <a href=${linkDetails}>
                    <img src=${image} alt="" class="imageCard">
                </a>    
            </div>                
            <div id="productInformation">
                <div>
                    <div id="name">${name}</div>
                    <div id="price">${price}</div>
                </div>

                <div>
                    <div id="color">${color}</div>
                    <img src="" alt="" id="delete">
                </div>

                <div>
                    <div id="size">${size}</div>
                    <input type="number" min="1" max="${stock}" step="1" id="amount">
                </div>
            </div>
        </div>
    `;

    return card;
}

function insertCard() {

}