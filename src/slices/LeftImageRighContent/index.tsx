import PersonalSessions from "@/components/pages/home/PersonalSessions";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `LeftImageRighContent`.
 */
export type LeftImageRighContentProps =
  SliceComponentProps<Content.LeftImageRighContentSlice>;

/**
 * Component for "LeftImageRighContent" Slices.
 */
const LeftImageRighContent = ({
  slice,
}: LeftImageRighContentProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PersonalSessions
        title={slice.primary.title}
        titleColoured={slice.primary.title_coloured}
        description={slice.primary.description}
        buttonText={slice.primary.button_text}
        buttonLink={slice.primary.button_link}
        image={slice.primary.leftimage}
      />
    </section>
  );
};

export default LeftImageRighContent;
