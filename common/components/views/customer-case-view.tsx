"use client"

import { CustomerCase } from "@/types/pages/customer-case.types";

export default function CustomerCaseView({ data }: { data: CustomerCase }) {
    return(
        <pre>
            {JSON.stringify(data, undefined, 2)}
        </pre>
    )
}