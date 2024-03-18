function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
  // return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}

export default formatDate;
