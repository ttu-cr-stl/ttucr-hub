"use server";

import { SubmissionResponse } from "../types";

const JUDGE0_API = process.env.JUDGE0_API || "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

interface SubmissionRequest {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
}

export async function createSubmissionAction(
  submission: SubmissionRequest
): Promise<string> {
  try {
    console.log("Creating submission with:", {
      language_id: submission.language_id,
      stdin: submission.stdin,
      expected_output: submission.expected_output,
    });

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

    if (!response.ok) {
      console.error("Submission creation failed:", {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Submission created successfully:", {
      token: data.token,
      response: data,
    });

    return data.token;
  } catch (error) {
    console.error("Error creating submission:", {
      error,
      submission: {
        language_id: submission.language_id,
        stdin: submission.stdin,
      },
    });
    throw error;
  }
}

export async function getSubmissionAction(
  token: string
): Promise<SubmissionResponse> {
  try {
    console.log("Fetching submission result for token:", token);

    const response = await fetch(
      `${JUDGE0_API}/submissions/${token}?base64_encoded=false`,
      {
        headers: {
          "X-RapidAPI-Key": JUDGE0_API_KEY!,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      console.error("Submission fetch failed:", {
        token,
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Submission result:", {
      token,
      status: result.status,
      stdout: result.stdout,
      stderr: result.stderr,
      compile_output: result.compile_output,
      time: result.time,
      memory: result.memory,
    });

    return result;
  } catch (error) {
    console.error("Error getting submission:", {
      error,
      token,
    });
    throw error;
  }
}
