import { useEffect } from "react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  ogImage?: string;
  breadcrumbs?: BreadcrumbItem[];
}

const BASE_URL = "https://tsptensile.com";

export function useSEO({
  title,
  description,
  path = "",
  keywords,
  ogImage = "/images/hero.jpg",
  breadcrumbs,
}: SEOProps) {
  useEffect(() => {
    // 1. Page Title
    const fullTitle = title.includes("TSP Tensile") ? title : `${title} | TSP Tensile`;
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const attr = isProperty ? `property="${nameOrProperty}"` : `name="${nameOrProperty}"`;
      let element = document.querySelector(`meta[${attr}]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", nameOrProperty);
        } else {
          element.setAttribute("name", nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", value);
    };

    // 2. Meta Description
    setMeta("description", description);

    // 3. Keywords
    if (keywords) {
      setMeta("keywords", keywords);
    }

    // 4. Canonical URL
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const canonicalUrl = `${BASE_URL}${cleanPath === "/" ? "" : cleanPath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 5. Open Graph
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`, true);

    // 6. Twitter Cards
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`);

    // 7. BreadcrumbList Schema
    let breadcrumbScript = document.getElementById("schema-breadcrumbs") as HTMLScriptElement | null;
    if (breadcrumbs && breadcrumbs.length > 0) {
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement("script");
        breadcrumbScript.id = "schema-breadcrumbs";
        breadcrumbScript.type = "application/ld+json";
        document.head.appendChild(breadcrumbScript);
      }

      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": BASE_URL,
          },
          ...breadcrumbs.map((b, idx) => ({
            "@type": "ListItem",
            "position": idx + 2,
            "name": b.name,
            "item": b.url.startsWith("http") ? b.url : `${BASE_URL}${b.url.startsWith("/") ? b.url : `/${b.url}`}`,
          })),
        ],
      };
      breadcrumbScript.textContent = JSON.stringify(breadcrumbData, null, 2);
    } else if (breadcrumbScript) {
      breadcrumbScript.remove();
    }

    window.scrollTo(0, 0);
  }, [title, description, path, keywords, ogImage, JSON.stringify(breadcrumbs)]);
}
