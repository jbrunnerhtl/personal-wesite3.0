// Server-safe (no "use client"): imported by the root layout.

export const STORAGE_KEY = "theme";
export const LIGHT_QUERY = "(prefers-color-scheme: light)";

/**
 * Runs inline in <head> before first paint so the stored mode is applied without a flash.
 * Keep in sync with resolve() in theme.ts.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var d=document.documentElement,p=localStorage.getItem("${STORAGE_KEY}")||"system";if(p!=="light"&&p!=="dark")p="system";var r=p==="system"?(matchMedia("${LIGHT_QUERY}").matches?"light":"dark"):p;d.setAttribute("data-theme",r);d.setAttribute("data-theme-pref",p)}catch(e){}})()`;
