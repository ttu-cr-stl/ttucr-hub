import { SubmissionResponse } from "../types";

const JUDGE0_API =
  process.env.NEXT_PUBLIC_JUDGE0_API || "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = process.env.NEXT_PUBLIC_JUDGE0_API_KEY;

interface SubmissionRequest {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
}

export async function createSubmission(
  submission: SubmissionRequest
): Promise<string> {
  const response = await fetch(
    `${JUDGE0_API}/submissions?base64_encoded=false&wait=false`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": JUDGE0_API_KEY!,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify(submission),
    }
  );

  const data = await response.json();
  return data.token;
}

export async function getSubmission(
  token: string
): Promise<SubmissionResponse> {
  const response = await fetch(
    `${JUDGE0_API}/submissions/${token}?base64_encoded=false`,
    {
      headers: {
        "X-RapidAPI-Key": JUDGE0_API_KEY!,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    }
  );

  return response.json();
}
