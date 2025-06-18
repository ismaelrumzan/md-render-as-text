import { type NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    // Read the markdown file from the lib directory
    const filePath = path.join(process.cwd(), "lib", "accounts.md");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { slug } = await params;
    const requestedPath = slug.join("/");
    // Only handle .md file requests
    if (!requestedPath.endsWith(".md")) {
      return new NextResponse("Not Found", { status: 404 });
    }

    //Here handle matching the slug path with the markdown files in the lib folder

    // Return the content as plain text
    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error reading accounts.md file:", error);
    return new NextResponse("File not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
