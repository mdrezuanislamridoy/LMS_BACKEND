import app from "./app.js";
import mongoose from "mongoose";
import { env } from "./config/env.js";
const main = async () => {
    await mongoose.connect(env.db_url);
    console.log("DB Connected");
    const port = env.port || 7071;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
main();
//# sourceMappingURL=server.js.map