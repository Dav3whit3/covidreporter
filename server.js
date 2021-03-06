import { app } from "./src/config/app.js";

// âšī¸ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  đĨ Starting Express.js Server ! đĨ

  đ  Server listening on http://localhost:${PORT} đ`);
});
