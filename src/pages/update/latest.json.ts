import { sitePath } from "../../lib/paths";
import type { APIRoute } from "astro";
import { latestPublished } from "../../data/product";
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        schemaVersion: 1,
        status: latestPublished ? "published" : "unpublished",
        available: Boolean(latestPublished),
        platform: "windows",
        architecture: "x64",
        version: latestPublished?.version ?? null,
        publishedAt: latestPublished?.publishedAt ?? null,
        downloadUrl: latestPublished?.downloadUrl
          ? sitePath(latestPublished.downloadUrl)
          : null,
        sha256: latestPublished?.sha256 ?? null,
        sizeBytes: latestPublished?.sizeBytes ?? null,
        releaseNotes: latestPublished?.releaseNotes ?? [],
      },
      null,
      2,
    ),
    { headers: { "Content-Type": "application/json; charset=utf-8" } },
  );
