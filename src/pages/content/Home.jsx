import MainSection from "../../components/sections/home/MainSection";
import MenuSection from "../../components/sections/home/MenuSection";
import AboutUsSection from "../../components/sections/home/AboutUsSection";
import ServiceSection from "../../components/sections/home/ServiceSection";
import DelieverySection from "../../components/sections/home/DelieverySection";
import TestimonialsSection from "../../components/sections/home/TestimonialsSection";
import BlogsArticlesSection from "../../components/sections/home/BlogsArticlesSection";

export default function HomePage() {
  return (
    <>
      <MainSection />
      <MenuSection />
      <AboutUsSection />
      <ServiceSection />
      <DelieverySection />
      <TestimonialsSection />
      <BlogsArticlesSection />
    </>
  );
}
