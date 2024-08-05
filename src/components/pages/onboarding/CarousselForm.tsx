"use client";
import { Button } from "@/components/ui/shadcn/button";
import { Form } from "@/components/ui/shadcn/form";
import { Spinner } from "@/components/utils/Spinner";
import { FormRadio } from "@/components/utils/formItems/FormRadio";
import { FormTextInput } from "@/components/utils/formItems/FormTextInput";
import { internalUpdateUserByUsername } from "@/db/users";
import { useAuthUser } from "@/lib/providers/authProvider";
import { DegreeKeys, formSchema, NavPath } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { Degree } from "@/lib/utils/consts";
import { zodResolver } from "@hookform/resolvers/zod";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const CarousselForm: FC = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [showNext, setShowNext] = useState(true);
  const [showPrev, setShowPrev] = useState(false);

  //Form stuff
  const user = useAuthUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      profilePic: user?.profilePic || "",
      major: user?.major as DegreeKeys,
      minor: user?.minor as DegreeKeys,
    },
  }) as UseFormReturn<z.infer<typeof formSchema>>;

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (user)
      try {
        internalUpdateUserByUsername(user?.username, values);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update user");
      }
  }

  // Carousel stuff
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
    <Form {...form}>
      <div className="w-full overflow-hidden space-y-6">
        <form
          id="form"
          className="flex flex-col"
          ref={emblaRef}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-center">
            <CarouselItem>
              <div className="flex flex-col space-y-2">
                <FormTextInput
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                />
                <FormTextInput
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                />
              </div>
            </CarouselItem>

            <CarouselItem>
              <FormRadio
                label="Major"
                control={form.control}
                name="major"
                placeholder="Choose a major"
                options={Degree}
              />
            </CarouselItem>

            <CarouselItem>
              <FormRadio
                label="Minor"
                control={form.control}
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
                        "form"
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
