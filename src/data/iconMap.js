import {
  Code,
  Cpu,
  Globe,
  Database,
  Terminal,
  Layers,
  Home,
  Briefcase,
  Mail,
  FileDown,
  Hash,
  Server,
  Braces,
  Box,
  Boxes,
  Atom,
  Glasses,
  Network,
  Gamepad2,
} from "lucide-react";

export const ICONS = {
  code: Code,
  cpu: Cpu,
  globe: Globe,
  database: Database,
  terminal: Terminal,
  layers: Layers,
  home: Home,
  briefcase: Briefcase,
  mail: Mail,
  filedown: FileDown,
  hash: Hash,
  server: Server,
  braces: Braces,
  box: Box,
  boxes: Boxes,
  atom: Atom,
  glasses: Glasses,
  network: Network,
  gamepad: Gamepad2,
};

export function getIcon(name) {
  return ICONS[name] || null;
}
