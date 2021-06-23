import configCalculator from '../config/config-calculator.js';

export default class Calculator {
    cellLabels = configCalculator.allLabels;
    operators = configCalculator.operators;
    resetOperator = configCalculator.resetOperator;
    equalOperator = configCalculator.equalOperator;
    doubleZero = configCalculator.doubleZero;
    onCommand = configCalculator.onCommand;
    offCommand = configCalculator.offCommand;
    
    cells = []
    expression = 0;
    lastExpressionItem; 
    resultValidated = false;
    isOn = false;
    noOfRows = 5;
    noOfCells = 4;
    
    constructor(options) {
        this.rootId = options.rootId;
        this.rowClass = options.rowClass;
        this.cellClass = options.cellClass;
        this.gridContainer = document.getElementById(this.rootId);
        this.calculationResult = document.getElementById('calculation-result');
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
        const cellValue = cell?.innerText;
        if (!cellValue) return;
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
                if (this.expression !== 0 && this.expression !== undefined) {
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
                        this.calculationResult.innerText = this.expression;
                    }
                }
                else {
                    this.expression += cellValue;
                    this.calculationResult.innerText = this.expression; 
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
        const val = stringMath(this.expression);
        if (val !== undefined) {
            this.expression = val;
            this.calculationResult.innerText = this.expression;
        }
    }

    setLastExpressionItem() {
        if (!this.expression) return;
        this.lastExpressionItem = String(this.expression).substr(this.expression.length - 1);
    }

}