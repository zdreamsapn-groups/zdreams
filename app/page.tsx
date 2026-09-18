import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CtaBanner from "@/components/ui/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <section className="bg-gradient-to-br from-white via-amber-50 to-yellow-100 py-14">
        <div className="mx-auto max-w-6xl px-6">
          <CtaBanner
            title="Ready to Create Something Unique?"
            description="Personalized mugs and custom event websites — share your idea and receive a free quote within 24 hours."
          />
        </div>
      </section>
    </>
  );
}