import { useEffect } from "react";
import { useConfig } from "@/contexts/ConfigContext";

// Lightweight SEO applier: updates core meta tags from runtime config
export const SEO = () => {
  const config = useConfig();

  useEffect(() => {
    const title = config?.seo?.title || config?.app_name || config?.siteIdentity?.name || "BrillPack";
    const description =
      config?.seo?.description ||
      "Tailor-made packaging that captivates customers and protects your products.";

    // title
    if (title) {
      document.title = title;
    }

    // helper to set or create meta
    const setMeta = (attr: { name?: string; property?: string }, content: string) => {
      const selector = attr.name ? `meta[name='${attr.name}']` : `meta[property='${attr.property}']`;
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (attr.name) el.setAttribute("name", attr.name);
        if (attr.property) el.setAttribute("property", attr.property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta({ name: "description" }, description);

    // Open Graph
    setMeta({ property: "og:title" }, title);
    setMeta({ property: "og:description" }, description);

    // Twitter
    setMeta({ name: "twitter:card" }, "summary_large_image");
    setMeta({ name: "twitter:title" }, title);
    setMeta({ name: "twitter:description" }, description);
  }, [config]);

  return null;
};