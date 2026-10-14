/* JOURNEYS page content: the end-to-end journey for each version of the selector,
   from first contact to an open account.

   Each stage:
     name      a short name for the stage
     where     the touchpoint
     firm      what the firm does
     bank      what the bank does, often behind the scenes
     selector  true when the stage happens in the selector itself (highlighted)
     handoff   a channel key when the journey moves into that channel's journey at this stage */
export const JOURNEYS = {
  head: {
    eyebrow: "Journeys",
    title: "How each version fits into opening an account",
    keyMessage: "The three versions share one set of questions and rules, but start in different places, know different things and end in different next steps."
  },

  /* Rows comparing the three journeys: [topic, public, online, manager]. */
  compare: [
    ["Who it's for", "A firm new to the bank", "An existing business customer", "Bank staff, with or for a client"],
    ["Sign-in", "None", "Online banking", "Staff systems"],
    ["Filled in for them", "Nothing", "Firm, regulator, register check, identity", "Firm, regulator, register check, bank risk rating"],
    ["Questions", "8, one at a time", "7, one at a time", "8, all on one screen"],
    ["Register check", "When they apply", "Before any questions", "Before the conversation"],
    ["While answering", "The accounts still possible, narrowing", "The accounts still possible, narrowing", "The outcomes still possible, and what's left to ask"],
    ["Result", "Plain English, labelled a suggestion", "Plain English, labelled a suggestion", "Bank terms, the full structure and a rationale for the file"],
    ["If no account can be offered", "Points to escrow or third-party managed accounts", "Asks them to talk to their relationship team", "Refer to financial crime, with the reason"],
    ["Next step", "Apply, with answers carried over", "Open the account from a pre-filled application", "Send to the client to confirm in online banking"],
    ["What's kept", "Nothing, unless they apply", "Answers and register result, with the application", "Answers, register result and rationale, on the client record"]
  ],

  public: {
    summary: "A firm that doesn't bank with us yet finds the selector, gets a suggested account without signing in, and applies.",
    stages: [
      { name: "Discover", where: "Search, regulator or scheme guidance, software partner sites",
        firm: "Looks for a client account, often prompted by a new scheme membership or a bank that's leaving the market.",
        bank: "Explains who client accounts are for, and links to the selector." },
      { name: "Answer", where: "Selector", selector: true,
        firm: "Answers eight questions, one at a time. The sentence about the firm builds as they go.",
        bank: "Shows which accounts could still suit them. Nothing is saved or sent." },
      { name: "See the suggestion", where: "Selector", selector: true,
        firm: "Reads the suggested account, why, and what would change it. Saves it as a PDF or asks to talk.",
        bank: "Labels it a suggestion, not advice, and says what they'll need to apply." },
      { name: "Apply", where: "Online application",
        firm: "Starts an application with their answers carried over, and adds their firm and registration details.",
        bank: "Checks the regulator's register, Companies House, and the identity and ownership of the firm." },
      { name: "Confirm", where: "Application, or a call",
        firm: "Hears back with the confirmed account, or a call if something needs talking through.",
        bank: "Makes the eligibility decision and records the reasons and register result as evidence." },
      { name: "Open", where: "Email and e-signature",
        firm: "E-signs the acknowledgement letter, gets account details and reference numbers, and connects their software.",
        bank: "Holds the countersigned letter before any money arrives, and keeps monitoring the register." }
    ]
  },

  online: {
    summary: "An existing customer starts in online banking. The bank fills in what it knows, so they answer less and open the account from a pre-filled application.",
    stages: [
      { name: "Start", where: "Online banking",
        firm: "Chooses 'Add a client money account', or follows a link from their relationship team.",
        bank: "Checks the firm's register entry straight away. If it's restricted, the journey stops here and the relationship team calls." },
      { name: "Check what we know", where: "Selector", selector: true,
        firm: "Checks the firm, regulator and register details we already hold, and updates their profile if anything's wrong.",
        bank: "Fills in the regulator from the register, so it isn't asked." },
      { name: "Answer", where: "Selector", selector: true,
        firm: "Answers the seven questions the bank can't already know.",
        bank: "Shows which accounts could still suit them." },
      { name: "See the suggestion", where: "Selector", selector: true,
        firm: "Reads the suggested account and chooses 'Open this account'.",
        bank: "Labels it a suggestion, not advice." },
      { name: "Confirm the application", where: "Online banking",
        firm: "Checks the pre-filled application. No identity documents to send again.",
        bank: "Reuses due diligence already on file, refreshing it if it's out of date, and assesses the pooled account's risk where one is suggested." },
      { name: "Sign and open", where: "Online banking",
        firm: "E-signs the acknowledgement letter. The account appears alongside their others.",
        bank: "Countersigns the letter before any money arrives, creates reference numbers, and keeps monitoring the register." }
    ]
  },

  manager: {
    summary: "A relationship manager works through the questions with a client, records why the structure was chosen, and sends it to the client to confirm.",
    stages: [
      { name: "Prepare", where: "CRM and selector", selector: true,
        firm: "Usually nothing yet. The conversation may follow a call or a meeting request.",
        bank: "Opens the client and sees the register result, the bank's risk rating and existing products." },
      { name: "Talk it through", where: "Selector, in a call or meeting", selector: true,
        firm: "Answers the questions in conversation.",
        bank: "Sees every question on one screen, with those still to ask highlighted, and tries alternatives live." },
      { name: "Recommend", where: "Selector", selector: true,
        firm: "Hears the recommended structure and why.",
        bank: "Sees the full structure and any points to discuss, such as the client's own AML rating differing from the bank's. Copies the rationale to the file." },
      { name: "Send to confirm", where: "Selector to online banking", selector: true, handoff: "online",
        firm: "Gets a request in online banking to confirm the answers.",
        bank: "Sends the answers to the client. If the register blocks it, refers the firm to financial crime instead." },
      { name: "Client confirms", where: "Online banking",
        firm: "Confirms the pre-filled application and e-signs the acknowledgement letter.",
        bank: "Picks up the online banking journey from 'Confirm the application'." },
      { name: "Open and record", where: "Core banking and CRM",
        firm: "Gets account details and reference numbers.",
        bank: "Stores the rationale and register evidence with the account, and sets review dates." }
    ]
  }
};
