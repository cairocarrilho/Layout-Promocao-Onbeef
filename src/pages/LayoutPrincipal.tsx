
import Dicas from "../components/Dicas.tsx";
import EscolhaImagemFundo from "../components/EscolhaImagemFundo.tsx";
import ButtonTemplate from "../components/ButtonTemplate.tsx";
import {useState , useRef} from "react";
import html2canvas from 'html2canvas';
import Azul from "../assets/azul.png";
import Vermelho from "../assets/vermelhor.png";
import Amarelo from "../assets/amarelo.png";
import Preto from "../assets/preto.png";
import Verde from "../assets/verde.png";
import ButtonCor from "../components/ButtonCor.tsx";
import CanvasImagen from "../components/CanvasImagen.tsx";
import SelectProdutcs from "../components/SelectProdutcs.tsx";




function LayoutPrincipal(){

    const [imagem, setImagem] = useState('');
    const canvasComponentRef = useRef(null);


    function handleclik(cor:String){
        switch (cor){
            case "azul":
                setImagem(Azul)
                break;
            case "vermelho":
                setImagem(Vermelho)
                break;
            case "amarelo":
                setImagem(Amarelo)
                break;
            case "preto":
                setImagem(Preto)
                break;
            case "verde":
                setImagem(Verde)
                break;
            default:
                setImagem(Preto);
        }
    }

    async function handleDownload(){

        if(!canvasComponentRef.current) return;

            // espera um pouco para garantir que tudo carregue
            await new Promise((resolve) => setTimeout(resolve, 200));
            const canvas = await html2canvas(canvasComponentRef.current, { useCORS: true });

            const image = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = image
            link.download = "promocao-onbeef.png"
            link.click();




    };



        return(
            <>
                <div className="flex flex-col items-center justify-center border-2 rounded-2xl w-3/4 mx-auto mt-20 border-cyan-300 p-6 h-4/5">
                    <div>
                        <h1 className="text-3xl font-semibold mb-4 mx-auto"> Compartilhar Promoção</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">


                    <div className="flex flex-col gap-4 ">
                        <Dicas />

                        <div className=" bg-gray-50 p-4 rounded-lg max-w-3/4 ">
                            <EscolhaImagemFundo  />
                            <div className="flex flex-wrap gap-4 mb-2">
                                <ButtonCor
                                    estilo={"w-8 h-8 rounded-full border-2 transition-all bg-primary border-transparent hover:scale-105"}
                                    valor={"vermelho"}
                                    backgroundColor="red"
                                    funcaoBotao={() => handleclik("vermelho")}
                                />
                                <ButtonCor
                                    estilo={"w-8 h-8 rounded-full border-2 transition-all bg-primary border-transparent hover:scale-105"}
                                    valor={"azul"}
                                    backgroundColor="blue"
                                    funcaoBotao={() => handleclik("azul")}
                                />
                                <ButtonCor
                                    estilo={"w-8 h-8 rounded-full border-2 transition-all bg-primary border-transparent hover:scale-105"}
                                    valor={"verde"}
                                    backgroundColor="green"
                                    funcaoBotao={() => handleclik("verde")}
                                />
                                <ButtonCor
                                    estilo={"w-8 h-8 rounded-full border-2 transition-all bg-primary border-transparent hover:scale-105"}
                                    valor={"preto"}
                                    backgroundColor="black"
                                    funcaoBotao={() => handleclik("preto")}
                                />

                                <ButtonCor
                                    estilo={"w-8 h-8 rounded-full border-2 transition-all bg-primary border-transparent hover:scale-105"}
                                    valor={"amarelo"}
                                    backgroundColor="yellow"
                                    funcaoBotao={() => handleclik("amarelo")}
                                />
                            </div>
                            <div >
                                <h3 className="font-semibold mb-1"> Escolha o produto</h3>
                                <SelectProdutcs />
                            </div>

                        </div>




                        <ButtonTemplate onclick={handleDownload}/>
                    </div>
                        <div className="p-4 rounded-lg flex flex-col items-center">
                            <h3 className="font-medium text-gray-800 mb-3">Prévia</h3>
                            <div className="min-w-3/4  ">

                                <CanvasImagen
                                    ref={canvasComponentRef}
                                    imageUrl={imagem}
                                    width1={400}
                                    height1={600} />
                            </div>
                        </div>

                    </div>
                </div>
            </>


        )
}

export default LayoutPrincipal