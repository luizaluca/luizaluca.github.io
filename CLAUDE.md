# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `jekyll serve --drafts` - Run local development server including draft posts
- `bundle install` - Install Ruby gems and dependencies
- `jekyll build` - Build the static site for production

## Architecture Overview

This is a Jekyll-based static website for Dr. Elena Luiza Luca, a pediatric dentist. The site is built using:

- **Jekyll** - Static site generator with Ruby/Liquid templating
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **GitHub Pages** - Hosting platform (configured in _config.yml)

### Site Structure

- **Landing page** (`index.html`) - Single-page layout with hero section, services cards, and blog preview
- **Blog system** - Posts in `_posts/` directory using Jekyll's blogging features
- **Layouts** - Templates in `_layouts/` (default, post, page, tag-page)
- **Assets** - Images and SCSS files in `assets/` directory
- **Romanian language** - All content is in Romanian (locale: ro_RO)

### Key Configuration

- Site URL: https://drluca.dental
- Google Tag Manager: GTM-KDHH99M
- Custom SCSS compilation with compressed output
- SEO tags and sitemap generation enabled
- Tag system for blog posts with pretty permalinks

### Content Management

- Blog posts use front matter with title, description, published_date, image, and tags
- Images stored in `assets/img/posts/` for blog content
- Custom CSS classes for blog content styling in `blog.scss`
- Posts support featured images and automatic excerpts

### Design System

The site uses a medical/healthcare color scheme with a custom "medicenter_color" brand color and maintains a professional, parent-friendly aesthetic focused on pediatric dental services.