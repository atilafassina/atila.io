import { JSX } from "solid-js";
import { Navigation } from "../components/navigation";
import { SocialFooter } from "../components/social-footer";
import "@fontsource/jost/400.css";
import { MenuMobile } from "~/components/menu-mobile";

export const MainLayout = (props: { children: JSX.Element }) => {
  return (
    <div class="sandy grid-rows-[auto_1fr_auto] grid min-h-screen dark:text-white text-black font-sans">
      <div class="order-2 sm:order-1">
        <Navigation />
        <MenuMobile />
      </div>
      <main class="flex flex-col items-center mb-32 text-left animate-blur-in font-light order-1 sm:order-2">
        {props.children}
      </main>
      <SocialFooter />
    </div>
  );
};
