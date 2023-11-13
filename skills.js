function calculateNumbers(params) {
    if (params.operator == "+") {
        return params.firstNumber + params.secondNumber;
    } else if (params.operator == "-") {
        return params.firstNumber - params.secondNumber;
    } else if (params.operator == "*") {
        return params.firstNumber * params.secondNumber;
    } else if (params.operator == "/") {
        return params.firstNumber / params.secondNumber;
    } else {
        return "Error";
    }
}