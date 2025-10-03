import img from "next/img"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight text-balance">
            Handcrafted with devotion, blessed with tradition
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Every piece we create is a labor of love, infused with spiritual energy and crafted with pure, natural
            materials to bring divine blessings into your home.
          </p>
        </div>
      </section>

      {/* Hero img */}
      <section className="container mx-auto px-4 pb-16">
        <div className="relative w-full aspect  rounded-2xl overflow-hidden bg-muted">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/artisan-hands-crafting-spiritual-items-with-candle-foPoNCPOnYgpFvXiF8yGOKyxjk4ElE.jpg"
            alt="Artisan crafting spiritual products"
            
            className="object-cover w-full h-96"
          />
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-center">Our Story</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Born from a deep reverence for Lord Krishna and ancient spiritual traditions, our journey began with a
              simple vision: to create sacred items that bring peace, devotion, and divine energy into every home.
            </p>
            <p>
              Each product we craft—from hand-poured candles to aromatic dhup, from intricate decorations to elegant
              handbags—is made with pure, natural materials and blessed with traditional mantras. We believe that when
              you bring our products into your space, you're not just purchasing an item; you're inviting spiritual
              energy and devotion into your life.
            </p>
            <p>
              Our artisans pour their hearts into every creation, ensuring that each piece meets the highest standards
              of quality and purity. We source only the finest natural ingredients, never compromising on authenticity
              or spiritual integrity.
            </p>
          </div>
        </div>
      </section>

      {/* What We Create */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-center mb-12 md:mb-16">What We Create</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Candles */}
            <div className="group space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-card">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/handmade-spiritual-candles-with-natural-wax-FQ7bQDZ5YbL5TywMN3qHDxkpYW7myL.jpg"
                  alt="Handmade Candles"
                  
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-2xl text-foreground">Candles</h3>
              <p className="text-muted-foreground leading-relaxed">
                Hand-poured with pure natural wax and infused with sacred fragrances to illuminate your prayers and
                meditation.
              </p>
            </div>

            {/* Dhup/Incense */}
            <div className="group space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-card">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/traditional-dhup-incense-sticks-for-pooja-WsX4GtPCuSUWmsA2VMA5Kqt8MN4NOH.jpg"
                  alt="Dhup & Incense"
                  
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-2xl text-foreground">Dhup & Incense</h3>
              <p className="text-muted-foreground leading-relaxed">
                Handmade with pure herbs and natural ingredients, perfect for pooja and creating a divine atmosphere.
              </p>
            </div>

            {/* Decorations */}
            <div className="group space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-card">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/spiritual-home-decorations-krishna-theme-OTYyZcGLokANj7dBn2tZePaT3MXEr5.jpg"
                  alt="Spiritual Decorations"
                  
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-2xl text-foreground">Decorations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Intricate handcrafted pieces that bring spiritual beauty and divine energy to your sacred spaces.
              </p>
            </div>

            {/* Handbags */}
            <div className="group space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-card">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/handmade-spiritual-handbags-with-traditional-desig-o2XWFLJ8Ws7jBZWI5M04cAeggLLcBj.jpg"
                  alt="Handmade Handbags"
                  
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-2xl text-foreground">Handbags</h3>
              <p className="text-muted-foreground leading-relaxed">
                Elegant, handcrafted bags that blend traditional artistry with modern functionality and style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-center mb-12 md:mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">🙏</span>
              </div>
              <h3 className="font-serif text-2xl text-foreground">Devotion</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every product is crafted with spiritual devotion and blessed with traditional mantras.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="font-serif text-2xl text-foreground">Purity</h3>
              <p className="text-muted-foreground leading-relaxed">
                We use only pure, natural, and authentic materials—no chemicals, no compromises.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-serif text-2xl text-foreground">Craftsmanship</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each piece is handmade by skilled artisans who honor traditional techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/40 text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-3xl md:text-5xl text-balance">Bring divine blessings into your home</h2>
            <p className="text-lg md:text-xl opacity-90 text-pretty">
              Explore our collection of handcrafted spiritual products, each made with love, devotion, and pure natural
              materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
