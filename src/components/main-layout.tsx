import { JSX } from "solid-js";
import { Navigation } from "../components/navigation";
import { SocialFooter } from "../components/social-footer";
import { MenuMobile } from "~/components/menu-mobile";

export const MainLayout = (props: { children: JSX.Element }) => {
  return (
    <div class="grid-paper min-h-screen pb-[60px] md:pb-0">
      <div class="max-w-[1100px] mx-auto px-6 grid grid-rows-[auto_1fr_auto] min-h-screen">
        <Navigation />
        <main class="animate-blur-in">{props.children}</main>
        <SocialFooter />
      </div>
      <MenuMobile />
    </div>
  );
};
