"use client"

import { Article } from "@/types/pages/article.types";

export default function ArticleView({ data }: { data: Article }) {
    return(
        <pre>
            {JSON.stringify(data, undefined, 2)}
        </pre>
    )
}
