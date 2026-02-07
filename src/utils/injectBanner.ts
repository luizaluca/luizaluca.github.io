export function injectBanner(html: string, bannerHtml: string, afterParagraph = 4) {
  const parts = html.split('</p>');
  if (parts.length <= 1) {
    return html;
  }

  return parts
    .map((part, index) => {
      if (index === parts.length - 1) return part;
      const paragraphIndex = index + 1;
      const paragraph = `${part}</p>`;
      if (paragraphIndex === afterParagraph) {
        return `${paragraph}${bannerHtml}`;
      }
      return paragraph;
    })
    .join('');
}
