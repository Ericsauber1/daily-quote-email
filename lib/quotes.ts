export interface Quote {
  quote: string;
  author: string;
}

export function assertQuotes(list: Quote[]): void {
  if (list.length === 0) {
    throw new Error('Quote list is empty');
  }
  for (const [index, item] of list.entries()) {
    if (!item.quote.trim() || !item.author.trim()) {
      throw new Error(`Quote at index ${index} is missing quote or author`);
    }
  }
}

export const quotes: Quote[] = [
  {
    quote: "It always seems impossible until it's done.",
    author: 'Nelson Mandela',
  },
  {
    quote: "Whether you think you can or you think you can't, you're right.",
    author: 'Henry Ford',
  },
  {
    quote: 'Stay hungry, stay foolish.',
    author: 'Steve Jobs',
  },
  {
    quote: 'In the middle of difficulty lies opportunity.',
    author: 'Albert Einstein',
  },
  {
    quote: 'It does not matter how slowly you go as long as you do not stop.',
    author: 'Confucius',
  },
  {
    quote: 'The unexamined life is not worth living.',
    author: 'Socrates',
  },
  {
    quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
  },
  {
    quote: 'Fall seven times, stand up eight.',
    author: 'Japanese proverb',
  },
  {
    quote: 'Do what you can, with what you have, where you are.',
    author: 'Theodore Roosevelt',
  },
  {
    quote: 'Knowing yourself is the beginning of all wisdom.',
    author: 'Aristotle',
  },
  {
    quote: 'Imagination is more important than knowledge.',
    author: 'Albert Einstein',
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: 'Theodore Roosevelt',
  },
  {
    quote: 'No one can make you feel inferior without your consent.',
    author: 'Eleanor Roosevelt',
  },
  {
    quote: "Everything you've ever wanted is on the other side of fear.",
    author: 'George Addair',
  },
  {
    quote: 'Perfect is the enemy of good.',
    author: 'Voltaire',
  },
  {
    quote: 'Energy and persistence conquer all things.',
    author: 'Benjamin Franklin',
  },
  {
    quote: 'I am not afraid of storms, for I am learning how to sail my ship.',
    author: 'Louisa May Alcott (Little Women author)',
  },
  {
    quote: 'It is not that we have a short time to live, but that we waste a lot of it.',
    author: 'Seneca',
  },
  {
    quote: 'A man can be destroyed but not defeated.',
    author: 'Ernest Hemingway',
  },
  {
    quote: 'He who has a why to live can bear almost any how.',
    author: 'Friedrich Nietzsche',
  },
  {
    quote: "The struggle itself toward the heights is enough to fill a man's heart.",
    author: 'Albert Camus',
  },
];

assertQuotes(quotes);
