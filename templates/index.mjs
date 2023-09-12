import prompts from 'prompts';
import npmName from 'npm-name';

(async () => {
  const response = await prompts({
    type: 'text',
    name: 'value',
    message: 'How old are you?',
    validate: async value => {
		const res =await npmName(value)
console.log(res)		
		return !res  ? `Name taken` : true
		
		}
  });

  console.log(response); // => { value: 24 }
})();