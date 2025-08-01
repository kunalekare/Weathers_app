

document.addEventListener("DOMContentLoaded", () => {
    const display = document.querySelector('.input');
    const buttonsContainer = document.querySelector('.container');
    let expression = '';
    let memory = 0;

    // Use event delegation for performance
    buttonsContainer.addEventListener('click', (e) => {
        if (!e.target.matches('button')) return;

        const button = e.target;
        // Use data-value for special cases, otherwise use innerText
        const value = button.dataset.value || button.innerText;

        try {
            switch (value) {
                case 'AC':
                    expression = '';
                    break;

                case 'DEL':
                    expression = expression.slice(0, -1);
                    break;

                case '=':
                    if (expression) {
                        // Replace user-friendly functions with JS Math object equivalents
                        let safeExpression = expression
                            .replace(/√/g, 'Math.sqrt')
                            .replace(/sin/g, 'Math.sin')
                            .replace(/cos/g, 'Math.cos')
                            .replace(/tan/g, 'Math.tan')
                            .replace(/log/g, 'Math.log10')
                            .replace(/ln/g, 'Math.log');
                        
                        // Use the safer Function constructor instead of eval()
                        const result = new Function('return ' + safeExpression)();
                        expression = String(result);
                    }
                    break;

                case '%':
                    // Calculates percentage of the last number or the whole expression
                    expression = `(${expression}) / 100`;
                    break;

                // Memory Functions
                case 'm+':
                    if (expression) memory += parseFloat(new Function('return ' + expression)());
                    expression = '';
                    break;

                case 'm-':
                    if (expression) memory -= parseFloat(new Function('return ' + expression)());
                    expression = '';
                    break;
                    
                case 'mr':
                    expression += String(memory);
                    break;

                case 'mc':
                    memory = 0;
                    break;
                
                // Scientific Functions that need parentheses
                case 'sin':
                case 'cos':
                case 'tan':
                case 'log':
                case 'ln':
                case '√':
                    expression += value + '(';
                    break;

                default:
                    expression += value;
                    break;
            }
            display.value = expression;
        } catch (error) {
            display.value = 'Error';
            expression = '';
            console.error("Calculation Error:", error);
        }
    });
});


// let string=" ";
// let buttons=document.querySelectorAll('.button');

// Array.from(buttons).forEach((button)=>{
//     button.addEventListener('click',(e)=>{
//         if(e.target.innerHTML=='='){
//             string =eval(string);
//             document.querySelector('input').value=string;
//         }else if(e.target.innerHTML == 'AC'){
//            string ="";
//            document.querySelector('input').value=string;
//         }
//         else{
//             console.log(e.target);
//             string=string+e.target.innerHTML;
//             document.querySelector('input').value=string;
//         }
     
//     })
// })
