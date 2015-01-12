define([
    'filters/siretValidator',
    'modules/siretFormatter'
], function (siretValidator, siretFormatter) {
    'use strict';
    return function () {

        var siretValidatorInstance = siretValidator();
        var siretFormatterInstance = siretFormatter();
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                //format text going to user (model to view)
                function fromUser(viewValue) {
                    if(!viewValue){
                        return;
                    }
                    var plainNumber = viewValue.replace(/[^0-9]+/g, '').slice(0, 14),
                        plainNumberFormatted = siretFormatterInstance(plainNumber),
                        isNumber = !isNaN(plainNumber),
                        isCorrectSize = plainNumber.length === 14,
                        isValidSiret = siretValidatorInstance(plainNumber);

                    ctrl.$setValidity('size', isCorrectSize);
                    ctrl.$setValidity('number', isNumber);
                    ctrl.$setValidity('format', isValidSiret);
                    elem.val(plainNumberFormatted);
                    return plainNumber;
                }
                //format text from the user (view to model)
                function toUser(viewValue) {
                    if(!viewValue){
                        return;
                    }
                    var plainNumber = viewValue.replace(/[^0-9]+/g, '').slice(0, 14),
                        plainNumberFormatted = siretFormatterInstance(plainNumber),
                        isNumber = !isNaN(plainNumber),
                        isCorrectSize = plainNumber.length === 14,
                        isValidSiret = siretValidatorInstance(plainNumber);

                    ctrl.$setValidity('size', isCorrectSize);
                    ctrl.$setValidity('number', isNumber);
                    ctrl.$setValidity('format', isValidSiret);
                    return plainNumberFormatted;
                }
                ctrl.$parsers.unshift(fromUser);

                ctrl.$formatters.unshift(toUser);
            }
        };
    };
});
