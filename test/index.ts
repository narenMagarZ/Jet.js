import Jet from "../src/jet";

const jet = new Jet(4000, true);

jet.cockpit.get("/api", ( req, res )=>{
    console.log(req.url)
    res.json({
        name: "naren",
        age: 25
    })
});

jet.cockpit.get("/test/:id", (req, res)=>{
    console.log(req.params)
    res.json({
        id: `test/${req.params.id}`
    })
});
jet.cockpit.get("/test/:id/test/:name", (req, res)=>{
    console.log(req.params.id, req.params.name)
    res.json({
        id: req.params.id,
        name: req.params.name
    })
});


jet.engine(()=>{
    console.log('jet started successfully.')
});


jet.cockpit.get("/dummy", (req, res)=>{
    res.json({id: "dummy"})
})