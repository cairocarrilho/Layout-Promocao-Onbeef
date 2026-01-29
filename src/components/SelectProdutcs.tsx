import {useState, useEffect} from "react";



function SelectProdutcs() {



    const [produtosCategorias, setProdutosCategorias] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState("");

   const carregarProdutos = async () =>{
       try{
           const response = await fetch("/Dados.json");
           const data = await response.json()
           const produtos = await data.products

           const categorias = []

          produtos.forEach(produce => {
              let categoria = produce.category;

              if(!categorias[categoria]){
                  categorias[categoria] = []
              }
              categorias[categoria].push(produce);
          })

           setProdutosCategorias(categorias)


       }catch (error){
            alert("Erro ao carregar produtos" + error)
       }
   }

   function handleSelect(e){
       const valor = e.target.value
       setProdutoSelecionado(valor)


   }




     useEffect( () => {
        carregarProdutos();
    }, []);

    return(
        <div>

            <div className="flex flex-col gap-4 border-2 rounded-2xl p-1 border-none  " >

                        <select className="focus:ring-0 focus:outline-none" name="promocao" id=""  value={produtoSelecionado} onChange={handleSelect}>
                            <option  >Selecione o produto</option>

                            {/*Object.entries() → transforma objeto em array para poder usar .map()*/}
                            {Object.entries(produtosCategorias).map(([nomeCategoria, produtos]) => (
                                <optgroup key={nomeCategoria} label={nomeCategoria}>
                                    {produtos.map((p) => (
                                        <option key={p.id} value={p.name}>
                                            {p.name}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>



            </div>
        </div>
    )
}

export default SelectProdutcs;