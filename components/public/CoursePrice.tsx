interface CoursePriceProps {
  fees: string;
  offerPrice?: string;
  className?: string;
}

// When an offer price is set it is the price to pay; the regular fee is shown struck through.
export default function CoursePrice({ fees, offerPrice, className }: CoursePriceProps) {
  const offer = offerPrice?.trim();
  if (!offer) return fees ? <span className={className}>{fees}</span> : null;

  return (
    <span className={className}>
      {offer}
      {fees && <del className="ml-1.5 font-normal opacity-60">{fees}</del>}
    </span>
  );
}
