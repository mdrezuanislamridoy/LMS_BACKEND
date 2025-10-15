import z from "zod";
export const VVideoSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        videoUrl: z.string().min(1, "Video URL is required"),
        duration: z.number().min(1, "Didn't specify video duration"),
        isFree: z.boolean().default(false),
    }),
    params: z.object({
        id: z.string(),
    }),
});
//# sourceMappingURL=video.validator.js.map