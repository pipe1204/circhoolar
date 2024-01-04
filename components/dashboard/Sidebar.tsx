import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import NavLinks from "./NavLinks";
import { schoolSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSelectedSchoolStore } from "@/store/store";

type Inputs = z.infer<typeof schoolSchema>;

export default function SideNav() {
  const navbarHeight = "60px"; //Height of the navbar

  const setSelectedSchool = useSelectedSchoolStore(
    (state) => state.setSelectedSchool
  );

  const form = useForm<Inputs>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      schoolCode: "",
    },
  });
  return (
    <div
      className="hidden xl:flex w-full h-full flex-col bg-light-white px-3 py-4 xl:px-2 shadow-lg overflow-y-auto"
      style={{ height: `calc(100vh - ${navbarHeight})` }}
    >
      <div className="hidden xl:flex items-center ml-2 py-2 rounded-md">
        <Form {...form}>
          <form className="grid gap-4">
            <FormField
              control={form.control}
              name="schoolCode"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedSchool(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-light-white">
                        <SelectValue placeholder="Select school" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="All">All Schools</SelectItem>
                      <SelectItem value="CSYP3141">
                        South Yarra Primary
                      </SelectItem>
                      <SelectItem value="CMBG3141">
                        Melbourne Boys Grammar
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="flex flex-col space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}
