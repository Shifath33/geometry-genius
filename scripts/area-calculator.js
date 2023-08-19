const shapes = ["triangle", "rectangle", "parallelogram", "rhombus", "pentagon", "ellipse"];

const geometryShapes = {
    triangle: {
        inputFieldIds: ["triangle-base", "triangle-height"],
        area: function (base, height) {
            return 0.5 * base * height;
        },
        outputFieldId: "triangle-area"
    },
    rectangle: {
        inputFieldIds: ["rectangle-width", "rectangle-length"],
        area: function (width, length) {
            return width * length;
        },
        outputFieldId: "rectangle-area"
    },
    parallelogram: {
        inputFieldIds: ["parallelogram-base", "parallelogram-height"],
        area: function (base, height) {
            return base * height;
        },
        outputFieldId: "parallelogram-area"
    },
    rhombus: {
        inputFieldIds: ["rhombus-diagonal-1", "rhombus-diagonal-2"],
        area: function (diagonal1, diagonal2) {
            return 0.5 * diagonal1 * diagonal2;
        },
        outputFieldId: "rhombus-area"
    },
    pentagon: {
        inputFieldIds: ["pentagon-perimeter", "pentagon-base"],
        area: function (perimeter, base) {
            return 0.5 * perimeter * base;
        },
        outputFieldId: "pentagon-area"
    },
    ellipse: {
        inputFieldIds: ["ellipse-side-1", "ellipse-side-2"],
        area: function (side1, side2) {
            return Math.PI * side1 * side2;
        },
        outputFieldId: "ellipse-area"
    },
};

function getInputNumberById(elementId) {
    let inputField = document.getElementById(elementId);
    const inputValue = parseFloat(inputField.value);
    inputField.value = "";
    return inputValue;
}

function setElementNumberById(elementId, value) {
    let elementField = document.getElementById(elementId);
    let valueWithPrecision = parseFloat(value.toFixed(2)).toPrecision(2);
    valueWithPrecision = valueWithPrecision.endsWith(".00") ? valueWithPrecision.replace(".00", "") : valueWithPrecision;
    valueWithPrecision = valueWithPrecision.endsWith(".0") ? valueWithPrecision.replace(".0", "") : valueWithPrecision;
    elementField.innerText = valueWithPrecision;
    elementField.title = valueWithPrecision;
    return elementField;
}

function addResultElement(shapeName, area) {
    const shapeNameCapitalized = shapeName.charAt(0).toUpperCase() + shapeName.slice(1);
    let resultContainer = document.getElementById("calculation-results");
    const currentItemId = resultContainer.childElementCount + 1;
    let resultItem = document.createElement("div");
    resultItem.classList = "flex justify-between items-center px-2 py-2 my-3 bg-gray-100 border-b border-gray-200";
    resultItem.innerHTML =
        `<div class="flex-1 text-xl flex justify-between pr-4 flex-wrap">
            <span class="">${currentItemId}. ${shapeNameCapitalized} </span>
            <span class="text-ellipsis overflow-x-hidden"><span title="${area}" class="font-bold">${area}</span><span> cm<sup>2</sup></span></span>
        </div>
        <button 
                id="btn-${currentItemId}" 
                class="flex-none btn btn-sm btn-info text-white text-md normal-case" 
                onclick="convertToSquareMeter(this, ${area})"
            >Convert to m
            <sup>2</sup>
        </button>`;
    resultContainer.appendChild(resultItem);
}

function calculateArea(shapeName) {
    const shape = geometryShapes[shapeName];
    const parameter1 = getInputNumberById(shape.inputFieldIds[0]);
    const parameter2 = getInputNumberById(shape.inputFieldIds[1]);
    if (isNaN(parameter1) || isNaN(parameter2)) {
        // alert("Please enter valid numbers for both parameters.");
        window.input_validation_error.showModal();
        return;
    }
    let area = shape.area(parameter1, parameter2);
    let setArea = setElementNumberById(shape.outputFieldId, area).innerText;
    addResultElement(shapeName, setArea);
}

function convertToSquareMeter(buttonElement, area) {
    let areaElement = buttonElement.parentElement.children[0].children[1];

    if (buttonElement.innerText.includes("Convert to m")) {
        buttonElement.innerHTML = buttonElement.innerHTML.replace("m", "cm");
        areaElement.innerHTML = areaElement.innerHTML.replace("cm", "m");
        area = area / 10000;
        area = parseFloat(area.toFixed(5)).toPrecision(2);
        areaElement.children[0].innerHTML = area;
    }
    else {
        buttonElement.innerHTML = buttonElement.innerHTML.replace("cm", "m");
        areaElement.innerHTML = areaElement.innerHTML.replace("m", "cm");
        areaElement.children[0].innerHTML = area;
    }
}