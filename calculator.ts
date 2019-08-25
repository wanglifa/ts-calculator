{
    class Calculator {
        public container: HTMLDivElement;
        public n1: string = null;
        public n2: string = null;
        public opertion: string = null;
        public result: number = null;
        private span: HTMLSpanElement;
        private keys: Array<Array<string>> = [
            ['clear', '÷'],
            ['7', '8', '9', 'x'],
            ['4', '5', '6', '-'],
            ['1', '2', '3', '+'],
            ['0', '.', '=']
        ];
        constructor() {
            this.createContainer()
            this.createOutput()
            this.createButtons()
            this.bindEvents()
        }
        // 声明创建按钮函数
        createButton(text: string, container: HTMLElement, className: string) {
            let button: HTMLButtonElement = document.createElement('button')
            button.textContent = text
            if (className) {
                button.className = className
            }
            container.appendChild(button)
            return button
        }
        createContainer() {
            // 创建container
            let container = document.createElement('div')
            container.classList.add('calculator')
            document.body.appendChild(container)
            this.container = container
        }
        createOutput() {
            let output: HTMLDivElement = document.createElement('div')
            output.classList.add('output')
            let span: HTMLSpanElement = document.createElement('span')
            span.textContent = '0'
            output.appendChild(span)
            this.span = span
            this.container.appendChild(output)
        }
        createButtons() {
            this.keys.forEach((textList: Array<string>) => {
                let div: HTMLDivElement = document.createElement('div')
                div.classList.add('row')
                textList.forEach((text: string) => {
                    this.createButton(text, div, `button text-${text}`)
                })
                this.container.appendChild(div)
            })
        }
        bindEvents() {
            this.container.addEventListener('click', (event) => {
                if (event.target instanceof HTMLButtonElement) {
                    let button: HTMLButtonElement = event.target
                    let text: string = button.textContent
                    this.updateNumbersOrOpertion(text)
                }
            })
        }
        updateNumbers(text: string) {
            // 如果有操作符
            if (this.opertion) {
                // 更新 n2
                this.updateNumber('n2', text)
            } else {
                // 如果没有操作符
                this.updateNumber('n1', text)
                console.log(this.n1)
            }
        }
        updateNumber(name: string, text: string) {
            if (this[name]) {
                this[name] += text
            } else {
                this[name] = text
            }
            this.span.textContent = this[name].toString()
        }
        updateResult() {
            let result
            let n1: number = parseFloat(this.n1)
            let n2: number = parseFloat(this.n2)
            if (this.opertion === '+') {
                result = n1 + n2
            } else if (this.opertion === '-') {
                result = n1 - n2
            } else if (this.opertion === 'x') {
                result = n1 * n2
            } else {
                result = n1 / n2
            }
            // 保留12位有效数字，在12位有效数字的前提下如果结尾全是0就替换为空，如果是多个0和一个e就替换为e
            result = result.toPrecision(12).replace(/0+$/g, '').replace(/0+e/g, 'e')
            if (n2 === 0) {
                result = '不是数字'
            }
            this.span.textContent = result.toString()
            this.resert()
            this.result = result
        }
        updateOpertion(text: string): void {
            if (!this.n1) { this.n1 = this.result + '' }
            this.opertion = text
        }
        clear(): void {
            this.result = null
            this.resert()
            this.span.textContent = '0'
        }
        resert(): void {
            this.n1 = null
            this.n2 = null
            this.opertion = null
        }
        updateNumbersOrOpertion(text: string) {
            // 判断字符类型
            if (('01234567890.').indexOf(text) >= 0) {
                this.updateNumbers(text)
            } else if (('+-x÷').indexOf(text) >= 0) {
                // 更新 opertion
                this.updateOpertion(text)
            } else if ('='.indexOf(text) >= 0) {
                // 更新结果
                this.updateResult()
            } else if ('clear'.indexOf(text) >= 0) {
                this.clear()
            }
        }

    }
    new Calculator()
}