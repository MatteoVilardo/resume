import { getIcon } from "../../data/iconMap";

export function Icon({ name, size = 20, className, ...rest }) {
  const Component = getIcon(name);
  if (!Component) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`<Icon name="${name}" /> not found in iconMap`);
    }
    return null;
  }
  return <Component size={size} className={className} {...rest} />;
}
