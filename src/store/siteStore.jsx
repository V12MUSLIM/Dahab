import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { API_CONFIG, secureFetch } from "./authStore";

const middleware = (f) =>
  import.meta.env.DEV ? devtools(f, { name: "SiteStore" }) : f;

export const useSiteStore = create(
  middleware((set, get) => ({
    contact: null,
    socialMedia: [],
    isLoading: false,
    error: null,
    lastFetched: null,

    /** Fetch contact + social media in parallel */
async fetchSiteData(force = false) {
  if (!API_CONFIG.isValid) {
    console.error("Invalid API config for site data fetch");
    return;
  }

  const { lastFetched, isLoading } = get();
  if (isLoading) return; // prevent overlapping calls
  if (!force && lastFetched && Date.now() - lastFetched < 60000) return; // 1 min cooldown

  set({ isLoading: true, error: null });

  try {
    const [contactRes, socialRes] = await Promise.all([
      secureFetch(`${API_CONFIG.baseUrl}/contact`, { credentials: "include" }),
      secureFetch(`${API_CONFIG.baseUrl}/social-media`, { credentials: "include" }),
    ]);

    if (!contactRes.ok || !socialRes.ok)
      throw new Error("Failed to fetch site data");

    const contactData = await contactRes.json();
    const socialData = await socialRes.json();

    const contact =
      Array.isArray(contactData.contacts) && contactData.contacts.length > 0
        ? contactData.contacts[0]
        : null;

    const socialMedia =
      Array.isArray(socialData.socialMediaes) && socialData.socialMediaes.length > 0
        ? socialData.socialMediaes
        : [];

    set({
      contact,
      socialMedia,
      isLoading: false,
      lastFetched: Date.now(),
    });
  } catch (err) {
    console.error("Site data fetch error:", err);
    set({ error: err.message, isLoading: false });
  }
},


    /** Update contact info (admin) */
    async updateContact(updatedData) {
      if (!API_CONFIG.isValid) return console.error("Invalid API config");

      set({ isLoading: true, error: null });
      try {
        const res = await secureFetch(`${API_CONFIG.baseUrl}/contact`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });

        if (!res.ok) throw new Error("Failed to update contact");

        const updatedJson = await res.json();
        const updatedContact =
          Array.isArray(updatedJson.contacts) && updatedJson.contacts.length > 0
            ? updatedJson.contacts[0]
            : updatedJson;

        set({ contact: updatedContact, isLoading: false });
      } catch (err) {
        console.error("Contact update error:", err);
        set({ error: err.message, isLoading: false });
      }
    },
  }))
);
