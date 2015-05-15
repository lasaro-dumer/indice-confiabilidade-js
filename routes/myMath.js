
exports.media = function (amostra){
    console.log('calculando média');
    var somaAmostra = 0;
    for(var j=0;j < amostra.length;j++){
        somaAmostra += amostra[amostra.length-1];
    }
    var X = somaAmostra / amostra.length;
    return X;
}

exports.variancia = function (amostra,X){
    //var amostra = [118,121,124,117,120,120];
    if(!X)
        X = this.media(amostra);

    console.log('calculando variancia');

    var somVari = 0;
    for(var j=0;j < amostra.length;j++){
        somVari += Math.pow((amostra[j]-X),2);
    }
    var variancia = somVari / (amostra.length - 1);
    var s = (Math.sqrt(variancia)).toFixed(2);

    return {mediaAmostra:X,variancia:variancia,desvioPadrao:s};
}

exports.random = function(low, high) {
    return Math.random() * (high - low) + low;
}
exports.randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
exports.randomIntInc = function(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

exports.getT = function(aux,IC){
    //gl = [0.100, 0.050, 0.025, 0.010, 0.005]
    var alpha = ((1 - (IC / 100)) / 2).toFixed(3);
    var p;
    var n = aux-1;
    if(alpha == 0.100){
        p = 0;
    }else if(alpha == 0.050){
        p = 1;
    }else if(alpha == 0.025){
        p = 2;
    }else if(alpha == 0.010){
        p = 3;
    }else if(alpha == 0.005){
        p = 4;
    }

    if(n == 1){
        g = [3.078, 6.314, 12.706, 31.821, 63.657];
    }else if(n == 2){
        g =  [1.886, 2.920, 4.303, 6.965, 9.925];
    }else if(n == 3){
        g =  [1.638, 2.353, 3.182, 4.541, 5.841];
    }else if(n == 4){
        g =  [1.533, 2.132, 2.776, 3.747, 4.604];
    }else if(n == 5){
        g =  [1.476, 2.015, 2.571, 3.365, 4.032];
    }else if(n == 6){
        g =  [1.440, 1.943, 2.447, 3.143, 3.707];
    }else if(n == 7){
        g =  [1.415, 1.895, 2.365, 2.998, 3.499];
    }else if(n == 8){
        g =  [1.397, 1.860, 2.306, 2.896, 3.355];
    }else if(n == 9){
        g =  [1.383, 1.833, 2.262, 2.821, 3.250];
    }else if(n == 10){
        g = [1.372, 1.812, 2.228, 2.764, 3.169];
    }else if(n == 11){
        g = [1.363, 1.796, 2.201, 2.718, 3.106];
    }else if(n == 12){
        g = [1.356, 1.782, 2.179, 2.681, 3.055];
    }else if(n == 13){
        g = [1.350, 1.771, 2.160, 2.650, 3.012];
    }else if(n == 14){
        g = [1.345, 1.761, 2.145, 2.624, 2.977];
    }else if(n == 15){
        g = [1.341, 1.753, 2.131, 2.602, 2.947];
    }else if(n == 16){
        g = [1.337, 1.746, 2.120, 2.583, 2.921];
    }else if(n == 17){
        g = [1.333, 1.740, 2.110, 2.567, 2.898];
    }else if(n == 18){
        g = [1.330, 1.734, 2.101, 2.552, 2.878];
    }else if(n == 19){
        g = [1.328, 1.729, 2.093, 2.539, 2.861];
    }else if(n == 20){
        g = [1.325, 1.725, 2.086, 2.528, 2.845];
    }else if(n == 21){
        g = [1.323, 1.721, 2.080, 2.518, 2.831];
    }else if(n == 22){
        g = [1.321, 1.717, 2.074, 2.508, 2.819];
    }else if(n == 23){
        g = [1.319, 1.714, 2.069, 2.500, 2.807];
    }else if(n == 24){
        g = [1.318, 1.711, 2.064, 2.492, 2.797];
    }else if(n == 25){
        g = [1.316, 1.708, 2.060, 2.485, 2.787];
    }else if(n == 26){
        g = [1.315, 1.706, 2.056, 2.479, 2.779];
    }else if(n == 27){
        g = [1.314, 1.703, 2.052, 2.473, 2.771];
    }else if(n == 28){
        g = [1.313, 1.701, 2.048, 2.467, 2.763];
    }else if(n == 29){
        g = [1.311, 1.699, 2.045, 2.462, 2.756];
    }else if(n == 30){
        g = [1.310, 1.697, 2.042, 2.457, 2.750];
    }else if(n == 40){
        g = [1.303, 1.684, 2.021, 2.423, 2.704];
    }else if(n == 50){
        g = [1.299, 1.676, 2.009, 2.403, 2.678];
    }else if(n == 60){
        g = [1.296, 1.671, 2.000, 2.390, 2.660];
    }else  if(n == 120){
        g = [1.289, 1.658, 1.980, 2.358, 2.617];
    }else {//Infinito
        g = [1.282, 1.645, 1.960, 2.326, 2.576];
    }

    //console.log({IC:IC,n:aux,alpha:alpha,p:p,g:g});

    if(g){
        return g[p];
    }
    else{
        return 0;
    }
}
