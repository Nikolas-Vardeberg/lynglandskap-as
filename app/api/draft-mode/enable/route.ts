import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { token } from "@/sanity/lib/token";
import { client } from "@/sanity/lib/client";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
});