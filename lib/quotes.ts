export interface Quote {
  quote: string;
  author: string;
  description: string;
}

export function assertQuotes(list: Quote[]): void {
  if (list.length === 0) {
    throw new Error('Quote list is empty');
  }
  for (const [index, item] of list.entries()) {
    if (!item.quote.trim() || !item.author.trim() || !item.description.trim()) {
      throw new Error(`Quote at index ${index} is missing quote, author, or description`);
    }
  }
}

export const quotes: Quote[] = [
  {
    quote: "It always seems impossible until it's done.",
    author: 'Nelson Mandela',
    description:
      'The size of a task is mostly a story you tell before you start. Begin anyway; the “impossible” shrinks in the doing. Today: take the first unglamorous step instead of waiting to feel ready.',
  },
  {
    quote: 'Let go or be dragged.',
    author: 'Zen proverb',
    description:
      'What you refuse to release will tow you. Letting go is not apathy; it is dropping a fight with reality. Today: name one thing you’re gripping and practice an open hand for ten minutes.',
  },
  {
    quote: 'It is not that we have a short time to live, but that we waste a lot of it.',
    author: 'Seneca',
    description:
      'Life feels short because we leak it—distraction, resentment, postponement. Time is plentiful if you spend it on purpose. Today: reclaim one hour from numbing and give it to something you’d miss at the end.',
  },
  {
    quote: "Whether you think you can or you think you can't, you're right.",
    author: 'Henry Ford',
    description:
      'Belief is not magic, but it sets the search terms of your mind. If you assume you can’t, you stop looking for paths. Today: notice one place you’re arguing for your limits, and try the opposite assumption for an hour.',
  },
  {
    quote: 'Nature does not hurry, yet everything is accomplished.',
    author: 'Lao Tzu',
    description:
      'Urgency is often anxiety in work clothes. Seasons complete themselves without panic. Today: drop one artificial deadline in your head and do the next right action at a human pace.',
  },
  {
    quote: 'It does not matter how slowly you go as long as you do not stop.',
    author: 'Confucius',
    description:
      'Pace is not character. Stopping is. A small daily continuation beats a dramatic restart. Today: do the next inch of the thing you’ve been postponing, even if it’s ugly.',
  },
  {
    quote: 'Stay hungry, stay foolish.',
    author: 'Steve Jobs',
    description:
      'Hunger is refusing to go numb; foolishness is being willing to look naive in order to learn. Comfort is the quiet enemy of both. Today: ask a beginner’s question in something you already “know.”',
  },
  {
    quote: 'Sitting quietly, doing nothing, spring comes, and the grass grows by itself.',
    author: 'Zen saying',
    description:
      'Not all progress is manufactured. Some things ripen when you stop interfering. Today: sit still once without optimizing the stillness. Notice what continues without you.',
  },
  {
    quote: 'The unexamined life is not worth living.',
    author: 'Socrates',
    description:
      'Not a call to overthink—a call to notice what is driving you. Unexamined habits spend your life for you. Today: pick one reaction you had this week and ask what you were actually protecting.',
  },
  {
    quote: 'In the middle of difficulty lies opportunity.',
    author: 'Albert Einstein',
    description:
      'Friction is information: it shows where the old way breaks. The opportunity is rarely a silver lining; it’s the problem itself, seen as a design brief. Today: name the difficulty, then ask what it makes possible that ease would not.',
  },
  {
    quote: 'A good traveler has no fixed plans and is not intent upon arriving.',
    author: 'Lao Tzu',
    description:
      'Plans are useful; clinging to them is not. Arrival-mind misses the road. Today: hold today’s plan loosely enough that a better turn can still be taken.',
  },
  {
    quote: 'He who has a why to live can bear almost any how.',
    author: 'Friedrich Nietzsche',
    description:
      'Meaning is load-bearing. Without a why, every how feels like insult; with one, hardship has a job. Today: reconnect a hard task to the reason it exists, even if the reason is small.',
  },
  {
    quote: 'A man can be destroyed but not defeated.',
    author: 'Ernest Hemingway',
    description:
      'Circumstances can break the body or the plan; they don’t have to break the stance. Defeat is an inner surrender. Today: keep your dignity in one place where the outcome is already out of your hands.',
  },
  {
    quote: 'Do not seek to follow in the footsteps of the wise; seek what they sought.',
    author: 'Matsuo Bashō',
    description:
      'Copying forms is easier than sharing a search. The wise were after a live question, not a costume. Today: imitate the hunger, not the brand—ask what they were actually looking for.',
  },
  {
    quote: 'Knowing yourself is the beginning of all wisdom.',
    author: 'Aristotle',
    description:
      'Self-knowledge is seeing your patterns without the press release. Until you know your hungers and blind spots, advice from others is noise. Today: notice one recurring mood and what usually precedes it.',
  },
  {
    quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    description:
      'Neither win nor loss is a permanent identity. Courage is the willingness to take the next honest action after either. Today: continue one thing that a recent result (good or bad) tempted you to freeze.',
  },
  {
    quote: 'Every day is a good day.',
    author: 'Yunmen',
    description:
      'Not “every day is pleasant.” This day, as it is, is the only one that can be lived. Goodness is availability, not mood. Today: meet the actual weather of this morning without waiting for a better one.',
  },
  {
    quote: "The struggle itself toward the heights is enough to fill a man's heart.",
    author: 'Albert Camus',
    description:
      'You don’t need the summit to justify the climb. Engagement with the work is the reward, not a future arrival. Today: pour yourself into the effort and let the result be secondary.',
  },
  {
    quote: 'Do what you can, with what you have, where you are.',
    author: 'Theodore Roosevelt',
    description:
      'Waiting for better tools, timing, or a different you is often a delay tactic. Agency starts inside the current constraints. Today: use only what’s already in reach and still move the needle.',
  },
  {
    quote: 'Those who know do not speak. Those who speak do not know.',
    author: 'Lao Tzu',
    description:
      'Real understanding is often quiet; performance of certainty is loud. Words can be a way of not looking. Today: listen longer than you explain, especially where you feel most sure.',
  },
  {
    quote: 'The happiness of your life depends upon the quality of your thoughts.',
    author: 'Marcus Aurelius',
    description:
      'Not positive thinking—stewardship of attention. Repeated thoughts become the weather you live in. Today: catch one corrosive loop and replace it with a truer, quieter sentence.',
  },
  {
    quote: 'Imagination is more important than knowledge.',
    author: 'Albert Einstein',
    description:
      'Knowledge is the map of what already is. Imagination is permission to rearrange it. You need both; without imagination, knowledge only conserves the present. Today: spend ten minutes on “what if” before “what’s practical.”',
  },
  {
    quote: 'When you reach the top of the mountain, keep climbing.',
    author: 'Zen proverb',
    description:
      'Arrival is a pause, not a personality. The next mountain is often inner: less ego, more clarity. Today: after a win, pick the next honest ascent instead of camping on the story of it.',
  },
  {
    quote: 'Perfect is the enemy of good.',
    author: 'Voltaire',
    description:
      'Perfectionism disguises delay as standards. Good shipped can be improved; perfect unpublished teaches you nothing. Today: finish a 70% version and stop polishing the first 10%.',
  },
  {
    quote: 'This is the real secret of life — to be completely engaged with what you are doing in the here and now.',
    author: 'Alan Watts',
    description:
      'Half-presence is how days vanish. The secret is not a trick; it is attention returned to this act. Today: do one ordinary task as if it were the only thing happening.',
  },
  {
    quote: 'The bamboo that bends is stronger than the oak that resists.',
    author: 'Japanese proverb',
    description:
      'Rigidity looks like strength until the storm. Flexibility absorbs force and remains standing. Today: yield in one argument or plan where stubbornness is costing you more than the point is worth.',
  },
  {
    quote: "It's not what happens to you, but how you react to it that matters.",
    author: 'Epictetus',
    description:
      'Events are given; the second move is yours. Freedom sits in the gap between stimulus and response. Today: delay one reaction by a breath and choose it on purpose.',
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: 'Theodore Roosevelt',
    description:
      'Halfway is not finished—but without belief you don’t even start the walk. Confidence here is a working hypothesis, not a guarantee. Today: act as if the attempt is allowed, then let evidence catch up.',
  },
  {
    quote: 'He who knows he has enough is rich.',
    author: 'Lao Tzu',
    description:
      'Wanting more is infinite; enough is a decision. Richness here is a relationship to desire, not a number. Today: notice one “more” that is actually restlessness, and stop feeding it.',
  },
  {
    quote: 'In the midst of winter, I found there was, within me, an invincible summer.',
    author: 'Albert Camus',
    description:
      'Outer season is not inner climate. Even in bleakness, something in you can refuse to freeze. Today: look for the small warmth that is still yours—humor, loyalty, a walk—and tend it.',
  },
  {
    quote: 'No one can make you feel inferior without your consent.',
    author: 'Eleanor Roosevelt',
    description:
      'Others can insult; only you can install it as truth. Consent is the inner yes that says their ranking of you is real. Today: when a slight lands, ask “is this mine to carry?” before you pick it up.',
  },
  {
    quote: 'Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water.',
    author: 'Zen proverb',
    description:
      'Insight doesn’t exempt you from the dishes. The ordinary is the path, before and after. Today: do a chore fully, as practice, not as interruption of “real” life.',
  },
  {
    quote: 'Adopt the pace of nature: her secret is patience.',
    author: 'Ralph Waldo Emerson',
    description:
      'Growth that lasts is paced like weather, not like a notification. Patience is not waiting; it is continuing without ripping the plant up to check the roots. Today: give one slow project another quiet interval of trust.',
  },
  {
    quote: "Everything you've ever wanted is on the other side of fear.",
    author: 'George Addair',
    description:
      'Fear is often the gate, not the wall. It marks what matters. You don’t have to feel brave; you have to walk through while afraid. Today: do one small thing that sits just past the flinch.',
  },
  {
    quote: 'Fall seven times, stand up eight.',
    author: 'Japanese proverb',
    description:
      'Resilience is not falling less; it is the extra stand. The eighth rise is the whole point. Today: treat one stumble as data, not a verdict, and get back to the work.',
  },
  {
    quote: 'One must imagine Sisyphus happy.',
    author: 'Albert Camus',
    description:
      'The boulder always rolls back. Happiness, if it exists, is in owning the push rather than waiting for the hill to vanish. Today: do a repetitive duty as if it were chosen, not inflicted.',
  },
  {
    quote: 'The only way to make sense out of change is to plunge into it, move with it, and join the dance.',
    author: 'Alan Watts',
    description:
      'Analysis from the riverbank won’t explain the current. Meaning appears when you participate. Today: stop rehearsing a change and take one step inside it.',
  },
  {
    quote: 'The obstacle is the path.',
    author: 'Zen proverb',
    description:
      'What blocks you is not detour; it is the training. The thing in the way is the way. Today: stop looking for a bypass and work the obstacle as the assignment.',
  },
  {
    quote: 'When you arise in the morning, think of what a privilege it is to be alive, to think, to enjoy, to love.',
    author: 'Marcus Aurelius',
    description:
      'Waking up is not a given. Before the to-do list, remember that thinking, enjoying, and loving are the point of the day, not leftovers. Today: name three concrete privileges already in this morning before you pick up your phone.',
  },
  {
    quote: 'Energy and persistence conquer all things.',
    author: 'Benjamin Franklin',
    description:
      'Talent without stay-power stalls. Persistence is applied energy over time, especially on boring days. Today: show up for the unglamorous middle of a task, not the exciting start.',
  },
  {
    quote: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
    author: 'Ralph Waldo Emerson',
    description:
      'The world pays you to be a type. Being yourself is a daily refusal of that bargain, not a personality slogan. Today: notice one place you’re performing for approval, and drop the act by a degree.',
  },
  {
    quote: 'I am not afraid of storms, for I am learning how to sail my ship.',
    author: 'Louisa May Alcott (Little Women author)',
    description:
      'The storm is not the failure; refusing to learn the boat is. Skill grows in weather, not in harbor. Today: treat one difficulty as practice in steering, not proof you’re sinking.',
  },
  {
    quote: 'Do not spoil what you have by desiring what you have not.',
    author: 'Epicurus',
    description:
      'Wanting the next thing can poison the present thing. Enough is a way of seeing, not a delivery. Today: enjoy one possession or relationship without upgrading it in your head.',
  },
  {
    quote: 'Tell me, what is it you plan to do with your one wild and precious life?',
    author: 'Mary Oliver',
    description:
      'The question is not career branding; it is how you will spend the only life you don’t get twice. Wild and precious means unrepeatable, not impressive. Today: give one hour to something you’d still want on the last day.',
  },
];

assertQuotes(quotes);
