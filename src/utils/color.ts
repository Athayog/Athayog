export const backgroundColorExtract = (slice: any) => {
  const colors = slice.primary.background_color.map((item: { color: string }) => item.color);
  
  if (colors.length === 1) {
    return colors[0]; // Single color background
  } else if (colors.length > 1) {
    return `linear-gradient(to bottom, ${colors.join(', ')})`; // Gradient background
  } else {
    return '#ffffff'; // Fallback default color
  }
};
