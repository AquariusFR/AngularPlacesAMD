define([], function () {
    'use strict';
    return function () {
        return function (siret) {
            var siretLength = siret.length,
                siretList = [];

            if (siretLength === 14) {
                siretList.push(siret.slice(0, 3));
                siretList.push(siret.slice(3, 6));
                siretList.push(siret.slice(6, 9));
                siretList.push(siret.slice(9, 14));
            } else if (siretLength > 9 && siretLength < 14) {
                siretList.push(siret.slice(0, 3));
                siretList.push(siret.slice(3, 6));
                siretList.push(siret.slice(6, 9));
                siretList.push(siret.slice(9, siretLength));
            } else if (siretLength > 6) {
                siretList.push(siret.slice(0, 3));
                siretList.push(siret.slice(3, 6));
                siretList.push(siret.slice(6, siretLength));
            } else if (siretLength > 3) {
                siretList.push(siret.slice(0, 3));
                siretList.push(siret.slice(3, siretLength));
            } else {
                siretList.push(siret.slice(0, siretLength));
            }

            return siretList.join("  ");
        };
    };
});
