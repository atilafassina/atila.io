import Lightbulb from "lucide-solid/icons/lightbulb";
import LightbulbOff from "lucide-solid/icons/lightbulb-off";

const handleToggleClick = () => {
  const element = document.documentElement;
  element.classList.toggle("dark");

  const isDark = element.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

export const ThemeToggler = () => {
  return (
    <button
      type="button"
      onClick={handleToggleClick}
      class="grid place-items-center w-[38px] h-[38px] border-[1.5px] border-ink bg-paper text-ink cursor-pointer transition-colors hover:bg-ink hover:text-paper"
    >
      <Lightbulb aria-hidden="true" class="w-[18px] h-[18px] dark:hidden" />
      <LightbulbOff
        aria-hidden="true"
        class="w-[18px] h-[18px] hidden dark:block"
      />
      <span class="sr-only">Toggle theme</span>
    </button>
  );
};
