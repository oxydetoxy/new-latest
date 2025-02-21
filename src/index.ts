import express, { Request, Response } from "express";
import { postInput } from "./types/types";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/bfhl", (req: Request, res: Response) => {
  res.status(200).json({
    operation_code: 1,
  });
});

app.post("/bfhl", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const parsedResponse = postInput.safeParse(body);

    if (!parsedResponse.success) {
      res.status(400).json({
        is_success: false,
        message: "Invalid data",
      });
      return;
    }

    const inputArray = parsedResponse.data.data;
    const numbers: number[] = [];
    const alphabets: string[] = [];

    inputArray.forEach((item) => {
      if (/^\d+$/.test(item)) {
        numbers.push(Number(item));
      } else if (/^[a-zA-Z]$/.test(item)) {
        // Ensures only single-character alphabets are allowed
        alphabets.push(item);
      }
    });

    console.log(numbers);
    console.log(alphabets);

    const largestAlphabet =
      alphabets.length > 0
        ? alphabets.reduce((max, current) =>
            current.toLowerCase() > max.toLowerCase() ? current : max
          )
        : null;

    res.status(200).json({
      is_success: true,
      user_id: "Priyanshu_moond_22012004",
      email: "priyanshumoond2004@gmail.com",
      roll_number: "22BCS17171",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: largestAlphabet ? [largestAlphabet] : [],
    });
    return;
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Internal server error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
