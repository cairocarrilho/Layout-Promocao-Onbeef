import { useEffect, forwardRef } from "react";

/**
 * Componente CanvasImagen
 *
 * Renderiza um canvas com imagem de fundo, imagem do produto e informações de preço sobreposta.
 *
 * @param imagemFundo - URL da imagem de fundo
 * @param imagemProduto - URL da imagem do produto
 * @param nomeProduto - Nome do produto
 * @param precoProduto - Preço do produto
 * @param width1 - Largura do canvas
 * @param height1 - Altura do canvas
 */
const CanvasImagen = forwardRef(({imagemFundo, imagemProduto, nomeProduto, precoProduto, width1, height1}, ref:any) => {

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Define dimensões do canvas
        canvas.width = width1 || 400;
        canvas.height = height1 || 600;

        // Limpa o canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let imagensCarregadas = 0;
        const totalImagens = imagemProduto ? 2 : 1;

        const desenharCanvas = () => {
            imagensCarregadas++;
            if (imagensCarregadas === totalImagens) {
                // Limpa novamente antes de desenhar tudo
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // 1. Desenha a imagem de fundo
                if (imagemFundo && fundo.complete) {
                    ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height);
                }

                // 2. Desenha a imagem do produto (se existir)
                if (imagemProduto && produto.complete) {
                    const produtoWidth = canvas.width * 0.4;
                    const produtoHeight = canvas.height * 0.2;
                    const produtoX = (canvas.width - produtoWidth) / 2;
                    const produtoY = canvas.height * 0.4;

                    ctx.drawImage(produto, produtoX, produtoY, produtoWidth, produtoHeight);
                }

                // 3. Desenha o nome e preço do produto
                if (nomeProduto || precoProduto) {
                    const textY = canvas.height * 0.75;

                    // Nome do produto
                    if (nomeProduto) {
                        ctx.font = 'bold 32px Arial';
                        ctx.fillStyle = '#ffffff';
                        ctx.textAlign = 'center';
                        ctx.strokeStyle = '#000000';
                        ctx.lineWidth = 3;
                        ctx.strokeText(nomeProduto, canvas.width / 2, textY);
                        ctx.fillText(nomeProduto, canvas.width / 2, textY);
                    }

                    // Preço do produto
                    if (precoProduto) {
                        ctx.font = 'bold 48px Arial';
                        ctx.fillStyle = '#ffff00';
                        ctx.strokeStyle = '#000000';
                        ctx.lineWidth = 4;
                        ctx.strokeText(precoProduto, canvas.width / 2, textY + 60);
                        ctx.fillText(precoProduto, canvas.width / 2, textY + 60);
                    }
                }
            }
        };

        // Carrega imagem de fundo
        const fundo = new Image();
        fundo.crossOrigin = "anonymous";
        if (imagemFundo) {
            fundo.src = imagemFundo;
            fundo.onload = desenharCanvas;
        } else {
            desenharCanvas();
        }

        // Carrega imagem do produto
        const produto = new Image();
        produto.crossOrigin = "anonymous";
        if (imagemProduto) {
            produto.src = imagemProduto;
            produto.onload = desenharCanvas;
        }

    }, [imagemFundo, imagemProduto, nomeProduto, precoProduto, width1, height1, ref]);

    return (
        <div className="flex justify-center ">
            <canvas ref={ref} />
        </div>
    );
});

export default CanvasImagen;