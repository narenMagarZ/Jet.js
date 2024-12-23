import parser from 'url'

const result = parser.parse("/api/12/test/naren") // => /api/:id/test/:name

const paths = ["/api/:id", "/api/public/user", "/api/:id/test/:name"];


function replaceAll(str: string) {
    let newStr = str;
    if(str.includes("/")) {
        newStr = replaceAll(str.replace("/"," "))
    }
    return newStr
}

const x = replaceAll("/api/:id/test/:name")
const y = replaceAll("/api/1/test/naren")
const a = x.split(" ")
const b = y.split(" ")


function findParams(a: string[], b:string[], params: {}[]) {
    let resultParams = params // []
    const index = a.findIndex(i=>i.includes(":"))
    if(index < 0) {
        return resultParams
    }
    resultParams.push({
        key: a[index].replace(":",""),
        value: b[index]
    })
    findParams(a.slice(index + 1), b.slice(index + 1), resultParams)
    return resultParams
}

const ans = findParams(a, b, [])
console.log(ans)