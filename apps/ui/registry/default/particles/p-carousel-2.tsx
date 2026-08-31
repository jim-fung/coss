import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";

const slides = [1, 2, 3, 4, 5, 6];

export default function Particle() {
  return (
    <Carousel className="w-full max-w-lg">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem className="basis-1/3" key={slide}>
            <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted/40 p-4">
              <span className="font-semibold text-2xl tabular-nums">
                {slide}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
