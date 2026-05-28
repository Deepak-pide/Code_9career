'use server';
/**
 * @fileOverview An AI agent for administrators to summarize applicant resumes and score their relevance to a job.
 *
 * - adminApplicantSummarizer - A function that handles the resume analysis and scoring process.
 * - AdminApplicantSummarizerInput - The input type for the adminApplicantSummarizer function.
 * - AdminApplicantSummarizerOutput - The return type for the adminApplicantSummarizer function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AdminApplicantSummarizerInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The applicant's resume, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. Can be a PDF or text file."
    ),
  portfolioLink: z
    .string()
    .url()
    .optional()
    .describe("An optional link to the applicant's portfolio."),
  linkedInGitHubLink: z
    .string()
    .url()
    .optional()
    .describe("An optional link to the applicant's LinkedIn or GitHub profile."),
  jobDescription: z
    .string()
    .describe("The full description of the job opportunity."),
});
export type AdminApplicantSummarizerInput = z.infer<
  typeof AdminApplicantSummarizerInputSchema
>;

const AdminApplicantSummarizerOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      "A concise summary of the applicant's qualifications, skills, and experience relevant to the job."
    ),
  relevanceScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "A relevance score from 0 to 100, indicating how well the applicant matches the job description. 100 means a perfect match."
    ),
});
export type AdminApplicantSummarizerOutput = z.infer<
  typeof AdminApplicantSummarizerOutputSchema
>;

export async function adminApplicantSummarizer(
  input: AdminApplicantSummarizerInput
): Promise<AdminApplicantSummarizerOutput> {
  return adminApplicantSummarizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adminApplicantSummarizerPrompt',
  input: { schema: AdminApplicantSummarizerInputSchema },
  output: { schema: AdminApplicantSummarizerOutputSchema },
  prompt: `You are an expert HR specialist. Your task is to analyze an applicant's resume and any provided links against a given job description.
Generate a concise summary of the applicant's qualifications and assign a relevance score from 0 to 100, where 100 means a perfect match.

Job Description:
{{{jobDescription}}}

Applicant's Resume:
{{media url=resumeDataUri}}

{{#if portfolioLink}}
Portfolio Link: {{{portfolioLink}}}
{{/if}}

{{#if linkedInGitHubLink}}
LinkedIn/GitHub Link: {{{linkedInGitHubLink}}}
{{/if}}

Based on the above information, provide a summary and relevance score according to the specified JSON schema.`,
});

const adminApplicantSummarizerFlow = ai.defineFlow(
  {
    name: 'adminApplicantSummarizerFlow',
    inputSchema: AdminApplicantSummarizerInputSchema,
    outputSchema: AdminApplicantSummarizerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
