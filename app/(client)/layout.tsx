
import LiveVisualEditing from "@/wrappers/presentation/VisualEditing";
import "./globals.css";
import React from 'react'
import DraftModeBar from "@/atoms/layout/DraftModeBar";
import { isDraftMode } from "@/lib/locale";
import getRootData from "@/lib/data/getRootData";
import { GlobalProvider } from "@/providers/global-provider";
import Menu from "@/organisms/navigation/Menu";

export default async function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = await getRootData();
    const draft = await isDraftMode();

    return(
        <body>
            <GlobalProvider 
                data={{
                    ...data,
                }}
            >
                <Menu />
                {draft && <DraftModeBar />}
                <main>{children}</main>
            </GlobalProvider>
        {draft && <LiveVisualEditing />}
        </body>
    )
}