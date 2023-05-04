const router = require("express").Router();
const CategoryController = require("../controller/Category");

function checkPermission(req, res, next) {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!req.user) {
        return res.status(401).send("Unauthorized");
    }

    // Kiểm tra xem người dùng có quyền được yêu cầu hay không
    if (!req.user.permission || !req.user.permission.includes("permission_watch")) {
        return res.status(403).send("Forbidden");
    }

    // Nếu người dùng có quyền, tiếp tục xử lý request
    next();
}



router.get("/getAllCate", checkPermission, CategoryController.getAllCate);

router.post("/createCate", CategoryController.createCatelog);

router.put("/updateCate/:id", CategoryController.updateCateLog)

router.delete("/:id", CategoryController.deleteCateLog);

router.get("/search", CategoryController.searchCateLog)

module.exports = router