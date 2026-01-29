import { useEffect, forwardRef } from "react";

/**
 * Componente CanvasImagen
 * 
 * Este componente renderiza uma imagem dentro de um elemento <canvas> do HTML5.
 * Ele usa forwardRef para permitir que o componente pai (ex: LayoutPrincipal) 
 * acesse o elemento canvas diretamente para funções de download.
 * 
 * @param imageUrl - A URL da imagem que será desenhada no canvas.
 * @param width1 - Largura opcional para o canvas. Se não fornecida, usa a largura original da imagem.
 * @param height1 - Altura opcional para o canvas. Se não fornecida, usa a altura original da imagem.
 */
const CanvasImagen = forwardRef(({imageUrl, width1, height1,}, ref:any) => {

    useEffect(() => {
        // Usa a referência encaminhada (ref) para acessar o canvas
        const canvas = ref.current;
        
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Cria um novo objeto de imagem
        const image = new Image();
        image.src = imageUrl;

        // Define o que acontece quando a imagem termina de carregar
        image.onload = () => {
            // Define as dimensões do canvas com base nas props passadas ou nas dimensões originais da imagem
            canvas.width = width1 || image.width;
            canvas.height = height1 || image.height;

            // Limpa o canvas antes de desenhar
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Desenha a imagem no canvas, cobrindo toda a sua área
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };

    }, [imageUrl, width1, height1, ref]); // Adicionado 'ref' às dependências

    return (
        <>
            {/* O elemento canvas agora usa a ref que vem do pai */}
            <canvas ref={ref} />
        </>
    );
});

export default CanvasImagen;