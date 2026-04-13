export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/_next/", "/api/"],
        },
        sitemap: "https://oliverturp.co.uk/sitemap.xml",
    };
}
