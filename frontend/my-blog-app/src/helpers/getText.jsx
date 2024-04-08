// Html to pure text in certain length
export const getText = (html, len) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const pureText = doc.body.textContent;
  return pureText.length > len ? pureText.substring(0, len) + "..." : pureText;
};
