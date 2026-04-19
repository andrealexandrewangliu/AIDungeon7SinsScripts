InnerSelf("output");
const modifier = (text) => {
  text = AutoCards("output", text);
  // Any other output modifier scripts can go here
  return { text };
};
modifier(text);
