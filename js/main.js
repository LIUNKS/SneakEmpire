import { loadBanner } from "../js/banner.js";

window.addEventListener('DOMContentLoaded', () => {
    addEventListener();
    loadInicio();
});

function addEventListener() {
    const contenedorImagen = document.querySelector('.contenedor-imagen');
    const inicio = document.querySelector('.inicio');
    const nosotros = document.querySelector('.nosotros');
    const contacto = document.querySelector('.contacto');
    const redes = document.querySelector('.redes');

    contenedorImagen.addEventListener('click', () => {    
        loadInicio();
    });

    inicio.addEventListener('click', () => {    
        loadInicio();
    });

    nosotros.addEventListener('click', () => {    
        loadNosotros();
    });

    contacto.addEventListener('click', () => {    
        loadContacto();
    });

    redes.addEventListener('click', () => {    
        loadRedes();
    });
}

function loadInicio() {
    addStyles('../css/banner_style.css');   
    updateMainAppendChild(loadBanner());
}    

function loadNosotros() {    
    addStyles('../css/nosotros_style.css');

    loadHTML('../html/nosotros.html').then(htmlContent => {
        updateMainInnerHTML(htmlContent);
        addScript('../js/nosotros.js');
    });   

}	

function loadContacto() {
    addStyles('../css/contacto_style.css');

    loadHTML('../html/contacto.html').then(htmlContent => {
        updateMainInnerHTML(htmlContent);
        addScript('../js/contacto.js');  
    });   
}

function loadRedes() {
    addStyles('../css/redes_style.css')
    
    loadHTML('../html/redes.html').then(htmlContent => {
        updateMainInnerHTML(htmlContent);
        addScript('../js/redes.js');
    });   
}

let className = 'scriptMain'
function addScript(src) {
    removeScript();
    const script = document.createElement('script');
    script.src = src;
    script.classList.add(className);
    document.body.appendChild(script);
}

function removeScript() {
    const scripts = document.querySelectorAll('.' + className);    
    scripts.forEach(script => {
        script.parentNode.removeChild(script);
    });
}

let stylesLoaded = [];
function addStyles(href) {
    if (stylesLoaded.length > 0) {
        for (let i = 0; i < stylesLoaded.length; i++) {
            if (stylesLoaded[i] === href) {
                return;  
            }
        }
    }
    stylesLoaded.push(href);
    const link = document.createElement('link');        
    link.rel = 'stylesheet';
    link.href = href;    
    document.head.appendChild(link);
}	

function updateMainAppendChild(htmlContent) {
    const main = document.querySelector('main');
    main.replaceChildren(htmlContent);
}

function updateMainInnerHTML(htmlContent) {
    const main = document.querySelector('main');
    main.innerHTML = htmlContent;
}
  
async function loadHTML(ubicacion) {    
    try {
        const res = await fetch(ubicacion);
        const htmlContent = await res.text();

        return htmlContent;
    } catch (error) {
        console.error('Error al cargar el archivo HTML:', error);
    }
}
