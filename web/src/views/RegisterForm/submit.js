import { format } from 'date-fns';

export const handleSubmit = async (event) => {
  event.preventDefault();

  const trimInputs = (input) => input.trim().replace(/\s+/g, ' ');

  const character = {
    firstName: trimInputs(event.target.first_name.value),
    lastName: trimInputs(event.target.last_name.value),
    birthDate: format(new Date(event.target.date_of_birth.value), 'yyyy-MM-dd'),
    story: trimInputs(event.target.character_story.value),
  };

  await fetch('https://alta-core-front/submitRegisterForm', {
    method: 'POST',
    body: JSON.stringify(character),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log('character submitted', character);
};
