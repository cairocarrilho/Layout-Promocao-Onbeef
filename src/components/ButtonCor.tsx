


function ButtonCor({funcaoBotao, valor,backgroundColor, estilo}:any){


    return(<>

        <div>
            <div className="flex flex-row gap-2">


                    <button className={estilo}
                            title={valor}
                            style={{backgroundColor: backgroundColor }}
                            onClick={funcaoBotao}
                    >
                    </button>

            </div>
        </div>



    </>)
}

export default ButtonCor