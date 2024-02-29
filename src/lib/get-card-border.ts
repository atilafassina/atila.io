import type { ArticlePlatformType, TalkType } from "./schemas"

export function getCardBorder(type: TalkType | ArticlePlatformType) {
  switch (type) {
    case "podcast":
      return "from-blue-500 via-cyan-300 to-teal-400"
    case "conference":
      return "from-indigo-500 via-purple-500 to-pink-500"
    case "meetup":
      return "from-pink-700 via-pink-600 to-red-500"
    case "workshop":
      return "from-yellow-500 via-amber-500 to-orange-500"
    case "smashing":
      return "from-red-500 via-amber-500 to-yellow-500"
    case "dev-to":
      return "from-zinc-200 via-sky-200 to-stone-200"
    case "livestream":
    case "css-tricks":
      return "from-amber-500 via-emerald-500 to-cyan-500"
  }
}
