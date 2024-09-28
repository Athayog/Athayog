import Stats from "@/components/Stats";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Slices`.
 */
export type SlicesProps = SliceComponentProps<Content.SlicesSlice>;

/**
 * Component for "Slices" Slices.
 */
const Slices = ({ slice }: SlicesProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Stats statsData={slice.primary.statscollection} />
    </section>
  );
};

export default Slices;
