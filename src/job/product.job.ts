import Agenda from "agenda";
import { env } from "../config/env.js";
import { Product } from "../modules/digitalProducts/product.model.js";

const agenda = new Agenda({ db: { address: env.db_url } });

agenda.define("refresh popularity", async () => {
  const products = await Product.find();

  for (const product of products) {
    product.popularity =
      product.views * 0.2 +
      product.purchases * 1.5 +
      product.carts * 0.5 +
      product.wished * 0.3 +
      product.avgRating * 2;
    await product.save();
  }
});

await agenda.start();
await agenda.every("3 days", "refresh popularity");
