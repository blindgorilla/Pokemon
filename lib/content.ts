/**
 * All page copy lives here so sections stay presentational and the wording is
 * editable in one place. Copy is final — no placeholder text on the page.
 */

export const site = {
  name: "BUY OR PASS",
  tagline: "The Pokémon Card Decision System",
  launchPrice: "€39",
  url: "https://buyorpass.vercel.app",
} as const;

export const nav = {
  // Absolute hashes so the same nav works from /privacy as well as the home page.
  links: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "The Framework", href: "/#framework" },
    { label: "Early Access", href: "/#early-access" },
  ],
  cta: { label: "Get Early Access", href: "/#early-access" },
} as const;

export const hero = {
  eyebrow: "The Pokémon Card Decision System",
  headline: "Know When to Buy. And When to Pass.",
  body: "Learn how to turn price, demand, scarcity, population, grading and liquidity data into one clear decision: Buy, Negotiate, Wait or Pass.",
  ctaLabel: "Get Early Access",
  teaser: "Get early access and learn to run this analysis on your own cards.",
  microcopy: "Expected launch price: €39 · No payment today",
} as const;

/**
 * The hero demo is a worked example: one card, the decision it led to, and the
 * few data points behind it. Illustrative only — nothing here is live data and
 * nothing is calculated for the visitor.
 */
export const analysisDemo = {
  title: "CARD ANALYSIS",
  status: "WORKED EXAMPLE",
  cardImage: "/example-card.jpeg",
  cardAlt:
    "A graded Pokémon card in its slab — the card being evaluated in this example.",
  cardLabel: "THE CARD",
  // Trimmed to four rows so the verdict stays above the fold on a 390px screen.
  metrics: [
    { label: "Market Price", value: "€1,850" },
    { label: "Recent Trend", value: "+12.4%" },
    { label: "Liquidity", value: "High" },
    { label: "Demand", value: "Very High" },
  ],
  decision: "BUY",
  caption: "Strong fundamentals. Entry price is within a reasonable range.",
  figureCaption:
    "Example showing how the BUY OR PASS framework is applied to a card.",
} as const;

export const problem = {
  headline: "Spending €1,500 on a Pokémon Card Shouldn't Be a Guess.",
  intro:
    "You've found a card you love. Maybe it's €300. Maybe it's €1,500. Maybe you're considering spending several thousand euros on one card for the first time. Then the questions start.",
  questions: [
    "Is this actually a good price?",
    "Has the card already gone up too much?",
    "Should I buy raw and grade it?",
    "Is PSA 10 worth the premium?",
    "Is the population too high?",
    "Will I actually be able to sell it later?",
    "Am I buying because the fundamentals make sense—or because everyone is talking about it?",
  ],
  closer: "BUY OR PASS is designed to help you answer those questions yourself.",
} as const;

export const principle = {
  statement: "A Great Card Can Still Be a Bad Purchase at the Wrong Price.",
  body: "Low population alone doesn't make a great investment. A popular Pokémon alone doesn't make a great investment. Amazing artwork alone doesn't make a great investment. BUY OR PASS looks at the complete picture before making a decision.",
} as const;

export type Pillar = {
  number: string;
  title: string;
  question: string;
  explanation: string;
};

export const framework = {
  headline: "Eight Questions Before You Put Your Money Into a Card.",
  pillars: [
    {
      number: "01",
      title: "PRICE",
      question: "What is it actually worth?",
      explanation:
        "Use verified sales and realistic market ranges rather than relying on asking prices.",
    },
    {
      number: "02",
      title: "LIQUIDITY",
      question: "Can you actually sell it?",
      explanation:
        "Look at sales frequency and how actively the card trades.",
    },
    {
      number: "03",
      title: "TREND",
      question: "Where is the market moving?",
      explanation:
        "Understand whether pricing is rising, falling, stable, or being driven by temporary hype.",
    },
    {
      number: "04",
      title: "SCARCITY",
      question: "How difficult is another copy to obtain?",
      explanation:
        "Consider graded population, raw availability, listings, product origin and available supply.",
    },
    {
      number: "05",
      title: "DEMAND",
      question: "Does the market actually want it?",
      explanation:
        "Evaluate Pokémon popularity, collector demand, set significance and the size of the potential buyer base.",
    },
    {
      number: "06",
      title: "DESIRABILITY",
      question: "Why would collectors want this particular card?",
      explanation:
        "Artwork, nostalgia, story, era, promo status and historical importance all matter.",
    },
    {
      number: "07",
      title: "GRADE",
      question: "What premium are you paying?",
      explanation:
        "Compare raw, PSA grades, gem rates, grading costs and the downside of receiving a lower grade.",
    },
    {
      number: "08",
      title: "RISK & REWARD",
      question: "What happens if you're wrong?",
      explanation:
        "Consider entry price, downside, upside, liquidity, investment horizon and opportunity cost.",
    },
  ],
} as const;

export type DecisionKey = "buy" | "negotiate" | "wait" | "pass";

export const decisions = {
  headline: "Every Analysis Ends With a Decision.",
  items: [
    {
      key: "buy" as DecisionKey,
      label: "BUY",
      description: "Fundamentals and entry price align.",
    },
    {
      key: "negotiate" as DecisionKey,
      label: "NEGOTIATE",
      description: "The card is attractive. The asking price isn't.",
    },
    {
      key: "wait" as DecisionKey,
      label: "WAIT",
      description: "Strong card. Wrong timing.",
    },
    {
      key: "pass" as DecisionKey,
      label: "PASS",
      description: "The investment thesis isn't strong enough.",
    },
  ],
} as const;

export const brains = {
  headline: "Collector Brain ≠ Investor Brain",
  intro:
    "There is nothing wrong with buying a Pokémon card simply because you love it. That's collecting. But if you're spending money because you expect the card to preserve or increase its value, the decision requires a different process.",
  collector: {
    title: "Collector Brain",
    quote: "I love this card.",
    items: [
      "Favorite Pokémon",
      "Beautiful artwork",
      "Nostalgia",
      "Personal attachment",
      "Completes my collection",
    ],
  },
  investor: {
    title: "Investor Brain",
    quote: "Does this purchase make sense?",
    items: [
      "Market value",
      "Demand",
      "Scarcity",
      "Liquidity",
      "Grade premium",
      "Entry price",
      "Risk/reward",
    ],
  },
  closer:
    "Sometimes both sides agree. Sometimes they don't. BUY OR PASS helps you know the difference.",
} as const;

export const caseStudies = {
  headline: "Built Around Real Buying Decisions.",
  intro:
    "The system comes out of real Pokémon card buying, grading, holding and trading-up experience—actual decisions made with real money, documented as they happened. No predictions, no guaranteed returns: just the reasoning behind each call and what the outcome taught.",
  items: [
    {
      title: "Looking Back Pikachu Promos",
      subtitle: "Finding grading opportunity",
      description:
        "How product condition, card characteristics and PSA upside influenced the buying decision.",
    },
    {
      title: "Gold Star Mew",
      subtitle: "Knowing when not to sell",
      description:
        "Why an immediate gain didn't automatically mean it was time to exit.",
    },
    {
      title: "Legendary Collection Charizard",
      subtitle: "Trading modern into scarcity",
      description:
        "How smaller modern positions were consolidated into a scarcer vintage asset.",
    },
    {
      title: "Higher-End PSA 10 Strategy",
      subtitle: "Trading up",
      description:
        "How profits and smaller positions can be evaluated against higher-quality collectible opportunities.",
    },
  ],
  footnote: "Plus: the mistakes and bad decisions—not just the wins.",
} as const;

export const contents = {
  headline: "Everything You Need to Make the Decision Yourself.",
  items: [
    {
      title: "BUY OR PASS Method",
      description: "The full eight-part evaluation framework.",
    },
    {
      title: "BUY OR PASS Worksheet",
      description: "Run cards you're considering through the decision process.",
    },
    {
      title: "Real Case Studies",
      description: "Real examples showing how the methodology is applied.",
    },
    {
      title: "Raw vs PSA Guide",
      description:
        "Understand how to think about buying raw, grading, PSA 9 and PSA 10 premiums.",
    },
    {
      title: "Research Guide",
      description: "Learn what data to research before buying.",
    },
    {
      title: "Hold / Sell / Trade Introduction",
      description:
        "Learn how the decision process continues after purchasing.",
    },
  ],
} as const;

export const audience = {
  headline: "Built for the Returning Collector.",
  paragraphs: [
    "Maybe Pokémon was part of your childhood. Then years later you discovered the hobby again. You bought a few cards. Started watching prices. Discovered PSA grading. And suddenly realized:",
    "You're not spending €20 anymore. You're making €500, €1,000 or €2,000 decisions.",
    "BUY OR PASS is for collectors who want to become more disciplined before putting serious money into cards.",
  ],
  bullets: [
    "Returning to Pokémon after years away",
    "Starting to buy graded cards",
    "Spending hundreds or thousands on individual cards",
    "Interested in collecting AND potential value growth",
    "Confused by PSA populations and grading premiums",
    "Tired of conflicting opinions online",
    "Want to understand how to evaluate opportunities independently",
  ],
} as const;

export const disclaimer = {
  headline: "No Predictions. No Guaranteed Returns. No “Next Moonbreon.”",
  paragraphs: [
    "BUY OR PASS isn't a list of cards guaranteed to increase in value. It isn't financial advice. It doesn't predict future Pokémon prices. Pokémon cards are speculative collectibles and prices can fall as well as rise.",
    "The goal is much simpler: Make more informed decisions before putting your money into a card.",
  ],
} as const;

export const finalCta = {
  headline: "The Next Card You Buy Should Have a Reason Behind It.",
  body: "Join the early-access list for BUY OR PASS and be notified when the first version launches.",
  priceLabel: "Expected Launch Price",
  priceValue: "€39",
  ctaLabel: "Get Early Access",
  microcopy: "No payment today. No spam. Just launch updates and early access.",
} as const;

export const form = {
  label: "Email address",
  placeholder: "Enter your email",
  successMessage:
    "You're on the list. We'll let you know when BUY OR PASS is ready.",
  invalidMessage: "Please enter a valid email address.",
  errorMessage: "Something went wrong. Please try again in a moment.",
} as const;
