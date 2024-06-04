"use client";
import { useUser } from "@/lib/hooks/useUser";
import { Degree, DegreeKeys, NavPath } from "@/lib/utils/consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const formSchema = z.object({
  firstName: z.string({
    required_error: "Name is required",
  }),
  lastName: z.string({
    required_error: "Name is required",
  }),
  r_number: z
    .string({
      required_error: "R number is required",
    })
    .length(8, {
      message: "R number must be 8 characters long",
    }),
  profilePic: z.string().url().optional(),
  major: z.nativeEnum(DegreeKeys),
  minor: z.nativeEnum(DegreeKeys),
});

export const UpdateProfile = () => {
  const { user, userLoading, updateUser } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      r_number: user?.r_number,
      profilePic: user?.profilePic!,
      major: user?.major as DegreeKeys,
      minor: user?.minor as DegreeKeys,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      updateUser(values);
      if (pathname === NavPath.ONBOARDING) {
        router.push(NavPath.HOME);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Avatar className="w-28 h-28">
          <AvatarImage src={user?.profilePic!} alt="profilePic" />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="r_number"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-1">
              <FormLabel className="pt-1 text-lg">R#</FormLabel>
              <FormControl>
                <Input className="w-32" placeholder="XXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Major</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select your major" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Degree.map((degree, index) => (
                    <SelectItem
                      className="w-[280px]"
                      style={{ color: degree.color }}
                      key={index}
                      value={degree.value}
                    >
                      {degree.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select your minor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Degree.map((degree, index) => (
                    <SelectItem
                      className="w-[280px]"
                      style={{ color: degree.color }}
                      key={index}
                      value={degree.value}
                    >
                      {degree.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {pathname === NavPath.ONBOARDING ? "Save and Continue" : "Save"}
        </Button>
      </form>
    </Form>
  );
};
