// eslint-disable-next-line no-redeclare
function colorToHex(color) {
    // Verifica se a cor é RGBA
    if (color.substring(0, 4) === "rgba") {
        // Separa os valores R, G, B e A em um array
        var rgbaValues = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(\.\d+)?)\)$/);

        // Converte os valores para hexadecimal e concatena
        let hex = "#" + (("0" + parseInt(rgbaValues[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgbaValues[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgbaValues[3], 10).toString(16)).slice(-2) +
            ("0" + Math.round(parseFloat(rgbaValues[4]) * 255).toString(16)).slice(-2));
        return hex;
    } else {
        // Separa os valores R, G e B em um array
        var rgbValues = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        // Converte os valores para hexadecimal e concatena
        let hex = "#" + (("0" + parseInt(rgbValues[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgbValues[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgbValues[3], 10).toString(16)).slice(-2));
        return hex;
    }
}


