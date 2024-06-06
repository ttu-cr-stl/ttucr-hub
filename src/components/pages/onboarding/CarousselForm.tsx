"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/utils/Spinner";
import { FormRadio } from "@/components/utils/formItems/FormRadio";
import { FormTextInput } from "@/components/utils/formItems/FormTextInput";
import { useFormProfile } from "@/lib/hooks/useFormProfile";
import { NavPath } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { Degree } from "@/lib/utils/consts";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";

export const CarousselForm: FC = ({}) => {
  const { profileForm, onSubmit } = useFormProfile();
  const [loading, setLoading] = useState(false);
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
          className="flex flex-col"
          ref={emblaRef}
          onSubmit={profileForm.handleSubmit(onSubmit)}
        >
          <div className="flex items-center">
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
                extraProps={{
                  maxlength: 8,
                  type: "text",
                  inputmode: "numeric",
                  pattern: "[0-9]*",
                }}
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

          <div className="flex w-full items-center justify-between pt-8">
            <Button
              type="button"
              className={cn(showPrev ? "" : "invisible", "w-16")}
              onClick={scrollPrev}
            >
              Prev
            </Button>
            <Button
              type="button"
              className={cn(!showNext && "w-36")}
              onClick={
                showNext
                  ? scrollNext
                  : () => {
                      setLoading(true);
                      const form = document.getElementById(
                        "profileForm"
                      ) as HTMLFormElement;
                      if (form) {
                        try {
                          form.requestSubmit();
                        } catch (e) {
                          console.log(e);
                          setLoading(false);
                        }
                      }
                      router.push(NavPath.HOME);
                    }
              }
            >
              {loading ? <Spinner /> : showNext ? "Next" : "Save & Continue"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

const CarouselItem = ({ children }: { children: ReactNode }) => (
  <div
    className="first:ml-2 first:mr-14 last:ml-14 last:mr-2 ml-8 mr-8"
    style={{ flex: "0 0 95%" }}
  >
    {children}
  </div>
);
