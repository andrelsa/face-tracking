function deteccao() {
    const video = document.getElementById('video')
    const canvas = document.getElementById('canvas')            
    //pegando o contexto do canvas
    const context = canvas.getContext('2d')            
    //responsavel por buscar as caracteristicas da imagem
    const tracker = new tracking.ObjectTracker('face')
    tracker.setInitialScale(6);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    //sera pego a face do usuario pra ser colocado na camera
    tracking.track('#video', tracker, { camera: true })

    tracker.on('track', event => {     
        //Limpa o retângulo especifico, tornando-o totalmente transparente  
        context.clearRect(0, 0, canvas.width, canvas.height)
        event.data.forEach(rect => {
            //cor do retangulo que fica no rosto
            context.strokeStyle = '#ff007f'
            //expessura da linha do retangulo
            context.lineWidth = 2
            //fonte das informacoes dos eixos X e Y
            context.font = '11px Helvetica'
            //cor da fonte das informações dos eixos X e Y
            context.fillStyle = "#FFFF00"
            //desenhando a borda do retangulo
            context.strokeRect(rect.x, rect.y, rect.width, rect.height)
            //Mostrar a informação de onde esta sendo reconhecido o retangulo no eixo X
            //Com isso é possível escrever um texto sobre a imagem
            context.fillText(`x: ${rect.x}, w: ${rect.width}`, rect.x+rect.width+20, rect.y+20)
            //Mostrar a informação de onde esta sendo reconhecido o retangulo no eixo Y
            //Com isso é possível escrever um texto sobre a imagem
            context.fillText(`y: ${rect.y}, h: ${rect.height}`, rect.x+rect.width+20, rect.y+40)
        })
    })
}
// Quando carregar a pagina será chamado a função
window.onload = deteccao()