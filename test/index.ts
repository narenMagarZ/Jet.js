import Jet from "../src/jet";


const jet = new Jet("", 4000)

jet.boost(()=>{
    console.log("jet started successfully.")
})

// jet.dest("/", handler)
// jet.dest("/api", handler)

