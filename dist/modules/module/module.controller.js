import { MService } from "./module.service.js";
export const createModule = async (req, res, next) => {
    try {
        const result = await MService.SCreateModule(req);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const updateModule = async (req, res, next) => {
    try {
        const result = await MService.SUpdateModule(req);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const deleteModule = async (req, res, next) => {
    try {
        const result = await MService.SDeleteModule(req);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=module.controller.js.map