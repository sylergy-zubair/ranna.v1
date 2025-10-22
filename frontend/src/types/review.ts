export interface Review {
  star: number;
  title: string | null;
  review: string | null;
  image: string | null;
  name: string | null;
  review_url: string | null;
}

export interface ReviewCardProps {
  review: Review;
  index?: number;
}
