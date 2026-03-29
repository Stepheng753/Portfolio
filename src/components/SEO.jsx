import React from "react";

export function SEO({ title, description, image, url, type }) {
    const defaultTitle = "Stephen Giang — Software Engineer";
    const defaultDescription =
        "Stephen Giang — Software Engineer, founder of MadisonLegal.ai, and dedicated private educator. Portfolio showcasing expertise in full-stack development, AI automation, and education.";
    const defaultImage = "https://stepheng753.com/profile_pic.jpg";
    const defaultUrl = "https://stepheng753.com";
    const defaultType = "website";

    const finalTitle = title || defaultTitle;
    const finalDescription = description || defaultDescription;
    const finalImage = image || defaultImage;
    const finalUrl = url || defaultUrl;
    const finalType = type || defaultType;

    return (
        <>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="author" content="Stephen Giang" />
            <meta
                name="keywords"
                content="Stephen Giang, Software Engineer, Full-Stack Developer, AI Automation, MadisonLegal, Crossroads Tutoring, React, Node.js, Python, Portfolio"
            />

            {/* Canonical URL */}
            <link rel="canonical" href={finalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={finalType} />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:site_name" content="Stephen Giang Portfolio" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={finalUrl} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#7c3aed" />
        </>
    );
}
