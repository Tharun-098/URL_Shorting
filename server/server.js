import connectDB from "./config/db.js";
import app  from "./app.js";
import env_variable from "./config/env.js";

//connect to database
connectDB();

//start server
app.listen(env_variable.port,()=>{
    console.log(`server is running on port ${env_variable.port} in ${env_variable.node_env} mode`);
});