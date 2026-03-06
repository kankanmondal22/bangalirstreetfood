import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function BookingFailurePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <Card className="w-full max-w-lg bg-white shadow-lg text-center">
        <CardHeader className="pb-2">
          {/* Error Icon */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <CardTitle className="text-2xl font-bold text-red-700">
            Oops! Something Went Wrong
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 px-6 pb-8">
          <p className="text-gray-600 leading-relaxed">
            We were unable to process your booking. This could be due to a
            payment failure or a temporary issue on our end. Don&apos;t worry —
            no amount has been deducted from your account.
          </p>

          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 text-left space-y-2">
            <p className="font-semibold">What you can do:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Check your internet connection and try again</li>
              <li>Make sure your payment details are correct</li>
              <li>
                Contact us if the issue persists at{" "}
                <a
                  href="mailto:support@bangalirstreetfood.com"
                  className="underline font-medium"
                >
                  support@bangalirstreetfood.com
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1" asChild>
              <Link href="/booking">Try Again</Link>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
