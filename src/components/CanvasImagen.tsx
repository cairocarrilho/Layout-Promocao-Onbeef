import { useEffect, forwardRef } from "react";

interface CanvasImagenProps {
    imagemFundo?: string;
    imagemProduto?: string;
    nomeProduto?: string;
    precoProduto?: string;
    width1?: number;
    height1?: number;
}

const CanvasImagen = forwardRef<HTMLCanvasElement, CanvasImagenProps>(
    (
        {
            imagemFundo,
            imagemProduto,
            nomeProduto,
            precoProduto,
            width1 = 400,
            height1 = 600,
        },
        ref
    ) => {
        useEffect(() => {
            const canvas = (ref as React.RefObject<HTMLCanvasElement>)?.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Define dimensões
            canvas.width = width1;
            canvas.height = height1;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let imagensCarregadas = 0;
            const totalImagens = imagemProduto ? 2 : 1;

            const fundo = new Image();
            const produto = new Image();

            const desenharCanvas = () => {
                imagensCarregadas++;

                if (imagensCarregadas === totalImagens) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Fundo
                    if (imagemFundo && fundo.complete) {
                        ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height);
                    }

                    // Produto
                    if (imagemProduto && produto.complete) {
                        const produtoWidth = canvas.width * 0.4;
                        const produtoHeight = canvas.height * 0.2;
                        const produtoX = (canvas.width - produtoWidth) / 2;
                        const produtoY = canvas.height * 0.4;

                        ctx.drawImage(
                            produto,
                            produtoX,
                            produtoY,
                            produtoWidth,
                            produtoHeight
                        );
                    }

                    // Texto
                    if (nomeProduto || precoProduto) {
                        const textY = canvas.height * 0.75;

                        if (nomeProduto) {
                            ctx.font = "bold 32px Arial";
                            ctx.fillStyle = "#ffffff";
                            ctx.textAlign = "center";
                            ctx.strokeStyle = "#000000";
                            ctx.lineWidth = 3;

                            ctx.strokeText(nomeProduto, canvas.width / 2, textY);
                            ctx.fillText(nomeProduto, canvas.width / 2, textY);
                        }

                        if (precoProduto) {
                            ctx.font = "bold 48px Arial";
                            ctx.fillStyle = "#ffff00";
                            ctx.strokeStyle = "#000000";
                            ctx.lineWidth = 4;

                            ctx.strokeText(precoProduto, canvas.width / 2, textY + 60);
                            ctx.fillText(precoProduto, canvas.width / 2, textY + 60);
                        }
                    }
                }
            };

            // Fundo
            fundo.crossOrigin = "anonymous";
            if (imagemFundo) {
                fundo.src = imagemFundo;
                fundo.onload = desenharCanvas;
            } else {
                desenharCanvas();
            }

            // Produto
            produto.crossOrigin = "anonymous";
            if (imagemProduto) {
                produto.src = imagemProduto;
                produto.onload = desenharCanvas;
            }
        }, [
            imagemFundo,
            imagemProduto,
            nomeProduto,
            precoProduto,
            width1,
            height1,
            ref,
        ]);

        return (
            <div className="flex justify-center">
                <canvas ref={ref} />
            </div>
        );
    }
);

export default CanvasImagen;