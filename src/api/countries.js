// export async function fetchCountries() {
//     try {
//         const response = await fetch("https://restcountries.com/v3.1/all",{mode:'no-cors'}
//         );
//         if (!response.ok) {
//             throw new Error("Error al obtener los datos de los países");
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error:", error);
//         return [];  // Retorna un array vacío en caso de error
//     }
// }


export async function fetchCountries() {
    try {
        // Cambia la ruta según donde hayas colocado el archivo .txt
        const response = await fetch("/src/api/countries.txt");
        
        if (!response.ok) {
            throw new Error("Error al obtener los datos de los países");
        }

        // Lee el contenido del archivo .txt
        const textData = await response.text();

        // Parsea el contenido como JSON (asumiendo que el archivo .txt contiene JSON válido)
        const data = JSON.parse(textData);

        return data;
    } catch (error) {
        console.error("Error:", error);
        return [];  // Retorna un array vacío en caso de error
    }
}