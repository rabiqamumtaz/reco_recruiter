export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', // Use 'short' for "Jul" instead of "July"
    day: 'numeric'
  });
};
