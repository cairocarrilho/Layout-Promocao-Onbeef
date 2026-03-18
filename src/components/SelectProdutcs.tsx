import {useState, useEffect} from "react";

import alcatra from "../assets/Carnes/R11_MioloDaAlcatraGrill_2.jpg"
import assinha from "../assets/Carnes/l-c23e55475b90435aae5ce84d4a8ead08.jpeg"

// ✅ Tipo do produto
type Produto = {
    id: number;
    name: string;
    price: number;
    category: string;
};


interface SelectProdutcsProps {
    onProdutoChange: (produto: any) => void;
    onFotoChange: (foto: string) => void;
}

function SelectProdutcs({ onProdutoChange, onFotoChange }: SelectProdutcsProps) {



    const [produtosCategorias, setProdutosCategorias] = useState<Record<string, Produto[]>>({});
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);


    const carregarProdutos = async () => {
        try {
            const response = await fetch("/Layout-Promocao-Onbeef/Dados.json");

            if (!response.ok) {
                throw new Error("Arquivo JSON não encontrado");
            }

            const data = await response.json();
            const produtos = data.products;

            const categorias: any = {};

            produtos.forEach((produce: any) => {
                let categoria = produce.category;

                if (!categorias[categoria]) {
                    categorias[categoria] = [];
                }

                categorias[categoria].push(produce);
            });

            setProdutosCategorias(categorias);

        } catch (error) {
            alert("Erro ao carregar produtos: " + error);
        }
    };


    const handleFoto = (foto :string)=>{
        let fotoSelecionada = "";
       switch (foto){
            case "Alcatra":
                fotoSelecionada = alcatra;
                break
            case "Assinha":
                fotoSelecionada = assinha;
                break
            default:
                fotoSelecionada = "";
        }

        onFotoChange(fotoSelecionada);
    }




     useEffect( () => {
        carregarProdutos();
    }, []);

    return(
        <div>

            <div className="flex flex-col gap-4 border-2 rounded-2xl p-1 border-none  " >

                        <select className="focus:ring-0 focus:outline-none"
                                name="promocao"
                                onChange={(e) => {
                                    const produto = Object.values(produtosCategorias)
                                        .flat()
                                        .find((p: any) => p.name === e.target.value);

                                    setProdutoSelecionado(produto || null);
                                    onProdutoChange(produto);
                                    handleFoto(e.target.value);
                                }}
                            >
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


    {produtoSelecionado && (
        <div className="promo-textos">
            <h2 className="produto-nome">{produtoSelecionado.name}</h2>
            <p className="produto-preco">R$ {produtoSelecionado.price ?  produtoSelecionado.price.toFixed(2) :"Consulte valores" }kg</p>
        </div>
    )}
            </div>
        </div>
    )
}

export default SelectProdutcs;