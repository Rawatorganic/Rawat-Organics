/**
 * Renders schema.org JSON-LD as a script tag.
 * Server-component friendly. Pass any plain object that conforms to schema.org.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
