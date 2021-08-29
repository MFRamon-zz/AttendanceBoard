const time = require("./time")
// @ponicode
describe("time.getDay", () => {
    test("0", () => {
        let callFunction = () => {
            time.getDay()
        }
    
        expect(callFunction).not.toThrow()
    })
})
