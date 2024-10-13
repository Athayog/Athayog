import { ColorField } from '@prismicio/client'

export const backgroundColorExtract = (colors: ColorField[]) => {
    if (colors.length === 1) {
        return colors[0] // Single color background
    } else if (colors.length > 1) {
        return `linear-gradient(to bottom, ${colors.join(', ')})` // Gradient background
    } else {
        return '#ffffff' // Fallback default color
    }
}
