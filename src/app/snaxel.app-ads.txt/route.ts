export async function GET() {
  const content = "google.com, pub-6740764976459136, DIRECT, f08c47fec0942fa0\n";
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
