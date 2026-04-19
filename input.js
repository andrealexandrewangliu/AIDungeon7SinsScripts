InnerSelf("input");
const modifier = (text) => {
  text = AutoCards("input", text);
  // Any other input modifier scripts can go here
  return { text };
};
modifier(text);
