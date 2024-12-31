"use client"

import { IHomePage } from "@/types/root.types";

export default function HomeView({ data }: { data: IHomePage }) {
    return(
        <pre>
            {JSON.stringify(data, undefined, 2)}
        </pre>
    )
}