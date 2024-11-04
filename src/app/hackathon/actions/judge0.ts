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

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function retryWithBackoff(fn: () => Promise<any>, retries = MAX_RETRIES): Promise<any> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries === 0 || error?.response?.status !== 429) throw error;
    
    console.log(`Retrying after ${RETRY_DELAY}ms, ${retries} attempts left`);
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return retryWithBackoff(fn, retries - 1);
  }
}

export async function createSubmissionAction(
  submission: SubmissionRequest
): Promise<string> {
  return retryWithBackoff(async () => {
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
        const errorBody = await response.text();
        console.error("Submission creation failed:", {
          status: response.status,
          statusText: response.statusText,
          body: errorBody
        });
        
        if (response.status === 429) {
          throw new Error("Rate limit exceeded");
        }
        
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
  });
}

export async function getSubmissionAction(
  token: string
): Promise<SubmissionResponse> {
  return retryWithBackoff(async () => {
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
        const errorBody = await response.text();
        console.error("Submission fetch failed:", {
          token,
          status: response.status,
          statusText: response.statusText,
          body: errorBody
        });
        
        if (response.status === 429) {
          throw new Error("Rate limit exceeded");
        }
        
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
  });
}
