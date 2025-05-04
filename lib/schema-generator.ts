/**
 * Generates JSON-LD schema markup for different page types
 */

export function generateHomePageSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ElectronicParts",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/components?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    description: "Find detailed specifications, equivalents, and calculate parameters for electronic components.",
  }
}

export function generateComponentPageSchema(component: any, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: component.name || "Electronic Component",
    description: component.description || `${component.name} electronic component specifications and details`,
    mpn: component.partNumber || "",
    brand: {
      "@type": "Brand",
      name: component.manufacturer || "Various",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: component.price || "0.00",
      priceCurrency: "USD",
    },
    url: `${baseUrl}/components/${component.id}`,
  }
}

export function generateCircuitTemplateSchema(circuit: any, baseUrl: string, isPremium: boolean) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: circuit.name || "Circuit Template",
    description: circuit.description || "Electronic circuit template with schematic and details",
    author: {
      "@type": "Organization",
      name: "ElectronicParts",
    },
    publisher: {
      "@type": "Organization",
      name: "ElectronicParts",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: circuit.datePublished || new Date().toISOString().split("T")[0],
    dateModified: circuit.dateModified || new Date().toISOString().split("T")[0],
    isAccessibleForFree: !isPremium,
    url: `${baseUrl}/circuit-templates/${circuit.id}`,
  }
}

export function generateCalculatorPageSchema(calculator: any, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calculator.name || "Electronic Calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
    },
    description: calculator.description || "Calculator for electronic component parameters",
    url: `${baseUrl}/calculators/${calculator.id}`,
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  }
}
