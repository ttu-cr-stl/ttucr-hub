import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

const JUDGE0_API = process.env.JUDGE0_API || "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

const MAX_RETRIES = 3;
const BASE_DELAY = 1000; // 1 second

export const runtime = 'edge';

async function retryWithExponentialBackoff(
  fn: () => Promise<any>, 
  retries = MAX_RETRIES
): Promise<any> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries === 0 || error?.status !== 429) throw error;
    
    // Use exponential backoff: 1s, 2s, 4s
    const delay = BASE_DELAY * Math.pow(2, MAX_RETRIES - retries);
    console.log(`Retrying after ${delay}ms, ${retries} attempts left`);
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryWithExponentialBackoff(fn, retries - 1);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source_code, language_id, stdin, expected_output } = body;

    const result = await retryWithExponentialBackoff(async () => {
      const submissionResponse = await fetch(
        `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": JUDGE0_API_KEY!,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code,
            language_id,
            stdin,
            expected_output,
          }),
        }
      );

      if (!submissionResponse.ok) {
        const errorBody = await submissionResponse.text();
        console.error("Submission failed:", {
          status: submissionResponse.status,
          body: errorBody
        });
        
        const error: any = new Error(`HTTP error! status: ${submissionResponse.status}`);
        error.status = submissionResponse.status;
        throw error;
      }

      return submissionResponse.json();
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Code execution error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        details: error.status === 429 ? 'Rate limit exceeded' : undefined
      },
      { status: error.status || 500 }
    );
  }
} 