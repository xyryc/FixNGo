import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6 max-w-screen-md mx-auto px-4">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="relative hidden bg-muted md:block">
            <Image
              height={1900}
              width={2800}
              src="/nissan.jpg"
              alt="Login sotck image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>

          <LoginForm />
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
