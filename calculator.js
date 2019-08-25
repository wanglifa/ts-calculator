{
    var Calculator = /** @class */ (function () {
        function Calculator() {
            this.n1 = null;
            this.n2 = null;
            this.opertion = null;
            this.result = null;
            this.keys = [
                ['clear', '÷'],
                ['7', '8', '9', 'x'],
                ['4', '5', '6', '-'],
                ['1', '2', '3', '+'],
                ['0', '.', '=']
            ];
            this.createContainer();
            this.createOutput();
            this.createButtons();
            this.bindEvents();
        }
        // 声明创建按钮函数
        Calculator.prototype.createButton = function (text, container, className) {
            var button = document.createElement('button');
            button.textContent = text;
            if (className) {
                button.className = className;
            }
            container.appendChild(button);
            return button;
        };
        Calculator.prototype.createContainer = function () {
            // 创建container
            var container = document.createElement('div');
            container.classList.add('calculator');
            document.body.appendChild(container);
            this.container = container;
        };
        Calculator.prototype.createOutput = function () {
            var output = document.createElement('div');
            output.classList.add('output');
            var span = document.createElement('span');
            span.textContent = '0';
            output.appendChild(span);
            this.span = span;
            this.container.appendChild(output);
        };
        Calculator.prototype.createButtons = function () {
            var _this = this;
            this.keys.forEach(function (textList) {
                var div = document.createElement('div');
                div.classList.add('row');
                textList.forEach(function (text) {
                    _this.createButton(text, div, "button text-" + text);
                });
                _this.container.appendChild(div);
            });
        };
        Calculator.prototype.bindEvents = function () {
            var _this = this;
            this.container.addEventListener('click', function (event) {
                if (event.target instanceof HTMLButtonElement) {
                    var button = event.target;
                    var text = button.textContent;
                    _this.updateNumbersOrOpertion(text);
                }
            });
        };
        Calculator.prototype.updateNumbers = function (text) {
            // 如果有操作符
            if (this.opertion) {
                // 更新 n2
                this.updateNumber('n2', text);
            }
            else {
                // 如果没有操作符
                this.updateNumber('n1', text);
                console.log(this.n1);
            }
        };
        Calculator.prototype.updateNumber = function (name, text) {
            if (this[name]) {
                this[name] += text;
            }
            else {
                this[name] = text;
            }
            this.span.textContent = this[name].toString();
        };
        Calculator.prototype.updateResult = function () {
            var result;
            var n1 = parseFloat(this.n1);
            var n2 = parseFloat(this.n2);
            if (this.opertion === '+') {
                result = n1 + n2;
            }
            else if (this.opertion === '-') {
                result = n1 - n2;
            }
            else if (this.opertion === 'x') {
                result = n1 * n2;
            }
            else {
                result = n1 / n2;
            }
            // 保留12位有效数字，在12位有效数字的前提下如果结尾全是0就替换为空，如果是多个0和一个e就替换为e
            result = result.toPrecision(12).replace(/0+$/g, '').replace(/0+e/g, 'e');
            if (n2 === 0) {
                result = '不是数字';
            }
            this.span.textContent = result.toString();
            this.resert();
            this.result = result;
        };
        Calculator.prototype.updateOpertion = function (text) {
            if (!this.n1) {
                this.n1 = this.result + '';
            }
            this.opertion = text;
        };
        Calculator.prototype.clear = function () {
            this.result = null;
            this.resert();
            this.span.textContent = '0';
        };
        Calculator.prototype.resert = function () {
            this.n1 = null;
            this.n2 = null;
            this.opertion = null;
        };
        Calculator.prototype.updateNumbersOrOpertion = function (text) {
            // 判断字符类型
            if (('01234567890.').indexOf(text) >= 0) {
                this.updateNumbers(text);
            }
            else if (('+-x÷').indexOf(text) >= 0) {
                // 更新 opertion
                this.updateOpertion(text);
            }
            else if ('='.indexOf(text) >= 0) {
                // 更新结果
                this.updateResult();
            }
            else if ('clear'.indexOf(text) >= 0) {
                this.clear();
            }
        };
        return Calculator;
    }());
    new Calculator();
}
