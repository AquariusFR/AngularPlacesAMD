define([], function () {
    'use strict';
    return function () {
        return function (siret) {
            var somme = 0,
                tmp,
                cpt;
            if (!siret || (siret.length !== 14) || (isNaN(siret))) {
                return false;
            }
            //~ donc le siret est un numérique à 14 chiffres
            //~ les 9 premiers chiffres sont ceux du siren (ou rcs), les 4 suivants
            //~ correspondent au numéro d'établissement
            //~ et enfin le dernier chiffre est une clef de luhn.
            /*jslint plusplus: true */
            for (cpt = 0; cpt < 14; cpt++) {
                if ((cpt % 2) === 0) { //~ les positions impaires : 1er, 3è, 5è, etc...
                    tmp = siret.charAt(cpt) * 2; //~ on le multiplie par 2
                    if (tmp > 9) {
                        tmp -= 9; //~ si le résultat est supérieur à 9, on lui soustrait 9
                    }
                } else {
                    tmp = siret.charAt(cpt);
                }
                somme += parseInt(tmp, 10);
            }
            if ((somme % 10) === 0) {
                return true; //~ si la somme est un multiple de 10 alors le siret est valide
            }

            return false;
        };
    };
});
