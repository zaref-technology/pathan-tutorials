import {
  Award, BarChart3, BookOpen, CheckCircle2, ClipboardList, Clock, FileText,
  GraduationCap, Heart, HelpCircle, Layers, Lightbulb, ListChecks, RefreshCw,
  Target, TrendingUp, Trophy, User, Users,
  type LucideIcon,
} from "lucide-react";

// Icons an admin can pick for editable content. Keys are what gets stored in Firestore.
export const ICONS = {
  award: Award,
  chart: BarChart3,
  book: BookOpen,
  check: CheckCircle2,
  clipboard: ClipboardList,
  clock: Clock,
  file: FileText,
  graduation: GraduationCap,
  heart: Heart,
  help: HelpCircle,
  layers: Layers,
  idea: Lightbulb,
  list: ListChecks,
  refresh: RefreshCw,
  target: Target,
  trending: TrendingUp,
  trophy: Trophy,
  user: User,
  users: Users,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;

export const ICON_KEYS = Object.keys(ICONS) as IconKey[];

export function getIcon(key: string | undefined): LucideIcon {
  return key && key in ICONS ? ICONS[key as IconKey] : CheckCircle2;
}
