"use client";
import { Button } from "@/components/ui/shadcn/button";
import { Form } from "@/components/ui/shadcn/form";
import { Spinner } from "@/components/utils/Spinner";
import { FormRadio } from "@/components/utils/formItems/FormRadio";
import { FormTextInput } from "@/components/utils/formItems/FormTextInput";
import { useAuthUser } from "@/lib/providers/authProvider";
import { DegreeKeys, formSchema, NavPath } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { Degree } from "@/lib/utils/consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePrivy } from "@privy-io/react-auth";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const CarousselForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [showNext, setShowNext] = useState(true);
  const [showPrev, setShowPrev] = useState(false);

  const { user, updateUser } = useAuthUser();
  const { ready, authenticated } = usePrivy();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      profilePic: user?.profilePic || "",
      major: (user?.major as DegreeKeys) || DegreeKeys.NONE,
      minor: (user?.minor as DegreeKeys) || DegreeKeys.NONE,
    },
  });

  if (ready && !authenticated) {
    router.push(NavPath.LOGIN);
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      if (currentSlide === 0) {
        // Only validate firstName and lastName
        const isValid = ["firstName", "lastName"].every(
          (field) =>
            form.getFieldState(field as "firstName" | "lastName").isDirty &&
            !form.getFieldState(field as "firstName" | "lastName").error
        );

        if (isValid) {
          emblaApi.scrollNext();
          setCurrentSlide((prev) => prev + 1);
        } else {
          // Trigger validation for firstName and lastName
          form.trigger(["firstName", "lastName"]);
        }
      } else {
        // For major and minor slides, always allow scrolling
        emblaApi.scrollNext();
        setCurrentSlide((prev) => prev + 1);
      }
    }
  }, [emblaApi, currentSlide, form]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setShowPrev(emblaApi.canScrollPrev());
        setShowNext(emblaApi.canScrollNext());
        setCurrentSlide(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    // Only validate firstName and lastName before submission
    form.trigger(["firstName", "lastName"]).then((isValid) => {
      if (isValid) {
        try {
          updateUser(values)
            .then(() => {
              router.push(NavPath.HOME);
            })
            .catch((e) => {
              console.error(e);
              setLoading(false);
              // Handle error (e.g., show error message to user)
            });
        } catch (error) {
          console.error(error);
          setLoading(false);
          // Handle error (e.g., show error message to user)
        }
      } else {
        setLoading(false);
        // Handle invalid form (e.g., show error message to user)
      }
    });
  }

  // Carousel stuff
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  return (
    <Form {...form}>
      <div className="w-full overflow-hidden space-y-6">
        <form id="form" className="flex flex-col" ref={emblaRef}>
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
              onClick={showNext ? scrollNext : () => onSubmit(form.getValues())}
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
