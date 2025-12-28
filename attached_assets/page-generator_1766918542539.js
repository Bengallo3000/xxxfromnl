// Dynamic Page Generator for fromNL.Top
// This script generates HTML pages from the page management system

// Sample page templates
const pageTemplates = {
    default: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}} - fromNL.Top</title>
    <meta name="description" content="{{metaDescription}}">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #1a472a;
            --secondary-color: #d4af37;
            --accent-color: #ffffff;
            --text-color: #2d3748;
            --bg-color: #f8f9fa;
        }
        
        body { 
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
        }
        
        .gradient-text { 
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; 
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 1rem 0;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
        }
        
        .nav-links a {
            color: #6b7280;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .nav-links a:hover {
            color: var(--primary-color);
        }
        
        main {
            padding: 4rem 0;
        }
        
        .page-content {
            background: white;
            padding: 3rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        
        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 2rem;
            color: var(--primary-color);
        }
        
        h2 {
            font-size: 2rem;
            font-weight: 600;
            margin: 2rem 0 1rem 0;
            color: var(--primary-color);
        }
        
        h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 1.5rem 0 0.75rem 0;
            color: var(--text-color);
        }
        
        p {
            margin-bottom: 1rem;
        }
        
        ul, ol {
            margin: 1rem 0;
            padding-left: 2rem;
        }
        
        li {
            margin-bottom: 0.5rem;
        }
        
        footer {
            background: #1f2937;
            color: white;
            padding: 2rem 0;
            margin-top: 4rem;
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .footer-links {
            display: flex;
            gap: 2rem;
        }
        
        .footer-links a {
            color: #9ca3af;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .footer-links a:hover {
            color: white;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .page-content {
                padding: 2rem;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            .footer-content {
                flex-direction: column;
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <h1 class="text-2xl font-bold gradient-text">fromNL.Top</h1>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="products.html">Products</a>
                    <a href="admin.html">Admin</a>
                </div>
            </nav>
        </div>
    </header>
    
    <main>
        <div class="container">
            <div class="page-content">
                <h1>{{title}}</h1>
                {{content}}
            </div>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <div class="footer-content">
                <p>&copy; 2025 fromNL.Top. All rights reserved.</p>
                <div class="footer-links">
                    <a href="pages/about.html">About</a>
                    <a href="pages/contact.html">Contact</a>
                    <a href="pages/terms.html">Terms</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>`,

    'full-width': `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}} - fromNL.Top</title>
    <meta name="description" content="{{metaDescription}}">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #1a472a;
            --secondary-color: #d4af37;
            --accent-color: #ffffff;
            --text-color: #2d3748;
            --bg-color: #f8f9fa;
        }
        
        body { 
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
        }
        
        .gradient-text { 
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; 
        }
        
        .hero-section {
            background: linear-gradient(135deg, var(--primary-color) 0%, #2d5a3a 100%);
            color: white;
            padding: 4rem 0;
            text-align: center;
        }
        
        .container {
            max-width: 100%;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        header {
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 1rem 0;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
        }
        
        .nav-links a {
            color: #6b7280;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .nav-links a:hover {
            color: var(--primary-color);
        }
        
        main {
            padding: 0;
        }
        
        .page-content {
            background: white;
            padding: 4rem 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .hero-content h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .hero-content p {
            font-size: 1.25rem;
            opacity: 0.9;
        }
        
        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 2rem;
            color: var(--primary-color);
        }
        
        h2 {
            font-size: 2rem;
            font-weight: 600;
            margin: 2rem 0 1rem 0;
            color: var(--primary-color);
        }
        
        h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 1.5rem 0 0.75rem 0;
            color: var(--text-color);
        }
        
        p {
            margin-bottom: 1rem;
        }
        
        ul, ol {
            margin: 1rem 0;
            padding-left: 2rem;
        }
        
        li {
            margin-bottom: 0.5rem;
        }
        
        footer {
            background: #1f2937;
            color: white;
            padding: 2rem 0;
            margin-top: 0;
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .footer-links {
            display: flex;
            gap: 2rem;
        }
        
        .footer-links a {
            color: #9ca3af;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .footer-links a:hover {
            color: white;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .hero-content h1 {
                font-size: 2rem;
            }
            
            .page-content {
                padding: 2rem;
            }
            
            .footer-content {
                flex-direction: column;
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <nav>
            <h1 class="text-2xl font-bold gradient-text">fromNL.Top</h1>
            <div class="nav-links">
                <a href="index.html">Home</a>
                <a href="products.html">Products</a>
                <a href="admin.html">Admin</a>
            </div>
        </nav>
    </header>
    
    <main>
        <section class="hero-section">
            <div class="container">
                <div class="hero-content">
                    <h1>{{title}}</h1>
                    <p>{{metaDescription}}</p>
                </div>
            </div>
        </section>
        
        <div class="container">
            <div class="page-content">
                {{content}}
            </div>
        </div>
    </main>
    
    <footer>
        <div class="footer-content">
            <p>&copy; 2025 fromNL.Top. All rights reserved.</p>
            <div class="footer-links">
                <a href="pages/about.html">About</a>
                <a href="pages/contact.html">Contact</a>
                <a href="pages/terms.html">Terms</a>
            </div>
        </div>
    </footer>
</body>
</html>`
};

// Generate a page from template
function generatePage(pageData) {
    const template = pageTemplates[pageData.template] || pageTemplates.default;
    
    // Replace template variables
    let pageHTML = template
        .replace(/\{\{title\}\}/g, pageData.title)
        .replace(/\{\{metaDescription\}\}/g, pageData.metaDescription || pageData.title)
        .replace(/\{\{content\}\}/g, formatContent(pageData.content));
    
    return pageHTML;
}

// Format content for HTML display
function formatContent(content) {
    // Simple formatting - in a real implementation, you'd use a proper markdown parser
    let formatted = content
        .replace(/\n\n/g, '</p><p>') // Paragraph breaks
        .replace(/\n/g, '<br>'); // Line breaks
    
    // Wrap in paragraph tags if not already wrapped
    if (!formatted.startsWith('<')) {
        formatted = '<p>' + formatted + '</p>';
    }
    
    return formatted;
}

// Save page to localStorage (in a real app, this would save to a server)
function savePage(pageData) {
    const pages = JSON.parse(localStorage.getItem('customPages') || '[]');
    
    if (pageData.id) {
        // Update existing
        const index = pages.findIndex(p => p.id === pageData.id);
        if (index !== -1) {
            pages[index] = pageData;
        }
    } else {
        // Create new
        pageData.id = 'page_' + Date.now();
        pages.push(pageData);
    }
    
    localStorage.setItem('customPages', JSON.stringify(pages));
    return pageData;
}

// Get all pages
function getPages() {
    return JSON.parse(localStorage.getItem('customPages') || '[]');
}

// Get page by slug
function getPageBySlug(slug) {
    const pages = getPages();
    return pages.find(page => page.slug === slug);
}

// Delete page
function deletePage(pageId) {
    const pages = JSON.parse(localStorage.getItem('customPages') || '[]');
    const filteredPages = pages.filter(p => p.id !== pageId);
    localStorage.setItem('customPages', JSON.stringify(filteredPages));
}

// Export functions for use in other scripts
window.pageGenerator = {
    generatePage,
    savePage,
    getPages,
    getPageBySlug,
    deletePage
};