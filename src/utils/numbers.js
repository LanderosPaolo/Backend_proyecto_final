
// Función para formatear números con punto como separador de miles
const formatLatin = (numero) => {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

module.exports = {
    formatLatin
}