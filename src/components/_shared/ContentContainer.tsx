import React, { ReactNode } from "react";
import {
  LayoutContainer,
  LayoutContent,
} from "@/components/_shared/LayoutContainer";
import { SectionContent, SectionPadding } from "./SectionContainer";

interface ContainerProps {
  children: ReactNode;
}

const ContentContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <LayoutContent>
        <SectionPadding>
          <SectionContent>{children}</SectionContent>
        </SectionPadding>
      </LayoutContent>
    </LayoutContainer>
  );
};

export default ContentContainer;
