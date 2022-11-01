import express from "express";
import { CartRouter,ProductsRouter,OtherRouter } from "./routes/index.js";
import handlebars   from "express-handlebars"
const app = express();


app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.engine('hbs',
handlebars.engine({
    extname:".hbs",
    defaultLayout:"main.hbs",
})
);
app.set("view engine", "hbs");
app.set('views','./views')

const PORT = process.env.PORT || 8080;
app.use('/api',ProductsRouter);
app.use(CartRouter)
app.use(OtherRouter)

app.listen(PORT, (console.log(`funcionando en el puerto ${PORT}`)))