// SPDX-License-Identifier: MIT
// Make the AI Judge Laugh: Office Jokes — one line about office life,
// under 200 characters. The joke is the recursion: a meeting about
// meetings, and declining it only schedules another one.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "My calendar invited me to a meeting about meetings. I declined, and it sent me a meeting to discuss the decline.";

const MAX_CHARS = 199;

function entryLine(): string {
  const line = LINE.trim();
  if (line.length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`entry line is ${line.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (/\r|\n/.test(line)) {
    throw new Error("entry must be a single line");
  }
  // No control characters and no accidental double spaces: either would
  // break the one-line rendering the judge sees.
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
  if (/  /.test(line)) {
    throw new Error("entry must not contain double spaces");
  }
  return line;
}

function main(): void {
  const line = entryLine();
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  console.log(`wrote ${line.length} characters to /output/entry.txt`);
}

main();
