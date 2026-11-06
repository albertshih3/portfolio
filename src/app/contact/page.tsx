import { redirect } from "next/navigation";

// The contact form lives in ContactModal (see src/app/page.tsx) so there's a
// single, validated implementation instead of two divergent ones.
export default function ContactRedirect() {
  redirect("/?contact=open");
}
