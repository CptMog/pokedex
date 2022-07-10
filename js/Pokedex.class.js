export default class Pokedex{

    constructor(containerListPokemone, containerDisplayPokemon){
        this.containerListPokemone = containerListPokemone;
        this.containerDisplayPokemon = containerDisplayPokemon;
        this.ALL_POKEMON = 905;
    }

    async getPokeFromApi(index){
        const request = await fetch('https://pokeapi.co/api/v2/pokemon/'+index)
        const reponse = await request.json();
        return reponse;
    }

    displayDetails(data){
        
        const divNameNumPokemon = document.createElement("div");
        const divDetailsPokemon = document.createElement("div");
        const divBarCenter = document.createElement('div');
        const imgPokemon = document.createElement("img");
        const namePokemon = document.createElement('span');
        const numPokemon = document.createElement('span');

        namePokemon.textContent = data.name;
        numPokemon.textContent = "#"+data.id;
        divNameNumPokemon.classList ="pl-[5rem] text-3xl flex flex-col w-[100%] p-3";
        divDetailsPokemon.classList ="flex justify-center";
        divBarCenter.classList ="h-[100%] w-[5px] ml-2 bg-[black]";
        imgPokemon.setAttribute('src',data.sprites.front_default)
        imgPokemon.setAttribute('alt','pokemon');
        imgPokemon.setAttribute('style','image-rendering:pixelated;')
        imgPokemon.classList ="w-72 h-72";
        
        divNameNumPokemon.append(numPokemon);
        divNameNumPokemon.append(namePokemon);

        divDetailsPokemon.append(imgPokemon);
        divDetailsPokemon.append(divBarCenter);
        this.containerDisplayPokemon.append(divNameNumPokemon);
        this.containerDisplayPokemon.append(divDetailsPokemon);
    }

    displayDetailsPokemon(numero){
        this.containerDisplayPokemon.textContent ="";
        this.getPokeFromApi(numero).then(data =>{ this.displayDetails(data) })
    }

    simpleDisplay(data){
         //elements
         let divPokemon = document.createElement("div");
         let imgPokemon = document.createElement("img");
         let spanNamePokemon = document.createElement("h2");
     
         //container div section
         divPokemon.classList = "border cursor-pointer hover:scale-105 flex mt-2 rounded items-center"; 

         // divPokemon.setAttribute('data',data.id)
         divPokemon.onclick = ()=>{
             this.displayDetailsPokemon(data.id)
         }
         //name section
         spanNamePokemon.textContent=data.name; 

         //image section
         imgPokemon.setAttribute('src',data.sprites.front_default)
         imgPokemon.setAttribute('alt',"pokemon");
         imgPokemon.classList = "w-12 h-12 m-1";
         
         
         divPokemon.appendChild(imgPokemon);
         divPokemon.appendChild(spanNamePokemon);
         this.containerListPokemone.appendChild(divPokemon);
    }

    displayListOfPokemon(){
        let compteur = 1;
        do{
            this.getPokeFromApi(compteur).then(data => { this.simpleDisplay(data) })
            compteur++;
        }while(compteur<=this.ALL_POKEMON);
    }



}