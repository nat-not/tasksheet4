/* ============================================
   script.js — PrivacyLex Interactive Timeline
   ============================================ */

// ── NAV SCROLL EFFECT ──────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── SCROLL REVEAL (IntersectionObserver) ───────────────────
const milestones = document.querySelectorAll('.milestone');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

milestones.forEach(m => revealObserver.observe(m));

// Also reveal prediction cards
const predCards = document.querySelectorAll('.prediction-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
    }
  });
}, { threshold: 0.1 });

predCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  cardObserver.observe(card);
});

// ── FILTER SYSTEM ──────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    milestones.forEach(milestone => {
      const tags = milestone.dataset.tags || '';
      if (filter === 'all') {
        milestone.classList.remove('hidden');
        // Re-trigger scroll check
        if (!milestone.classList.contains('visible')) {
          milestone.style.opacity = '0';
        }
      } else if (tags.includes(filter)) {
        milestone.classList.remove('hidden');
      } else {
        milestone.classList.add('hidden');
      }
    });
  });
});

// ── MODAL DATA ─────────────────────────────────────────────
const modalData = {
  // 1890
  'm1-why': {
    icon: '💡',
    title: 'Why It Matters',
    body: 'Before this essay, there was no legal concept of privacy as we know it. Warren and Brandeis were responding to the newly invented handheld camera and sensationalist press — essentially the social media of their era. By articulating a "right to be let alone," they gave future lawmakers the vocabulary and philosophical basis for every data protection law that followed over the next 130 years.'
  },
  'm1-fact': {
    icon: '⭐',
    title: 'Fun Fact',
    body: 'The essay was reportedly inspired by Warren\'s frustration with newspaper gossip columns reporting on his family\'s social gatherings. He asked his law partner Louis Brandeis (who later became a U.S. Supreme Court Justice) to help him write a legal argument. What began as a personal grievance became one of the most cited law review articles in American legal history!'
  },
  'm1-real': {
    icon: '📰',
    title: 'Real-World Example',
    body: 'In 1902, the New York Court of Appeals ruled in Roberson v. Rochester Folding Box Co. — a woman discovered her face had been used on flour advertisements without consent. Though the court initially ruled against her, the public outrage led New York to pass the first U.S. privacy statute in 1903, directly citing the Warren-Brandeis framework.'
  },

  // 1948
  'm2-why': {
    icon: '💡',
    title: 'Why It Matters',
    body: 'By embedding privacy in the UDHR, the international community signaled that privacy isn\'t just a legal nicety — it\'s a prerequisite for human dignity. This elevated privacy to the same moral plane as freedom of speech and the right to life. The UDHR became the mother document for the International Covenant on Civil and Political Rights (ICCPR), the European Convention on Human Rights, and ultimately, every national privacy constitution.'
  },
  'm2-fact': {
    icon: '⭐',
    title: 'Fun Fact',
    body: 'The UDHR was adopted by 48 nations with zero votes against — but 8 abstentions, including the Soviet bloc countries and Saudi Arabia. Eleanor Roosevelt, who chaired the drafting committee, called it "the international Magna Carta of all humanity." Today, no country has formally withdrawn from it, making it one of the most universally accepted documents in human history.'
  },
  'm2-real': {
    icon: '📰',
    title: 'Real-World Example',
    body: 'In 2013, Edward Snowden cited Article 12 of the UDHR when defending his decision to leak NSA surveillance programs. The UN\'s own Special Rapporteur on Privacy was created in 2015 specifically to investigate state surveillance that violates UDHR Article 12 — showing how a 1948 document remains a living enforcement tool.'
  },

  // 1974
  'm3-why': {
    icon: '💡',
    title: 'Why It Matters',
    body: 'The U.S. Privacy Act was the first law to require a government to be accountable for how it uses citizen data. It established four key rights: the right to know what data the government holds, the right to see it, the right to correct it, and the right to sue if the government misuses it. This government-accountability model became the template for citizen data rights everywhere.'
  },
  'm3-fact': {
    icon: '⭐',
    title: 'Fun Fact',
    body: 'The Privacy Act was passed in the same year as the Freedom of Information Act amendments — and the same year Nixon resigned. Watergate revealed that the government had been secretly surveilling, harassing, and building files on political opponents and ordinary citizens. Congress was so alarmed they passed these landmark transparency laws within months of each other as a direct result.'
  },
  'm3-real': {
    icon: '📰',
    title: 'Real-World Example',
    body: 'Under the Privacy Act, a U.S. veteran named James Doe was able to request and obtain his military service records — including a secret file that had wrongly classified him as a security risk. He used that file to clear his name, obtain back pay, and restore his security clearance. This type of individual empowerment was unprecedented before 1974.'
  },

  // 1995
  'm4-why': {
    icon: '💡',
    title: 'Why It Matters',
    body: 'The 1995 Directive was the first major law to recognize that the internet and digital systems created a fundamentally different threat to privacy than paper records. It introduced "data minimization" — the radical idea that companies should only collect what they actually need. This principle is now embedded in virtually every modern data protection law on Earth, including the Philippines\' own RA 10173.'
  },
  'm4-fact': {
    icon: '⭐',
    title: 'Fun Fact',
    body: 'The Directive nearly derailed early internet commerce. In 1998, the U.S. and EU almost went to a full digital trade war because American companies were not compliant. This led to the "Safe Harbor" agreement — a workaround that let companies self-certify compliance. Safe Harbor was later struck down by the EU\'s top court in 2015 in the landmark Schrems I ruling, triggered by Edward Snowden\'s revelations.'
  },
  'm4-real': {
    icon: '📰',
    title: 'Real-World Example',
    body: 'Microsoft\'s 1995 Windows 95 launch collected user information without explicit consent — something the EU Directive would have prohibited. Within 3 years of the Directive, major tech companies had to create separate "EU versions" of their services with enhanced privacy defaults. This bifurcation of internet services between EU and non-EU standards became the precursor to what we now call the "Brussels Effect."'
  },

  // 2012 RA 10173
  'm5-why': {
    icon: '💡',
    title: 'Why It Matters',
    body: 'The Data Privacy Act of 2012 (RA 10173) was a watershed moment for Filipino citizens — it was the first time the law explicitly recognized that every Filipino has a right to informational privacy. It gave Filipinos the right to be told when their data is collected, why it\'s collected, the right to object, correct, and erase it. For a country with millions of citizens whose data is collected by government agencies, banks, and telcos, this was transformational.'
  },
  'm5-fact': {
    icon: '⭐',
    title: 'Fun Fact',
    body: 'The Philippines was actually ahead of many ASEAN neighbors — the DPA was passed before Thailand, Indonesia, and Vietnam had their own comprehensive data protection laws. However, the NPC itself wasn\'t fully operational until 2016, meaning there was a 4-year gap between the law\'s passage and its actual enforcement — a common challenge in developing data protection regimes.'
  },
  'm5-real': {
    icon: '📰',
    title: 'Real-World Example',
    body: 'In 2019, the NPC fined a major Philippine bank for a data breach that exposed the personal information of thousands of customers due to inadequate security measures. This was one of the first major enforcement actions under RA 10173, signaling that the NPC had teeth. The case established that banks must implement strict data governance and that negligence carries real legal liability.'
  },

  // 2012 RA 10175
  'm6-why': {
    icon: '💡',
    title: 'Why It Matters',
    body: 'The Cybercrime Prevention Act criminalized online offenses that had no clear legal remedy before — from hacking to online identity theft. While controversial for its cyberlibel provisions, it also provided crucial protection against cybercrimes that directly threaten personal data and privacy. It works in tandem with RA 10173, providing the criminal law complement to the civil and administrative protections of the DPA.'
  },
  'm6-fact': {
    icon: '⭐',
    title: 'Fun Fact',
    body: 'The online libel provisions of RA 10175 triggered one of the first major digital rights debates in Philippine history. The Supreme Court temporarily restrained the law in 2012 after massive online protests, including a "Black Friday" campaign where thousands of websites went dark. The Supreme Court ultimately upheld most of the law in 2014 but struck down the "take-down clause" as unconstitutional.'
  },
  'm6-real': {
    icon: '📰',
    title: 'Real-World Example',
    body: 'In 2020, journalist Maria Ressa of Rappler was convicted of cyberlibel under RA 10175 — a case that drew international attention and condemnation from press freedom groups. The case highlighted the tension between cybercrime law and freedom of expression, and the case went through multiple appeals. Ressa later won the Nobel Peace Prize in 2021, partly for her legal battle against the use of cybercrime laws against the press.'
  },

  // 2016 GDPR
  'm7-why': {
    icon: '💡',
    title: 'Why It Matters',
    body: 'The GDPR is arguably the most consequential privacy law ever enacted. Its extraterritorial reach means if you handle data of any EU citizen — from Manila, Manila, or Manhattan — you must comply. It fundamentally shifted power from corporations back to individuals, and its enforcement fines (GDPR has issued over €4 billion in fines as of 2024) proved that privacy violations have real financial consequences. The GDPR inspired dozens of new privacy laws globally, including updates to the Philippines\' DPA framework.'
  },
  'm7-fact': {
    icon: '⭐',
    title: 'Fun Fact',
    body: 'On the very first day GDPR came into effect (May 25, 2018), privacy activist Max Schrems filed complaints against Facebook, Instagram, WhatsApp, and Google — claiming forced consent violated GDPR. Google was fined €50 million by French regulators just 8 months later. Meta has since been fined over €1 billion in multiple GDPR enforcement actions — making data privacy one of the most expensive regulatory compliance areas in tech history.'
  },
  'm7-real': {
    icon: '📰',
    title: 'Real-World Example',
    body: 'In 2021, Amazon was fined a record €746 million (about $886 million USD) by Luxembourg\'s data protection authority for advertising targeting practices that violated GDPR consent requirements. This single fine exceeded the entire GDP of some small nations — a clear signal that the era of "privacy as a cost of doing business" was over.'
  },

  // 2016 IRR
  'm8-why': {
    icon: '💡',
    title: 'Why It Matters',
    body: 'Passing a law is only the beginning — the IRR turned RA 10173\'s principles into operational reality. By requiring every organization handling personal data to register, appoint a DPO, and conduct Privacy Impact Assessments (PIAs), the IRR created a culture of privacy accountability in Philippine organizations for the first time. The mandatory 72-hour breach notification requirement was particularly significant, as it aligned the Philippines with global best practices.'
  },
  'm8-fact': {
    icon: '⭐',
    title: 'Fun Fact',
    body: 'The NPC\'s registration requirement created a massive compliance challenge: thousands of Philippine companies suddenly had to understand and implement data governance for the first time. The NPC responded by creating the "Privacy Sweep" — unannounced compliance checks on government agencies and private companies. Many agencies were found to be non-compliant on even basic requirements, revealing just how much work needed to be done.'
  },
  'm8-real': {
    icon: '📰',
    title: 'Real-World Example',
    body: 'The Commission on Elections (COMELEC) suffered a massive breach in 2016 — 55 million Filipino voters\' biometric data was exposed on the web. The IRR\'s implementation directly following this breach was partly accelerated by this crisis. The COMELEC case became the flagship enforcement case that demonstrated exactly why breach notification requirements and security mandates were necessary.'
  },

  // 2018 Cambridge Analytica
  'm9-why': {
    icon: '💡',
    title: 'Why It Matters',
    body: 'Cambridge Analytica proved that personal data isn\'t just an abstract privacy concern — it\'s a tool of political power. The scandal showed that data harvested from social media could be weaponized to influence elections, potentially affecting democratic outcomes in multiple countries including the 2016 U.S. election and the Brexit referendum. It permanently changed public understanding of what Facebook and similar platforms do with user data.'
  },
  'm9-fact': {
    icon: '⭐',
    title: 'Fun Fact',
    body: 'Cambridge Analytica actually had operations in the Philippines! The NPC launched an investigation into whether the company had harvested Filipino users\' Facebook data for political targeting purposes during the 2016 Philippine presidential election. This was a major wake-up call that privacy violations are not abstract Western concerns but directly affect Filipino citizens and Philippine democracy.'
  },
  'm9-real': {
    icon: '📰',
    title: 'Real-World Example',
    body: 'After the scandal broke, Facebook\'s market cap dropped by about $100 billion in two days. More significantly, the U.S. Senate called Zuckerberg to testify — leading to the "Privacy, Technology, and the Senate" hearings that became a defining moment in tech regulation. The Federal Trade Commission ultimately fined Facebook $5 billion — the largest tech fine in U.S. history at that point — a direct result of the Cambridge Analytica investigation.'
  },

  // 2020 CCPA
  'm10-why': {
    icon: '💡',
    title: 'Why It Matters',
    body: 'The CCPA proved that meaningful data privacy legislation was achievable in the United States — historically resistant to comprehensive federal privacy laws due to industry lobbying. Because California is home to Google, Apple, Meta, and most major tech companies, a California law effectively becomes a national standard: most companies simply implement it for all U.S. users rather than maintaining separate systems. This "California Effect" mirrors the EU\'s "Brussels Effect."'
  },
  'm10-fact': {
    icon: '⭐',
    title: 'Fun Fact',
    body: 'The CCPA was passed in 2018 with remarkable speed — in just one week — because a ballot initiative that would have been even stricter was about to qualify for the California ballot. Tech companies preferred to negotiate a legislative version rather than risk a more aggressive ballot measure. The final law was drafted in just 7 days of negotiations, making it one of the fastest major privacy laws ever written.'
  },
  'm10-real': {
    icon: '📰',
    title: 'Real-World Example',
    body: 'Within months of CCPA implementation, Sephora was fined $1.2 million for selling customer data without disclosure — the first major CCPA enforcement action. More impactfully, all major websites serving California residents added "Do Not Sell My Personal Information" links — suddenly making the concept of data commerce visible to tens of millions of ordinary consumers for the first time.'
  },

  // 2022 NPC Circular
  'm11-why': {
    icon: '💡',
    title: 'Why It Matters',
    body: 'NPC Circular 2022-01 demonstrated that the Philippine data protection regime was maturing — moving beyond general principles to specific, enforceable operational requirements. By mandating detailed breach response procedures, the NPC pushed Philippine companies to invest in incident response capabilities, digital forensics, and crisis communication plans. This type of operational guidance is what separates mature from nascent data protection regimes.'
  },
  'm11-fact': {
    icon: '⭐',
    title: 'Fun Fact',
    body: 'The Philippines experiences among the highest rates of phishing and cybercrime incidents in Southeast Asia — making strong breach notification rules critically important. The NPC reported that in 2022 alone, it received over 1,000 breach notifications — a dramatic increase from just 47 in 2017. The circular was designed in part to improve the quality and speed of those notifications, as many early reports were incomplete or delayed by weeks.'
  },
  'm11-real': {
    icon: '📰',
    title: 'Real-World Example',
    body: 'When a major Philippine telecommunications company suffered a massive breach exposing millions of subscriber records in 2023, NPC Circular 2022-01\'s procedures were activated immediately. The company was required to notify affected individuals within 5 days, submit forensic reports, and implement remediation measures under NPC supervision. This rapid, structured response was markedly different from how similar breaches had been handled before the circular.'
  },

  // 2024 EU AI Act
  'm12-why': {
    icon: '💡',
    title: 'Why It Matters',
    body: 'The EU AI Act represents a fundamental expansion of what "privacy law" means. It\'s no longer enough to protect data at rest or in transit — the Act recognizes that AI systems can violate privacy through inference, prediction, and manipulation even without accessing traditional "personal data." By prohibiting AI-based biometric surveillance and social scoring, the EU has drawn a line between legitimate AI use and digital authoritarianism. The Philippines\' NPC has already signaled it is studying AI regulation.'
  },
  'm12-fact': {
    icon: '⭐',
    title: 'Fun Fact',
    body: 'The EU AI Act took four years to negotiate — and was almost completely rewritten in 2023 when ChatGPT\'s release made earlier drafts seem obsolete. The original draft barely mentioned "general purpose AI" or large language models. The final text had to be emergency-revised to include regulations on foundation models like GPT-4 and Gemini — a sign of how rapidly AI technology outpaced legal thinking. It became law in August 2024.'
  },
  'm12-real': {
    icon: '📰',
    title: 'Real-World Example',
    body: 'Shortly before the EU AI Act\'s passage, Clearview AI — a company that scraped billions of photos from social media to build a facial recognition database — was fined by regulators in France, Italy, Greece, and the UK. The AI Act would have classified Clearview\'s system as "high risk" and potentially banned it entirely in the EU. This case illustrated exactly the type of biometric surveillance the Act was designed to prevent.'
  }
};

// ── MODAL SYSTEM ────────────────────────────────────────────
const modalOverlay = document.getElementById('modalOverlay');
const modalIcon    = document.getElementById('modalIcon');
const modalTitle   = document.getElementById('modalTitle');
const modalBody    = document.getElementById('modalBody');
const modalClose   = document.getElementById('modalClose');

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.modal;
    const data = modalData[key];
    if (!data) return;

    modalIcon.textContent  = data.icon;
    modalTitle.textContent = data.title;
    modalBody.textContent  = data.body;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ── QUIZ SYSTEM ─────────────────────────────────────────────
const quizData = [
  {
    question: 'Which landmark 1890 essay first coined the legal concept of a "right to be let alone"?',
    options: [
      'The Privacy Manifesto by John Stuart Mill',
      '"The Right to Privacy" by Warren & Brandeis',
      'The Federalist Papers on Personal Liberty',
      'The Geneva Privacy Convention'
    ],
    answer: 1,
    explanation: 'Samuel Warren and Louis Brandeis published their Harvard Law Review essay in 1890, establishing privacy as a legal right and coining the phrase "right to be let alone."'
  },
  {
    question: 'What is the name of the Philippines\' primary data protection law enacted in 2012?',
    options: [
      'Republic Act 10175',
      'Republic Act 9995',
      'Republic Act 10173',
      'The Philippine Privacy Code'
    ],
    answer: 2,
    explanation: 'Republic Act 10173, or the Data Privacy Act of 2012, is the Philippines\' comprehensive data protection law that established the National Privacy Commission (NPC).'
  },
  {
    question: 'The 2018 Cambridge Analytica scandal involved the unauthorized harvesting of data from which social media platform?',
    options: [
      'Twitter / X',
      'Instagram',
      'Facebook',
      'LinkedIn'
    ],
    answer: 2,
    explanation: 'Cambridge Analytica harvested data from up to 87 million Facebook users without proper consent, using a third-party quiz app to access users\' profiles and their friends\' data.'
  },
  {
    question: 'The EU\'s General Data Protection Regulation (GDPR) introduced which key right that allows individuals to request deletion of their personal data?',
    options: [
      'Right to Data Ownership',
      'Right to be Forgotten',
      'Right to Digital Amnesty',
      'Right to Data Liquidation'
    ],
    answer: 1,
    explanation: 'The GDPR introduced the "Right to be Forgotten" (formally the Right to Erasure), allowing individuals to request that organizations delete their personal data under certain circumstances.'
  },
  {
    question: 'Which 2024 legislation became the world\'s first comprehensive law regulating artificial intelligence, with direct implications for privacy?',
    options: [
      'The OECD AI Principles',
      'The U.S. Algorithmic Accountability Act',
      'The EU AI Act',
      'The Global AI Safety Framework'
    ],
    answer: 2,
    explanation: 'The EU AI Act, which became law in 2024, is the world\'s first comprehensive AI regulation. It prohibits AI-based biometric mass surveillance and social scoring, directly intersecting with personal privacy rights.'
  }
];

let currentQ = 0;
let score = 0;
let answered = false;

const quizContainer     = document.getElementById('quizContainer');
const quizResult        = document.getElementById('quizResult');
const quizQuestion      = document.getElementById('quizQuestion');
const quizOptions       = document.getElementById('quizOptions');
const quizFeedback      = document.getElementById('quizFeedback');
const quizNextBtn       = document.getElementById('quizNextBtn');
const quizCounter       = document.getElementById('quizCounter');
const quizProgressBar   = document.getElementById('quizProgressBar');
const quizScore         = document.getElementById('quizScore');
const quizMsg           = document.getElementById('quizMsg');
const quizRestart       = document.getElementById('quizRestart');

function loadQuestion() {
  answered = false;
  quizFeedback.textContent = '';
  quizNextBtn.style.display = 'none';

  const q = quizData[currentQ];
  quizCounter.textContent = `Question ${currentQ + 1} of ${quizData.length}`;
  quizProgressBar.style.width = `${((currentQ) / quizData.length) * 100}%`;
  quizQuestion.textContent = q.question;

  quizOptions.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(i, btn));
    quizOptions.appendChild(btn);
  });
}

function selectAnswer(index, clickedBtn) {
  if (answered) return;
  answered = true;

  const q = quizData[currentQ];
  const allOptions = quizOptions.querySelectorAll('.quiz-option');

  allOptions.forEach(btn => btn.disabled = true);

  if (index === q.answer) {
    score++;
    clickedBtn.classList.add('correct');
    quizFeedback.style.color = '#4ade80';
    quizFeedback.textContent = '✓ Correct! ' + q.explanation;
  } else {
    clickedBtn.classList.add('wrong');
    allOptions[q.answer].classList.add('correct');
    quizFeedback.style.color = '#f87171';
    quizFeedback.textContent = '✗ Incorrect. ' + q.explanation;
  }

  quizNextBtn.style.display = currentQ < quizData.length - 1 ? 'inline-block' : 'none';

  if (currentQ === quizData.length - 1) {
    setTimeout(showResult, 1200);
  }
}

quizNextBtn.addEventListener('click', () => {
  currentQ++;
  loadQuestion();
});

function showResult() {
  quizContainer.style.display = 'none';
  quizResult.style.display = 'block';

  quizProgressBar.style.width = '100%';

  quizScore.textContent = `${score} / ${quizData.length}`;

  const pct = score / quizData.length;
  let msg;
  if (pct === 1)        msg = '🏆 Perfect score! You\'re a privacy law expert. Your knowledge of data protection history is exceptional.';
  else if (pct >= 0.8)  msg = '🎉 Excellent! You have a strong grasp of privacy law history. Just a couple of details to brush up on.';
  else if (pct >= 0.6)  msg = '👍 Good effort! You understand the key milestones but reviewing the timeline will strengthen your knowledge.';
  else if (pct >= 0.4)  msg = '📚 Keep studying! Privacy law has a rich history worth knowing — explore the timeline above for a deep dive.';
  else                  msg = '🔍 Time to explore! The timeline above has everything you need. Try again after reviewing the milestones.';

  quizMsg.textContent = msg;
}

quizRestart.addEventListener('click', () => {
  currentQ = 0;
  score = 0;
  answered = false;
  quizResult.style.display = 'none';
  quizContainer.style.display = 'block';
  quizProgressBar.style.width = '0%';
  loadQuestion();
});

// Init quiz
loadQuestion();

// ── SMOOTH ANCHOR SCROLLING ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 130;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
