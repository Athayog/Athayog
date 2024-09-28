import WeightLoss from "@/components/pages/home/WeightLoss";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `LeftContentRightImage`.
 */
export type LeftContentRightImageProps =
  SliceComponentProps<Content.LeftContentRightImageSlice>;

/**
 * Component for "LeftContentRightImage" Slices.
 */
const LeftContentRightImage = ({
  slice,
}: LeftContentRightImageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <WeightLoss
        title={slice.primary.title}
        titleColoured={slice.primary.title_coloured}
        description={slice.primary.description}
        buttonText={slice.primary.button_text}
        buttonLink={slice.primary.button_link}
        image={slice.primary.right_image}
      />
    </section>
  );
};

export default LeftContentRightImage;
