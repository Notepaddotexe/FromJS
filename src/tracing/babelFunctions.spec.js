import babelFunctions from "./babelFunctions"
import {makeTraceObject} from "./FromJSString"

describe("babelFunctions", function(){
    describe("f__add", function(){
        it("Supports adding a string to an object", function(){
            var obj = {
                toString: () => "obj"
            }
            var res = babelFunctions.f__add(obj, "sth")
            expect(res.value).toBe("objsth")
            expect(res.origin.inputValues[0]).not.toBe(undefined)
            expect(res.origin.inputValues[1]).not.toBe(undefined)
        })
        it("Doesn't break adding two numbers together", function(){
            var res = babelFunctions.f__add(1,2)
            expect(res).toBe(3)
        })
        it("Supports adding booleans", function(){
            var res = babelFunctions.f__add(false, true)
            expect(res).toBe(1)
        })
        it("Supports adding booleans and numbers", function(){
            var res = babelFunctions.f__add(3, true)
            expect(res).toBe(4)
        })
    })

    describe("f__tripleEqual", function(){
        it("Knowns that traced 'a' and traced 'a' are equal", function(){
            var a = makeTraceObject({
                value: 'a',
                origin: null
            })
            var b = makeTraceObject({
                value: 'a',
                origin: null
            })
            var res = babelFunctions.f__tripleEqual(a, b)
            expect(res).toBe(true)
        })
        it("Knowns that traced 'a' and traced 'b' are not equal", function(){
            var a = makeTraceObject({
                value: 'a',
                origin: null
            })
            var b = makeTraceObject({
                value: 'b',
                origin: null
            })
            var res = babelFunctions.f__tripleEqual(a, b)
            expect(res).toBe(false)
        })
    })
})
