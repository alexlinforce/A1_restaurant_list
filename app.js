// 載入erxpress
const express = require("express");
const app = express();

//設定伺服器變數
const port = 3000;

//載入外部資料restaurants.json
const restaurants = require("./restaurants.json");

// 載入handlebares
const expressHandlebars = require("express-handlebars");
const exhbs = expressHandlebars.create({
  defaultLayout: "main",
});

//設定express靜態資源midleware路徑
app.use(express.static("public"));

// 設定handlebars為template engine
// 當你調用res.render('someView')，Express會查找名為someView.handlebars的文件（通常在一個名為views的目錄下），並使用handlebars模板引擎來渲染它。
app.engine("handlebars", exhbs.engine);
app.set("view engine", "handlebars");

//路由設定
app.get("/", (req, res) => {
  restaurantList = restaurants.results;
  res.render("index", { restaurantList: restaurantList });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  console.log(typeof req.params.restaurant_id);

  const restaurant = restaurants.results.find((item) => {
    return req.params.restaurant_id === item.id.toString();
  });
  console.log("選擇的元素", restaurant);
  res.render("show", { restaurant });
});

//啟動伺服器
app.listen(port, () => {
  console.log(`伺服器正在監聽http://localhost:${port}`);
});
