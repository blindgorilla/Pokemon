import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy | BUY OR PASS",
  description:
    "How BUY OR PASS handles the email address you provide when joining the early-access list.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/*
 * PLACEHOLDERS — replace before launch.
 * Every value below marked with [ ... PLACEHOLDER] must be filled in with the
 * real operating entity's details. Nothing here is legal advice; have the final
 * wording reviewed before publishing.
 */
const COMPANY_NAME = "[COMPANY NAME PLACEHOLDER]";
const COMPANY_ADDRESS = "[COMPANY ADDRESS PLACEHOLDER]";
const CONTACT_EMAIL = "[CONTACT EMAIL PLACEHOLDER]";
const EMAIL_PROVIDER = "[EMAIL PROVIDER NAME PLACEHOLDER]";
const LAST_UPDATED = "[LAST UPDATED DATE PLACEHOLDER]";

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[0.9375rem] leading-relaxed text-mute-400 sm:text-base">
      {children}
    </p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 text-xl font-semibold tracking-[-0.01em] text-bone-50 sm:text-2xl">
      {children}
    </h2>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto w-full max-w-3xl px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24">
          <p className="eyebrow">Privacy</p>
          <h1 className="mt-4 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-bone-50 sm:text-[2.75rem]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-mute-500">
            Last updated: {LAST_UPDATED}
          </p>

          <Paragraph>
            This policy explains what happens to the email address you give us
            when you join the {site.name} early-access list. It is written in
            plain language on purpose.
          </Paragraph>

          <Heading>Who we are</Heading>
          <Paragraph>
            {site.name} is operated by {COMPANY_NAME}, {COMPANY_ADDRESS}. If you
            have a question about this policy or your data, contact us at{" "}
            {CONTACT_EMAIL}.
          </Paragraph>

          <Heading>What we collect</Heading>
          <Paragraph>
            Only your email address, and only when you type it into the
            early-access form and submit it. We do not ask for your name,
            address, payment details, date of birth or any other personal
            information. There is no account to create and no payment is taken
            on this site.
          </Paragraph>
          <Paragraph>
            Our hosting provider keeps standard technical server logs (such as IP
            address and browser type) for security and reliability, as almost all
            websites do. We do not use those logs to build a profile of you.
          </Paragraph>

          <Heading>What we use it for</Heading>
          <Paragraph>
            Your email address is used for one thing: to tell you when{" "}
            {site.name} launches, and to send occasional updates about its
            progress and early access. That is the entire purpose. Submitting the
            form is your consent for those emails — there is no pre-ticked
            marketing box anywhere on this site, and joining the list is never a
            condition of anything else.
          </Paragraph>
          <Paragraph>
            We do not sell, rent or trade your email address, and we do not share
            it with advertisers.
          </Paragraph>

          <Heading>Who processes it</Heading>
          <Paragraph>
            Your address is stored with our email service provider,{" "}
            {EMAIL_PROVIDER}, which sends the launch emails on our behalf and may
            not use your data for its own marketing. We keep your address until
            you unsubscribe or ask us to delete it.
          </Paragraph>

          <Heading>Unsubscribing and deletion</Heading>
          <Paragraph>
            Every email we send includes an unsubscribe link, and unsubscribing
            takes effect immediately. You can also email {CONTACT_EMAIL} at any
            time to ask for a copy of the data we hold about you, to correct it,
            or to have it deleted entirely. We will action deletion requests
            without asking you to justify them.
          </Paragraph>

          <Heading>Analytics</Heading>
          <Paragraph>
            We measure aggregate usage — for example how many people visited the
            page or joined the list — so we know whether the product is worth
            building. These measurements are not tied to your email address and
            are not used to track you across other websites.
          </Paragraph>

          <Heading>Changes to this policy</Heading>
          <Paragraph>
            If this policy changes in a way that affects how we use your email
            address, we will update this page and note the date at the top.
          </Paragraph>

          <div className="mt-12 border-t border-white/[0.06] pt-8">
            <Link
              href="/"
              className="text-[0.9375rem] text-accent underline underline-offset-4 transition hover:text-accent-strong"
            >
              ← Back to {site.name}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
