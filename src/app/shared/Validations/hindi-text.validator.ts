import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function HindiTextValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        var numberOfHindiCharacters = 128;
        var unicodeShift = 0x0900;
        var hindiAlphabet = new Array();
        for (var i = 0; i < numberOfHindiCharacters; i++) {
            hindiAlphabet.push("\\u0" + (unicodeShift + i).toString(16));
        }
        var regex = new RegExp("(?:^|\\s)[" + hindiAlphabet.join("") + "]+?(?:\\s|$)", "g");
        var match = control.value.match(regex)
        if (match)
            return null
        else
            return { HindiText: 'कृपया हिंदी में नाम दर्ज करें' };

    };
}