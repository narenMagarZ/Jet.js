import Jet from "../src/engine/jet";

const jet = new Jet();

jet.use(async() => {
    console.log("request get")
})

const apiRouter = jet.router();
const adminRouter = jet.router();

apiRouter.get('/api/v1', (req, res) => {
    res.json({
        message: "api fetched successfully"
    });
})

apiRouter.get("/api/v2", (req, res) => {
    res.json({
        message: "api v2 fetched successfully"
    })
})

adminRouter.get("/admin/api/v1", (req, res) => {
    res.json({
        message: "admin fetched successfully"
    })
})

adminRouter.post("/admin/api/v1", (req, res) => {
    res.json({
        message: "admin create user successfully",
        code: 201
    })
})

jet.listen(3000, () => {
    console.log("server listening on port", 3000)
});