// src/store/siteStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { API_CONFIG, secureFetch } from "./authStore";

const middleware = (f) =>
  import.meta.env.DEV ? devtools(f, { name: "SiteStore" }) : f;

export const useSiteStore = create(
  middleware((set, get) => ({
    // public state
    contact: null,
    socialMedia: [],
    isLoading: false,
    error: null,

    // internal flags + timestamps (define initially!)
    _fetchingContact: false,
    _fetchingSocial: false,
    lastFetchedContact: null,
    lastFetchedSocial: null,

    /* ============================
     * FETCH CONTACT
     * - prevents parallel calls
     * - cooldown (60s)
     * - sets lastFetched only AFTER success
     * ============================ */
    async fetchContact(force = false) {
      if (!API_CONFIG.isValid) {
        console.error("Invalid API config for fetchContact");
        return;
      }

      const { lastFetchedContact, _fetchingContact } = get();

      // prevent parallel calls
      if (_fetchingContact) return;

      const now = Date.now();
      if (!force && lastFetchedContact && now - lastFetchedContact < 60000)
        return;

      set({ _fetchingContact: true, error: null });

      try {
        const res = await secureFetch(`${API_CONFIG.baseUrl}/contact`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch contact");

        const data = await res.json();
        const contact =
          Array.isArray(data.contacts) && data.contacts.length > 0
            ? data.contacts[0]
            : null;

        set({
          contact,
          _fetchingContact: false,
          lastFetchedContact: Date.now(),
        });
      } catch (err) {
        console.error("fetchContact error:", err);
        set({ error: err.message || String(err), _fetchingContact: false });
      }
    },

    /* ============================
     * FETCH SOCIAL MEDIA
     * - independent from fetchContact
     * - prevents parallel calls
     * - cooldown (60s)
     * ============================ */
    async fetchSocialMedia(force = false) {
      if (!API_CONFIG.isValid) {
        console.error("Invalid API config for fetchSocialMedia");
        return;
      }

      const { lastFetchedSocial, _fetchingSocial } = get();

      if (_fetchingSocial) return;

      const now = Date.now();
      if (!force && lastFetchedSocial && now - lastFetchedSocial < 60000)
        return;

      set({ _fetchingSocial: true, error: null });

      try {
        const res = await secureFetch(`${API_CONFIG.baseUrl}/social-media`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch social media");

        const data = await res.json();
        set({
          socialMedia: Array.isArray(data.socialMediaes)
            ? data.socialMediaes
            : [],
          _fetchingSocial: false,
          lastFetchedSocial: Date.now(),
        });
      } catch (err) {
        console.error("fetchSocialMedia error:", err);
        set({ error: err.message || String(err), _fetchingSocial: false });
      }
    },

    /* ============================
     * FETCH ALL (parallel, safe)
     * - uses individual methods to keep logic single-responsibility
     * - optional force flag
     * ============================ */
    async fetchAllSiteData(force = false) {
      if (!API_CONFIG.isValid) {
        console.error("Invalid API config for fetchAllSiteData");
        return;
      }

      // call both independent fetchers in parallel but they guard themselves
      await Promise.all([
        get().fetchContact(force),
        get().fetchSocialMedia(force),
      ]);
    },

    /* ============================
     * UPDATE CONTACT (admin)
     * - updates server & local state
     * - uses secureFetch (credentials included automatically)
     * ============================ */
    async updateContact(updatedData) {
      if (!API_CONFIG.isValid) return console.error("Invalid API config");

      const contact = get().contact;

      if (!contact?._id) {
        console.error("Contact ID not found");
        return;
      }

      set({ isLoading: true, error: null });

      try {
        const res = await secureFetch(
          `${API_CONFIG.baseUrl}/contact/update/${contact._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to update contact");

        const updatedJson = await res.json();
        const updatedContact =
          Array.isArray(updatedJson.contacts) && updatedJson.contacts.length > 0
            ? updatedJson.contacts[0]
            : updatedJson;

        set({ contact: updatedContact, isLoading: false });
      } catch (err) {
        console.error("updateContact error:", err);
        set({ error: err.message || String(err), isLoading: false });
      }
    },
    /* ============================
     * UPDATE SOCIAL (admin) - only href
     * - sends only `href` to server (server should ignore name/icon edits)
     * - updates local list on success
     * ============================ */
    async updateSocialHref(id, href) {
      if (!API_CONFIG.isValid) return console.error("Invalid API config");

      set({ isLoading: true, error: null });
      try {
        const res = await secureFetch(
          `${API_CONFIG.baseUrl}/social-media/update/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ href }),
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to update social link");

        const updated = await res.json();
        // server might return updated item or whole list — we handle both
        if (updated && updated._id) {
          set((state) => ({
            socialMedia: state.socialMedia.map((s) =>
              s._id === id ? { ...s, href } : s
            ),
            isLoading: false,
          }));
        } else {
          // safest: refetch social media
          await get().fetchSocialMedia(true);
          set({ isLoading: false });
        }
      } catch (err) {
        console.error("updateSocialHref error:", err);
        set({ error: err.message || String(err), isLoading: false });
      }
    },

    /* ============================
     * helper: clear cache or state
     * ============================ */
    clearSiteCache() {
      set({
        contact: null,
        socialMedia: [],
        lastFetchedContact: null,
        lastFetchedSocial: null,
      });
    },
  }))
);
