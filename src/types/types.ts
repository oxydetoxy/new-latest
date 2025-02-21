import { z } from "zod";

export const postInput = z.object({
  data: z.array(z.string()).min(1),
});
