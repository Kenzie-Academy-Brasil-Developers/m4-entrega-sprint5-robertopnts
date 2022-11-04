import "reflect-metadata"
import "express-async-errors"
import express from "express"
import usersRoutes from "./routers/users.routes"
import sessionRoutes from "./routers/sessions.routes"
import categoriesRoutes from "./routers/categories.routes"
import propertiesRoutes from "./routers/properties.routes"
import schedulesRoutes from "./routers/schedules.routes"
import handleErrorMiddleware from "./middlewares/handleError.middleware"


const app = express()
app.use(express.json())
app.use("/users", usersRoutes)
app.use("/login", sessionRoutes)
app.use("/categories", categoriesRoutes)
app.use("/properties", propertiesRoutes)
app.use("/schedules", schedulesRoutes)
app.use(handleErrorMiddleware)


export default app