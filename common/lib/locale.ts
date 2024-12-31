import 'server-only';

import { draftMode } from "next/headers";

export const isDraftMode = async () => (await draftMode())?.isEnabled;