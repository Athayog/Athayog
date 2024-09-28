import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import RecognitionComponent from "@/components/Recognition";

/**
 * Props for `Recognition`.
 */
export type RecognitionProps = SliceComponentProps<Content.RecognitionSlice>;

/**
 * Component for "Recognition" Slices.
 */
const Recognition = ({ slice }: RecognitionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <RecognitionComponent
        description={slice.primary.description}
        logos={slice.primary.logos}
      />
    </section>
  );
};

export default Recognition;
