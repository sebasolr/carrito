import express from "express";
import router from "./routes/routesApi.js"
import routerPublic from "./routes/routesPublic.js";
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
app.use('/api',router);
app.use(routerPublic)

app.listen(PORT, (console.log(`funcionando en el puerto ${PORT}`)))