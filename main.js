const express = require("express");
const app = express();
const port = 7200;
const jwt = require("jsonwebtoken");
const {
    signToken
} = require("./utilities/jwt");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/login", async(req, res) => {
    const payload = {
        id: 123,
    };
    const token = jwt.sign(payload, "secureKey", { expiresIn: "2h" });
    const decoded = jwt.decode(token);
    jwt.verify(token + "ghj", "secureKey", function(err, decoded) {
        console.log({ err, decoded });
        if (err) {
            /*
              err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
                expiredAt: 1408621000
              }
            */
        }
    });
    res.status(200).send({ token, decoded });
});

const myPersonalSecureKey = "hjvklbhhky97tyugvfuiu";
app.get("/place-order", (req, res) => {
    const item = "Farm house Pizza";

    const params = {
        name: "Priyanka Bhawanna",
        item,
        orderNumber: 32,
        shopCode: 101,
        city: "Indore",
    };

    const myToken = jwt.sign(params, myPersonalSecureKey, { expiresIn: "7h" });
    res.status(200).send({ myToken });
});

app.post("/collect-order", async(req, res) => {
    try {
        const { token } = req.body;
        const tokenResponse = await jwt.verify(token, myPersonalSecureKey);
        console.log({ tokenResponse });

        const decodedToken = jwt.decode(token);

        res.send({ decodedToken });
    } catch (err) {
        console.log("Err: ", err);

        res.send({});
    }
});

app.get("/place-new-order", (req, res) => {
    const item = "Farm house Pizza";

    const params = {
        name: "Priyanka Bhawanna",
        item,
        orderNumber: 32,
        shopCode: 101,
        city: "Indore",
    };

    const myToken = signToken(params);
    res.status(200).send({ myToken });
});



app.get("*", (req, res) => {
    res.send({});
});

app.listen(port, () => {
    console.log(`My application is running on http://localhost:${port}`);
});