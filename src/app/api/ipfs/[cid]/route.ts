import { NextRequest, NextResponse } from "next/server";

const GATEWAYS = [
  (cid: string) => `https://gateway.lighthouse.storage/ipfs/${cid}`,
  (cid: string) => `https://ipfs.io/ipfs/${cid}`,
  (cid: string) => `https://cloudflare-ipfs.com/ipfs/${cid}`,
  (cid: string) => `https://dweb.link/ipfs/${cid}`,
];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ cid: string }> }
) {
  const { cid } = await params;

  for (const makeUrl of GATEWAYS) {
    try {
      const res = await fetch(makeUrl(cid), { next: { revalidate: 86400 } });
      if (res.ok) {
        const contentType = res.headers.get("content-type") ?? "application/octet-stream";
        const body = await res.arrayBuffer();
        return new NextResponse(body, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch {
      // try next gateway
    }
  }

  return new NextResponse(null, { status: 404 });
}
