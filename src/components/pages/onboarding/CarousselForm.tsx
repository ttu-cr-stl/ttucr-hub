"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormRadio } from "@/components/utils/formItems/FormRadio";
import { FormTextInput } from "@/components/utils/formItems/FormTextInput";
import { useFormProfile } from "@/lib/hooks/useFormProfile";
import { cn } from "@/lib/utils/cn";
import { Degree, NavPath } from "@/lib/utils/consts";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";

export const CarousselForm: FC = ({}) => {
  const { profileForm, onSubmit, formLoading } = useFormProfile();
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [showNext, setShowNext] = useState(true);
  const [showPrev, setShowPrev] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setShowPrev(emblaApi.canScrollPrev());
        setShowNext(emblaApi.canScrollNext());
      });
    }
  });

  return (
    <Form {...profileForm}>
      <div className="w-full overflow-hidden space-y-6">
        <form
          id="profileForm"
          className="flex flex-col space-y-6"
          ref={emblaRef}
          onSubmit={profileForm.handleSubmit(onSubmit)}
        >
          <div className="flex">
            <CarouselItem>
              <div className="flex flex-col space-y-2">
                <FormTextInput
                  control={profileForm.control}
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                />
                <FormTextInput
                  control={profileForm.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                />
              </div>
            </CarouselItem>

            <CarouselItem>
              <FormTextInput
                control={profileForm.control}
                name="r_number"
                label="R#"
                placeholder="XXXXXXXX"
                type="number"
              />
            </CarouselItem>

            <CarouselItem>
              <FormRadio
                label="Major"
                control={profileForm.control}
                name="major"
                placeholder="Choose a major"
                options={Degree}
              />
            </CarouselItem>

            <CarouselItem>
              <FormRadio
                label="Minor"
                control={profileForm.control}
                name="minor"
                placeholder="Choose a minor"
                options={Degree}
              />
            </CarouselItem>
          </div>

          <div className="flex w-full items-center justify-between">
            <Button
              type="button"
              className={cn(showPrev ? "" : "invisible")}
              onClick={scrollPrev}
            >
              Prev
            </Button>
            <Button
              type="button"
              onClick={
                showNext
                  ? scrollNext
                  : () => {
                      const form = document.getElementById(
                        "profileForm"
                      ) as HTMLFormElement;
                      if (form) {
                        form.requestSubmit();
                      }
                      router.push(NavPath.HOME)
                    }
              }
            >
              {formLoading ? 'Loading...' : (showNext ? "Next" : "Save & Continue")}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

const CarouselItem = ({ children }: { children: ReactNode }) => (
  <div className="mx-8" style={{ flex: "0 0 80%" }}>
    {children}
  </div>
);
