import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vxseqtxmhfafymrkwtrq.supabase.co";
const supabaseKey = "sb_publishable_hz8P-If5HwLSneED8zFC1w_TmPLeiFB";

export const supabase = createClient(supabaseUrl, supabaseKey);