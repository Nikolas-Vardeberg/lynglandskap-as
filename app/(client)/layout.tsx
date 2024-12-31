
import LiveVisualEditing from "@/wrappers/presentation/VisualEditing";
import "./globals.css";
import React from 'react'
import DraftModeBar from "@/atoms/layout/DraftModeBar";
import { isDraftMode } from "@/lib/locale";
import getRootData from "@/lib/data/getRootData";

export default async function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const draft = await isDraftMode();

    return(
        <body>
            <>
                {draft && <DraftModeBar />}
                <main>{children}</main>
            </>
        {draft && <LiveVisualEditing />}
        </body>
    )
}