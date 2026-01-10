---
layout:     /layouts/post
title:      "Musings on AI"
subtitle:   "Trying to make sense of my thoughts on AI"
date: 		2026-01-10T20:31:02+00:00
categories: ai, llms, ethics, climate, security
---

For the past few months, I’ve been trying to write a blog post about my thoughts on AI. I’ve written three drafts of this and trashed each one. It’s part of the reason I haven’t published anything since early last year. The issue I kept running into is that there are so many conversations about AI that each time I wrote about it, the scope expanded so far that it became incredibly uninteresting to write and likely twice as boring to read.

So last weekend, while watching the Bengals season finale against the Browns, I decided to brute-force a stream of consciousness approach (while I’ll never be able to prove it, the first paragraph of that piece included a prediction for the end of that Bengals game that came true almost word-for-word). I wrote out every thought I had about AI so I could collapse that into a single subject that I actually wanted to talk about.

I ended up with a little over 3,000 words that touched on climate change, education, programming, non-consensual pornography, terminology, online arguments, marketing, comedy, copyright, the economy, security, intelligence, journalism, Luddites and my love for technology, medicine and cancer research, ethics, monopolies, and how I’m such a bad writer. Over the last week, I’ve tried to pare that down to the key points I wanted to make, and I struggled to do so until reading an article from a tech journalist and subsequently “hacking” (using the term *very* loosely here) that journalist. After that, I managed to pull everything into a much more focused post.

## Terminology
Wanted to get this out of the way early, when I refer to 'AI', I will primarily be using this to describe LLMs and derivative technology (and if there's an alternative usage I'll try clarify that at that time). While I think it's probably valuable to discuss other forms of AI and algorithmic content early drafts around that tended to get extremely out of scope.

## Context
Earlier this week, I read a post from a journalist discussing the use of a coding agent to generate a website, and presenting it as evidence that this marked the beginning of the end for programmers, a concept that’s been brought up time and time again. I had a hunch that this website had the exact same problem LLM-generated scripts have had since ChatGPT launched several years ago. So I went to their website, found an interesting widget, right-clicked and viewed the source, did a Ctrl+F for API_KEY, and found their Last.fm API key embedded in the site.

I did my due diligence, notified them that they had leaked an API key, and let them know that they should reset the key in their account to prevent abuse. A few hours later, they thanked me and let me know that they used Claude to fix the mistake (I verified this, and it appeared to have been fixed). From this exchange, I learned a few things about my priorities around AI. To be clear, I consider this journalist to be an incredibly intelligent person, and a far better writer than I am, even though I expect this will read like I am ragging on them at times.

## Ethics
The first thing I recognized was that I don’t have any particularly deep feelings about the ethics of other people using AI, and that’s something I first realized early on in the AI hype cycle. In my head, it gets grouped into “things I won’t do, but you can if you want.” There are plenty of other things that fall into that category:
- I use Linux instead of Windows
- I use open social media platforms instead of Facebook, Twitter, Instagram, TikTok, Reddit, Substack, etc
- I use open messaging platforms instead of WhatsApp, Messenger, and GroupMe
- I use Android over Apple (though it’s gotten to a point where I consider Android to be just as unethical as Apple, and I’m not entirely sure if I’m ready or capable of moving to a more open mobile platform)
- I use DuckDuckGo over Google
- I use Firefox over Chrome (this one also feels like it’s beginning to cross the line into “I need to start using an alternative to Firefox,” and that change seems more likely to happen sometime this year)
- My thermostat is set very low in the winter, and I take short showers.

I’m not going to try to force anyone to do any of the above, even if they probably should. It’s not like I’m perfect (though if you ask me in person, I’ll probably claim otherwise). I believe becoming a vegetarian is far more impactful on the environment than avoiding ChatGPT, but I haven’t decided to make that leap yet.

The point is, the fact that this journalist was using AI wasn’t something I was upset about.

People who depend on AI often agree with me on many of those other points. Some AI skeptics might claim that by using AI, those people suddenly become climate-denying monopolists, and that’s just not something I see as true. My ethics-based concerns lie mainly with the AI companies themselves.
 
 ## Security and The AI Narrative
 (I tried to come up with a less inflamatory sounding label than "The AI Narrative" but failed, so please do not think of it as a more intense description than it is meant to be)
 
 For those not in the tech space, an API Key (or Application Programming Interface) is basically a password that lets you interface with some piece of software. In Last.FM's case, the API key lets me see this journalist's music listening histor or something as generic as getting the top songs across the Last.FM platform. Which probably isn't a huge deal, the original widget on their site was just showing their most recent listened to song so it's not like I have significantly more data than I did before I got access to the key. The worst thing I can probably do is start using this key and force his account to hit rate limits (a rate limit is basically when an account has used the API too often in a short amount of time, so the software stops responding to requests from that account). But, imagine for a second that instead of a Last.FM API key, I had obtained a key used to pull in data from their social media account, then suddenly I could potentially write posts on their behalf (you can see how that could be bad, the puns I post could destroy their reputation irreparably). Anyways, to avoid this developers will typically hide the API key instead of publishing it directly to their website.
 
 It's not the leak that frustrates me, however. Sure, it exposes a larger problem with LLMs that has been around since coding with LLMs began, but the reason LLMs do this is because they are trained on code, written by humans, which leaked API keys as well. I have personally contacted several people on Github when I've noticed that their project has published an API key, this is not a new proble and any reasonably well-trained developer who used Claude to generate code would probably catch that mistake pretty quickly. What worries me is what happened after. In that initial email I had told them what they needed to do to that API key to rectify this leak (remove it from their account). Days later, however, that key still gives me access to their account. While I won't ever touch that key again, their website was up for days before I looked at it so who knows who else has access? This is something that an actual developer would have immediately dealt with, but I expect this will never get fixed. 
 
 And this is where we get to the narrative that’s repeated year after year: that AI enables you to do things that would otherwise take months (*or years*) of training. That it can already replace software developers, lawyers, doctors, therapists, authors, teachers, or mathematicians. I keep reading articles that say this is the year AI replaces X, Y, or Z. I read those same articles last year, and the year before that.

I’m not under the illusion that AI will never be good enough to replace people in any industry. I just wish the entire AI hype cycle would take a step back and pause before telling people to unconditionally trust the output of these LLMs, especially when those same people aren’t trained to recognize when something is wrong with it. Maybe this concern extends to the internet more broadly and not just AI output, but for most of my life I’ve consistently heard things like: “don’t trust everything you read on Twitter,” “don’t copy-paste random Stack Overflow code,” or “don’t use Wikipedia as a source". And yet AI companies and pro-AI writers seem determined to make the opposite point-that this is the year you’ll be able to vibe-code your own website and never have to think about the code at all.

## Conclusion
Look, maybe I’m wrong. Nobody can predict the future. Maybe 2026 is the year we finally replace 20 million software developers with 5 million skilled prompters, but I just don’t see it happening. And I worry that we’re moving closer and closer to a security nightmare as AI-generated code becomes easier to make by people less likely to understand it. 

## Citations-ish
I figured I'd provide a list of everything I've read about AI over the course of the last few years to give you an idea of the headspace I'm in. I went through my browser(s) history (as far as I could) and various groupchats I'm in and compiled as many resources as I could though I'm sure this isn't all of it:

- [https://www.wired.com/story/grok-is-generating-sexual-content-far-more-graphic-than-whats-on-x/](https://www.wired.com/story/grok-is-generating-sexual-content-far-more-graphic-than-whats-on-x/)
- [https://yaleclimateconnections.org/2025/09/what-you-need-to-know-about-ai-and-climate-change/](https://yaleclimateconnections.org/2025/09/what-you-need-to-know-about-ai-and-climate-change/)
- [https://www.boston.com/news/education/2025/09/17/mcas-essays-scored-incorrectly-ai-mishap/](https://www.boston.com/news/education/2025/09/17/mcas-essays-scored-incorrectly-ai-mishap/)
- [https://andymasley.substack.com/p/the-ai-water-issue-is-fake](https://andymasley.substack.com/p/the-ai-water-issue-is-fake)
- [https://www.wheresyoured.at/costs/](https://www.wheresyoured.at/costs/)
- [https://mathstodon.xyz/@tao/114881418225852441](https://mathstodon.xyz/@tao/114881418225852441)
- [https://mathstodon.xyz/@tao/115316787727719049](https://mathstodon.xyz/@tao/115316787727719049)
- [https://mikelovesrobots.substack.com/p/wheres-the-shovelware-why-ai-coding](https://mikelovesrobots.substack.com/p/wheres-the-shovelware-why-ai-coding)
- [https://www.gamingonlinux.com/2025/10/fedora-linux-project-agrees-to-allow-ai-assisted-contributions-with-a-new-policy/](https://www.gamingonlinux.com/2025/10/fedora-linux-project-agrees-to-allow-ai-assisted-contributions-with-a-new-policy/)
- [https://www.anildash.com/2025/10/17/the-majority-ai-view/](https://www.anildash.com/2025/10/17/the-majority-ai-view/)
- [https://www.normaltech.ai/p/ai-as-normal-technology](https://www.normaltech.ai/p/ai-as-normal-technology)
- [https://brooklyn.bearblog.dev/ai-futures/](https://brooklyn.bearblog.dev/ai-futures/)
- [https://samsaffron.com/archive/2025/10/27/your-vibe-coded-slop-pr-is-not-welcome](https://samsaffron.com/archive/2025/10/27/your-vibe-coded-slop-pr-is-not-welcome)
- [https://github.com/cloud-hypervisor/cloud-hypervisor/blob/main/CONTRIBUTING.md](https://github.com/cloud-hypervisor/cloud-hypervisor/blob/main/CONTRIBUTING.md)
- [https://gist.github.com/bagder/07f7581f6e3d78ef37dfbfc81fd1d1cd](https://gist.github.com/bagder/07f7581f6e3d78ef37dfbfc81fd1d1cd)
- [https://www.nytimes.com/2025/10/28/style/48-hours-without-ai.html](https://www.nytimes.com/2025/10/28/style/48-hours-without-ai.html)
- [https://colah.github.io/notes/bio-analogies/](https://colah.github.io/notes/bio-analogies/)
- [https://garymarcus.substack.com/p/too-big-to-fail](https://garymarcus.substack.com/p/too-big-to-fail)
- [https://seangoedecke.com/ai-enterprise-projects-fail/](https://seangoedecke.com/ai-enterprise-projects-fail/)
- [https://venturebeat.com/ai/sakana-ais-cto-says-hes-absolutely-sick-of-transformers-the-tech-that-powers](https://venturebeat.com/ai/sakana-ais-cto-says-hes-absolutely-sick-of-transformers-the-tech-that-powers)
- [https://joshbrake.substack.com/p/llms-are-not-intelligent](https://joshbrake.substack.com/p/llms-are-not-intelligent)
- [https://arxiv.org/abs/1911.01547](https://arxiv.org/abs/1911.01547)
- [https://arxiv.org/abs/2402.01781](https://arxiv.org/abs/2402.01781)
- [https://xcancel.com/fchollet/status/1755250582334709970](https://xcancel.com/fchollet/status/1755250582334709970)
- [https://arxiv.org/abs/2503.04490v1](https://arxiv.org/abs/2503.04490v1)
- [https://arxiv.org/abs/2507.07935](https://arxiv.org/abs/2507.07935)
- [https://blog.mathieuacher.com/GPT5-IllegalChessBench/](https://blog.mathieuacher.com/GPT5-IllegalChessBench/)
- [https://www.nature.com/articles/s41746-024-01127-3](https://www.nature.com/articles/s41746-024-01127-3)
- [https://www.lesswrong.com/posts/zAcYRJP9CZcYXTs7o/what-was-so-great-about-move-37](https://www.lesswrong.com/posts/zAcYRJP9CZcYXTs7o/what-was-so-great-about-move-37)
- [https://www.pnas.org/doi/10.1073/pnas.2406675122](https://www.pnas.org/doi/10.1073/pnas.2406675122)
- [https://kczat.medium.com/limits-to-super-intelligence-a0c7b5ff22e6](https://kczat.medium.com/limits-to-super-intelligence-a0c7b5ff22e6)
- [https://arxiv.org/abs/2411.05943v2](https://arxiv.org/abs/2411.05943v2)
- [https://thezvi.substack.com/p/openai-moves-to-complete-potentially?r=67wny](https://thezvi.substack.com/p/openai-moves-to-complete-potentially?r=67wny)
- [https://www.lesswrong.com/posts/2pkNCvBtK6G6FKoNn](https://www.lesswrong.com/posts/2pkNCvBtK6G6FKoNn)
- [https://justismills.substack.com/p/ai-self-portraits-arent-accurate](https://justismills.substack.com/p/ai-self-portraits-arent-accurate)
- [https://whenaiseemsconscious.org/](https://whenaiseemsconscious.org/)
- [https://justismills.substack.com/p/ai-cant-write-good-fiction](https://justismills.substack.com/p/ai-cant-write-good-fiction)
- [https://ethanmarcotte.com/wrote/the-line-and-the-stream/](https://ethanmarcotte.com/wrote/the-line-and-the-stream/)
- [https://ethanmarcotte.com/wrote/against-stocking-frames/](https://ethanmarcotte.com/wrote/against-stocking-frames/)
- [https://www.forbes.com/sites/dereknewton/2025/09/27/national-test-scores-are-down-is-generative-ai-partly-to-blame/](https://www.forbes.com/sites/dereknewton/2025/09/27/national-test-scores-are-down-is-generative-ai-partly-to-blame/)
- [https://jstrainor.substack.com/p/are-students-using-chatgpt-or-is](https://jstrainor.substack.com/p/are-students-using-chatgpt-or-is)
- [https://www.currentaffairs.org/news/ai-is-destroying-the-university-and-learning-itself](https://www.currentaffairs.org/news/ai-is-destroying-the-university-and-learning-itself)
- [https://boston.conman.org/2025/12/02.1](https://boston.conman.org/2025/12/02.1)
- [https://arstechnica.com/ai/2025/12/microsoft-slashes-ai-sales-growth-targets-as-customers-resist-unproven-agents/](https://arstechnica.com/ai/2025/12/microsoft-slashes-ai-sales-growth-targets-as-customers-resist-unproven-agents/)
- [https://embracethered.com/blog/posts/2025/the-normalization-of-deviance-in-ai/](https://embracethered.com/blog/posts/2025/the-normalization-of-deviance-in-ai/)
- [https://www.anthropic.com/research/small-samples-poison](https://www.anthropic.com/research/small-samples-poison)
- [https://mathstodon.xyz/@tao/115855840223258103](https://mathstodon.xyz/@tao/115855840223258103)
- [https://github.com/teorth/erdosproblems/wiki/AI-contributions-to-Erd%C5%91s-problems](https://github.com/teorth/erdosproblems/wiki/AI-contributions-to-Erd%C5%91s-problems)
- [https://blog.samaltman.com/reflections](https://blog.samaltman.com/reflections)
- [https://blog.samaltman.com/the-gentle-singularity](https://blog.samaltman.com/the-gentle-singularity)
- [https://www.theverge.com/ai-artificial-intelligence/795171/openai-devday-sam-altman-sora-launch-copyright](https://www.theverge.com/ai-artificial-intelligence/795171/openai-devday-sam-altman-sora-launch-copyright)
- [https://www.cnbc.com/2025/08/19/sam-altman-on-gpt-6-people-want-memory.html](https://www.cnbc.com/2025/08/19/sam-altman-on-gpt-6-people-want-memory.html)
- [https://blog.samaltman.com/abundant-intelligence](https://blog.samaltman.com/abundant-intelligence)
- [https://www.cbsnews.com/news/judge-approves-1-5-billion-dollar-settlement-anthropic-pirated-books/](https://www.cbsnews.com/news/judge-approves-1-5-billion-dollar-settlement-anthropic-pirated-books/)
- [https://www.nytimes.com/2025/09/29/opinion/anthropic-chatbot-lawsuit-books.html?unlocked_article_code=1.pk8.fTTk.Nk5G8tp1CxTs](https://www.nytimes.com/2025/09/29/opinion/anthropic-chatbot-lawsuit-books.html?unlocked_article_code=1.pk8.fTTk.Nk5G8tp1CxTs)
- [https://www.theverge.com/podcast/784865/ai-safety-military-defense-openai-anthropic-ethics](https://www.theverge.com/podcast/784865/ai-safety-military-defense-openai-anthropic-ethics)
- [https://www.reuters.com/business/openai-anthropic-eye-investor-funds-settle-ai-lawsuits-ft-reports-2025-10-08/](https://www.reuters.com/business/openai-anthropic-eye-investor-funds-settle-ai-lawsuits-ft-reports-2025-10-08/)
- [https://www.wired.com/story/anthropic-settlement-lawsuit-copyright/](https://www.wired.com/story/anthropic-settlement-lawsuit-copyright/)
- [https://werd.io/this-is-how-much-anthropic-and-cursor-spend-on-amazon-web-services/](https://werd.io/this-is-how-much-anthropic-and-cursor-spend-on-amazon-web-services/)
- [https://www.theverge.com/podcast/838023/anthropic-societal-impact-trump-woke-ai-interview](https://www.theverge.com/podcast/838023/anthropic-societal-impact-trump-woke-ai-interview)
- [https://www.anthropic.com/research/introspection](https://www.anthropic.com/research/introspection)
- [https://openai.com/index/why-language-models-hallucinate/](https://openai.com/index/why-language-models-hallucinate/)
- [https://news.mit.edu/2025/large-language-models-reason-about-diverse-data-general-way-0219](https://news.mit.edu/2025/large-language-models-reason-about-diverse-data-general-way-0219)
- [https://openaipublic.blob.core.windows.net/neuron-explainer/paper/index.html](https://openaipublic.blob.core.windows.net/neuron-explainer/paper/index.html)
- [https://medium.com/@yaswanthreddy3775/are-large-language-models-just-fancy-autocomplete-machines-15060a9a4a52](https://medium.com/@yaswanthreddy3775/are-large-language-models-just-fancy-autocomplete-machines-15060a9a4a52)
- [https://cset.georgetown.edu/article/the-surprising-power-of-next-word-prediction-large-language-models-explained-part-1/](https://cset.georgetown.edu/article/the-surprising-power-of-next-word-prediction-large-language-models-explained-part-1/)
- [https://arxiv.org/html/2511.15304v1](https://arxiv.org/html/2511.15304v1)
- [https://www.theverge.com/ai-artificial-intelligence/827820/large-language-models-ai-intelligence-neuroscience-problems](https://www.theverge.com/ai-artificial-intelligence/827820/large-language-models-ai-intelligence-neuroscience-problems)
- [https://www.vincentschmalbach.com/does-temperature-0-guarantee-deterministic-llm-outputs/](https://www.vincentschmalbach.com/does-temperature-0-guarantee-deterministic-llm-outputs/)
- [https://ai.stackexchange.com/questions/43314/why-are-llms-able-to-reproduce-bodies-of-known-text-exactly](https://ai.stackexchange.com/questions/43314/why-are-llms-able-to-reproduce-bodies-of-known-text-exactly)
- [https://medium.com/@alain94040/llms-are-not-just-autocomplete-a-simple-proof-a4880dd25a5b](https://medium.com/@alain94040/llms-are-not-just-autocomplete-a-simple-proof-a4880dd25a5b)
- [https://codemanship.wordpress.com/2025/09/30/comprehension-debt-the-ticking-time-bomb-of-llm-generated-code/](https://codemanship.wordpress.com/2025/09/30/comprehension-debt-the-ticking-time-bomb-of-llm-generated-code/)
- [https://vgel.me/posts/seahorse/](https://vgel.me/posts/seahorse/)
- [https://medium.com/@sepp.ruchti/are-llms-thinking-what-geoffrey-hinton-thinks-3dc12f5dffd6](https://medium.com/@sepp.ruchti/are-llms-thinking-what-geoffrey-hinton-thinks-3dc12f5dffd6)
- [https://garymarcus.substack.com/p/llms-dont-do-formal-reasoning-and](https://garymarcus.substack.com/p/llms-dont-do-formal-reasoning-and)
- [https://garymarcus.substack.com/p/a-knockout-blow-for-llms](https://garymarcus.substack.com/p/a-knockout-blow-for-llms)
- [https://www.snellman.net/blog/archive/2025-06-02-llms-are-cheap/](https://www.snellman.net/blog/archive/2025-06-02-llms-are-cheap/)
- [https://simonwillison.net/2025/Jun/6/six-months-in-llms/](https://simonwillison.net/2025/Jun/6/six-months-in-llms/)
- [https://llm-brain-rot.github.io/](https://llm-brain-rot.github.io/)
- [https://www.secwest.net/strawberry](https://www.secwest.net/strawberry)
- [https://xcancel.com/fchollet/status/1755270681359716611#m](https://xcancel.com/fchollet/status/1755270681359716611#m)
- [https://www.youtube.com/watch?v=4lKyNdZz3Vw](https://www.youtube.com/watch?v=4lKyNdZz3Vw)
- [https://www.youtube.com/watch?v=90C3XVjUMqE](https://www.youtube.com/watch?v=90C3XVjUMqE)
- [https://forum.effectivealtruism.org/posts/MGpJpN3mELxwyfv8t/francois-chollet-on-why-llms-won-t-scale-to-agi](https://forum.effectivealtruism.org/posts/MGpJpN3mELxwyfv8t/francois-chollet-on-why-llms-won-t-scale-to-agi)
- [https://fchollet.substack.com/p/how-i-think-about-llm-prompt-engineering](https://fchollet.substack.com/p/how-i-think-about-llm-prompt-engineering)
- [https://www.superannotate.com/blog/llm-active-learning](https://www.superannotate.com/blog/llm-active-learning)
- [https://springboards.ai/blog-posts/you-cant-ask-an-llm-to-be-more-random](https://springboards.ai/blog-posts/you-cant-ask-an-llm-to-be-more-random)
- [https://www.mindprison.cc/p/why-llms-dont-ask-for-calculators](https://www.mindprison.cc/p/why-llms-dont-ask-for-calculators)
- [https://the-decoder.com/new-research-finds-llms-report-subjective-experience-most-when-roleplay-is-reduced/](https://the-decoder.com/new-research-finds-llms-report-subjective-experience-most-when-roleplay-is-reduced/)
- [https://arxiv.org/abs/2410.13722v1](https://arxiv.org/abs/2410.13722v1)
- [https://simonwillison.net/2025/Dec/31/the-year-in-llms/](https://simonwillison.net/2025/Dec/31/the-year-in-llms/)
- [https://www.youtube.com/watch?v=VctsqOo8wsc](https://www.youtube.com/watch?v=VctsqOo8wsc)
- [https://www.youtube.com/watch?v=7SytuSS3sIc](https://www.youtube.com/watch?v=7SytuSS3sIc)
- [https://www.youtube.com/watch?v=F5ajyr5VzS0](https://www.youtube.com/watch?v=F5ajyr5VzS0)
- [https://embracethered.com/blog/posts/2025/39c3-agentic-probllms-exploiting-computer-use-and-coding-agents/](https://embracethered.com/blog/posts/2025/39c3-agentic-probllms-exploiting-computer-use-and-coding-agents/)
- [https://github.com/tailwindlabs/tailwindcss.com/pull/2388#issuecomment-3717222957](https://github.com/tailwindlabs/tailwindcss.com/pull/2388#issuecomment-3717222957)
- [https://muxup.com/2026q1/per-query-energy-consumption-of-llms](https://muxup.com/2026q1/per-query-energy-consumption-of-llms)
- [https://simonwillison.net/2026/Jan/8/llm-predictions-for-2026/](https://simonwillison.net/2026/Jan/8/llm-predictions-for-2026/)
- [https://www.theregister.com/2025/05/07/curl_ai_bug_reports/](https://www.theregister.com/2025/05/07/curl_ai_bug_reports/)
- [https://www.linkedin.com/posts/danielstenberg_hackerone-curl-activity-7324820893862363136-glb1/?rcm=ACoAABvgIC0Bx1xUu-E97QUzl6wtDuTtUHlFX7g](https://www.linkedin.com/posts/danielstenberg_hackerone-curl-activity-7324820893862363136-glb1/?rcm=ACoAABvgIC0Bx1xUu-E97QUzl6wtDuTtUHlFX7g)
- [https://sethmlarson.dev/slop-security-reports](https://sethmlarson.dev/slop-security-reports)
- [https://garymarcus.substack.com/p/deconstructing-geoffrey-hintons-weakest](https://garymarcus.substack.com/p/deconstructing-geoffrey-hintons-weakest)
- [https://www.wheresyoured.at/openai-onetrillion/](https://www.wheresyoured.at/openai-onetrillion/)
- [https://www.wheresyoured.at/sic/](https://www.wheresyoured.at/sic/)
- [https://www.wheresyoured.at/the-case-against-generative-ai/](https://www.wheresyoured.at/the-case-against-generative-ai/)
- [https://www.wheresyoured.at/the-haters-gui/](https://www.wheresyoured.at/the-haters-gui/)
- [https://www.wheresyoured.at/2025-a-retrospective/](https://www.wheresyoured.at/2025-a-retrospective/)
- [https://www.wheresyoured.at/the-enshittifinancial-crisis/](https://www.wheresyoured.at/the-enshittifinancial-crisis/)
- [https://tom7.org/bovex/](https://tom7.org/bovex/)
- [https://www.lesswrong.com/posts/D7PumeYTDPfBTp3i7/the-waluigi-effect-mega-post](https://www.lesswrong.com/posts/D7PumeYTDPfBTp3i7/the-waluigi-effect-mega-post)
- [https://github-roast.pages.dev/](https://github-roast.pages.dev/)
- [https://calcgpt.io/](https://calcgpt.io/)
- [https://arxiv.org/abs/2405.15012](https://arxiv.org/abs/2405.15012)
- [https://fortune.com/2025/10/07/deloitte-ai-australia-government-report-hallucinations-technology-290000-refund/](https://fortune.com/2025/10/07/deloitte-ai-australia-government-report-hallucinations-technology-290000-refund/)
- [https://www.computerworld.com/article/4059383/openai-admits-ai-hallucinations-are-mathematically-inevitable-not-just-engineering-flaws.html](https://www.computerworld.com/article/4059383/openai-admits-ai-hallucinations-are-mathematically-inevitable-not-just-engineering-flaws.html)
- [https://tech.slashdot.org/story/25/09/30/2028215/openais-new-social-video-app-will-let-you-deepfake-your-friends](https://tech.slashdot.org/story/25/09/30/2028215/openais-new-social-video-app-will-let-you-deepfake-your-friends)
- [https://www.techinasia.com/news/openais-revenue-rises-16-to-4-3b-in-h1-2025](https://www.techinasia.com/news/openais-revenue-rises-16-to-4-3b-in-h1-2025)
- [https://www.youtube.com/watch?v=TWpg1RmzAbc](https://www.youtube.com/watch?v=TWpg1RmzAbc)
- [https://www.youtube.com/watch?v=9Ch4a6ffPZY](https://www.youtube.com/watch?v=9Ch4a6ffPZY)
- [https://www.youtube.com/watch?v=nMwiQE8Nsjc](https://www.youtube.com/watch?v=nMwiQE8Nsjc)
- [https://www.youtube.com/watch?v=W2xZxYaGlfs](https://www.youtube.com/watch?v=W2xZxYaGlfs)
- [https://www.cnbc.com/2025/10/07/openais-sora-2-must-stop-allowing-copyright-infringement-mpa-says.html](https://www.cnbc.com/2025/10/07/openais-sora-2-must-stop-allowing-copyright-infringement-mpa-says.html)
- [https://archive.is/Pagn7](https://archive.is/Pagn7)
- [https://webtechnology.news/openai-turns-chatgpt-into-a-web-app-platform/](https://webtechnology.news/openai-turns-chatgpt-into-a-web-app-platform/)
- [https://github.com/openai/whisper/discussions/2608](https://github.com/openai/whisper/discussions/2608)
- [https://futurism.com/artificial-intelligence/openai-sora-trouble-backlash-copyright](https://futurism.com/artificial-intelligence/openai-sora-trouble-backlash-copyright)
- [https://thezvi.substack.com/p/openai-15-more-on-openais-paranoid](https://thezvi.substack.com/p/openai-15-more-on-openais-paranoid)
- [https://techcrunch.com/2025/10/19/openais-embarrassing-math/](https://techcrunch.com/2025/10/19/openais-embarrassing-math/)
- [https://www.youtube.com/watch?v=COOAssGkF6I](https://www.youtube.com/watch?v=COOAssGkF6I)
- [https://www.youtube.com/watch?v=Q0TpWitfxPk](https://www.youtube.com/watch?v=Q0TpWitfxPk)
- [https://www.oneusefulthing.org/p/something-new-on-openais-strawberry](https://www.oneusefulthing.org/p/something-new-on-openais-strawberry)
- [https://adrianroselli.com/2025/10/openai-aria-and-seo-making-the-web-worse.html](https://adrianroselli.com/2025/10/openai-aria-and-seo-making-the-web-worse.html)
- [https://www.npr.org/2025/07/09/nx-s1-5462609/grok-elon-musk-antisemitic-racist-content](https://www.npr.org/2025/07/09/nx-s1-5462609/grok-elon-musk-antisemitic-racist-content)
- [https://www.ft.com/content/ad94db4c-95a0-4c65-bd8d-3b43e1251091](https://www.ft.com/content/ad94db4c-95a0-4c65-bd8d-3b43e1251091)
- [https://www.theverge.com/news/859309/grok-undressing-limit-access-gaslighting](https://www.theverge.com/news/859309/grok-undressing-limit-access-gaslighting)
- [https://www.linkedin.com/posts/galenh_principal-software-engineer-coreai-microsoft-activity-7407863239289729024-WTzf/](https://www.linkedin.com/posts/galenh_principal-software-engineer-coreai-microsoft-activity-7407863239289729024-WTzf/)
- [https://techcrunch.com/2025/09/25/elon-musks-xai-offers-grok-to-federal-government-for-42-cents/](https://techcrunch.com/2025/09/25/elon-musks-xai-offers-grok-to-federal-government-for-42-cents/)
- [https://www.404media.co/elon-musk-could-drink-piss-better-than-any-human-in-history-grok-says/](https://www.404media.co/elon-musk-could-drink-piss-better-than-any-human-in-history-grok-says/)
- [https://www.scottsmitelli.com/articles/altoids-by-the-fistful/](https://www.scottsmitelli.com/articles/altoids-by-the-fistful/)
- [https://medium.com/@finneganarthurnotes/sam-altman-just-unveiled-a-story-written-by-an-ai-it-sucks-99875653df91](https://medium.com/@finneganarthurnotes/sam-altman-just-unveiled-a-story-written-by-an-ai-it-sucks-99875653df91)
- [https://time.com/7343213/ai-mental-health-therapy-risks/](https://time.com/7343213/ai-mental-health-therapy-risks/)
- [https://simonwillison.net/2025/May/20/ai-energy-footprint/#atom-everything](https://simonwillison.net/2025/May/20/ai-energy-footprint/#atom-everything)
- [https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/](https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/)
- [https://news.mit.edu/2025/explained-generative-ai-environmental-impact-0117](https://news.mit.edu/2025/explained-generative-ai-environmental-impact-0117)
- [https://www.reuters.com/world/google-ai-firm-settle-florida-mothers-lawsuit-over-sons-suicide-2026-01-07/](https://www.reuters.com/world/google-ai-firm-settle-florida-mothers-lawsuit-over-sons-suicide-2026-01-07/)
- [https://iee.psu.edu/news/blog/why-ai-uses-so-much-energy-and-what-we-can-do-about-it](https://iee.psu.edu/news/blog/why-ai-uses-so-much-energy-and-what-we-can-do-about-it)
- [https://pluralistic.net/2025/12/05/pop-that-bubble/#u-washington](https://pluralistic.net/2025/12/05/pop-that-bubble/#u-washington)
- [https://sightlessscribbles.com/the-colonization-of-confidence/](https://sightlessscribbles.com/the-colonization-of-confidence/)






---