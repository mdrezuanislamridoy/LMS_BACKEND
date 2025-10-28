import app from "./app.js";
import { env } from "./config/env.js";
const port = env.port || 9999;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=server.js.map