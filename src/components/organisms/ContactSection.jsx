import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLocale } from "../../context/LocaleContext";
import { STRINGS } from "../../data/strings";
import { PROFILE } from "../../data/profile";
import { SectionHeading } from "../molecules/SectionHeading";
import { Button } from "../atoms/Button";

function buildMailtoLink(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const subject = `New Contact from ${name}`;
  const body = `${message}\n\nContact Info:\nName: ${name}\nEmail: ${email}`;
  return `mailto:${PROFILE.contacts.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactSection() {
  const { theme } = useTheme();
  const { locale } = useLocale();
  const copy = STRINGS[locale].sections.contact;

  const onSubmit = (e) => {
    e.preventDefault();
    window.location.href = buildMailtoLink(new FormData(e.target));
  };

  return (
    <section
      id="contact"
      className="py-32 px-4 relative border-t border-white/5 pointer-events-auto"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          title={copy.title}
          subtitle={copy.subtitle}
          description={copy.description}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl bg-white/5 border backdrop-blur-xl transition-all duration-500"
          style={{
            borderColor: `${theme.accent}22`,
            boxShadow: `0 0 50px ${theme.accent}11`,
          }}
        >
          <form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field
                name="name"
                type="text"
                label={copy.nameLabel}
                placeholder={copy.namePlaceholder}
                accent={theme.accent}
              />
              <Field
                name="email"
                type="email"
                label={copy.emailLabel}
                placeholder={copy.emailPlaceholder}
                accent={theme.accent}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-black uppercase tracking-[0.2em] opacity-60"
                style={{ color: theme.accent }}
              >
                {copy.messageLabel}
              </label>
              <textarea
                name="message"
                rows="4"
                required
                placeholder={copy.messagePlaceholder}
                className="p-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
              />
            </div>

            <Button type="submit" className="mt-4">
              {copy.button}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ name, type, label, placeholder, accent }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-xs font-black uppercase tracking-[0.2em] opacity-60"
        style={{ color: accent }}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="p-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 focus:outline-none transition-colors"
      />
    </div>
  );
}
