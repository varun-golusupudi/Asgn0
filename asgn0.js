 // Asgn0.js
function main() {
    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');

    // Clear the canvas and set the background to black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const v1 = new Vector3([2.25,2.25,0]); // Instantiating vector v1 (x,y,z)
    drawVector(v1,"red");

    const drawButton = document.getElementById('drawButton');
    drawButton.addEventListener("click",handleDrawEvent);


    const drawButton2 = document.getElementById('drawButton2');
    drawButton2.addEventListener("click",handleDrawOperationEvent);
}

function drawVector(v,color) {
    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');

    ctx.beginPath();

    // Moving to the center of the canvas
    ctx.moveTo(200,200);

    // Draw the scaled vector
    const x = v.elements[0] * 20;
    const y = v.elements[1] * 20;
    ctx.lineTo(200 + x, 200 - y);

    // Set color and draw
    ctx.strokeStyle = color;
    ctx.stroke();
}

function handleDrawEvent() {
    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');

    // Clear the canvas and set the background to black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const x = document.getElementById('x').value;
    const y = document.getElementById('y').value;

    const x2 = document.getElementById('x2').value;
    const y2 = document.getElementById('y2').value;

    const v1 = new Vector3([x,y,0]);
    drawVector(v1,"red");

    const v2 = new Vector3([x2,y2,0]);
    drawVector(v2,"blue");
}

function handleDrawOperationEvent() {
    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');

    // Clear the canvas and set the background to black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const x = parseFloat(document.getElementById('x').value);
    const y = parseFloat(document.getElementById('y').value);

    const x2 = parseFloat(document.getElementById('x2').value);
    const y2 = parseFloat(document.getElementById('y2').value);

    const v1 = new Vector3([x,y,0]);
    drawVector(v1,"red");

    const v2 = new Vector3([x2,y2,0]);
    drawVector(v2,"blue");

    const operation = document.getElementById('operation').value;
    const scalar = document.getElementById('scalar').value;

    if (operation === "add") {
        const v3 = v1.add(v2);
        drawVector(v3,"green");
    }   else if (operation === "sub") {
        const v3 = v1.sub(v2);
        drawVector(v3,"green");
    }   else if (operation === "mul") {
        const v3 = v1.mul(scalar);
        drawVector(v3,"green");

        const v4 = v2.mul(scalar);
        drawVector(v4,"green");
    } else if (operation === "div"){
        const v3 = v1.div(scalar);
        drawVector(v3,"green");

        const v4 = v2.div(scalar);
        drawVector(v4,"green");
    } else if (operation === "magnitude") {
        const v1Magnitude = v1.magnitude();
        const v2Magnitude = v2.magnitude();

        console.log("Magnitude v1: ", v1Magnitude);
        console.log("Magnitude v2: ", v2Magnitude);
    } else if (operation === "normalize") {
        drawVector(v1.normalize(),"green");
        drawVector(v2.normalize(),"green");
    } else if (operation === "angleBetween") {
        const angle = angleBetween(v1,v2);
        console.log("Angle: ", angle);
    } else if (operation === "area") {
        const area = areaTriangle(v1,v2);
        console.log("Area of the triangle: ", area);
    }

}

function angleBetween(v1,v2) {
    const dotProduct = Vector3.dot(v1,v2);
    const magnitude1 = v1.magnitude();
    const magnitude2 = v2.magnitude();

    if (magnitude1 === 0 || magnitude2 === 0) {
        console.error("Cannot calculate angle with zero-length vector");
        return null;
    }

    const cosAlpha = dotProduct / (magnitude1*magnitude2);
    const alpha = Math.acos(cosAlpha);
    const alphaDegrees = (alpha * 180) / Math.PI;

    return alphaDegrees;
}

function areaTriangle(v1,v2) {
    const crossProduct = Vector3.cross(v1,v2);

    const magnitude = crossProduct.magnitude();

    return 0.5 * magnitude;
}