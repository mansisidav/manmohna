import { Star } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// Static review data
const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    date: "March 15, 2024",
    review:
      "The Krishna idol I purchased is absolutely divine. The craftsmanship is exceptional and the spiritual energy it brings to my home is incredible. Highly recommend ManMohnaa for authentic spiritual products.",
    product: "Krishna Brass Idol",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    rating: 5,
    date: "March 10, 2024",
    review:
      "Beautiful peacock feather collection! The quality exceeded my expectations. Perfect for my puja room. The packaging was also very careful and secure.",
    product: "Peacock Feather Set",
  },
  {
    id: 3,
    name: "Anita Desai",
    rating: 4,
    date: "March 5, 2024",
    review:
      "Lovely spiritual items. The incense sticks have a wonderful fragrance that creates a peaceful atmosphere. Will definitely order again.",
    product: "Sandalwood Incense",
  },
  {
    id: 4,
    name: "Vikram Singh",
    rating: 5,
    date: "February 28, 2024",
    review:
      "The flute is beautifully crafted and produces melodious sounds. As a Krishna devotee, this has become my most treasured possession. Thank you ManMohnaa!",
    product: "Bamboo Flute",
  },
  {
    id: 5,
    name: "Meera Patel",
    rating: 5,
    date: "February 20, 2024",
    review:
      "Exceptional service and authentic products. The spiritual books collection is vast and the quality of prints is excellent. Very satisfied with my purchase.",
    product: "Bhagavad Gita Book",
  },
  {
    id: 6,
    name: "Arjun Reddy",
    rating: 4,
    date: "February 15, 2024",
    review:
      "Good quality products at reasonable prices. The delivery was prompt and the customer service was helpful in answering my queries.",
    product: "Puja Thali Set",
  },
  {
    id: 7,
    name: "Lakshmi Iyer",
    rating: 5,
    date: "February 10, 2024",
    review:
      "The spiritual jewelry is stunning! The Radha-Krishna pendant is beautifully designed and feels very auspicious. I wear it every day.",
    product: "Radha-Krishna Pendant",
  },
  {
    id: 8,
    name: "Sanjay Gupta",
    rating: 5,
    date: "February 5, 2024",
    review:
      "ManMohnaa has become my go-to store for all spiritual needs. The authenticity and quality of products is unmatched. Blessed to have found this store.",
    product: "Tulsi Mala",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`size-5 ${star <= rating ? "fill-accent text-accent" : "fill-muted text-muted"}`} />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="size-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-lg">{review.name}</h3>
          <p className="text-sm text-muted-foreground">{review.date}</p>
        </div>
        <StarRating rating={review.rating} />
      </div>

      <p className="text-foreground leading-relaxed mb-3">{review.review}</p>

      <div className="pt-3 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Product: <span className="text-foreground font-medium">{review.product}</span>
        </p>
      </div>
    </div>
  )
}

export default function ReviewsPage() {
  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="min-h-screen flex flex-col">
    

      {/* Background Image */}
      {/* <div className="fixed inset-0 -z-10">
        <img
          src="/krishna-flute.png"
          alt="Krishna Flute Background"
          className="w-full h-full object-cover blur-md scale-110 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div> */}

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4 text-balance">
              Customer Reviews
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
              Hear from our beloved customers about their spiritual journey with ManMohnaa
            </p>

            {/* Rating Summary */}
            <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 shadow-sm">
              <StarRating rating={5} />
              <span className="text-2xl font-bold text-foreground">{averageRating}</span>
              <span className="text-muted-foreground">out of 5</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{reviews.length} reviews</span>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-12 px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      </main>

     
    </div>
  )
}
