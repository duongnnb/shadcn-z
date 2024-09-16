import { Metadata } from "next"

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export const metadata: Metadata = {
  title: "Building Blocks.",
  description:
    "Beautifully designed. Copy and paste into your apps. Open Source.",
}

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Floating Label Combobox</PageHeaderHeading>
        {/* <PageHeaderDescription>
          Beautifully designed. Copy and paste into your apps. Open Source.
        </PageHeaderDescription> */}
        
      </PageHeader>
      <section id="blocks" className="scroll-mt-24 px-4">
        {children}
      </section>
    </div>
  )
}
