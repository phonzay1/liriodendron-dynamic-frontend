import { useState } from "react";
import userService from "../services/userService";

export function UserForm({users, setUsers}) {
  const [formValues, setFormValues] = useState({
    name: '',
    favoriteAnimal: '',
  })

  function resetFormValues() {
    setFormValues({
      name: '',
      favoriteAnimal: '',
    });
  }
  
  async function handleSubmit(event) {
    event.preventDefault();

    const newUserData = {
      name: formValues.name,
      favoriteAnimal: formValues.favoriteAnimal,
    }

    const newUser = await userService.addUser(newUserData);
    setUsers(users.concat(newUser));
    resetFormValues();
  }
  
  return (
    <form action="" method="post" onSubmit={handleSubmit}>
      <label htmlFor="name"><strong>Name: </strong></label>
      <input 
        type="text"
        name="name"
        id="name"
        value={formValues.name}
        onChange={e => setFormValues({...formValues, name: e.target.value})}
      />
      <label htmlFor="favoriteAnimal"><strong>Favorite Animal: </strong></label>
      <input 
        type="text"
        name="favoriteAnimal"
        id="favoriteAnimal"
        value={formValues.favoriteAnimal}
        onChange={e => setFormValues({...formValues, favoriteAnimal: e.target.value})}
      />
      <input type="submit" value="Add User" />
    </form>
  );
}