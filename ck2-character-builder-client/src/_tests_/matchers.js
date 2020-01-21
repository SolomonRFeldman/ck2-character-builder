expect.extend({
  toBeHidden(element) {
    const isHidden = element.hidden
    return {
      pass: isHidden,
      message: () => {
        const expected = element.cloneNode(false)
        let not
        let hintMessage
        if(this.isNot) {
          expected.removeAttribute('hidden')
          not = '.not'
          hintMessage = `Received element contains hidden Attribute:`
        } else {
          expected.hidden = true
          not = ''
          hintMessage = `Received element does not contain hidden Attribute:`
        }
        this.isNot ? expected.removeAttribute('hidden') : expected.hidden = true
        return (
          this.utils.matcherHint(`${not}.toBeHidden`, 'element', '') +
          '\n \n' +
          `${hintMessage}\n` +
          `Received: ${this.utils.printReceived(element.cloneNode(false))}\n` + 
          `Expected: ${this.utils.printExpected(expected)}` 
        )
      }
    }
  }
})
