import { createClient } from '@/prismicio'
import FooterComponent from './FooterComponent'

export const fetchFooterData = async () => {
    const client = createClient()
    const footer = await client.getSingle('footer') // Replace 'footer' with your custom type name for footer
    return footer.data
}

const Footer = async () => {
    const data = await fetchFooterData()
    return <FooterComponent data={data} />
}

export default Footer;
