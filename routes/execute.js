var myMath = require('./myMath');

exports.execute = function(req, res){
    //[0.100, 0.050, 0.025, 0.010, 0.005]
    var popN = req.query.popN;
    var tamAmostra = req.query.tamAmostra;
    var IC = req.query.IC;
    var interCount = req.query.interCount;

    if( !(popN) || !(tamAmostra) || !(interCount) || !(IC)){
        res.send('Parametros insuficientes');
    }else{
        var t = myMath.getT(tamAmostra,IC);

        var populacao = [];
        var soma = 0;
        for (var i = 0; i < popN; i++) {
            populacao.push(myMath.randomIntInc(1,10000));
            soma += populacao[i];
        }

        var mi = soma / popN;

        var sqrtN = Math.sqrt(tamAmostra);

        var ICs = [];
        var qtdContemMi = 0;
        console.log({popN:popN,tamAmostra:tamAmostra,IC:IC,interCount:interCount,t:t,mi:mi,populacao_length:populacao.length,populacao:populacao});
        console.log('iniciando interacoes');
        for (var i = 0; i < interCount; i++) {
            var amostra = [];
            var naAmostra = [];
            var somaAmostra = 0;
            console.log('montando amostra da iteracao ' + i);
            while(naAmostra.length < tamAmostra){
                var j = myMath.randomIntInc(0,popN);
                if(!naAmostra.indexOf(j)){
                    amostra.push(populacao[j]);
                    naAmostra.push(j);
                    somaAmostra += amostra[amostra.length-1];
                }
            }
            var X = somaAmostra / tamAmostra;

            console.log('calculando IC da iteracao ' + i);
            var s = myMath.variancia(amostra,X).desvioPadrao;
            var desvio = t * (s/sqrtN);
            var intervalo = [X-desvio,X+desvio];
            ICs.push(intervalo);
            if(intervalo[0]<= mi && intervalo[1]>=mi){
                qtdContemMi++;
            }
        }
        console.log('fim interacoes');

        res.send({popN:popN,tamAmostra:tamAmostra,IC:IC,interCount:interCount,t:t,mi:mi,populacao_length:populacao.length,populacao:populacao,ICs:ICs,qtdContemMi:qtdContemMi});
    }
}
