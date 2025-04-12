export const generateIconBase64 = (svg: string) => {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};
