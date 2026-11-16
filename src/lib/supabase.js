import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? "";
const publishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ?? "";

function isValidProjectUrl(value) {
  try {
    const parsedUrl = new URL(value);
    return (
      parsedUrl.protocol === "https:" &&
      parsedUrl.hostname.endsWith(".supabase.co") &&
      parsedUrl.hostname !== "your-project.supabase.co" &&
      parsedUrl.pathname === "/" &&
      !parsedUrl.search &&
      !parsedUrl.hash
    );
  } catch {
    return false;
  }
}

const urlIsValid = isValidProjectUrl(url);
const publishableKeyIsValid = /^sb_publishable_[A-Za-z0-9_-]+$/.test(
  publishableKey,
);

export const supabaseConfig = { urlIsValid, publishableKeyIsValid };
export const isSupabaseConfigured = urlIsValid && publishableKeyIsValid;
export const supabase = isSupabaseConfigured
  ? createClient(url, publishableKey)
  : null;
