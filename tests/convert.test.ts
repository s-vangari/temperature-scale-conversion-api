import { celciusToFarenhiet, farenheitToCelcius, validateCastOperationField } from "../src/handler";

test("Celcius to Farenheit", () => {
    expect(celciusToFarenhiet(100)).toEqual(212);
    expect(celciusToFarenhiet(-100)).toEqual(-148);
    expect(celciusToFarenhiet(0.5)).toEqual(32.9);
    expect(celciusToFarenhiet(-0.5)).toEqual(31.1);
    expect(celciusToFarenhiet(-45.5)).toEqual(-49.900000000000006);
});

test('Farenheit to Celcius', () => {
    expect(farenheitToCelcius(100)).toEqual(37.77777777777778);
    expect(farenheitToCelcius(-100)).toEqual(-73.33333333333333);
    expect(farenheitToCelcius(0.5)).toEqual(-17.5);
    expect(farenheitToCelcius(-0.5)).toEqual(-18.055555555555557);
    expect(farenheitToCelcius(400.500)).toEqual(204.72222222222223);
});

test ("Cast field validation", () => {
    expect(validateCastOperationField("")).toBeFalsy();
    expect(validateCastOperationField(undefined)).toBeFalsy();
    expect(validateCastOperationField(null)).toBeFalsy();
    expect(validateCastOperationField("CtoF")).toBeTruthy();
    expect(validateCastOperationField("FtoC")).toBeTruthy();
})