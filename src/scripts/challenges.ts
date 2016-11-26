const challengesAsString = "Reverse a String,Factorialize a Number,Check for Palindromes,Find the Longest Word in a String,Title Case a Sentence,Return Largest Numbers in Arrays,Confirm the Ending,Repeat a string repeat a string,Truncate a string,Chunky Monkey,Slasher Flick,Mutations,Falsy Bouncer,Seek and Destroy,Where do I belong,Caesars Cipher,Sum All Numbers in a Range,Diff Two Arrays,Roman Numeral Converter,Wherefore art thou,Search and Replace,Pig Latin,DNA Pairing,Missing letters,Boo who,Sorted Union,Convert HTML Entities,Spinal Tap Case,Sum All Odd Fibonacci Numbers,Sum All Primes,Smallest Common Multiple,Finders Keepers,Drop it,Steamroller,Binary Agents,Everything Be True,Arguments Optional,Validate US Telephone Numbers,Symmetric Difference,Exact Change,Inventory Update,No repeats please,Friendly Date Ranges,Make a Person,Map the Debris,Pairwise"

const challengesOptions = challengesAsString.split(',')
  .map((name, i) => `<option value=${i + 1}>${name}</option>`)
  .join('\n')

const challengesParagraphs = challengesAsString.split(',')
  .map((name) => `<p class="grades__challenge"><a href="/prototypes/challenge/1">${name}</a></p>`)
  .join('\n')


const challenges = challengesAsString.split(',')

export {
  challenges,
  challengesOptions,
  challengesParagraphs
}