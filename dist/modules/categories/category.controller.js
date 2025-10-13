import { CService } from "./category.service.js";
export const addCategory = async (req, res, next) => {
    try {
        const category = await CService.Add(req, req.body, next);
        if (!category) {
            return res.status(400).json({ message: "category creation failed" });
        }
        res.status(201).json({ message: "Category created successfully" });
    }
    catch (error) {
        next(error);
    }
};
export const getCategories = async (req, res, next) => {
    try {
        const categories = await CService.Get();
        if (!categories) {
            return res.status(404).json({ message: "category Not Found" });
        }
        res
            .status(200)
            .json({ message: "category fetched successfully", categories });
    }
    catch (error) {
        next(error);
    }
};
export const deleteCategory = async (req, res, next) => {
    try {
        const category = await CService.Delete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "category deletion failed" });
        }
        res
            .status(200)
            .json({ message: "category deleted successfully", category });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=category.controller.js.map