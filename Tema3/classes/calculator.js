export default class Calculator {
    constructor(options) {
        this.rootId = options.rootId;
        this.rowClass = options.rowClass;
        this.cellClass = options.cellClass;
        this.noOfRows = 5;
        this.noOfCells = 4;
        this.gridContainer = document.getElementById(this.rootId);
        this.cells = []
        // gonna make this properties STARTING here 
        this.cellLabels = [
            'on', 'off', 'C', '/',
            7, 8, 9, '+',
            4, 5, 6, '-',
            1, 2, 3, '*',
            0, '00', '=', '.',   
        ];
        this.operators = ['+','-','/','*', '=', 'C', 'on', 'off', '00'];
        this.resetOperator = 'C'
        this.equalOperator = '='
        this.doubleZero = '00'
        this.onCommand = 'on';
        this.offCommand = 'off';
        // AND ENDING here more pretty in a next commit 

        this.calculationResult = document.getElementById('calculation-result');
        this.expression;
        this.lastExpressionItem; 
        this.resultValidated = false;
        this.isOn = false;
    }

    init() {
        this.drawGrid();
    }

    drawGrid() {
        for (let i = 0; i < this.noOfRows; i++) {
            const row = document.createElement('div');
            row.classList.add(this.rowClass);
            this.addCellsToRow(row, i);
            this.gridContainer.append(row);
        }
    }

    addCellsToRow(row) {
        for(let j = 0; j < this.noOfCells; j++) {
            const cell = document.createElement('div');
            cell.classList.add(this.cellClass);
            cell.addEventListener('click', () => {
                this.checkCellLabel(cell)
            })
            cell.innerText = this.cellLabels[0];
            this.cellLabels.shift();
            this.cells.push(cell);
            row.append(cell);
        }
    }  

    checkCellLabel(cell) {
        const cellValue = cell.innerText;
        if (this.operators.includes(cellValue)) { 
            this.handleOperators(cellValue);
        } 
        else {
            this.addToExpression(cellValue);
        }
    }

    handleOperators(cellValue) {
        switch(cellValue) {
            case this.resetOperator:
                if (!this.isOn) break;
                this.expression = 0;
                this.calculationResult.innerText = 0;
                break;
            case this.equalOperator: 
                this.evalExpression();
                break;
            case this.doubleZero:
                if (!this.isOn) break;
                if (this.expression != 0 && this.expression != undefined) {
                    this.setLastExpressionItem()
                    if (!this.operators.includes(this.lastExpressionItem)) {
                        this.expression += cellValue;
                        this.calculationResult.innerText =  this.expression;    
                    }
                }
                break;
            case this.onCommand:
                if (!this.isOn) {
                    this.isOn = true;
                    this.expression = undefined;
                    this.calculationResult.innerText = 0;
                }
                break;
            case this.offCommand:
                this.isOn = false;
                this.expression = undefined;
                this.calculationResult.innerText = '';

            default:
                if (!this.isOn) break;
                this.setLastExpressionItem();
                if (this.operators.includes(this.lastExpressionItem)) {
                    if (cellValue === this.lastExpressionItem) {
                        // if selected operator is the same as the last one in the expression, 
                        // dont concatenate to prevent error
                    } 
                    else if (cellValue !== this.lastExpressionItem) { 
                        // if selected operator is different then the last one in the expression
                        // remove the old one and replace with the selected operator 
                        this.expression = this.expression.slice(0, -1);
                        this.expression += cellValue;
                    }
                }
                else {
                    this.expression += cellValue;
                }
            break;
        }
    }

    addToExpression(cellValue) {
        if (!this.isOn) return;
        if (this.expression === 0 || this.expression === undefined) {
            this.expression = cellValue;
        } else {
            if (!this.resultValidated) {
                this.expression += cellValue;
            }
            else {
                this.expression = cellValue;
            }
        }
        this.calculationResult.innerText =  this.expression;
    }

    evalExpression() {
        if (!this.isOn) return;
        let val = eval(this.expression);
        if (val !== undefined) {
            this.expression = val;
            this.calculationResult.innerText = this.expression;
        }
    }

    setLastExpressionItem() {
        this.lastExpressionItem = String(this.expression).substr(this.expression.length - 1);
    }
}