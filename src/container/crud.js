import fs from "fs";

class Crud  {
    nombreArchivo = ""
    constructor(nombreArchivo) {
        this.nombreArchivo = `../src/database/${nombreArchivo}.json`; 
    };
    async create(obj) {
        let id =1;
        if(await this.getAll() ===undefined ){ //si el archivo no existe crea el primer documento
          try {
            obj.id =id;
            obj=[obj];
            const strings = JSON.stringify(obj); //trasnformo el archivo a string
            await fs.promises.writeFile(`../database/${this.nombreArchivo}`, strings );//creo el documento
            console.log("Primer Archivo Creado"); //utilizo el log como un callback para saber si el archivo se creo
          }    
          catch (error) {
                console.log("No fue posible crear el archivo", error);
          }
         }
        else { //si el documento existe
            const  archivos = await this.getAll();
            if(archivos.id ==1){//si el id es igual a 1 (solo funciona en el primer caso)
                try{
                let id =archivos.id++
                obj.id =id;  
                const strings = JSON.stringify(archivos); //trasnformo 
                const result = strings.concat(JSON.stringify(obj)); 
                await fs.promises.writeFile(`../database/${this.nombreArchivo}`, result);
                console.log("archivo 2 agregado");
                }catch (error) { 
                    console.log("no se pudo agregar el archivo 2");
                }    
            }else{//como no encuentra el id igual a 1, hace lo siguiente.
            let id = archivos[archivos.length-1].id
            id++;
            obj.id = id; //defino el id nuevo
            archivos.push(obj) //agrego el objeto al array.
            const archivoString = JSON.stringify(archivos)
            await fs.promises.writeFile(`../database/${this.nombreArchivo}`, archivoString );//escribo el archivo con la nueva informacion.
            console.log("done");
            return obj.id  //
           }
    }
}
    async getById(id) {
        try {
            const leerbyIdObjt = await this.getAll();
            const encontrado = leerbyIdObjt.filter(item => item.id == id)//busco en base al id
            if(encontrado === undefined){
                console.log("id no Valido .");
            }else{
                return encontrado;
            }
        } catch (error) {
            console.log("id no valido!");
        }
    };
    //Devuelve todo los objetos presentes
    async getAll() {
        try{
            const leer = await fs.promises.readFile(`../database/${this.nombreArchivo}`, "utf-8") || "{}";
            const leerObj = JSON.parse(leer);
            return leerObj;
        }catch (error){
        const leer = undefined
            return leer; //
        }
    };
    //void Borra un objeto del archivo con el id.
    async deleteById(id) {
        try {
            const leerObj = await this.getAll();
            const encontrado = leerObj.filter(item => item.id !== id)
            console.log(encontrado);
            if(!encontrado){
                console.log("no existe ese archivo");
            }else{
                const encontradoString = JSON.stringify(encontrado);
                await fs.promises.writeFile(`../database/${this.nombreArchivo}`, encontradoString);
                console.log("archivo eliminado correctamente, Documento nuevo: ",encontrado);
            }
        } catch (error) {
            console.log("No se ha logrado eliminar el archivo:",error);
        }
    };
    //void Borra todo los objetos presentes
    async deleteAll() {
       try {
        await fs.promises.unlink(`../database/${this.nombreArchivo}`);
        console.log("Documento Eliminado!");
       } catch (error) {
        console.log("Error: " + error);
       }
    }; 
};
export {Crud};