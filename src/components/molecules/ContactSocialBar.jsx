import { Mail, FileDown } from "lucide-react";
import { ContactIcon } from "../atoms/ContactIcon";
import { PROFILE } from "../../data/profile";
import { useLocale } from "../../context/LocaleContext";

const LABELS = {
  linkedin: { it: "LinkedIn", en: "LinkedIn" },
  upwork: { it: "Upwork", en: "Upwork" },
  cv: { it: "Scarica CV", en: "Download CV" },
  email: { it: "Email", en: "Email" },
};

const LinkedInIcon = (
  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const UpworkIcon = (
  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076c.417-1.929 1.488-3.414 3.012-3.414 1.05 0 1.834.742 1.834 2.193 0 2.016-1.066 3.524-2 3.524zm1.906-8.625c-2.31 0-4.04 1.637-4.832 3.864-.53 1.472-.88 3.12-1.11 4.67-.85-.92-1.89-1.95-3.07-2.67.54-2.8 1.14-5.91-.71-8.23-1.07-1.34-2.74-2.16-4.63-2.16-3.83 0-6.11 2.87-6.11 6.55v6.92h2.89v-6.92c0-2.17 1.13-3.69 3.22-3.69 1.5 0 2.4 1.05 2.4 3.24v7.37h2.89v-4.14c.82.72 1.7 1.41 2.58 2l-.93 4.38h2.91l.66-3.11c.8.31 1.61.47 2.44.47 2.65 0 4.88-2.15 4.88-5.74 0-4.04-2.22-5.88-4.52-5.88z" />
  </svg>
);

export function ContactSocialBar() {
  const { contacts } = PROFILE;
  const { t } = useLocale();
  return (
    <div className="flex items-center justify-center gap-6 md:gap-10">
      <ContactIcon
        href={contacts.linkedin}
        icon={LinkedInIcon}
        isExternal
        label={t(LABELS.linkedin)}
      />
      <ContactIcon
        href={contacts.upwork}
        icon={UpworkIcon}
        isExternal
        label={t(LABELS.upwork)}
      />
      <ContactIcon
        href={t(contacts.cv)}
        icon={<FileDown size={28} />}
        isExternal
        label={t(LABELS.cv)}
      />
      <ContactIcon
        href={`mailto:${contacts.email}`}
        icon={<Mail size={28} />}
        label={t(LABELS.email)}
      />
    </div>
  );
}
