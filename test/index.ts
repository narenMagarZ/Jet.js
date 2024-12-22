import Jet from "../src/jet";

const jet = new Jet(4000)

jet.cockpit.get("/api", ( req, res )=>{
    console.log(req.url)
    res.json({
        name: "naren",
        age: 25
    })
});

jet.cockpit.get("/test/api", (req, res)=>{
    res.json({
        id: "test/api"
    })
});

jet.engine(()=>{
    console.log('jet started successfully.')
});


jet.cockpit.get("/dummy", (req, res)=>{
    res.json({id: "dummy"})
})